import React, { useEffect, useState } from 'react';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import { Text, TouchableOpacity, View, Platform} from 'react-native';
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';
import IconButton from "@src/components/IconButton";
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../Utils/scale';
import Video from 'react-native-video';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const AudioPlayerRoutine = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const {
        playerMaxView,
        buttonsSection,
        progressBarSection,
        buttonsCol,
        playPauseButton,
        stopButton,
    } = styles;
    const { routine, setMessageBarDisplay } = props;
    const [playing, setPlaying] = useState(false);
    const [stopped, setStopped] = useState(true)
    const [trackTitle, setTrackTitle] = useState('');
    const [nextTrack, setNextTrack] = useState(0);
    const dispatch = useDispatch();

    const updateProgress = async () => {
        try {
            const apiRequest = getApi(props.config);
            await apiRequest.customRequest(
                "wp-json/onenergy/v1/progress",
                "post",
                {"id":routine.id, "type":"Routine_End"},
                null,
                {},
                false
            ).then(response => {
                if(response.data.updated)
                {
                    dispatch({
                        type:"UPDATE_POINTS",
                        payload:response.data.qi
                    });
                    dispatch({
                        type:"UPDATE_USER_POINTS",
                        payload:response.data.qi
                    });
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'progress'
                    });
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'achievement'
                    });
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'quest'
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
    useEffect(() => {
        addTrack(routine.tracks).then(()=>{
            TrackPlayer.play().then();
            setPlaying(true);
            setStopped(false);
        });
    }, [routine]);
    async function addTrack(track){
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        return await TrackPlayer.add(track, -1);
    }
    useTrackPlayerEvents([Event.PlaybackState, Event.RemotePlay, Event.RemotePause], (event) => {
        if ((event.type === Event.PlaybackState) && ((event.state === State.Stopped) || (event.state === State.None))) {
            setPlaying(false);
            setStopped(true);
            setTrackTitle('');
            deactivateKeepAwake();
        }
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
            TrackPlayer.stop();
            setPlaying(false);
            setStopped(true);
            setTrackTitle('');
            deactivateKeepAwake();
        }
    });
    useTrackPlayerEvents([Event.PlaybackTrackChanged], ({nextTrack}) => {
        setNextTrack(nextTrack)
        if (nextTrack) setTrackTitle(routine.tracks[parseInt(nextTrack, 10)].title);
        let index = parseInt(nextTrack, 10);
        if (routine.tracks[index]) {
            setTrackTitle(routine.tracks[index].title);
        }
    });

    useTrackPlayerEvents([Event.PlaybackQueueEnded], (event) => {
        if(event.type === 'playback-queue-ended') {
            if (Platform.OS === 'ios') {
                if (nextTrack === routine.tracks.length - 1) {
                    TrackPlayer.stop();
                    TrackPlayer.reset();
                    setTrackTitle('');
                    TrackPlayer.removeUpcomingTracks();
                    updateProgress().then();
                }
            } else {
                TrackPlayer.stop();
                TrackPlayer.reset();
                setTrackTitle('');
                TrackPlayer.removeUpcomingTracks();
                updateProgress().then();
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
            await addTrack(routine.tracks);
            await TrackPlayer.play();
        }
    };

    const onStopPress = async () => {
        const state = await TrackPlayer.getState();
        if ((state === State.Playing) || (state === State.Paused)) {
            await TrackPlayer.stop();
            setNextTrack(0);
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
                <Text>{trackTitle}</Text>
                {!!routine.bgm?(
                    <Video
                        ref={videoPlayer => this.videoPlayer = videoPlayer}
                        audioOnly={true}
                        playInBackground={!!(user.membership && user.membership.length)}
                        playWhenInactive={true}
                        ignoreSilentSwitch={"ignore"}
                        repeat={true}
                        paused={!playing}
                        source={{uri: routine.bgm_url}}   // Can be a URL or a local file.
                    />
                ):null}
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
        height: verticalScale(50),
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