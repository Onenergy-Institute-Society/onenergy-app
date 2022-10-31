import React from "react";
import {View, Text} from "react-native";
import {useSelector} from "react-redux";
import FastImage from 'react-native-fast-image';
import AnimatedNumber from "./AnimatedNumber";
import {scale} from '../Utils/scale';

const QiPointHeader = (props) => {
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer.points.qi:0);
    return (
        <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center", marginRight:scale(15)}}>
            <FastImage source={{uri:'https://assets.onenergy.institute/wp-content/uploads/2020/07/gamipress-icon-ray-material-54x54.png'}} style={{width:16, height:16}} />
            <AnimatedNumber style={{marginLeft:scale(5), color:"gold"}} value={progressReducer} />
        </View>
    );
};

export default QiPointHeader;
