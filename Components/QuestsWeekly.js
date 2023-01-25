import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ms, mvs, s, windowWidth} from "../Utils/Scale";
import moment from 'moment';

const QuestsWeekly = (props) => {
    const {screenProps} = props;
    const {colors, global} = screenProps;
    const achievementReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.weekly : null);
    const [weekly, setWeekly] = useState(achievementReducer);
    const today = new moment().format('YYYY-MM-DD');
    const dispatch = useDispatch();

    useEffect(() => {
        setWeekly(achievementReducer);
    },[])

    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.containerStyle}>
                <View style={{
                    marginHorizontal: s(15), paddingHorizontal: ms(10),
                    paddingVertical: mvs(10),
                    borderRadius:s(9), alignItems: 'center',
                    justifyContent: 'center', backgroundColor: colors.secondaryButtonBg,
                    marginTop: mvs(10),
                }}><Text style={[global.text, {color: colors.labelTextColor}]}>7 days streak REWARD +20 Qi</Text></View>
                {Array(7).fill().map((_, idx) => 1 + idx).map((day, index) => {
                    return (
                        <View
                            style={[styles.row, styles.boxShadow, {backgroundColor: achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] ? colors.primaryButtonBg : colors.bodyBg}]}>
                            <Text
                                style={[global.title, {color: achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] ? 'white' : colors.primaryButtonBg}]}>Day {day}</Text>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Text style={[global.text, {
                                    marginRight: 10,
                                    color: '#FFF'
                                }]}>{achievementReducer ? achievementReducer.days && achievementReducer.days.length ? achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] ? achievementReducer.days[index] : '' : '' : ''}</Text>
                                {
                                    achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] ?
                                        <Image source={require("@src/assets/img/check2.png")}/>
                                        :
                                        <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                }
                            </View>
                        </View>
                    )
                })}
                <View style={{marginBottom: mvs(20)}}>
                    {achievementReducer.complete_date ?
                        achievementReducer.claim_date ?
                            <View style={[styles.boxShadow, styles.rowReward]}>
                                <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                                    <Text style={global.itemTitle}>7 Days Streak</Text>
                                </View>
                                <View
                                    style={[styles.rowRight, {backgroundColor: !achievementReducer.complete_date ? 'gold' : !achievementReducer.claim_date ? colors.secondaryButtonColor : 'gray'}]}>
                                    <Text
                                        style={[global.boxTitle, {color: '#FFF'}]}
                                    >
                                        CLEARED
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={[global.itemMeta, {
                                            flexWrap: "nowrap",
                                            fontSize: s(11),
                                            color: '#FFF'
                                        }]}
                                    >
                                        {achievementReducer.complete_date}
                                    </Text>
                                </View>
                            </View>
                        :
                            <View style={[styles.boxShadow, styles.rowReward]}>
                                <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                                    <Text style={[global.itemTitle, {fontWeight: "normal"}]}>7 Days Streak</Text>
                                    <View style={{marginVertical: 10}}>
                                        <View
                                            style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={[global.text, {color: "#ED57E1"}]}>Expire
                                                in {7 - moment(today).diff(moment(achievementReducer.complete_date), 'days')} days</Text></View>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        dispatch({
                                            type: "ONENERGY_WEEKLY_MONTHLY_CLAIM",
                                            payload: {
                                                mode: "weekly",
                                                date: achievementReducer.complete_date,
                                            },
                                        });
                                    }}
                                >
                                    <View style={[styles.rowRight, {backgroundColor: colors.secondaryButtonColor}]}>
                                        <Text
                                            style={[global.boxTitle, {color: '#FFF'}]}
                                        >
                                            CLAIM
                                        </Text>
                                        <Text
                                            style={[global.pointTitle, {
                                                fontSize: 24,
                                                fontWeight: "700",
                                                color: '#FFF'
                                            }]}
                                        >
                                            +20 Qi
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                    : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    row: {
        paddingHorizontal: ms(10),
        paddingVertical: mvs(10),
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - s(30),
        flexDirection: 'row',
        backgroundColor: '#e6e6e8',
        marginTop: mvs(10),
        marginHorizontal: s(15),
    },
    rowReward: {
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - s(30),
        height: s(60),
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginVertical: s(15),
        marginHorizontal: s(15),
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
    title: {
        fontSize: s(14)
    },
    textSticker: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 25,
    },
    pointText: {
        fontSize: s(14),
    },
    checklistItems: {
        marginTop: mvs(12),
        paddingRight: ms(12),
        maxHeight: s(80),
        flexDirection: "row",
    },
    calendarItems: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:s(9),
        borderWidth: 1,
        borderColor: "blue",
        marginBottom: mvs(5),
        height: s(45),
        width: s(45),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    titleText: {
        width: windowWidth - s(60),
        marginHorizontal: s(15),
        marginVertical: s(10),
        fontSize: s(14),
        fontWeight: 'bold',
        color: "#5E5E5E",
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
QuestsWeekly.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsWeekly);