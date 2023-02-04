import React from "react";
import {TouchableOpacity, View} from "react-native";
import Animated from "react-native-reanimated";
import {DEVICE_WIDTH} from "@src/styles/global";
import {SvgIconBack} from "../Utils/svg";
import {ms} from "../Utils/Scale";

const TopicScreenHeader = (props) => {
    const {
        headerLeftStyle,
        style,
        global,
        navigation
    } = props;
    return (
        <Animated.View
            style={[
                global.row,
                global.fakeHeader,
                {
                    backgroundColor: "transparent",
                    paddingHorizontal: ms(10),
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
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <SvgIconBack color={props.screenProps.colors.headerIconColor}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};

export default TopicScreenHeader;