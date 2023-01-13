import React from 'react';
import AuthWrapper from "@src/components/AuthWrapper";
import LoginScreen from "@src/containers/Custom/LoginScreen";
import {TouchableOpacity} from "react-native";
import Svg, {Path} from "react-native-svg";
import {scale} from "../Utils/scale";

const MyLoginScreen = (props) => {
    return (
        <LoginScreen {...props} />
    )
}

MyLoginScreen.navigationOptions = ({ navigation, screenProps }) => {
    const {global, colors} = screenProps;
    let headerLeft =
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
        >
            <Svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                style={{marginLeft: scale(10)}}
            >
                <Path d="m15 18-6-6 6-6"
                      fill="none"
                      stroke={colors.headerIconColor}
                      strokeWidth="2"
                />
            </Svg>
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