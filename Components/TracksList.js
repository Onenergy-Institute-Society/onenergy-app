import React, {useState} from 'react';
import {
    SafeAreaView,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, SectionList
} from 'react-native';
import {useSelector} from "react-redux";
import {scale} from '../Utils/scale';
import AudioPlayer from './AudioPlayer';
import {windowWidth} from "../Utils/Dimensions";
import NotificationTabBarIcon from "./NotificationTabBarIcon";
import AuthWrapper from "@src/components/AuthWrapper";

const TracksList = (props) => {
    const {tracks, setMessageBarDisplay, screenProps} = props;
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const {colors, global} = screenProps;
    const [selectedTrack, setSelectedTrack] = useState(null);

    const onTrackItemPress = async (track) => {
        if (!selectedTrack || track.id !== selectedTrack.id) {
            setSelectedTrack(track);
        }
    };

    const renderItem = ({item}) => {
        let highlightColor;
        let showPlayer;
        if (selectedTrack && selectedTrack.id === item.id) {
            highlightColor = {color: "white"};
            showPlayer = true;
        } else {
            highlightColor = {color: colors.textColor};
            showPlayer = false;
        }
        let practiceCount = 0;
        let guideStatsIndex = progressReducer.guideStats.findIndex(guide => guide.guide_id === item.id);
        if (guideStatsIndex >= 0) {
            practiceCount = progressReducer.guideStats[guideStatsIndex].guide_count;
        }
        return (
            item.show ?
                <View style={[styles.trackItem, styles.boxShadow, {
                    backgroundColor: colors.bodyBg,
                    height: showPlayer ? scale(120) : scale(80)
                }]}
                      key={'practice-' + item.id}>
                    <TouchableOpacity
                        onPress={() => {
                            onTrackItemPress(item).then();
                        }}
                    >
                        <ImageBackground style={[styles.trackItemInner, styles.itemStyle]}
                                         source={selectedTrack && selectedTrack.id === item.id ? require('../assets/images/1-1024x683.jpg') : require('../assets/images/7-1024x683.jpg')}>
                            <View style={styles.trackImgBox}>
                                <ImageBackground style={styles.trackImg} imageStyle={{borderRadius: 9}}
                                                 source={{uri: item.artwork}}>
                                    <View style={styles.overlay_button}><Image style={styles.play}
                                                                               source={require('../assets/images/audio-play.png')}/></View>
                                </ImageBackground>
                            </View>
                            <View style={styles.trackDescBox}>
                                <View style={styles.titleBox}>
                                    <Text style={[global.itemTitle, highlightColor]}>{item.title}</Text>
                                    {item.new ? (
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            borderRadius: 6,
                                            backgroundColor: 'red',
                                        }}/>
                                    ) : null}
                                </View>
                                <View style={styles.subTitleBox}>
                                    {practiceCount?
                                    <Text style={[global.itemText, highlightColor]}>{practiceCount} times</Text>
                                        :null}
                                    <Text style={[styles.duration, highlightColor]}>{new Date(item.duration * 1000).toISOString().substring(14, 19)}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'practice'} top={3} right={3} size={scale(15)}
                                                    fontSize={10} showNumber={false} data={item.id}/>
                        </AuthWrapper>
                    </TouchableOpacity>
                    {showPlayer ? (
                        <AudioPlayer track={selectedTrack} setMessageBarDisplay={setMessageBarDisplay} {...props}/>
                    ) : null}
                </View>
                : null
        );
    };
    const renderSectionHeader = (section) => {
        return (
            section.section.data.find((item) => item.show) ?
                <Text style={[global.screenTitle, {
                    marginTop: scale(20),
                    textAlign: "center"
                }]}>{section.section.title.toUpperCase()}</Text>
                : null
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {tracks ?
                <SectionList
                    stickySectionHeadersEnabled={false}
                    contentContainerStyle={{paddingBottom: scale(20)}}
                    style={styles.trackList}
                    sections={tracks}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    keyExtractor={(item, index) => `${item.title}-${index}`}
                />
                : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    trackList: {
        paddingTop: scale(5),
    },
    trackItem: {
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
    overlay_button: {
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
    play: {
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
        width: scale(70),
        height: scale(70),
        marginLeft: scale(10),
        borderRadius: 9,
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
        alignItems: "center",
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
export default TracksList;