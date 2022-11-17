import React from "react";
import {View, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import {DEVICE_WIDTH} from "@src/styles/global";
import IconButton from "@src/components/IconButton";
import {scale} from "../Utils/scale";

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
    console.log(style)
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
                        <IconButton
                            icon={require("@src/assets/img/arrow-back.png")}
                            tintColor={'#4a4d34'}
                            style={{
                                height: scale(16),
                                marginLeft: scale(16)
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

export default LessonScreenHeader;