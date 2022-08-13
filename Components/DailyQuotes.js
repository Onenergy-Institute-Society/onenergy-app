import React from 'react';
import {Platform, StyleSheet, Text, ImageBackground} from 'react-native';
import {windowWidth} from "../Utils/Dimensions";
import {NavigationActions, withNavigation} from "react-navigation";
import { scale } from '../Utils/scale';
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
                            routeName: "QuotesScreen",
                        })
                    )
                } catch (err) {
                    console.log(`${err}`);
                }
            }}>
            <ImageBackground source={require('../assets/images/design-6.png')} style={[styles.imageView, styles.boxShadow]}
                             imageStyle={{
                                resizeMode: "contain",
                                alignSelf: "flex-start"
                            }}>
                <Text style={styles.title}>{excerpt}</Text>
            </ImageBackground>
        </TouchableScale>
    )
}
const styles = StyleSheet.create({
    image: {
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))/3.25,
        borderRadius: 9,
        overflow: 'hidden',
    },
    imageView: {
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))/3.25,
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