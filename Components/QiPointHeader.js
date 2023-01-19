import React from "react";
import {View} from "react-native";
import {useSelector} from "react-redux";
import FastImage from 'react-native-fast-image';
import AnimatedNumber from "./AnimatedNumber";
import {scale} from '../Utils/scale';

const QiPointHeader = (screenProps) => {
    const {colors} = screenProps;
    const progressReducer = useSelector((state) => state.onenergyReducer && state.onenergyReducer.progressReducer.points.qi ? state.onenergyReducer.progressReducer.points.qi : 0);
    return (
        <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: scale(15)}}>
            <FastImage source={require('../assets/images/icon-ray.png')}
                       style={{width: 16, height: 16, marginRight: scale(2)}}/>
            <AnimatedNumber
                style={{color: colors.headerColor, fontFamily: "MontserratAlternates-Regular", fontWeight: "bold"}}
                value={progressReducer}/>
        </View>
    );
};

export default QiPointHeader;
