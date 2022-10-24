import React, { useEffect, useState } from 'react';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import { Text, TouchableOpacity, View, Platform} from 'react-native';
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';
import IconButton from "@src/components/IconButton";
import { StyleSheet } from 'react-native';
import { scale } from '../Utils/scale';
import Video from 'react-native-video';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import TrackSlider from "./TrackSlider";
import moment from 'moment';

const AudioPlayerRoutine = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const achievementReducer = useSelector((state) => state.onenergyReducer.achievementReducer.achievements);
    const practiceReducer = useSelector((state) => state.onenergyReducer.practiceReducer);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const {routine, setMessageBarDisplay, totalDuration} = props;
    const [playing, setPlaying] = useState(false);
    const [stopped, setStopped] = useState(true)
    const [trackTitle, setTrackTitle] = useState('');
    const [nextTrack, setNextTrack] = useState(0);
    const [pastPosition, setPastPosition] = useState(0);
    const dispatch = useDispatch();

    const updateProgress = async () => {
        try {
            dispatch({
                type: 'ONENERGY_ACHIEVEMENT_COMPLETE_PRACTICE',
                payload: {
                    mode: 'routine',
                    data: routine.id
                }
            });


            let achievements = [];
            routine.routine.map((routine) =>{
                let section_id;

                practiceReducer.guides.map((section) => {
                    let tempGuide = section.data.find(item => item.id === routine.id);
                    if (tempGuide)
                        section_id = section.id
                });

                    let tmpMilestone = achievementReducer.filter(achievement =>
                        (achievement.trigger === 'practice' &&
                            ((achievement.triggerPracticeOption === 'single' && (parseInt(achievement.triggerSinglePractice) === routine.id || !achievement.triggerSinglePractice)) ||
                                (achievement.triggerPracticeOption === 'section' && (parseInt(achievement.triggerSectionPractice) === section_id || !achievement.triggerSectionPractice))) &&
                            !achievement.complete_date)
                    );
                    tmpMilestone.map((item) => {
                        let complete = false;
                        if (parseInt(item.total) <= parseInt(item.step) + 1) {
                            complete = true;
                            achievements.push({
                                [item.id]: {
                                    "type": "milestone",
                                    "complete_date": Math.floor(new Date().getTime() / 1000)
                                }
                            });
                        }
                        dispatch({
                            type: 'ONENERGY_ACHIEVEMENT_COMPLETE_PRACTICE',
                            payload: {
                                "milestone": item.id,
                                "step": item.step + 1,
                                "complete": complete
                            }
                        });
                    })

                let tmpQuest = achievementReducer.daily.filter(achievement => {
                    if ((achievement.trigger === 'practice' &&
                        ((achievement.triggerPracticeOption === 'single' && (parseInt(achievement.triggerSinglePractice) === routine.id || !achievement.triggerSinglePractice)) ||
                            (achievement.triggerPracticeOption === 'section' && (parseInt(achievement.triggerSectionPractice) === section_id || !achievement.triggerSectionPractice)))))
                        if (!achievement.complete_date) {
                            return true
                        } else {
                            let complete_date = new moment.unix(quest.complete_date).format('YYYY-MM-DD');
                            let today = new moment().format('YYYY-MM-DD');
                            return complete_date !== today;
                        }
                });

                tmpQuest.map((item) => {
                    let complete = false;
                    if (parseInt(item.total) <= parseInt(item.step) + 1) {
                        complete = true;
                        achievements.push({
                            [item.id]: {
                                "type": "quest",
                                "complete_date": Math.floor(new Date().getTime() / 1000)
                            }
                        });
                    }
                    dispatch({
                        type: 'ONENERGY_ACHIEVEMENT_COMPLETE_PRACTICE',
                        payload: {
                            "quest": item.id,
                            "step": parseInt(item.step) + 1,
                            "complete": complete
                        }
                    });
                })

                dispatch({
                    type: 'ONENERGY_PROGRESS_UPDATE',
                    payload: {
                        "mode": 'PP',
                        "item": section_id,
                        "count": 1,
                        "duration": track.duration
                    }
                });
            })

            setMessageBarDisplay(true);

            const apiRequest = getApi(props.config);
            apiRequest.customRequest(
                "wp-json/onenergy/v1/statsUpdate",
                "post",
                {
                    "mode": "PR",
                    "data": routine.id,
                    "stats": progressReducer,
                    "achievements": achievements
                },
                null,
                {},
                false
            );
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        addTrack(routine.tracks).then(async () => {
            await TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
        });
    }, [routine]);

    async function addTrack(track) {
        await TrackPlayer.reset();
        return await TrackPlayer.add(track, -1);
    }

    useTrackPlayerEvents([Event.PlaybackState, Event.RemotePlay, Event.RemotePause, Event.RemoteStop], async (event) => {
        if ((event.type === Event.PlaybackState) && ((event.state === State.Stopped) || (event.state === State.None))) {
            setTrackTitle('');
            deactivateKeepAwake();
        }
        if (event.state === State.Playing) {
            activateKeepAwake();
        }
        if (event.state === State.Paused) {
            deactivateKeepAwake();
        }
        if (event.type === Event.RemotePlay) {
            await TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
            deactivateKeepAwake();
        }
        if (event.type === Event.RemotePause) {
            await TrackPlayer.pause();
            setPlaying(false);
            setStopped(false);
            deactivateKeepAwake();
        }
        if (event.type === Event.RemoteStop) {
            await TrackPlayer.reset();
            setPlaying(false);
            setStopped(true);
            setTrackTitle('');
            deactivateKeepAwake();
        }
    });
    useTrackPlayerEvents([Event.PlaybackTrackChanged], ({nextTrack, position}) => {
        setPastPosition(position)
        setNextTrack(nextTrack)
        if (nextTrack) setTrackTitle(routine.tracks[parseInt(nextTrack, 10)].title);
        let index = parseInt(nextTrack, 10);
        if (routine.tracks[index]) {
            setTrackTitle(routine.tracks[index].title);
        }
    });

    useTrackPlayerEvents([Event.PlaybackQueueEnded], async (event) => {
        if (event.type === 'playback-queue-ended') {
            if (Platform.OS === 'ios') {
                if (nextTrack === routine.tracks.length - 1) {
                    setPlaying(false);
                    setStopped(true);
                    setTrackTitle('');
                    await TrackPlayer.reset();
                    setNextTrack(0);
                    updateProgress().then();
                }
            } else {
                setPlaying(false);
                setStopped(true);
                setTrackTitle('');
                await TrackPlayer.reset();
                setNextTrack(0);
                updateProgress().then();
            }
        }
    });

    const onPlayPausePress = async () => {
        const state = await TrackPlayer.getState();
        if (state === State.Playing) {
            await TrackPlayer.pause();
            setPlaying(false);
            setStopped(false);
        }
        if ((state === State.Paused)) {
            await TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
        }
        if ((state === State.Stopped) || (state === State.None)) {
            await addTrack(routine.tracks);
            await TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
        }
    };

    const onStopPress = async () => {
        const state = await TrackPlayer.getState();
        if ((state === State.Playing) || (state === State.Paused)) {
            await TrackPlayer.reset();
            setNextTrack(0);
            setPastPosition(0);
            setPlaying(false);
            setStopped(true);
        }
    };

    return (
        <View style={styles.playerMaxView}>
            <View style={styles.buttonsSection}>
                <View style={styles.buttonsCol}>
                    <TouchableOpacity onPress={onPlayPausePress} style={styles.playPauseButton}
                                      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                        <IconButton
                            icon={playing ? require("@src/assets/img/music-pause.png") : require("@src/assets/img/music-play.png")}
                            tintColor={"black"}
                            style={{
                                height: 24,
                                width: 24,
                            }}
                        />
                    </TouchableOpacity>
                    {!stopped ? (
                        <TouchableOpacity onPress={onStopPress} style={styles.stopButton}
                                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                            <IconButton
                                icon={require("@src/assets/img/stop.png")}
                                tintColor={"black"}
                                style={{
                                    height: 24,
                                    width: 24,
                                }}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
            <View style={styles.progressBarSection}>
                <Text>{trackTitle}</Text><TrackSlider type={"routine"} pastPosition={pastPosition}
                                                      totalDuration={totalDuration}/>
                {!!routine.bgm ? (
                    <Video
                        ref={videoPlayer => this.videoPlayer = videoPlayer}
                        audioOnly={true}
                        playInBackground={user && !!(user.membership && user.membership.length)}
                        playWhenInactive={true}
                        ignoreSilentSwitch={"ignore"}
                        repeat={true}
                        paused={!playing}
                        source={{uri: routine.bgm_url}}   // Can be a URL or a local file.
                    />
                ) : null}
            </View>
        </View>
    );
};


const flexStyles: any = {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
};

const styles = StyleSheet.create({
    playerMaxView: {
        ...flexStyles,
        overflow:"hidden",
        paddingHorizontal: 5,
        height: scale(50),
        flexDirection: "row",
    },
    progressBarSection: {
        ...flexStyles,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal:scale(10),
    },
    buttonsSection: {
        ...flexStyles,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    buttonsCol: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: scale(150),
    },
    stopButton: {
        marginHorizontal:scale(5),
    },
    playPauseButton: {
        marginLeft:scale(5),
    },
    playPauseIcon: {
        color: '#000',
    },
    trackDesc: {
        ...flexStyles,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trackTitle: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#3d3d5c',
    },
    trackSubtitle: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: '#3d3d5c',
    },
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(AudioPlayerRoutine);