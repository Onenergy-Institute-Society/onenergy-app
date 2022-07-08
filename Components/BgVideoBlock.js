import React, {useRef} from "react";
import {
    StyleSheet, Image, View, TouchableWithoutFeedback, Text
} from "react-native";
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import Video from "react-native-video";

const BgVideoBlock =(props) => {
    const {block} = props;
    const BGVideoPlayer = useRef(null)
    let width;
    let height;
    switch(block.data.data.size) {
        case "fixed":
            width = parseInt(block.data.data.width);
            height = parseInt(block.data.data.height);
            break;
        case "full":
            width = windowWidth-scale(30);
            height = (windowWidth-scale(30))/parseInt(block.data.data.width)*parseInt(block.data.data.height);
            break
    }
    const onEnd = () => {
        BGVideoPlayer.current.seek(0);
    }
    return (
        block.data.data.url?
            <View style={[styles.container, block.data.data.shadow?styles.boxShadow:null]}>
                <Video
                    ref={BGVideoPlayer}
                    onEnd={onEnd}
                    source={{uri: block.data.data.url}}
                    style={[styles.backgroundVideo,{
                        width:width,
                        height:height,
                    }]}
                    muted={true}
                    repeat={true}
                    resizeMode={"contain"}
                    rate={1.0}
                    ignoreSilentSwitch={"obey"}
                />
            </View>
        :null
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: scale(15),
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
    },
    backgroundVideo: {
        justifyContent: "center",
        width: windowWidth-scale(30),
        height: "auto",
        alignItems: "stretch",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
export default BgVideoBlock;
