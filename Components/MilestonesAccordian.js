import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
import moment from 'moment';

class MilestonesAccordian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.item.step,
            complete_date: props.item.complete_date,
            claim_date: props.item.claim_date,
            expanded: false,
        }
    }

    render() {
        let completed_steps = this.props.item.step.filter(lesson => lesson.completed === 1).length;
        let complete_date = '';
        let claim_date = '';
        if(this.props.item.complete_date) complete_date = this.props.item.complete_date;
        if(this.props.item.claim_date) claim_date = this.props.item.claim_date;
        return (
            <View style={[styles.boxShadow, styles.column]}>
                <View style={[styles.row, {
                    borderBottomRightRadius: this.state.expanded ? 0 : 9,
                    borderBottomLeftRadius: this.state.expanded ? 0 : 9,
                }]}>
                    <TouchableOpacity onPress={() => this.toggleExpand()}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.title}>{this.props.item.title}</Text>
                            {!claim_date?
                            <View style={{marginTop:10}}>
                                <Progress.Bar showsText={true} borderColor={"#4942e1"} color={complete_date?"lightgreen":"#8c78ff"} unfilledColor={"black"} borderRadius={9}
                                              progress={completed_steps / this.props.item.step.length}
                                              width={windowWidth/2} height={scale(16)}/>
                                <View
                                    style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', opacity: claim_date?0:100}}>
                                    <Text style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                        width: -1,
                                        height: 1
                                    }}}>{complete_date?"completed":completed_steps + ' / ' + this.props.item.step.length}</Text>
                                </View>
                            </View>
                            :null}
                        </View>
                        <View style={{position:"absolute", top: scale(15), left: scale(10)}}>
                            <Image source={require("@src/assets/img/arrow-down.png")} style={{
                                tintColor: "#4942e1",
                                transform: [{rotate: this.state.expanded ? '180deg' : '0deg'}],
                            }}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.handleOnPress(this.props.item);
                        }}
                    >
                        <View style={[styles.rowRight, {backgroundColor:!complete_date?'#8c78ff':!claim_date?'gold':'gray',
                            borderBottomRightRadius: this.state.expanded ? 0 : 9,}]}>
                            {
                                claim_date?
                                    <>
                                        <Text
                                            style={{color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            CLEARED
                                        </Text>
                                        <Text
                                            style={{flexWrap: "nowrap", fontSize:11, fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            {this.props.item.claim_date}
                                        </Text>
                                    </>
                                    :
                                    this.props.item.complete_date ?
                                        <>
                                            <Text
                                                style={{color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }}}
                                            >
                                                CLAIM
                                            </Text>
                                            {this.props.item.awards.map(point =>
                                                <Text
                                                    style={{flexWrap: "nowrap", fontSize:scale(24), fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                            width: -1,
                                                            height: 1
                                                        }}}
                                                >
                                                    +{point.point} {this.props.optionData.points.find(pt => pt.pointName === point.name).pointTitle}
                                                </Text>
                                            )}
                                        </>
                                        :
                                        <>
                                            <Text
                                                style={{color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }}}
                                            >
                                                REWARD
                                            </Text>
                                            {this.props.item.awards.map(point =>
                                                <Text
                                                    style={{flexWrap: "nowrap", fontSize:scale(24), fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                            width: -1,
                                                            height: 1
                                                        }}}
                                                >
                                                    +{point.point} {this.props.optionData.points.find(pt => pt.pointName === point.name).pointTitle}
                                                </Text>
                                            )}
                                        </>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    this.state.expanded &&
                    <View style={{
                        backgroundColor: "#f2f2f2",
                        borderBottomRightRadius: 9,
                        borderBottomLeftRadius: 9,
                        paddingBottom: scale(20),
                        width: windowWidth - scale(30),
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={false}
                            renderItem={({item, index}) =>
                                <View style={{alignItems: "center"}}>
                                    <View style={styles.childRow}>
                                        <Text style={styles.itemActive}>{item.title}</Text>
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
        height: scale(70),
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginTop: scale(10),
        marginHorizontal: scale(15),
    },
    rowLeft: {
        marginHorizontal: 0,
        paddingHorizontal:5,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))*2/3,
        height: scale(70),
        backgroundColor: '#f2f2f2',
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))/3,
        height: scale(70),
        backgroundColor: '#8c78ff',
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
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

export default MilestonesAccordian