import React, { useEffect, useState } from 'react';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import {AppState, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {State, Event, useTrackPlayerEvents, Capability, RepeatMode} from 'react-native-track-player';
import IconButton from "@src/components/IconButton";
import { StyleSheet } from 'react-native';
import { scale } from '../Utils/scale';
import TrackSlider from "./TrackSlider";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const AudioPlayer = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const {
        playerMaxView,
        buttonsSection,
        progressBarSection,
        buttonsCol,
        playPauseButton,
        stopButton,
    } = styles;
    const { track, setMessageBarDisplay } = props;
    const notification = useSelector((state) => state.notifyReducer.notification);
    const [playing, setPlaying] = useState(false);
    const [stopped, setStopped] = useState(true)
    const dispatch = useDispatch();

    const updateProgress = async () => {
        try {
            const apiRequest = getApi(props.config);
            await apiRequest.customRequest(
                "wp-json/onenergy/v1/progress",
                "post",
                {"id":track.guide, "type":"Guide_End"},
                null,
                {},
                false
            ).then(response => {
                if(response.data.updated) {
                    dispatch({
                        type: "UPDATE_POINTS",
                        payload: response.data.qi
                    });
                    dispatch({
                        type: "UPDATE_USER_POINTS",
                        payload: response.data.qi
                    });
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'quest'
                    });
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'progress'
                    });
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'achievement'
                    });
                }
                if(response.data.achievements)
                {
                    dispatch({
                        type: 'UPDATE_USER_COMPLETED_ACHIEVEMENTS',
                        payload:response.data.achievements
                    });
                }
                setMessageBarDisplay(true);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(()=>{
        const appStateListener = AppState.addEventListener(
            'change',
            nextAppState => {
                if((nextAppState==='background')&&(!user.membership||!user.membership.length)){
                    TrackPlayer.pause();
                }
            },
        );
        return () => {
            appStateListener?.remove();
        };
    },[])
    useEffect(() => {
        addTrack(track).then(()=>{TrackPlayer.play();setPlaying(true);setStopped(false);});
    }, [track]);
    async function addTrack(track){
        await TrackPlayer.reset();
        return await TrackPlayer.add(track, -1);
    }
    useTrackPlayerEvents([Event.PlaybackState, Event.RemotePlay, Event.RemotePause, Event.RemoteStop, Event.PlaybackQueueEnded], (event) => {
        if (event.state === State.Playing) {
            setPlaying(true);
            setStopped(false);
            activateKeepAwake();
        }
        if (event.state === State.Paused) {
            setPlaying(false);
            setStopped(false);
            deactivateKeepAwake();
        }
        if ((event.state === State.Stopped) || (event.state === State.None)) {
            setPlaying(false);
            setStopped(true);
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
        if(event.type === 'playback-queue-ended') {
            TrackPlayer.reset();
            updateProgress().then();
            if(notification) {
                if (notification['practice']){
                    if(notification['practice'].length >= 1) {
                        dispatch({
                            type: 'NOTIFICATION_CLEAR',
                            payload: 'guide_personal'
                        });
                    }
                    dispatch({
                        type: 'NOTIFICATION_PRACTICE_REMOVE',
                        payload: track.guide,
                    });
                }
            }
        }
    });

    const onPlayPausePress = async () => {
        const state = await TrackPlayer.getState();
        if (state === State.Playing) {
            await TrackPlayer.pause();
        }
        if ((state === State.Paused)) {
            await TrackPlayer.play();
        }
        if ((state === State.Stopped) || (state === State.None)) {
            await addTrack(track);
            await TrackPlayer.play();
        }
    };

    const onStopPress = async () => {
        const state = await TrackPlayer.getState();
        if ((state === State.Playing) || (state === State.Paused)) {
            await TrackPlayer.reset();
        }
    };

    return (
        <View style={playerMaxView}>
            <View style={buttonsSection}>
                <View style={buttonsCol}>
                    <TouchableOpacity onPress={onPlayPausePress} style={playPauseButton} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                        <IconButton
                            icon={playing ? require("@src/assets/img/music-pause.png") : require("@src/assets/img/music-play.png")}
                            tintColor={"black"}
                            style={{
                                height: 24,
                                width: 24,
                            }}
                        />
                    </TouchableOpacity>
                    {!stopped?(
                    <TouchableOpacity onPress={onStopPress} style={stopButton} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                        <IconButton
                            icon={require("@src/assets/img/stop.png")}
                            tintColor={"black"}
                            style={{
                                height: 24,
                                width: 24,
                            }}
                        />
                    </TouchableOpacity>
                    ):null}
                </View>
            </View>
            <View style={progressBarSection}>
                <TrackSlider />
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
export default connect(mapStateToProps)(AudioPlayer);