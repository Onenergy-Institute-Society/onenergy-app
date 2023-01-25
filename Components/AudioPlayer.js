import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {AppState, StyleSheet, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {Event, State, useTrackPlayerEvents} from 'react-native-track-player';
import IconButton from "@src/components/IconButton";
import {s} from '../Utils/Scale';
import TrackSlider from "./TrackSlider";
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';

const AudioPlayer = (props) => {
    const {screenProps} = props;
    const {colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const {track, setMessageBarDisplay} = props;
    const [playing, setPlaying] = useState(false);
    const [stopped, setStopped] = useState(true)
    const dispatch = useDispatch();

    const updateProgress = () => {
        try {
            dispatch({
                type: 'ONENERGY_PRACTICE_COMPLETED',
                payload: {
                    mode: 'PP',
                    data: track.id
                }
            });
            setMessageBarDisplay(true);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        const appStateListener = AppState.addEventListener(
            'change',
            nextAppState => {
                if ((nextAppState === 'background') && (!user.membership || !user.membership.length)) {
                    TrackPlayer.pause();
                }
            },
        );
        return () => {
            appStateListener?.remove();
        };
    }, [])
    useEffect(() => {
        addTrack(track).then(() => {
            TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
        })
    }, [track]);

    async function addTrack(track) {
        const state = await TrackPlayer.getState();
        await TrackPlayer.reset();
        return await TrackPlayer.add(track, -1);
    }

    useTrackPlayerEvents([Event.PlaybackState, Event.RemotePlay, Event.RemotePause, Event.RemoteStop, Event.PlaybackQueueEnded], (event) => {
        if (event.state === State.Playing) {
            activateKeepAwake();
        }
        if (event.state === State.Paused) {
            deactivateKeepAwake();
        }
        if ((event.state === State.Stopped) || (event.state === State.None)) {
            deactivateKeepAwake();
        }
        if (event.type === Event.RemotePlay) {
            TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
            deactivateKeepAwake();
        }
        if (event.type === Event.RemotePause) {
            TrackPlayer.pause();
            setPlaying(false);
            setStopped(false);
            deactivateKeepAwake();
        }
        if (event.type === Event.RemoteStop) {
            TrackPlayer.reset();
            setPlaying(false);
            setStopped(true);
            deactivateKeepAwake();
        }
        if (event.type === 'playback-queue-ended') {
            console.log(event.type)
            TrackPlayer.reset();
            console.log('after reset')
            setPlaying(false);
            console.log('after play false')
            setStopped(true);
            console.log('after step')
            updateProgress();
            console.log('after update')
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
                addTrack(track).then(async () => {
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
            await addTrack(track);
            await TrackPlayer.play();
            setPlaying(true);
            setStopped(false);
        }
    };

    const onStopPress = async () => {
        const state = await TrackPlayer.getState();
        if ((state === State.Playing) || (state === State.Paused)) {
            await TrackPlayer.reset();
            setPlaying(false);
            setStopped(true);
        }
    };

    return (
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
                <TrackSlider {...props}/>
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
        overflow: "hidden",
        paddingHorizontal: 5,
        height: s(50),
        borderBottomLeftRadius: s(9),
        borderBottomRightRadius: s(9),
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
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(AudioPlayer);