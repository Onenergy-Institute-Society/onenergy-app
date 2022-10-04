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

export default class MilestonesAccordian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.item.steps,
            completed: props.item.completed,
            awarded: props.item.awarded,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        return (
            <View style={[styles.boxShadow, styles.column]}>
                <View style={[styles.row, {
                    borderBottomRightRadius: this.state.expanded ? 0 : 9,
                    borderBottomLeftRadius: this.state.expanded ? 0 : 9,
                }]}>
                    <TouchableOpacity onPress={() => this.toggleExpand()}>
                        <View style={styles.rowLeft}>
                            <Image source={require("@src/assets/img/arrow-down.png")} style={{
                                tintColor: "#4942e1",
                                transform: [{rotate: this.state.expanded ? '180deg' : '0deg'}]
                            }}/>
                            <View style={styles.rowLeftCenter}>
                            <Text style={styles.title}>{this.props.item.name}</Text>
                            {!this.props.item.awarded?
                            <View style={{marginVertical: 10}}>
                                <Progress.Bar showsText={true} borderColor={"#4942e1"} color={"#7de7fa"} unfilledColor={"black"} borderRadius={9}
                                              progress={this.props.item.steps.length > 1 ? this.props.item.completed_steps / this.props.item.steps.length : this.props.item.steps[0].progress.current / this.props.item.steps[0].progress.total}
                                              width={windowWidth/2} height={scale(16)}/>
                                <View
                                    style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                        width: -1,
                                        height: 1
                                    }}}>{this.props.item.completed?"completed":this.props.item.steps.length > 1 ? this.props.item.completed_steps + ' / ' + this.props.item.steps.length : this.props.item.steps[0].progress.current + ' / ' + this.props.item.steps[0].progress.total}</Text></View>
                            </View>
                            :null}
                        </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            /*if(this.props.item.completed&&!this.props.item.awarded) {
                                dispatch({
                                    type: "UPDATE_POINTS",
                                    payload: user.points.point + this.props.item.points
                                });
                                dispatch({
                                    type: "MILESTONE_CLAIM",
                                    milestone_type: type,
                                    payload: this.props.item.id
                                });
                            }
                            const apiQuotes = getApi(props.config);
                            apiQuotes.customRequest(
                                "wp-json/onenergy/v1/awardClaim",
                                "post",
                                {"id":item.id},
                                null,
                                {},
                                false
                            ).then();
                       */ }}
                    >
                        <View style={[styles.rowRight, {backgroundColor:this.props.item.awarded?'gray':this.props.item.completed?'gold':'#7de7fa',
                            borderBottomRightRadius: this.state.expanded ? 0 : 9,}]}>
                            {
                                this.props.item.awarded ?
                                    <>
                                        <Text
                                            style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            CLEARED
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{fontSize:11, fontWeight:700, color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            {this.props.item.date}
                                        </Text>
                                    </>
                                    :
                                    this.props.item.completed ?
                                        <>
                                            <Text
                                                style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }}}
                                            >
                                                CLAIM
                                            </Text>
                                            <Text
                                                style={{fontSize:24, fontWeight:700, color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }}}
                                            >
                                                +{this.props.item.points} Qi
                                            </Text>
                                        </>
                                        :
                                        <>
                                            <Text
                                                style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }}}
                                            >
                                                REWARD
                                            </Text>
                                            <Text
                                                style={{fontSize:24, fontWeight:700, color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }}}
                                            >
                                                +{this.props.item.points} Qi
                                            </Text>
                                        </>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.state.expanded &&
                    <View style={{
                        backgroundColor: "#f2f2f2",
                        borderBottomRightRadius: 9,
                        borderBottomLeftRadius: 9,
                        paddingBottom: 9,
                        width: windowWidth - scale(30),
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                        {this.props.item.progress ?
                            <View style={{marginVertical: 10}}>
                                <Progress.Bar showsText={true} borderColor={"#4942e1"} color={"#7de7fa"} unfilledColor={"black"} borderRadius={9}
                                              progress={this.props.item.steps.length > 1 ? this.props.item.completed_steps / this.props.item.steps.length : this.props.item.steps[0].progress.current / this.props.item.steps[0].progress.total}
                                              width={windowWidth - scale(60)} height={scale(12)}/>
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

    onClick = (index) => {
        const temp = this.state.data.slice()
        temp[index].value = !temp[index].value
        this.setState({data: temp})
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded: !this.state.expanded})
    }

}
const Colors = {
    PRIMARY: '#1abc9c',
    WHITE: '#ffffff',
    GREEN: '#0da935',
    LIGHTGRAY: '#C7C7C7',
    DARKGRAY: '#5E5E5E',
    CGRAY: '#ececec',
    GRAY: '#808080',
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        backgroundColor: '#e6e6e8',
    },
    itemActive: {
        flex: 0.9,
        fontSize: scale(12),
    },
    btnActive: {
        borderColor: Colors.GREEN,
    },
    btnInActive: {
        borderColor: Colors.DARKGRAY,
    },
    column: {
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - scale(30),
        backgroundColor: '#e6e6e8',
        marginTop: scale(10),
        marginHorizontal: scale(15),
    },
    row: {
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - scale(30),
        height: scale(60),
        flexDirection: 'row',
        backgroundColor: '#e6e6e8',
    },
    rowLeft: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: (windowWidth - scale(30))*3/4,
        flexDirection: 'row',
        height: scale(60),
        backgroundColor: '#e6e6e8',
    },
    rowLeftCenter: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: scale(10),
    },
    rowRight: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderTopRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: (windowWidth - scale(30))/4,
        height: scale(60),
        backgroundColor: '#7de7fa',
    },
    childRow: {
        flexDirection: 'row',
        width: windowWidth - scale(30),
        height: scale(32),
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: scale(12),
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
    },
    parentHr: {
        height: 1,
        color: Colors.WHITE,
    },
    childHr: {
        height: 1,
        width: windowWidth - scale(50),
        backgroundColor: "#c6c6c8",
    },
    colorActive: {
        borderColor: Colors.GREEN,
    },
    colorInActive: {
        borderColor: Colors.DARKGRAY,
    }

});