import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    UIManager,
    Image,
} from "react-native";
import {windowWidth} from "../Utils/Dimensions";
import {scale, verticalScale} from "../Utils/scale";

export default class QuestsAccordian extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.item.steps,
            expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        return (
            <View style={[styles.row, {borderBottomRightRadius: this.state.expanded?0:9,borderBottomLeftRadius: this.state.expanded?0:9,}]} >
                <Text style={styles.title}>{this.props.item.name}</Text>
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    {
                        this.props.item.completed?
                            <>
                            <Text style={{marginRight:10}}>{this.props.item.points} {this.props.item.points_type.singular_name}</Text>
                            <Image source={require("@src/assets/img/check2.png")} />
                            </>
                            :
                            <Text style={{marginRight:10}}>{this.props.item.completed_steps+' / '+this.props.item.steps.length}</Text>
                    }
                </View>
            </View>
        )
    }
}
const Colors = {
    PRIMARY:'#1abc9c',
    WHITE:'#ffffff',
    GREEN:'#0da935',
    LIGHTGRAY: '#C7C7C7',
    DARKGRAY: '#5E5E5E',
    CGRAY: '#ececec',
    GRAY: '#808080',
}
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        backgroundColor: '#e6e6e8',
    },
    title:{
        paddingLeft:10,
        paddingRight:10,
        fontSize: scale(14),
        fontWeight:'bold',
        color: Colors.DARKGRAY,
    },
    itemActive:{
        fontSize: scale(12),
    },
    btnActive:{
        borderColor: Colors.GREEN,
    },
    btnInActive:{
        borderColor: Colors.DARKGRAY,
    },
    row:{
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(10),
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth-scale(30),
        flexDirection: 'row',
        backgroundColor: '#e6e6e8',
        marginTop: verticalScale(10),
    },
    childRow:{
        flexDirection: 'row',
        width: windowWidth - scale(30),
        height: verticalScale(32),
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        fontSize: scale(12),
        justifyContent:'space-between',
        backgroundColor: '#f2f2f2',
    },
    parentHr:{
        height:1,
        color: Colors.WHITE,
    },
    childHr:{
        height:1,
        width:windowWidth - scale(50),
        backgroundColor: "#c6c6c8",
    },
    colorActive:{
        borderColor: Colors.GREEN,
    },
    colorInActive:{
        borderColor: Colors.DARKGRAY,
    }

});