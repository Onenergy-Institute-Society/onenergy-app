import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View,} from 'react-native';
import {windowWidth} from "../Utils/Dimensions";
import {scale} from '../Utils/scale';

const OnBoardingItem = ({item}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={[styles.container, {width}]}>
            <Image style={styles.image} source={{uri: item.image ? item.image : ''}}/>
            <View style={{flex: 0.2, justifyContent: "flex-start", alignItems: "center"}}>
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
        flex: 0.7,
        justifyContent: "flex-end",
        width: windowWidth,
        height: "auto",
        alignItems: "stretch",
    },
    image: {
        flex: 0.8,
        justifyContent: "center",
        width: windowWidth,
        height: "100%",
        resizeMode: "contain",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    title: {
        fontWeight: '800',
        fontSize: scale(24),
        marginTop: 0,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
})
export default OnBoardingItem;