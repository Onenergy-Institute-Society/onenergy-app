import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import {ms, mvs, s, windowHeight, windowWidth} from "../Utils/Scale";

const VideoBlock = props => {
    const {block, navigation} = props;
    const language = useSelector((state) => state.settingReducer.languages);
    const no_skip_forward = block.data.no_skip_forward;
    const lesson_video = block.data.lesson_video;
    const duration = block.data.duration;
    const videoId = block.data.video_name;
    const video = block.result.video_url;
    const thumbnail = block.result.thumbnail;
    const subtitles = block.result.subtitles;
    const [textTracks, setTextTracks] = useState({title: "No Subtitle", language: "", uri: "", type: ""});
    const [selectedCCUrl, setSelectedCCUrl] = useState('');

    useEffect(() => {
        setTextTracks(subtitles.map((item) => {
            if (item.lang === language.subtitle) {
                setSelectedCCUrl(item.url);
            }
            return {
                title: item.language,
                language: item.lang,
                uri: item.url,
                type: item.type
            }
        }));
        setTextTracks((previousState) => [
            ...previousState,
            {title: "No Subtitle", language: "", uri: "", type: ""}
        ]);
    }, [language.subtitle])
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "LocalVideoPlayer",
                            params: {
                                videoId: videoId,
                                video: video,
                                textTracks: textTracks,
                                no_skip_forward: no_skip_forward,
                                lesson_video: lesson_video,
                                selectedCCUrl: selectedCCUrl
                            }
                        })
                    )
                }}>
                <View style={styles.overlay_button}><Image style={styles.play}
                                                           source={require('../assets/images/arrow_right-1.png')}/></View>
                <Image
                    style={styles.BackGroundImage}
                    source={{uri: thumbnail}}
                    resizeMode={'cover'}
                />
                {duration ?
                    <Text style={styles.duration}>{duration}</Text>
                    : null}
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) * 9 / 16,
        alignSelf: "center",
        backgroundColor: '#ebebeb',
    },
    overlay_button: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) * (9 / 16),
        opacity: 1,
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'center',
    },
    tapFinger: {
        position: "absolute",
        width: s(100),
        height: s(120),
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    play: {
        opacity: 0.6,
        width: 32,
        height: 32
    },
    BackGroundImage: {
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) * (9 / 16),
        justifyContent: 'center',
        borderRadius:s(9),
    },
    duration: {
        position: "absolute",
        top: s(10),
        left: s(10),
        color: "white",
    },
    video: {
        position: 'relative',
        height: (windowWidth - s(30)) * (9 / 16),
        width: windowWidth - s(30),
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center"
    },
    fullscreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: windowWidth,
        width: windowHeight,
        backgroundColor: 'black',
    },
    text: {
        marginTop: mvs(30),
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: 'justify',
    },
    normalViewStyle: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius:s(9),
    },
    fullscreenButtonImage: {
        width: 32,
        height: 32,
    },
    fullscreenButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: ms(10),
    },
});
export default withNavigation(VideoBlock);
