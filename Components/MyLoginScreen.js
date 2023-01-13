import React from 'react';
import AuthWrapper from "@src/components/AuthWrapper";
import LoginScreen from "@src/containers/Custom/LoginScreen";
import {TouchableOpacity} from "react-native";
import {SvgIconBack} from "../Utils/svg";

const MyLoginScreen = (props) => {
    return (
        <LoginScreen {...props}/>
    )
}

MyLoginScreen.navigationOptions = ({navigation, screenProps}) => {
    const {global, colors} = screenProps;
    let headerLeft =
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
           }}
        >
            <SvgIconBack color = {colors.headerIconColor}/>
        </TouchableOpacity>
    return {
        title: navigation.getParam('title') ? navigation.getParam('title') : 'Login',
        headerStyle: {
            backgroundColor: colors.headerBg,
       },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft: headerLeft,
   };
}

export default MyLoginScreen;