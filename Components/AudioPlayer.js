import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';
import IconButton from "@src/components/IconButton";
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../Utils/scale';
import TrackSlider from "./TrackSlider";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const AudioPlayer = ({ track }) => {
    const {
        playerMaxView,
        buttonsSection,
        progressBarSection,
        buttonsCol,
        playPauseButton,
        stopButton,
    } = styles;

    const [playing, setPlaying] = useState(false);
    const [stopped, setStopped] = useState(true)
    const [trackTitle, setTrackTitle] = useState('');

    useEffect(() => {
        addTrack(track).then(()=>{TrackPlayer.play();setPlaying(true);setStopped(false);});
    }, [track]);
    async function addTrack(track){
        await TrackPlayer.stop();
        await TrackPlayer.reset();
        await TrackPlayer.removeUpcomingTracks();
        return await TrackPlayer.add(track, -1);
    }
    useTrackPlayerEvents([Event.PlaybackState], (event) => {
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
    });

    useTrackPlayerEvents([Event.PlaybackTrackChanged], ({nextTrack}) => {
        if (nextTrack) setTrackTitle(track[parseInt(nextTrack, 10)].title);
        let index = parseInt(nextTrack, 10);
        if (track[index]) {
            setTrackTitle(track[index].title);
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
            TrackPlayer.stop();
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
                    {playing || !stopped?(
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

export default AudioPlayer;