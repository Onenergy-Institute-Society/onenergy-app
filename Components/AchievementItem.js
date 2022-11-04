import React, {useState, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {scale, windowWidth} from "../Utils/scale";
import * as Progress from 'react-native-progress';
import moment from 'moment';
import TouchableScale from "./TouchableScale";

const AchievementItem = props => {
    const { mode, item, date, handleOnPress } = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const today = new moment().format('YYYY-MM-DD');

    return (
        <View style={[styles.boxShadow, styles.row]}>
            <View style={styles.rowLeft}>
                <Text style={styles.title}>{item.title}</Text>
                {mode==='past'?
                    <View style={{marginVertical: 10}}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color:"#ED57E1"}}>Expire in {7 - moment(today).diff(moment(item.complete_date), 'days')} days</Text></View>
                    </View>
                    :null}
                {mode!=='past'&&item.claim_date===''?
                    <View style={{marginTop: 10, opacity: item.claim_date!==''?0:100  }}>
                        <Progress.Bar showsText={true} borderColor={"#4942e1"} color={item.complete_date===today?"lightgreen":"#8c78ff"} unfilledColor={"black"} borderRadius={9}
                                      progress={item.complete_date===today?item.step:0 / item.total}
                                      width={windowWidth/2} height={scale(16)}/>
                        <View
                            style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', opacity: item.claim_date!==''?0:100}}><Text style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                width: -1,
                                height: 1
                            }}}>{item.complete_date===today?"completed!":0 + ' / ' + item.total}</Text></View>
                    </View>
                    :null}
            </View>
            <TouchableScale
                onPress={() => {
                    handleOnPress(item, date, mode);
                }}
            >
                <View style={[styles.rowRight, {backgroundColor:item.complete_date===''?'#8c78ff':mode==='past'||item.claim_date===''?'gold':'gray'}]}>
                    {mode!=='past'&&item.claim_date!==''?
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
                                numberOfLines={1}
                                style={{flexWrap: "nowrap", fontSize:scale(11), fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                        width: -1,
                                        height: 1
                                    }}}
                            >
                                {item.claim_date}
                            </Text>
                        </>
                        :null}
                    {mode==='past'||(item.claim_date===''&&item.complete_date!=='')?
                        <>
                            <Text
                                style={{color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                        width: -1,
                                        height: 1
                                    }}}
                            >
                                CLAIM
                            </Text>
                            {item.awards.map(point =>
                                <Text
                                    style={{flexWrap: "nowrap", fontSize:scale(24), fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    +{point.point} {optionData.points.find(pt => pt.pointName === point.name).pointTitle}
                                </Text>
                            )}
                        </>
                        :null}
                    {mode!=='past'&&item.complete_date===''?
                        <>
                            <Text
                                style={{color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                        width: -1,
                                        height: 1
                                    }}}
                            >
                                REWARD
                            </Text>
                            {item.awards.map(point =>
                                <Text
                                    style={{flexWrap: "nowrap", fontSize:scale(24), fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    +{point.point} {optionData.points.find(pt => pt.pointName === point.name).pointTitle}
                                </Text>
                            )}
                        </>
                        :null}
                </View>
            </TouchableScale>
        </View>
    );
};

const styles = StyleSheet.create({
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
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))/3,
        height: scale(70),
        backgroundColor: '#8c78ff',
    },
    rowLeft: {
        marginVertical: 0,
        paddingHorizontal: scale(10),
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))*2/3,
        height: scale(70),
        backgroundColor: '#f2f2f2',
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    title: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: scale(14),
        fontWeight: 'bold',
        color: "#5E5E5E",
    },
});
export default AchievementItem;