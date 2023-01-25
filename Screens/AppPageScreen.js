import React from 'react';
import {TouchableOpacity, View} from "react-native";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {windowWidth} from "../Utils/Scale";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack} from "../Utils/svg";

const AppPageScreen = (props) => {
    if (!props.isFocused)
        return null;
    const {navigation} = props;
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'App Page: ' + navigation.getParam('title'),
    });

    return (
        <View style={{
            flex: 1,
            width: windowWidth
        }}>
            <BlockScreen pageId={navigation.getParam('pageId')}
                         contentInsetTop={0}
                         contentOffsetY={0}
                         hideTitle={true}
                         hideNavigationHeader={true}
                         {...props}/>
        </View>
    )
}

AppPageScreen.navigationOptions = ({navigation, screenProps}) => {
    const {global, colors} = screenProps;
    let headerLeft = null;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if (navRoutes.length >= 2) {
        headerLeft =
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <SvgIconBack color={colors.headerIconColor}/>
            </TouchableOpacity>
    }
    return {
        title: navigation.getParam('title') ? navigation.getParam('title') : '',
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft: headerLeft,
    }
};

export default AppPageScreen;