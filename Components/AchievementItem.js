import React from 'react';
import {useSelector} from "react-redux";
import {StyleSheet, Text, TouchableWithoutFeedback, View,} from 'react-native';
import {scale, windowWidth} from "../Utils/scale";
import * as Progress from 'react-native-progress';
import moment from 'moment';

const AchievementItem = (props) => {
    const {mode, item, date, handleOnPress, screenProps} = props;
    const {colors, global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const today = new moment().format('YYYY-MM-DD');

    return (
        <View style={[styles.boxShadow, styles.row]}>
            <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                <Text style={[global.title, {fontSize: scale(12)}]}>{item.title}</Text>
                {mode === 'past' ?
                    <View style={{marginVertical: 10}}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: colors.primaryButtonBg}}>Expire
                                in {7 - moment(today).diff(moment(date), 'days')} days</Text></View>
                    </View>
                    : null}
                <View style={{
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    width: mode !== 'past' && !item.claim_date ? '100%' : 0,
                    height: mode !== 'past' && !item.claim_date ? 'auto' : 0
                }}>
                    <Progress.Bar showsText={true} borderWidth={0}
                                  color={item.complete_date === today && mode === 'daily' ? "lightgreen" : item.complete_date ? "lightgreen" : colors.primaryButtonBg}
                                  unfilledColor={"black"} borderRadius={9}
                                  progress={mode === 'daily' ? item.complete_date === today ? item.total : 0 : item.complete_date ? item.total : item.step / item.total}
                                  width={windowWidth / 2} height={scale(16)}/>
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
                            style={[global.textItemSubtitle, {color: '#FFF'}]}>{mode === 'daily' ? item.complete_date === today ? "completed!" : '0 / ' + item.total : item.complete_date ? "completed!" : item.step + ' / ' + item.total}</Text>
                    </View>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    handleOnPress(item, date, mode);
                }}
            >
                <View
                    style={[styles.rowRight, {backgroundColor: mode === 'past' ? colors.primaryColor : !item.complete_date ? colors.primaryButtonBg : !item.claim_date ? colors.primaryColor : 'grey'}]}>
                    {
                        mode !== 'past' && !item.complete_date ?
                            <>
                                <Text
                                    style={[global.boxTitle, {color: '#FFF'}]}
                                >
                                    REWARD
                                </Text>
                                {item.awards.map(point =>
                                    <Text
                                        style={[global.pointTitle, {
                                            flexWrap: "nowrap",
                                            fontSize: scale(24),
                                            color: '#FFF'
                                        }]}
                                    >
                                        +{point.point} {optionData.points.find(pt => pt.pointName === point.name).pointTitle}
                                    </Text>
                                )}
                            </>
                            :
                            <>
                                <Text
                                    style={[global.boxTitle, {color: '#FFF'}]}
                                >
                                    {mode !== 'past' && item.claim_date ? 'CLEARED' : 'CLAIM'}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={[global.itemMeta, {
                                        flexWrap: "nowrap",
                                        fontSize: scale(mode !== 'past' && item.claim_date ? 11 : 24),
                                        color: '#FFF'
                                    }]}
                                >
                                    {mode !== 'past' && item.claim_date ? item.claim_date :
                                        item.awards.map(point => {
                                            return (
                                                '+' + point.point + ' ' + optionData.points.find(pt => pt.pointName === point.name).pointTitle
                                            )
                                        })
                                    }
                                </Text>
                            </>
                    }
                </View>
            </TouchableWithoutFeedback>
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
        marginTop: scale(15),
        marginHorizontal: scale(15),
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30)) / 3,
        height: scale(70),
        backgroundColor: '#8c79ea',
    },
    rowLeft: {
        marginVertical: 0,
        paddingHorizontal: scale(10),
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30)) * 2 / 3,
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