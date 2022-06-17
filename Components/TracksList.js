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
import {scale, verticalScale} from '../Utils/scale';
import AudioPlayer from './AudioPlayer';
import {windowWidth} from "../Utils/Dimensions";
const TracksList = (props) => {
    const {tracks} = props;
    const user = useSelector((state) => state.user.userObject);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const dispatch = useDispatch();

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
    const updateProgress = async () => {
        try {
            const apiRequest = getApi(props.config);
            await apiRequest.customRequest(
                "wp-json/onenergy/v1/progress",
                "post",
                {"id":selectedTrack.guide, "type":"Guide_End"},
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
                MessageBarManager.showAlert({
                    title: 'Your alert title goes here',
                    message: 'Your alert message goes here',
                    alertType: 'success',
                    // See Properties section for full customization
                    // Or check `index.ios.js` or `index.android.js` for a complete example
                });
            });
        } catch (e) {
            console.error(e);
        }
    }
    useTrackPlayerEvents([Event.PlaybackQueueEnded], (event) => {
        updateProgress().then();
    });
    const renderItem = ({ item }) => {
        let bgImage = '';
        let highlightColor = {};
        let showPlayer = false;
        if (selectedTrack && selectedTrack.id === item.id) {
            bgImage = "https://app.onenergy.institute/wp-content/uploads/2021/11/1-scaled.jpg";
            highlightColor = {color: "white"};
            showPlayer = true;
        }else{
            bgImage = "https://app.onenergy.institute/wp-content/uploads/2021/11/7-scaled.jpg";
            highlightColor = {color: "black"};
            showPlayer = false;
        }
        return (
            <View style={[styles.trackItem, styles.boxShadow, { height: showPlayer?verticalScale(120):verticalScale(80)}]} key={'practice-'+item.index}>
                <TouchableOpacity
                    onPress={() => {
                        onTrackItemPress(item).then();
                    }}
                >
                    <ImageBackground style={[styles.trackItemInner, styles.itemStyle]} source={{uri: bgImage}}>
                        <View style={styles.trackImgBox}>
                            <Image style={styles.trackImg} source={{ uri: item.artwork }} />
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
                </TouchableOpacity>
                {showPlayer? (
                    <AudioPlayer track={selectedTrack} />
                ):null}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={tracks} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
    },
    trackItem: {
        backgroundColor: "white",
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        marginHorizontal: scale(15),
        marginBottom: verticalScale(15),
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
        position: 'absolute',
        top:0,
        left:0,
        width: scale(70),
        opacity: 1,
        height: verticalScale(70),
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: verticalScale(80),
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
        height:verticalScale(70),
        marginLeft: scale(10),
        borderRadius:9,
    },
    titleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'flex-start',
        marginTop: verticalScale(5),
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
        paddingTop: verticalScale(10),
    },
    playerBox: {
        position: 'absolute',
        zIndex: 10,
        height: verticalScale(200),
        width: '100%',
    },
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(TracksList);