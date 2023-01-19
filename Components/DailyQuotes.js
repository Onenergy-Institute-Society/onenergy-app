import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {windowWidth} from "../Utils/Dimensions";
import {NavigationActions, withNavigation} from "react-navigation";
import {scale} from '../Utils/scale';
import TouchableScale from './TouchableScale';

const DailyQuotes = (props) => {
    const {navigation, screenProps, quote} = props;
    const {colors, global} = screenProps;
    const regex_tag = /(<([^>]+)>)/ig;
    const regex_newline = /\r?\n|\r/g;
    const quote_rendered = quote.replace(regex_tag, '').replace(regex_newline, '');
    return (
        <TouchableScale
            onPress={() => {
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
            <ImageBackground source={require('../assets/images/design-6.png')}
                             style={[styles.imageView, styles.boxShadow, {backgroundColor: colors.bodyBg}]}
                             imageStyle={{
                                 resizeMode: "contain",
                                 alignSelf: "flex-start",
                                 tintColor: colors.primaryButtonBg
                             }}>
                <Text style={[global.text, styles.title]}>{quote_rendered}</Text>
            </ImageBackground>
        </TouchableScale>
    )
}
const styles = StyleSheet.create({
    image: {
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 3.25,
        borderRadius: 9,
        overflow: 'hidden',
    },
    imageView: {
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 3.25,
        borderRadius: 9,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    title: {
        paddingLeft: 40,
        paddingRight: 40,
        textAlign: 'center',
        fontSize: scale(14)
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