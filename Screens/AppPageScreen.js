import React from 'react';
import {
    View,
    TouchableOpacity
} from "react-native";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import analytics from '@react-native-firebase/analytics';
import Svg, {Path} from "react-native-svg";

const AppPageScreen = (props) => {
    if (!props.isFocused)
        return null;
    const {navigation} = props;
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'App Page: '+ navigation.getParam('title'),
    });

    return (
        <View style={{
            flex: 1,
            width:windowWidth}} >
            <BlockScreen pageId={navigation.getParam('pageId')}
                         contentInsetTop={0}
                         contentOffsetY={0}
                         hideTitle={true}
                         hideNavigationHeader={true}
                         {...props} />
        </View>
    )
}

AppPageScreen.navigationOptions = ({ navigation, screenProps }) => {
    const {global, colors} = screenProps;
    let headerLeft = null;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if(navRoutes.length >= 2){
    headerLeft =
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
        >
            <Svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                style={{marginLeft:scale(10)}}
            >
                <Path d="m15 18-6-6 6-6"
                      fill="none"
                      stroke={colors.headerIconColor}
                      strokeWidth="2"
                />
            </Svg>
        </TouchableOpacity>
    }
    return {
        title: navigation.getParam('title')?navigation.getParam('title'):'',
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft: headerLeft,
    }
};

export default AppPageScreen;