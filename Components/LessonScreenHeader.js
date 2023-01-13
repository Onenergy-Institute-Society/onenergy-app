import React from "react";
import {View, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import {DEVICE_WIDTH} from "@src/styles/global";
import {SvgIconBack} from "../Utils/svg";

const LessonScreenHeader = (props) => {
    const {
        headerLeftStyle,
        style,
        global,
        backToCourse,
        renderTimer,
        headerRightAuthWrapperProps,
        prevNext,
        navigation,
   } = props;
    return (
        <Animated.View
            style={[
                global.row,
                global.fakeHeader,
                {
                    backgroundColor: "transparent",
                    paddingHorizontal: 10,
                    overflow: "hidden"
               },
                {
                    width: DEVICE_WIDTH
               },
                style
            ]}
        >
            <View
                style={[
                    {
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        flex: 1,
                        height: "100%"
                   }
                ]}
            >
                <View style={[global.headerButtonLeft, headerLeftStyle]}>
                    <TouchableOpacity
                        onPress={() => {navigation.goBack()}}
                    >
                        <SvgIconBack color = "#8c79ea"/>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

export default LessonScreenHeader;