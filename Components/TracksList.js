import React, {useState} from 'react';
import {
    SafeAreaView,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';
import {scale} from '../Utils/scale';
import AudioPlayer from './AudioPlayer';
import {windowWidth} from "../Utils/Dimensions";
import NotificationTabBarIcon from "./NotificationTabBarIcon";

const TracksList = (props) => {
    const {tracks, setMessageBarDisplay} = props;
    const [selectedTrack, setSelectedTrack] = useState(null);

    const onTrackItemPress = async (track) => {
        if(!selectedTrack || track.id !== selectedTrack.id) {
            setSelectedTrack(track);
        }else{
            const state = await TrackPlayer.getState();
            if (state === State.Playing) {
                await TrackPlayer.pause();
            }

            if (state === State.Paused) {
                await TrackPlayer.play();
            }
        }
    };
    const bgImage1 = require('../assets/images/1-1024x683.jpg');
    const bgImage7 = require('../assets/images/7-1024x683.jpg');
    const renderItem = ({ item }) => {
        let bgImage = '';
        let highlightColor = {};
        let showPlayer = false;
        if (selectedTrack && selectedTrack.id === item.id) {
            bgImage = bgImage1;
            highlightColor = {color: "white"};
            showPlayer = true;
        }else{
            bgImage = bgImage7;
            highlightColor = {color: "black"};
            showPlayer = false;
        }
        return (
            <View style={[styles.trackItem, styles.boxShadow, { height: showPlayer?scale(120):scale(80)}]} key={'practice-'+item.index}>
                <TouchableOpacity
                    onPress={() => {
                        onTrackItemPress(item).then();
                    }}
                >
                    <ImageBackground style={[styles.trackItemInner, styles.itemStyle]} source={selectedTrack && selectedTrack.id === item.id?require('../assets/images/1-1024x683.jpg'):require('../assets/images/7-1024x683.jpg')}>
                        <View style={styles.trackImgBox}>
                            <ImageBackground style={styles.trackImg} imageStyle={{ borderRadius: 9}} source={{ uri: item.artwork }}>
                                <View style = {styles.overlay_button}><Image style = {styles.play} source = {require('../assets/images/audio-play.png')} /></View>
                            </ImageBackground>
                        </View>
                        <View style={styles.trackDescBox}>
                            <View style={styles.titleBox}>
                                <Text style={[styles.title, highlightColor]}>{item.title}</Text>
                                {item.new?(
                                    <View style={{
                                        height: 12,
                                        width: 12,
                                        borderRadius: 6,
                                        backgroundColor: 'red',
                                    }}/>
                                ):null}
                            </View>
                            <View style={styles.subTitleBox}>
                                <Text style={[styles.subTitle, highlightColor]}>{item.album || 'Unknown'}</Text><Text style={[styles.duration, highlightColor]}>{new Date(item.duration * 1000).toISOString().substr(14, 5)}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <NotificationTabBarIcon notificationID={'practice'} top={3} right={3} size={scale(15)} fontSize={10} showNumber={false} data={item.guide} />
                </TouchableOpacity>
                {showPlayer? (
                    <AudioPlayer track={selectedTrack} setMessageBarDisplay={setMessageBarDisplay} />
                ):null}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.trackList}
                data={tracks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
    },
    trackList:{
      paddingTop:scale(5),
    },
    trackItem: {
        backgroundColor: "white",
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        marginHorizontal: scale(15),
        marginTop: scale(10),
        marginBottom: scale(5),
        justifyContent: "flex-start",
    },
    trackItemInner: {
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        overflow: "hidden",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    overlay_button:{
        flex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        opacity: 1,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    play:{
        opacity: 0.6,
        width: 32,
        height: 32,
        tintColor: "white"
    },
    playPauseIcon: {
        color: '#000',
    },
    itemStyle: {
        paddingHorizontal: scale(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: scale(80),
        borderBottomColor: '#333',
        borderWidth: 0,
    },
    trackImgBox: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    trackDescBox: {
        flex: 4,
        paddingLeft: scale(10),
        marginLeft: scale(10),
        borderRadius: 9,
        display: 'flex',
    },
    trackImg: {
        width:scale(70),
        height:scale(70),
        marginLeft: scale(10),
        borderRadius:9,
    },
    titleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'flex-start',
        marginTop: scale(5),
    },
    subTitleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems:"center",
    },
    album: {
        fontSize: scale(15),
        fontWeight: 'normal',
    },
    title: {
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: scale(15),
    },
    duration: {
        fontSize: scale(12),
    },
    listBox: {
        height: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: scale(10),
    },
    playerBox: {
        position: 'absolute',
        zIndex: 10,
        height: scale(200),
        width: '100%',
    },
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
    notification: state.notification,
});
export default connect(mapStateToProps)(TracksList);