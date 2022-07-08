import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Image,
} from "react-native";
import IconButton from "@src/components/IconButton";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import * as Progress from 'react-native-progress';

export default class MilestonesAccordian extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.item.steps,
            completed: props.item.completed,
            expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.row, {borderBottomRightRadius: this.state.expanded?0:9,borderBottomLeftRadius: this.state.expanded?0:9,}]} onPress={()=>this.toggleExpand()}>
                    <Text style={styles.title}>{this.props.item.name}</Text>
                    <View style={{flex: 0.2, flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                        {
                            this.state.completed?
                                <>
                                <Text style={{marginRight:10}}>{this.props.item.points} {this.props.item.points_type.singular_name}</Text>
                                <Image source={require("@src/assets/img/check2.png")} />
                                </>
                                :
                                <>
                                <Text style={{marginRight:10}}>{this.props.item.steps.length>1?this.props.item.completed_steps+' / '+this.props.item.steps.length:this.props.item.steps[0].progress.current+' / '+this.props.item.steps[0].progress.total}</Text>
                                <Image source={require("@src/assets/img/arrow-down.png")} style={{tintColor:"#4942e1", transform: [{ rotate: this.state.expanded?'180deg':'0deg' }]}}/>
                                </>
                        }
                    </View>
                </TouchableOpacity>
                {
                    this.state.expanded &&
                    <View style={{ backgroundColor:"#f2f2f2", borderBottomRightRadius:9, borderBottomLeftRadius:9, paddingBottom:9, width: windowWidth-scale(30), alignItems:"center", justifyContent:"flex-start"}}>
                        {this.props.item.progress ?
                            <View style={{marginVertical: 10}}>
                                <Progress.Bar borderColor={"#4942e1"} color={"#4942e1"} progress={this.props.item.steps.length>1?this.props.item.completed_steps/this.props.item.steps.length:this.props.item.steps[0].progress.current/this.props.item.steps[0].progress.total} width={windowWidth-scale(60)} height={scale(10)} />
                            </View>
                            :
                            <FlatList
                                data={this.state.data}
                                numColumns={1}
                                scrollEnabled={false}
                                renderItem={({item, index}) =>
                                    <View style={{alignItems: "center"}}>
                                        <View style={styles.childRow}>
                                            <Text style={styles.itemActive}>{item.description}</Text>
                                            {item.completed ?
                                                <IconButton
                                                    icon={require("@src/assets/img/check-simple.png")}
                                                    tintColor={"green"}
                                                    style={{
                                                        height: 18,
                                                        width: 18,
                                                    }}
                                                />
                                                : null}
                                        </View>
                                        {index < this.state.data.length - 1 ?
                                            <View style={styles.childHr}/>
                                            : null}
                                    </View>
                                }/>
                        }
                    </View>
                }
            </View>
        )
    }

    onClick=(index)=>{
        const temp = this.state.data.slice()
        temp[index].value = !temp[index].value
        this.setState({data: temp})
    }

    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
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
        flex: 0.8,
        paddingLeft:10,
        paddingRight:10,
        fontSize: scale(14),
        fontWeight:'bold',
        color: Colors.DARKGRAY,
    },
    itemActive:{
        flex:0.9,
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
        paddingVertical:scale(10),
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth-scale(30),
        flexDirection: 'row',
        backgroundColor: '#e6e6e8',
        marginTop: scale(10),
    },
    childRow:{
        flexDirection: 'row',
        width: windowWidth - scale(30),
        height: scale(32),
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