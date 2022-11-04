import React from "react";
import {View, Text} from "react-native";
import {useSelector} from "react-redux";
import FastImage from 'react-native-fast-image';
import AnimatedNumber from "./AnimatedNumber";
import {scale} from '../Utils/scale';

const QiPointHeader = (props) => {
    const progressReducer = useSelector((state) => state.onenergyReducer&&state.onenergyReducer.progressReducer.points.qi?state.onenergyReducer.progressReducer.points.qi:0);
    return (
        <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center", marginRight:scale(15)}}>
            <FastImage source={require('../assets/images/icon-ray.png')} style={{width:16, height:16}} />
            <AnimatedNumber style={{color:"black", marginLeft:scale(5)}} value={progressReducer} />
        </View>
    );
};

export default QiPointHeader;
