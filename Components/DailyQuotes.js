import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {NavigationActions, withNavigation} from "react-navigation";
import {ms, s, windowWidth} from '../Utils/Scale';
import TouchableScale from './TouchableScale';
import * as Analytics from "../Utils/Analytics";

const DailyQuotes = (props) => {
    const {navigation, screenProps, quote} = props;
    const {colors, global} = screenProps;
    const regex_tag = /(<([^>]+)>)/ig;
    const regex_newline = /\r?\n|\r/g;
    const quote_rendered = quote.replace(regex_tag, '').replace(regex_newline, '');
    useEffect(()=>{
        Analytics.segmentClient.screen('Quests', {type: 'daily'}).then();
    },[]);
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
                <Text numberOfLines={2} style={[global.text, styles.title]}>{quote_rendered}</Text>
            </ImageBackground>
        </TouchableScale>
    )
}
const styles = StyleSheet.create({
    image: {
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) / 3.25,
        borderRadius: s(9),
        overflow: 'hidden',
    },
    imageView: {
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) / 3.25,
        borderRadius: s(9),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    title: {
        paddingLeft: ms(40),
        paddingRight: ms(40),
        textAlign: 'center',
        fontSize: s(14)
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