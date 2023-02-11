import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppState, StyleSheet, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {Event, State, useTrackPlayerEvents} from 'react-native-track-player';
import {s} from '../Utils/Scale';
import TrackSlider from "./TrackSlider";
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import * as Analytics from "../Utils/Analytics";
import {SvgPauseCircleIcon, SvgPlayCircleIcon, SvgStopCircleIcon,} from "../Utils/svg";

const AudioPlayer = (props) => {
    const {screenProps, user} = props;
    const {colors} = screenProps;
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
                    data: track
                }
            });
            Analytics.segmentClient.track('End Guided Practice', {
                id: track.id,
                title: track.title
            }).then();
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
        await TrackPlayer.getState();
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
            TrackPlayer.reset();
            setPlaying(false);
            setStopped(true);
            updateProgress();
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
        await TrackPlayer.reset();
        setPlaying(false);
        setStopped(true);
    };

    const {textColor, secondaryButtonBg} = colors;
    return (
        <View style={[styles.playerMaxView, {backgroundColor: secondaryButtonBg}]}>
            <View style={styles.buttonsSection}>
                <View style={styles.buttonsCol}>
                    <TouchableOpacity onPress={onPlayPausePress} style={styles.playPauseButton}
                                      hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                        {playing ? <SvgPauseCircleIcon color={textColor}/>:<SvgPlayCircleIcon color={textColor}/>}
                    </TouchableOpacity>
                    {!stopped ? (
                        <TouchableOpacity onPress={onStopPress} style={styles.stopButton}
                                          hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                            <SvgStopCircleIcon color={textColor}/>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
            <View style={styles.progressBarSection}>
                <TrackSlider user={user} {...props}/>
            </View>
        </View>
    );
};

const flexStyles = {
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