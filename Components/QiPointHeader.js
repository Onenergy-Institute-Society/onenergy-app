import React from "react";
import {View} from "react-native";
import {useSelector} from "react-redux";
import FastImage from 'react-native-fast-image';
import AnimatedNumber from "../Utils/AnimatedNumber";
import {s} from '../Utils/Scale';

const QiPointHeader = (screenProps) => {
    const {colors} = screenProps;
    const QiPoints = useSelector((state) => state.onenergyAppReducer && state.onenergyAppReducer.progressReducer.points.qi ? state.onenergyAppReducer.progressReducer.points.qi : 0);
    return (
        <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: s(15)}}>
            <FastImage source={require('../assets/images/icon-ray.png')}
                       style={{width: 16, height: 16, marginRight: s(2)}}/>
            <AnimatedNumber
                style={{color: colors.headerColor, fontFamily: "MontserratAlternates-Regular", fontWeight: "bold"}}
                value={QiPoints}/>
        </View>
    );
};

export default QiPointHeader;
