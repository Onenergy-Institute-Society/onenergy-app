import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image, ScrollView, Platform,TouchableWithoutFeedback
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import moment from 'moment';

const QuestsMonthly = (props) => {
    const {screenProps} = props;
    const {colors, global} = screenProps;
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer.monthly:null);
    const today = new moment().format('YYYY-MM-DD');
    const dispatch = useDispatch();

    return(
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.containerStyle}>
                <View style={{marginHorizontal: scale(15), paddingHorizontal:scale(10),
                    paddingVertical:scale(10),
                    borderRadius: 9, alignItems: 'center',
                    justifyContent: 'center',backgroundColor: colors.labelBgColor,
                    marginTop: scale(10),}}><Text style={[global.text, {color: colors.labelTextColor}]}>30 days streak REWARD +100 Qi</Text></View>
                <View style={styles.daysContainer}>
                {Array(30).fill().map((_, idx) => 1 + idx).map((day,index)=>{
                    return (
                        <View style={[styles.row, styles.boxShadow, {backgroundColor: achievementReducer&&achievementReducer.days&&achievementReducer.days.length&&achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]?colors.primaryButtonBg:colors.bodyBg}]} >
                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                {

                                    achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] !== '' ?
                                    <Image source={require("@src/assets/img/check2.png")}/>
                                    :
                                    <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                }
                            </View>
                            <Text numberOfLines={1} style={[global.text, {fontWeight: "bold", fontSize: scale(10), color:index===30?colors.secondaryButtonColor:achievementReducer&&achievementReducer.days&&achievementReducer.days.length&&achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]?'white':colors.primaryButtonBg}]}>Day {day}</Text>
                        </View>
                    )
                })}
                </View>
                <View style={{marginBottom: scale(20)}}>
                {achievementReducer.complete_date?
                    achievementReducer.claim_date?
                        <View style={[styles.boxShadow, styles.rowReward]}>
                            <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                                <Text style={global.itemTitle}>30 Days Streak</Text>
                            </View>
                            <View style={[styles.rowRight, {backgroundColor:!achievementReducer.complete_date?'gold':!achievementReducer.claim_date?colors.secondaryButtonColor:'gray'}]}>
                                <Text
                                    style={[global.boxTitle, {color: '#FFF'}]}
                                >
                                    CLEARED
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={[global.itemMeta, {fontSize:11, fontWeight:"700", color: '#FFF'}]}
                                >
                                    {achievementReducer.complete_date}
                                </Text>
                            </View>
                        </View>
                    :
                        <View style={[styles.boxShadow, styles.rowReward]}>
                            <View style={[styles.rowLeft, {backgroundColor: colors.bodyBg}]}>
                                <Text style={[global.itemTitle,{fontWeight:"normal"}]}>30 Days Streak</Text>
                                <View style={{marginVertical: 10}}>
                                    <View
                                        style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={[global.text, {color: "#ED57E1"}]}>Expire in {7 - moment(today).diff(moment(achievementReducer.complete_date), 'days')} days</Text></View>
                                </View>
                            </View>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    dispatch({
                                        type: "ONENERGY_ACHIEVEMENT_CLAIM_WEEKLY_MONTHLY",
                                        payload: {
                                            mode: "monthly",
                                            date: achievementReducer.complete_date,
                                        },
                                    });
                                }}
                            >
                                <View style={[styles.rowRight, {backgroundColor:colors.secondaryButtonColor}]}>
                                    <Text
                                        style={[global.boxTitle, {color: '#FFF'}]}
                                    >
                                        CLAIM
                                    </Text>
                                    <Text
                                        style={[global.pointTitle, {
                                            fontSize: 24,
                                            fontWeight: "700",
                                            color: '#FFF',
                                        }]}
                                    >
                                        +100 Qi
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    :null
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
    daysContainer:{
        marginTop: scale(10),
        marginHorizontal: scale(15),
        flexDirection:'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    row:{
        paddingHorizontal:scale(10),
        paddingVertical:scale(10),
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth-60)/5,
        backgroundColor: '#e6e6e8',
        marginVertical: scale(5),
    },
    rowReward: {
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - scale(30),
        height: scale(60),
        flexDirection: 'row',
        marginVertical: scale(15),
        marginHorizontal: scale(15),
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
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))/3,
        height: scale(70),
        backgroundColor: '#8c79ea',
    },
    textSticker: {
        width:"100%",
        flexDirection: "row",
        justifyContent:"flex-end",
        marginRight:25,
    },
    pointText: {
        fontSize:scale(14),
    },
    checklistItems: {
        marginTop:scale(12),
        paddingRight:scale(12),
        maxHeight:scale(80),
        flexDirection:"row",
    },
    calendarItems:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "blue",
        marginBottom: 5,
        height:scale(45),
        width:scale(45),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    titleText:{
        width: windowWidth-scale(60),
        marginHorizontal:scale(15),
        marginVertical:scale(10),
        fontSize: scale(14),
        fontWeight:'bold',
        color: "#5E5E5E",
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
QuestsMonthly.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsMonthly);