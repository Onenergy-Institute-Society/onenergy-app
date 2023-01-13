import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TouchableScale from "./TouchableScale";
import ImageCache from "./ImageCache";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";

const FlatListSliderItem = ({
                                 item,
                                 style,
                                 onPress,
                                 index,
                                 imageKey,
                                 local,
                                 height
                            }) => {
    return (
        <TouchableScale
            onPress={() => onPress(item)}>
            <View style={styles.container}>
                <ImageCache
                    style={styles.image}
                    source={{uri: item.image?item.image:''}}
              />
            </View>
        </TouchableScale>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 2.5 - 10,
        borderRadius: 9,
        backgroundColor: "white",
   },
    image: {
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 2.5 - 10,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
   },
});

export default FlatListSliderItem;
