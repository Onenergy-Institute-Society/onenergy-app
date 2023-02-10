import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ms, mvs, s, windowWidth} from "../Utils/Scale";
import moment from 'moment';

const QuestsMonthly = (props) => {
    const {screenProps} = props;
    const {colors, global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer.monthly : null);
    const today = new moment().format('YYYY-MM-DD');
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.containerStyle}>
                <View style={{
                    marginHorizontal: s(15), paddingHorizontal: ms(10),
                    paddingVertical: mvs(10),
                    borderRadius:s(9), alignItems: 'center',
                    justifyContent: 'center', backgroundColor: colors.secondaryButtonBg,
                    marginTop: mvs(10),
                }}><Text style={[global.text, {color: colors.labelTextColor}]}>{optionData.titles.find(el => el.id === 'achievement_quest_monthly_title_award_info').title}</Text></View>
                <View style={styles.daysContainer}>
                    {Array(30).fill().map((_, idx) => 1 + idx).map((day, index) => {
                        return (
                            <View
                                style={[styles.row, styles.boxShadow, {backgroundColor: achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] ? colors.primaryButtonBg : colors.bodyBg}]}>
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    {

                                        achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] !== '' ?
                                            <Image source={require("@src/assets/img/check2.png")}/>
                                            :
                                            <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                    }
                                </View>
                                <Text numberOfLines={1} style={[global.text, {
                                    fontWeight: "bold",
                                    fontSize: s(10),
                                    color: index === 30 ? colors.secondaryButtonColor : achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] ? 'white' : colors.primaryButtonBg
                                }]}>{optionData.titles.find(el => el.id === 'achievement_quest_title_day1').title} {day} {optionData.titles.find(el => el.id === 'achievement_quest_title_day2').title}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{marginBottom: mvs(20)}}>
                    {achievementReducer.complete_date ?
                        achievementReducer.claim_date ?
                            <View style={[styles.boxShadow, styles.rowReward]}>
                                <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                                    <Text style={global.itemTitle}>{optionData.titles.find(el => el.id === 'achievement_quest_monthly_title_completed_into').title}</Text>
                                </View>
                                <View
                                    style={[styles.rowRight, {backgroundColor: !achievementReducer.complete_date ? 'gold' : !achievementReducer.claim_date ? colors.secondaryButtonColor : 'gray'}]}>
                                    <Text
                                        style={[global.boxTitle, {color: '#FFF'}]}
                                    >
                                        {optionData.titles.find(el => el.id === 'achievement_button_cleared').title}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={[global.itemMeta, {fontSize: 11, fontWeight: "700", color: '#FFF'}]}
                                    >
                                        {achievementReducer.complete_date}
                                    </Text>
                                </View>
                            </View>
                            :
                            <View style={[styles.boxShadow, styles.rowReward]}>
                                <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                                    <Text style={[global.itemTitle, {fontWeight: "normal"}]}>{optionData.titles.find(el => el.id === 'achievement_quest_monthly_title_completed_into').title}</Text>
                                    <View style={{marginVertical: 10}}>
                                        <View
                                            style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={[global.text, {color: "#ED57E1"}]}>{optionData.titles.find(el => el.id === 'achievement_quest_title_expire_in').title}{7 - moment(today).diff(moment(achievementReducer.complete_date), 'days')}{optionData.titles.find(el => el.id === 'achievement_quest_monthly_title_days').title}</Text></View>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        dispatch({
                                            type: "ONENERGY_WEEKLY_MONTHLY_CLAIM",
                                            payload: {
                                                mode: "monthly",
                                                date: achievementReducer.complete_date,
                                            },
                                        });
                                    }}
                                >
                                    <View style={[styles.rowRight, {backgroundColor: colors.secondaryButtonColor}]}>
                                        <Text
                                            style={[global.boxTitle, {color: '#FFF'}]}
                                        >
                                            {optionData.titles.find(el => el.id === 'achievement_button_claim').title}
                                        </Text>
                                        <Text
                                            style={[global.pointTitle, {
                                                fontSize: 24,
                                                fontWeight: "700",
                                                color: '#FFF',
                                            }]}
                                        >
                                            +100 {optionData.points.find(pt => pt.pointName === 'qi').pointTitle}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        : null
                    }
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
    daysContainer: {
        marginTop: mvs(10),
        marginHorizontal: s(15),
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    row: {
        paddingHorizontal: ms(10),
        paddingVertical: mvs(10),
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - s(60)) / 5,
        backgroundColor: '#e6e6e8',
        marginVertical: s(5),
    },
    rowReward: {
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - s(30),
        height: s(60),
        flexDirection: 'row',
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
QuestsMonthly.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsMonthly);