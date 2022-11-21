import React from "react";
import {View, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import {DEVICE_WIDTH} from "@src/styles/global";
import {scale} from "../Utils/scale";
import AuthWrapper from "@src/components/AuthWrapper";
import Svg, {Path} from "react-native-svg";

const QuizScreenHeader = (props) => {
    const {
        headerLeftStyle,
        style,
        global,
        colors,
        backToCourse,
        headerRightAuthWrapperProps,
        prevNext,
        quiz,
        renderQuizTimer,
        navigation
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
                        height: "100%",
                    }
                ]}
            >
                <View style={[global.headerButtonLeft, headerLeftStyle]}>
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
                </View>
            </View>
        </Animated.View>
    );
};

export default QuizScreenHeader;