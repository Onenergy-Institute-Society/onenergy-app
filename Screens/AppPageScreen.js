import React from 'react';
import {
    View,
    TouchableOpacity
} from "react-native";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {windowWidth} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import {scale} from "../Utils/scale";
import analytics from '@react-native-firebase/analytics';

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
    const {colors} = screenProps;
    let headerLeft = null;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if(navRoutes.length >= 2){
    headerLeft =
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
        >
            <IconButton
                icon={require("@src/assets/img/arrow-back.png")}
                tintColor={colors.headerIconColor}
                style={{
                    height: scale(16),
                    marginLeft: scale(16),
                }}
            />
        </TouchableOpacity>
    }
    return {
        title: navigation.getParam('title')?navigation.getParam('title'):'',
        headerLeft: headerLeft,
    }
};

export default AppPageScreen;