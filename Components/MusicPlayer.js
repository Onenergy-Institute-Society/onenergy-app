// MusicPlayer.js
// noinspection JSIgnoredPromiseFromCall

import React, {useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    Animated,
    Alert,
} from 'react-native';
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    useProgress,
    usePlaybackState,
    useTrackPlayerEvents,
} from 'react-native-track-player';

//TrackPlayer.registerPlaybackService(() => require('../model/TrackPlayerService'));
import { Slider } from 'react-native-slider'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import tracks from './tracks';
const {width, height} = Dimensions.get('window');
const setUpTrackPlayer = async () => {
    // try {
        await TrackPlayer.setupPlayer();
 /*       await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            compactCapabilities: [Capability.Play, Capability.Pause],
        });
        await TrackPlayer.add(songs);
        TrackPlayer.addEventListener('remote-play', () => {
            TrackPlayer.play();
        });
        TrackPlayer.addEventListener('remote-pause', () => {
            TrackPlayer.pause();
        });
    } catch (e) {
        Alert.alert('Alert Title', 'No Music Files', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }
*/};
const togglePlayback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
        if (playbackState === State.Paused) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
};
const MusicPlayer = () => {
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [trackArtwork, setTrackArtwork] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackTitle, setTrackTitle] = useState();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);
    const [repeatMode, setRepeatMode] = useState('off');
    const songSlider = useRef(null);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title, artwork, artist} = track;
            setTrackTitle(title);
            setTrackArtwork(artwork);
            setTrackArtist(artist);
        }
    });
    const repeatIcon = () => {
        if (repeatMode === 'off') {
            return 'repeat-off';
        }
        if (repeatMode === 'track') {
            return 'repeat-once';
        }
        if (repeatMode === 'repeat') {
            return 'repeat';
        }
    };
    const changeRepeatMode = () => {
        if (repeatMode === 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode('track');
        }
        if (repeatMode === 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode('repeat');
        }
        if (repeatMode === 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode('off');
        }
    };

    const skipTo = async trackId => {
        await TrackPlayer.skip(trackId);
    };
    useEffect(() => {
        setUpTrackPlayer();
        scrollX.addListener(({value}) => {
            const index = Math.round(value / width);
            skipTo(index);
            setSongIndex(index);
        });
        return () => {
            scrollX.removeAllListeners();
            TrackPlayer.destroy();
        };
    }, [scrollX]);

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    };
    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    };
    const renderSongs = ({index, item}) => {
        return (
            <Animated.View
                style={{
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.artworkWrapper}>
                    <Image source={trackArtwork} style={styles.artworkImg} />
                </View>
            </Animated.View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={{width: width}}>
                    <Animated.FlatList
                        ref={songSlider}
                        data={tracks}
                        renderItem={renderSongs}
                        keyExtractor={item => item.id}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {x: scrollX},
                                    },
                                },
                            ],
                            {useNativeDriver: true},
                        )}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{trackTitle}</Text>
                    <Text style={styles.artist}>{trackArtist}</Text>
                </View>
                <View>
                    <Slider
                        style={styles.progressContainer}
                        value={progress.position}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        thumbTintColor={'#FFD369'}
                        minimumTrackTintColor={'#FFD369'}
                        maximumTrackTintColor={'#FFF'}
                        onSlidingComplete={async value => {
                            await TrackPlayer.seekTo(value);
                        }}
                    />
                    <View style={styles.progressLabelContainer}>
                        <Text style={styles.ProgressLabelTxt}>
                            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                        </Text>
                        <Text style={styles.ProgressLabelTxt}>
                            {new Date((progress.duration - progress.position) * 1000)
                                .toISOString()
                                .substr(14, 5)}
                        </Text>
                    </View>
                </View>

                <View style={styles.musicControls}>
                    <TouchableOpacity onPress={skipToPrevious}>
                        <Ionicons
                            name={'play-skip-back-outline'}
                            size={35}
                            color={'#FFD369'}
                            style={{marginTop: 25}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                        <Ionicons
                            name={
                                playbackState === State.Playing
                                    ? 'ios-pause-circle'
                                    : 'ios-play-circle'
                            }
                            size={75}
                            color={'#FFD369'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipToNext}>
                        <Ionicons
                            name={'play-skip-forward-outline'}
                            size={35}
                            color={'#FFD369'}
                            style={{marginTop: 25}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomControls}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({visibleModal: false});
                        }}>
                        <Ionicons
                            name={'chevron-back-circle-outline'}
                            size={30}
                            color={'#777777'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeRepeatMode}>
                        <MaterialCommunityIcons
                            name={repeatIcon()}
                            size={30}
                            color={repeatMode !== 'off' ? '#FFD369' : '#777777'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Ionicons name={'share'} size={30} color={'#777777'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Ionicons
                            name={'ellipsis-horizontal'}
                            size={30}
                            color={'#777777'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default MusicPlayer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    artworkWrapper: {
        width: 300,
        height: 340,
        marginBottom: 15,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5,
    },
    artworkImg: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE',
    },
    artist: {
        fontSize: 16,
        fontWeight: '200',
        textAlign: 'center',
        color: '#EEEEEE',
    },
    progressContainer: {
        width: 350,
        height: 40,
        marginTop: 15,
        flexDirection: 'row',
    },
    progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ProgressLabelTxt: {
        color: '#fff',
    },
    musicControls: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    bottomContainer: {
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 25,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
});
