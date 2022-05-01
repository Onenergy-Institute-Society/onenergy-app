import React from "react";
import {View, Text} from "react-native";
import {scale} from "../Utils/scale";
import * as Progress from 'react-native-progress';

const Loading = (props) => {
    const {navigation} = props;
    const loadingText = navigation.getParam('loadingText')
    return (
        <></>
/*
        <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>{loadingText}</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
*/
    )
}
export default Loading;