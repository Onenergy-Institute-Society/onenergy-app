import React from 'react';
import {useSelector} from "react-redux";
import {StyleSheet, Text, TouchableWithoutFeedback, View,} from 'react-native';
import {ms, mvs, s, windowWidth} from "../Utils/Scale";
import * as Progress from 'react-native-progress';
import moment from 'moment';

const AchievementItem = (props) => {
    const {mode, item, date, handleOnPress, screenProps} = props;
    const {colors, global} = screenProps;
    const optionData = useSelector((state) => {
        const {onenergy_option} = state.settings.settings;
        return onenergy_option;
    });
    const today = new moment().format('YYYY-MM-DD');
    const {bodyBg, primaryButtonBg, primaryColor} = colors;
    const {pointTitle, boxTitle, textItemSubtitle, title, itemMeta} = global;
    const {titles} = optionData;
    const {claim_date, awards, complete_date} = item;
    return (
        <View style={[styles.boxShadow, styles.row]}>
            <View style={[styles.rowLeft, {backgroundColor: bodyBg}]}>
                <Text style={[title, {fontSize: s(12)}]}>{item.title}</Text>
                {mode === 'past' ?
                    <View style={{marginVertical: 10}}>
                        <View
                            style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: primaryButtonBg}}>Expire
                                in {7 - moment(today).diff(moment(date), 'days')} days</Text></View>
                    </View>
                    : null}
                <View style={{
                    marginTop: mvs(10),
                    justifyContent: "center",
                    alignItems: "center",
                    width: mode !== 'past' && !item.claim_date ? '100%' : 0,
                    height: mode !== 'past' && !item.claim_date ? 'auto' : 0
                }}>
                    <Progress.Bar showsText={true} borderWidth={0}
                                  color={item.complete_date === today && mode === 'daily' ? "lightgreen" : item.complete_date ? "lightgreen" : primaryButtonBg}
                                  unfilledColor={"black"} borderRadius={9}
                                  progress={mode === 'daily' ? item.complete_date === today ? item.total : 0 : item.complete_date ? item.total : item.step / item.total}
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
                            style={[textItemSubtitle, {color: '#FFF'}]}>{mode === 'daily' ? item.complete_date === today ? titles.find(el => el.id === 'achievement_button_completed').title : '0 / ' + item.total : item.complete_date ? titles.find(el => el.id === 'achievement_button_completed').title : item.step + ' / ' + item.total}</Text>
                    </View>
                </View>
            </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    handleOnPress(item, date, mode);
                }}
            >
                <View
                    style={[styles.rowRight, {backgroundColor: mode === 'past' ? primaryColor : !item.complete_date ? primaryButtonBg : !item.claim_date ? primaryColor : 'grey'}]}>
                    {
                        mode !== 'past' && !complete_date ?
                            <>
                                <Text
                                    style={[boxTitle, {color: '#FFF'}]}
                                >
                                    {titles.find(el => el.id === 'achievement_button_reward').title}
                                </Text>
                                {awards&&awards.length&&awards.map(point => {
                                    const {point: point1, name} = point;
                                    const {pointTitle: pointTitle1} = optionData.points.find(pt => {
                                        const {pointName} = pt;
                                        return pointName === name;
                                    });
                                    return <Text
                                            style={[pointTitle, {
                                                flexWrap: "nowrap",
                                                fontSize: s(24),
                                                color: '#FFF'
                                            }]}
                                        >
                                            +{point1} {pointTitle1}
                                        </Text>;
                                    }
                                )}
                            </>
                            :
                            <>
                                <Text
                                    style={[boxTitle, {color: '#FFF'}]}
                                >
                                    {mode !== 'past' && claim_date ? titles.find(el => el.id === 'achievement_button_cleared').title : titles.find(el => el.id === 'achievement_button_claim').title}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={[itemMeta, {
                                        flexWrap: "nowrap",
                                        fontSize: s(mode !== 'past' && claim_date ? 11 : 24),
                                        color: '#FFF'
                                    }]}
                                >
                                    {mode !== 'past' && claim_date ? claim_date :
                                        awards.map(point => {
                                            const {point: point1, name} = point;
                                            const {pointTitle: pointTitle1} = optionData.points.find(pt => {
                                                const {pointName} = pt;
                                                return pointName === name;
                                            });
                                            return (
                                                '+' + point1 + ' ' + pointTitle1
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
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - s(30),
        height: s(70),
        flexDirection: 'row',
        marginTop: 0,
        marginBottom: mvs(15),
        marginHorizontal: s(15),
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: s(9),
        borderBottomRightRadius: s(9),
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - s(30)) / 3,
        height: s(70),
        backgroundColor: '#8c79ea',
    },
    rowLeft: {
        marginVertical: 0,
        paddingHorizontal: ms(10),
        borderTopLeftRadius: s(9),
        borderBottomLeftRadius: s(9),
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - s(30)) * 2 / 3,
        height: s(70),
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
        paddingLeft: ms(10),
        paddingRight: ms(10),
        fontSize: s(14),
        fontWeight: 'bold',
        color: "#5E5E5E",
    },
});
export default AchievementItem;