import React from 'react';
import {View, Text, StyleSheet, Image, useWindowDimensions,} from 'react-native';
import Video from "react-native-video";
import {windowWidth} from "../Utils/Dimensions";
import { scale, verticalScale } from '../Utils/scale';

const OnBoardingItem = ({item}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={[styles.container, {width}]}>
            <Image style={styles.image} source={{uri: item.image?item.image:''}} />
            {/*            <Video
                source={{uri: item.video?item.video:''}}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"contain"}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />*/}
            <View style={{flex:0.2, justifyContent:"flex-start", alignItems: "center"}}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundVideo: {
        flex:0.7,
        justifyContent: "flex-end",
        width: windowWidth,
        height: "auto",
        alignItems: "stretch",
    },
    image:{
        flex:0.8,
        justifyContent: "center",
        width: windowWidth,
        height: "100%",
        resizeMode: "contain",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    title: {
        fontWeight: '800',
        fontSize: scale(24),
        marginTop:0,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
})
export default OnBoardingItem;