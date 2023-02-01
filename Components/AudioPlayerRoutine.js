import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import TrackPlayer, {Event, State, useTrackPlayerEvents} from 'react-native-track-player';
import IconButton from "@src/components/IconButton";
import {s} from '../Utils/Scale';
import Video from 'react-native-video';
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import TrackSlider from "./TrackSlider";
import * as Analytics from "../Utils/Analytics";

const AudioPlayerRoutine = (props) => {
    const {screenProps} = props;
    const {colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
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
                type: 'ONENERGY_PRACTICE_COMPLETED',
                payload: {
                    mode: 'PR',
                    data: routine.id
                }
            });
            Analytics.segmentClient.track('End Routine Practice', {
                id: routine.id,
                title: routine.title
            }).then();
            setMessageBarDisplay(true);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        addTrack(routine.tracks).then(async () => {
            await TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
        })
    }, [routine]);

    async function addTrack(track) {
        const state = await TrackPlayer.getState();
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
                if (!nextTrack || nextTrack === routine.tracks.length - 1) {
                    setPlaying(false);
                    setStopped(true);
                    setTrackTitle('');
                    await TrackPlayer.reset();
                    setNextTrack(0);
                    this.videoPlayer.seek(0);
                    updateProgress().then();
               }
           } else {
            setPlaying(false);
            setStopped(true);
            setTrackTitle('');
            await TrackPlayer.reset();
            setNextTrack(0);
            this.videoPlayer.seek(0);
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
            const queue = await TrackPlayer.getQueue();
            if(!queue.length){
                addTrack(routine.tracks).then(async () => {
                    await TrackPlayer.play();
                    setPlaying(true);
                    setStopped(false);
                })
            }else {
                await TrackPlayer.play();
                setPlaying(true);
                setStopped(false);
            }
        }
        if ((state === State.Stopped) || (state === State.None)) {
            addTrack(routine.tracks).then(async () => {
                await TrackPlayer.play();
                setPlaying(true);
                setStopped(false);
            })
        }
    };

    const onStopPress = async () => {
        await TrackPlayer.reset();
        setNextTrack(0);
        setPastPosition(0);
        setPlaying(false);
        setStopped(true);
        this.videoPlayer.seek(0);
    };
    return (
        <>
            <View style={[styles.playerMaxView, {backgroundColor: colors.secondaryButtonBg}]}>
                <View style={styles.buttonsSection}>
                    <View style={styles.buttonsCol}>
                        <TouchableOpacity onPress={onPlayPausePress} style={styles.playPauseButton}
                                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                            <IconButton
                                icon={playing ? require("@src/assets/img/music-pause.png") : require("@src/assets/img/music-play.png")}
                                tintColor={"black"}
                                style={{
                                    height: s(24),
                                    width: s(24),
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
                                        height: s(24),
                                        width: s(24),
                                    }}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
                <View style={styles.progressBarSection}>
                    <TrackSlider type={"routine"} pastPosition={pastPosition} totalDuration={totalDuration}/>
                    {routine.bgm_id ? (
                        <Video
                            ref={videoPlayer => this.videoPlayer = videoPlayer}
                            audioOnly={true}
                            playInBackground={user && !!(user.membership && user.membership.length)}
                            playWhenInactive={true}
                            ignoreSilentSwitch={"ignore"}
                            repeat={true}
                            volume={routine.bgm_volume?routine.bgm_volume/100:0.5}
                            paused={!playing}
                            source={{uri: optionData.bgm.find(el => el.id === routine.bgm_id).url}}
                        />
                    ) : null}
                </View>
            </View>
            <View style={styles.routineDetailBox}>
                <Text style={[styles.subTitle,{fontFamily:trackTitle==="Opening"&&playing?"Montserrat-SemiBold":"Montserrat-Regular", fontWeight:trackTitle==='Opening'&&playing?"bold":"normal"}]}>Opening</Text>
                {
                    routine.routine.map((item, index) => {
                        return (
                            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                <Text style={[styles.subTitle,{fontFamily:trackTitle===item.title&&playing?"Montserrat-SemiBold":"Montserrat-Regular", fontWeight:trackTitle===item.title&&playing?"bold":"normal"}]}>{item.title}</Text>
                            </View>
                        )
                    })
                }
                <Text style={[styles.subTitle,{fontFamily:trackTitle==="Closing"&&playing?"Montserrat-SemiBold":"Montserrat-Regular", fontWeight:trackTitle==='Closing'&&playing?"bold":"normal"}]}>Closing</Text>
            </View>
        </>
    );
};


const flexStyles: any = {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
};

const styles = StyleSheet.create({
    routineDetailBox: {
        padding: s(15),
    },
    playerMaxView: {
        ...flexStyles,
        overflow: "hidden",
        paddingHorizontal: 5,
        height: s(40),
        flexDirection: "row",
    },
    progressBarSection: {
        ...flexStyles,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: s(10),
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
        width: s(150),
    },
    stopButton: {
        marginHorizontal: s(5),
    },
    playPauseButton: {
        marginLeft: s(5),
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
        fontSize: s(20),
        fontWeight: 'bold',
        color: '#3d3d5c',
    },
    trackSubtitle: {
        fontSize: s(16),
        fontWeight: 'bold',
        color: '#3d3d5c',
    },
    subTitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: s(14),
        color: "#262626",
    },
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(AudioPlayerRoutine);