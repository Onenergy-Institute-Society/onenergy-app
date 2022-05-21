import React, {PureComponent} from 'react';
import {Animated, Dimensions, Image, Platform, StyleSheet, Text, ImageBackground, View} from 'react-native';
import PropTypes from "prop-types";
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from "./ImageCache";
import { scale, verticalScale } from '../Utils/scale';
import TouchableScale from './TouchableScale';

const DailyQuotes = (props) => {
    const { navigation } = props;
    const {item} = props;
    const regex_tag = /(<([^>]+)>)/ig;
    const regex_newline = /\r?\n|\r/g;
    const excerpt = item.excerpt.rendered.replace(regex_tag,'').replace(regex_newline,'');
    return (
        <TouchableScale
            key={item.id + 'img'}
            onPress={() =>  {
                try {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "quotes",
                        })
                    )
                } catch (err) {
                    console.log(`${err}`);
                }
            }}>
            <ImageBackground source={{uri: 'https://app.onenergy.institute/wp-content/uploads/2022/01/design-6.png'}} style={[styles.imageView, styles.boxShadow]}>
                <Text style={styles.title}>{excerpt}</Text>
            </ImageBackground>
        </TouchableScale>
    )
}
const styles = StyleSheet.create({
    image: {
        width: windowWidth-scale(30),
        height: (windowWidth-30)/3.75,
        borderRadius: 9,
        overflow: 'hidden',
    },
    imageView: {
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))/3.75,
        borderRadius: 9,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: scale(14),
        paddingLeft:40,
        paddingRight:40,
        textAlign: 'center',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
export default withNavigation(DailyQuotes);