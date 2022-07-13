import React from 'react';
import {
    View,
    Platform,
    TouchableOpacity
} from "react-native";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {windowWidth} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import {scale,verticalScale} from "../Utils/scale";

const MyAppPageScreen = (props) => {
    if (!props.isFocused)
        return null;
    const {navigation} = props;
    return (
        <View style={{
            flex: 1,
            width:windowWidth,
            marginTop: Platform.OS === 'android' ? verticalScale(-100) : 0}} >
            <BlockScreen pageId={navigation.getParam('pageId')}
                         contentInsetTop={0}
                         contentOffsetY={0}
                         hideTitle={true}
                         hideNavigationHeader={true}
                         {...props} />
        </View>
    )
}

MyAppPageScreen.navigationOptions = ({ navigation }) => {
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
                tintColor={"#4942e1"}
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

export default MyAppPageScreen;