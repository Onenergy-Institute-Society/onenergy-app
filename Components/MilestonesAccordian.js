import React, {Component} from 'react';
import {
    FlatList,
    Image,
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {ms, mvs, s, windowWidth} from "../Utils/Scale";
import * as Progress from 'react-native-progress';
import {SvgIconCheck} from "../Utils/svg";

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
        if (this.props.item.complete_date) complete_date = this.props.item.complete_date;
        if (this.props.item.claim_date) claim_date = this.props.item.claim_date;

        return (
            <View style={[styles.column, styles.boxShadow, {backgroundColor: this.props.screenProps.colors.bodyBg}]}>
                <View style={[styles.row, {
                    borderBottomRightRadius: this.state.expanded ? 0 : s(9),
                    borderBottomLeftRadius: this.state.expanded ? 0 : s(9),
                    backgroundColor: this.props.screenProps.colors.bodyBg
                }]}>
                    <TouchableOpacity onPress={() => this.toggleExpand()}>
                        <View style={[styles.rowLeft, {backgroundColor: this.props.screenProps.colors.bodyBg}]}>
                            <Text
                                style={[this.props.screenProps.global.title, {fontSize: s(12)}]}>{this.props.item.title}</Text>
                            <View style={{
                                marginTop: mvs(10),
                                justifyContent: "center",
                                alignItems: "center",
                                width: !claim_date ? '100%' : 0,
                                height: !claim_date ? 'auto' : 0
                            }}>
                                <Progress.Bar showsText={true} borderWidth={0}
                                              color={complete_date ? "lightgreen" : this.props.screenProps.colors.primaryButtonBg}
                                              unfilledColor={"black"} borderRadius={9}
                                              progress={completed_steps / this.props.item.step.length}
                                              width={windowWidth / 2} height={s(16)}/>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={[this.props.screenProps.global.textItemSubtitle, {color: '#FFF'}]}>{complete_date ? "completed" : completed_steps + ' / ' + this.props.item.step.length}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{position: "absolute", top: s(15), left: s(10)}}>
                            <Image source={require("@src/assets/img/arrow-down.png")} style={{
                                tintColor: this.props.screenProps.colors.primaryButtonBg,
                                transform: [{rotate: this.state.expanded ? '180deg' : '0deg'}],
                            }}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.handleOnPress(this.props.item);
                        }}
                    >
                        <View style={[styles.rowRight, {
                            backgroundColor: !complete_date ? this.props.screenProps.colors.primaryButtonBg : !claim_date ? this.props.screenProps.colors.primaryColor : 'grey',
                            borderBottomRightRadius: this.state.expanded ? 0 : 9,
                        }]}>
                            {
                                !complete_date ?
                                    <>
                                        <Text
                                            style={[this.props.screenProps.global.boxTitle, {color: '#FFF'}]}
                                        >
                                            REWARD
                                        </Text>
                                        {this.props.item.awards.map(point =>
                                            <Text
                                                style={[this.props.screenProps.global.pointTitle, {
                                                    flexWrap: "nowrap",
                                                    fontSize: s(24),
                                                    color: '#FFF'
                                                }]}
                                            >
                                                +{point.point} {this.props.optionData.points.find(pt => pt.pointName === point.name).pointTitle}
                                            </Text>
                                        )}
                                    </>
                                    :
                                    <>
                                        <Text
                                            style={[this.props.screenProps.global.boxTitle, {color: '#FFF'}]}
                                        >
                                            {claim_date ? 'CLEARED' : 'CLAIM'}
                                        </Text>
                                        <Text
                                            style={[this.props.screenProps.global.itemMeta, {
                                                flexWrap: "nowrap",
                                                fontSize: s(claim_date ? 11 : 24),
                                                color: '#FFF'
                                            }]}
                                        >
                                            {claim_date ? claim_date :
                                                this.props.item.awards.map(point => {
                                                    return (
                                                        '+' + point.point + ' ' + this.props.optionData.points.find(pt => pt.pointName === point.name).pointTitle
                                                    )
                                                })
                                            }
                                        </Text>
                                    </>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    this.state.expanded &&
                    <View style={{
                        backgroundColor: this.props.screenProps.colors.bodyBg,
                        borderBottomRightRadius: s(9),
                        borderBottomLeftRadius: s(9),
                        paddingBottom: mvs(10),
                        width: windowWidth - s(30),
                        alignItems: "center",
                        justifyContent: "flex-start"
                    }}>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={false}
                            renderItem={({item, index}) =>
                                <View style={{alignItems: "center"}}>
                                    <View
                                        style={[styles.childRow, {backgroundColor: this.props.screenProps.colors.bodyBg}]}>
                                        <Text style={styles.itemActive}>{item.title}</Text>
                                        {item.completed ?
                                            <SvgIconCheck size={18} color={this.props.screenProps.colors.primaryColor}/>
                                            : null}
                                    </View>
                                    {index < this.state.data.length - 1 ?
                                        <View
                                            style={[styles.childHr, {backgroundColor: this.props.screenProps.colors.borderColor}]}/>
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
    itemActive: {
        flex: 0.9,
        fontFamily: "MontserratAlternates-Regular",
        fontWeight: "normal",
        fontSize: s(12),
    },
    btnActive: {
        borderColor: Colors.GREEN,
    },
    btnInActive: {
        borderColor: Colors.DARKGRAY,
    },
    column: {
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - s(30),
        marginTop: 0,
        marginBottom: mvs(15),
        marginHorizontal: s(15),
    },
    row: {
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - s(30),
        height: s(70),
        flexDirection: 'row',
    },
    rowLeft: {
        marginHorizontal: 0,
        paddingHorizontal: ms(5),
        borderTopLeftRadius: s(9),
        borderBottomLeftRadius: s(9),
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - s(30)) * 2 / 3,
        height: s(70),
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: s(9),
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - s(30)) / 3,
        height: s(70),
    },
    childRow: {
        flexDirection: 'row',
        width: windowWidth - s(30),
        height: s(32),
        alignItems: 'center',
        paddingLeft: ms(15),
        paddingRight: ms(15),
        fontSize: s(12),
        justifyContent: 'space-between',
    },
    childHr: {
        height: 1,
        width: windowWidth - s(50),
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