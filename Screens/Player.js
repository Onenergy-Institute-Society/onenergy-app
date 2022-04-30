import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import {StyleSheet, View, TouchableOpacity, Text, Platform} from 'react-native';
const tracks = [
    {
        "id": "1",
        "title": "Opening",
        "url": "https://media.onenergy.institute/audios/preparatory_practices/members/Opening_Track.mp3",
        "album": "Eyes and Vision",
        "artist": "Coach Delphine",
        "duration": "228",
        "artwork": "https://app.onenergy.institute/wp-content/uploads/2021/11/eyes-150x150.jpg"
    }];
const track2 =[
    {
        "id": "2",
        "title": "Qi Massage",
        "url": "https://media.onenergy.institute/audios/preparatory_practices/members/[Waist]Side_Bending_Waist_Start.mp3",
        "album": "Eyes and Vision",
        "artist": "Coach Delphine",
        "duration": "223",
        "artwork": "https://app.onenergy.institute/wp-content/uploads/2021/11/eyes-150x150.jpg"
    },
];

TrackPlayer.updateOptions({
    stopWithApp: true,
/*    capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    ],
    compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
    ],*/
});

const Player = () => {
    const add = async(track, index) =>{
        if(Platform.OS !== "ios") return await TrackPlayer.add(track, -1);
        if(typeof index === "number"){
            await TrackPlayer.add(track, index);
            return index;
        }
        await TrackPlayer.add(track);
    }
    const setUpTrackPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            add(tracks,null);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(async() => {
/*        setUpTrackPlayer();*/
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.reset();
            add(tracks, null);
        }catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => TrackPlayer.pause()}>
                    <Text style={styles.text}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.play()}>
                    <Text style={styles.text}>Play</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => TrackPlayer.skipToPrevious()}>
                    <Text style={styles.text}>Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => TrackPlayer.skipToNext()}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        TrackPlayer.reset();
                        TrackPlayer.add(track2, -1);
                    }}>
                    <Text style={styles.text}>Change</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    btn: {
        backgroundColor: '#ff0044',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: 160,
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
});

export default Player;