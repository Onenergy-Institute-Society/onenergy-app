import {Image, Platform} from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import React from "react";

const ImageCache = ({ source, style }) => {
    if (Platform.OS === 'android') {
        return (
            <Image
                style={style}
                source={{
                    uri: source.uri,
                }}
            />
        )
    }

    return (
        <FastImage
            style={style}
            source={{
                uri: source.uri,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
            }}
        />
    )
}
ImageCache.propTypes = {
    source: PropTypes.object,
    style: PropTypes.any,
}
export default ImageCache;