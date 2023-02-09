import React, {useState} from 'react';
import {
    Image,
    ImageBackground,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    UIManager,
    View
} from 'react-native';
import {useSelector} from "react-redux";
import {ms, mvs, s, vs, windowWidth} from '../Utils/Scale';
import AudioPlayer from './AudioPlayer';
import NotificationTabBarIcon from "./NotificationTabBarIcon";
import AuthWrapper from "@src/components/AuthWrapper";
import * as Analytics from "../Utils/Analytics";
import TouchableScale from "./TouchableScale";
import {SvgClock} from "../Utils/svg";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TracksList = (props) => {
    const {setMessageBarDisplay, screenProps} = props;
    const {colors, global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const guideReducer = useSelector((state) => state.onenergyAppReducer?state.onenergyAppReducer.practiceReducer.guides:null);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const onTrackItemPress = async (track) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.spring
        );
        if (!selectedTrack || parseInt(track.id) !== parseInt(selectedTrack.id)) {
            setSelectedTrack(track);
            Analytics.segmentClient.track('Start Guided Practice', {
                id: track.id,
                title: track.title
            }).then();
        }
    };

    const renderItem = ({item, index}) => {
        let highlightColor;
        let highlightColorStyle;
        let showPlayer;
        if (selectedTrack && selectedTrack.id === item.id) {
            highlightColor="white";
            highlightColorStyle = {color: "white"};
            showPlayer = true;
        } else {
            highlightColor=colors.primaryColor;
            highlightColorStyle = {color: colors.textColor};
            showPlayer = false;
        }
        return (
            item.show&&item.url ?
                <View style={[styles.trackItem, styles.boxShadow, {
                    backgroundColor: colors.bodyBg,
                    height: showPlayer ? s(120) : s(80)
                    }]}
                    key={'practice-' + item.id}
                >
                    <TouchableScale
                        activeOpacity={1}
                        onPress={() => {
                            onTrackItemPress(item).then();
                        }}
                    >
                        <ImageBackground style={styles.itemStyle}
                                         resizeMode={"cover"}
                                         imageStyle={{borderTopLeftRadius: s(9), borderTopRightRadius: s(9), borderBottomLeftRadius: showPlayer?0:s(9), borderBottomRightRadius: showPlayer?0:s(9)}}
                                         source={selectedTrack && selectedTrack.id === item.id ? require('../assets/images/1-1024x683.jpg') : require('../assets/images/7-1024x683.jpg')}>
                            <View style={styles.trackImgBox}>
                                <ImageBackground style={styles.trackImg} imageStyle={{borderRadius: s(9)}}
                                                 source={{uri: item.artwork}}>
                                    <View style={styles.overlay_button}><Image style={styles.play}
                                                                               source={require('../assets/images/audio-play.png')}/></View>
                                </ImageBackground>
                            </View>
                            <View style={styles.trackDescBox}>
                                <View style={styles.titleBox}>
                                    <Text style={[global.itemTitle, highlightColorStyle, {fontSize: s(18.7)}]}>{item.title}</Text>
                                    {item.new ? (
                                        <View style={{
                                            height: 12,
                                            width: 12,
                                            borderRadius: 6,
                                            backgroundColor: 'red',
                                        }}/>
                                    ) : null}
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center", marginBottom:vs(5)}}>
                                    <SvgClock color={highlightColor} size={s(14)} style={{marginRight:s(5)}}/>
                                    <Text style={highlightColorStyle}>{new Date(item.duration * 1000).toISOString().substring(14, 16)}'{new Date(item.duration * 1000).toISOString().substring(17, 19)}"</Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'practice'} top={3} right={3} size={15}
                                                    fontSize={10} showNumber={false} data={item.id}/>
                        </AuthWrapper>
                    </TouchableScale>
                    {showPlayer ? (
                        <AudioPlayer user={user} track={selectedTrack} setMessageBarDisplay={setMessageBarDisplay} {...props}/>
                    ) : null}
                </View>
                : null
        );
    };
    const renderSectionHeader = (section) => {
        return (
            section.section.data.find((item) => item.show) ?
                <Text style={[global.screenTitle, {
                    fontSize: s(20),
                    marginTop: mvs(20),
                    textAlign: "center"
                }]}>{section.section.title.toUpperCase()}</Text>
                : null
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                guideReducer.sort((a,b)=>b.slug.localeCompare(a.slug)).map(level=> {
                    if(user.rank >= level.rank && level.sections.length) {
                        let sections = level.sections.filter(section => {
                            let showGuide = section.data.filter(guide => guide.show);
                            if(showGuide && showGuide.length)
                            return {
                                id: section.id,
                                rank: section.rank,
                                title: section.title,
                                data: showGuide
                            }
                        })
                        return (
                            <SectionList
                                stickySectionHeadersEnabled={false}
                                style={styles.trackList}
                                sections={sections}
                                renderItem={renderItem}
                                renderSectionHeader={renderSectionHeader}
                                keyExtractor={(item, index) => `${item.title}-${index}`}
                            />)
                    }
                })
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: mvs(25),
    },
    trackList: {
        paddingTop: mvs(5),
    },
    trackItem: {
        borderRadius:s(9),
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: s(15),
        marginTop: mvs(10),
        marginBottom: mvs(5),
        justifyContent: "flex-start",
    },
    trackItemInner: {
        borderRadius:s(9),
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - s(30),
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
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'center',
    },
    play: {
        opacity: 0.6,
        width: s(32),
        height: vs(32),
        tintColor: "white"
    },
    playPauseIcon: {
        color: '#000',
    },
    itemStyle: {
        width: windowWidth - s(30),
        paddingHorizontal: ms(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: s(80),
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
        paddingLeft: ms(10),
        marginLeft: s(10),
        borderRadius:s(9),
        display: 'flex',
    },
    trackImg: {
        width: s(70),
        height: s(70),
        marginLeft: s(10),
        borderRadius:s(9),
    },
    titleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'flex-start',
        marginTop: mvs(5),
    },
    album: {
        fontSize: s(15),
        fontWeight: 'normal',
    },
    title: {
        fontSize: s(16),
        fontWeight: 'bold',
    },
    subTitle: {
        position: "absolute",
        bottom: s(5),
        left: s(15),
        fontSize: s(12),
    },
    duration: {
        position: "absolute",
        bottom: s(5),
        right: s(15),
        fontSize: s(12),
    },
    listBox: {
        height: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: mvs(10),
    },
    playerBox: {
        position: 'absolute',
        zIndex: 10,
        height: s(200),
        width: '100%',
    },
});
export default TracksList;