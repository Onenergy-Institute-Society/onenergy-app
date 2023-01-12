import React, {useEffect, useState} from "react";
import {
    View, StyleSheet, TouchableOpacity, Image, Text
} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import ImageCache from "./ImageCache";
import {scale} from "../Utils/scale";

const VimeoBlock = props => {
    const {
        navigation, video, videoId, duration, thumbnail, textTracks, no_skip_forward, lesson_video, selectedCCUrl
    } = props;
    const videoComplete = useSelector((state) => state.videoReducer.videoComplete);
    const [visualGuide, setVisualGuide] = useState(false);
    useEffect(()=>{
        setTimeout(function () {
            setVisualGuide(true);
        }, 5000);
    },[])
    return (
        <View
            style={{flex: 1}}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "VimeoPlayer",
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
                <View style = {styles.overlay_button}><Image style={styles.play} source={require('../assets/images/arrow_right-1.png')} /></View>
                <Image
                    style={styles.BackGroundImage}
                    source={{uri: thumbnail}}
                    resizeMode={'cover'}
                />
                {duration?
                    <Text style={styles.duration}>{duration}</Text>
                :null}
                {!videoComplete&&visualGuide?
                    <ImageCache style={[styles.tapFinger,{alignSelf:"center", marginTop:scale(60)}]} source={require('../assets/images/tapFinger.gif')} />
                    :null
                }
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    overlay_button:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left:0,
        right:0,
        zIndex: 1,
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30)) * (9 / 16),
        opacity: 1,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tapFinger:{
        position: "absolute",
        width:scale(100),
        height:scale(120),
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    play:{
        opacity: 0.6,
        width: 32,
        height: 32
    },
    BackGroundImage: {
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30)) * (9 / 16),
        justifyContent: 'center',
        borderRadius: 9,
    },
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
    },
    duration: {
      position: "absolute",
      top: scale(10),
      left: scale(10),
      color: "white",
    },
    video: {
        position: 'relative',
        height: (windowWidth-scale(30)) * (9 / 16),
        width: windowWidth-scale(30),
        backgroundColor: 'black',
        justifyContent:"center",
        alignItems: "center"
    },
    fullscreenVideo: {
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        height: windowWidth,
        width: windowHeight,
        backgroundColor: 'black',
    },
    text: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: 'justify',
    },
    normalViewStyle: {
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 9,
    },
    fullscreenButtonImage:{
        width:32,
        height:32,
    },
    fullscreenButton: {
        position: 'absolute',
        top:10,
        left:10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
});
export default withNavigation(VimeoBlock);
