import React from "react";
import {View, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import {DEVICE_WIDTH} from "@src/styles/global";
import {scale} from "../Utils/scale";
import Svg, {Path} from "react-native-svg";

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
    console.log(props)
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
                        <Svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            style={{marginLeft:scale(10)}}
                        >
                            <Path d="m15 18-6-6 6-6"
                                  fill="none"
                                  stroke="#8c79ea"
                                  strokeWidth="2"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

export default LessonScreenHeader;