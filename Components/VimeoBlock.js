import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from "./ImageCache";
import {ms, mvs, s, windowHeight, windowWidth} from "../Utils/Scale";

const VimeoBlock = props => {
    const {
        navigation, video, videoId, duration, thumbnail, textTracks, no_skip_forward, lesson_video, selectedCCUrl
    } = props;
    return (
        <View
            style={{flex: 1}}>
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
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
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
export default withNavigation(VimeoBlock);
