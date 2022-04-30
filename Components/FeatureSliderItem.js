import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View, ImageBackground, Platform} from 'react-native';
import Video from "react-native-video";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import LinearGradient from 'react-native-linear-gradient';
export default (FeatureSliderItem = ({
                                 item,
                                 style,
                                 onPress,
                                 index,
                                 imageKey,
                                 local,
                                 height
                             }) => {
    return (
        <View style={styles.innerContainer}>
            <ImageBackground style={styles.innerContainer}
                             source={{uri: 'https://app.onenergy.institute/wp-content/uploads/2021/11/4-scaled.jpg'}}
            >
{/*                <LinearGradient colors={['#ffffff', '#3b5998', '#192f6a']} style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                    opacity: 0.5
                }} />*/}
            {item.video?(
            <View style={{width:windowWidth, height:windowHeight/2, justifyContent: 'center'}}>
                <Video
                    source={{uri: item.video?item.video:''}}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"contain"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                />
            </View>
            ):null}
            <View style={{width:windowWidth, height:100, justifyContent: 'flex-start'}}>
                <Text style={styles.title}>{item.title?item.title:''}</Text>
            </View>
            {item.next?(
            <View style={{width:windowWidth, height:windowHeight/2-100, justifyContent: 'flex-start', flexDirection: 'column', alignItems:'center'}}>
                <TouchableOpacity
                    onPress={() => onPress(index)}>
                    <Image
                        source={{uri: item.next?item.next:''}}
                        style={styles.imageNext}
                    />
                </TouchableOpacity>
            </View>
            ):null}
            <View>

            </View>
            </ImageBackground>
        </View>
    );
});

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        alignItems: "center",
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    backgroundVideo: {
        width: windowWidth,
        height: windowWidth,
        alignItems: "stretch",
    },
    imageNext: {
        width: 150,
        height: 75,
        overflow: 'hidden',
        tintColor: '#888888'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
});
