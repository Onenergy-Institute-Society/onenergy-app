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
import Sound from "react-native-sound";
Sound.setCategory('Playback');

const QuestsMonthly = (props) => {
    const {screenProps} = props;
    const {colors, global} = screenProps;
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer.monthly:null);
    const today = new moment().format('YYYY-MM-DD');
    const dispatch = useDispatch();
    const playPause = () => {
        let ding = new Sound('https://cdn.onenergy.institute/audios/bonus_bell.mp3', null,error => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            ding.play(() => {
                ding.release();
            });
        });
    };
    return(
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.containerStyle}>
                <Text style={global.Text}>Practice consecutively for 30 days to unlock this reward. Miss one day will reset the progress. Completion reward: +100 Qi</Text>
                <View style={styles.daysContainer}>
                {Array(30).fill().map((_, idx) => 1 + idx).map((day,index)=>{
                    return (
                        <View style={[styles.row, styles.boxShadow, {backgroundColor: achievementReducer&&achievementReducer.days&&achievementReducer.days.length&&achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]?'#8c79ea':'#e6e6e8'}]} >
                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                {

                                    achievementReducer && achievementReducer.days && achievementReducer.days.length && achievementReducer.days[index] !== undefined && achievementReducer.days[index] !== null && achievementReducer.days[index] !== '' ?
                                    <Image source={require("@src/assets/img/check2.png")}/>
                                    :
                                    <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                }
                            </View>
                            <Text style={[global.title, {textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {width: -1,height: 1}, color:index===30?"#ef713c":achievementReducer?achievementReducer.days&&achievementReducer.days.length?achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]?'white':'white':'white':'white'}]}>Day {day}</Text>
                        </View>
                    )
                })}
                </View>
                <View style={[styles.boxShadow, {marginHorizontal: scale(15), paddingHorizontal:scale(10),
                    paddingVertical:scale(10),
                    borderRadius: 9, alignItems: 'center',
                    justifyContent: 'center',backgroundColor: '#e6e6e8',
                    marginTop: scale(5),}]}><Text style={[global.text, {color:"green"}]}>Practice consecutively 30 days REWARD +100 Qi</Text></View>
                <View style={{paddingBottom: scale(20)}}>
                {achievementReducer?
                    achievementReducer.claim_date?
                        <View style={[styles.boxShadow, styles.rowReward]}>
                            <View style={styles.rowLeft}>
                                <Text style={styles.title}>30 Days Streak</Text>
                            </View>
                            <View style={[styles.rowRight, {backgroundColor:'grey'}]}>
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
                                    style={{fontSize:11, fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    {achievementReducer.complete_date}
                                </Text>
                            </View>
                        </View>
                    :
                        <View style={[styles.boxShadow, styles.rowReward]}>
                            <View style={styles.rowLeft}>
                                <Text style={styles.title}>Practice for a month</Text>
                                <View style={{marginVertical: 10}}>
                                    <View
                                        style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: "#ED57E1"}}>Expire in {7 - moment(today).diff(moment(achievementReducer.complete_date), 'days')} days</Text></View>
                                </View>
                            </View>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    playPause();
                                    dispatch({
                                        type: "ONENERGY_ACHIEVEMENT_CLAIM_WEEKLY_MONTHLY",
                                        payload: {
                                            mode: "monthly",
                                            date: achievementReducer.complete_date,
                                        },
                                    });
                                }}
                            >
                                <View style={[styles.rowRight, {backgroundColor: '#ef713c'}]}>
                                    <Text
                                        style={{
                                            color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                width: -1,
                                                height: 1
                                            }
                                        }}
                                    >
                                        CLAIM
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            fontWeight: "700",
                                            color: '#FFF',
                                            textShadowColor: 'grey',
                                            textShadowRadius: 1,
                                            textShadowOffset: {
                                                width: -1,
                                                height: 1
                                            }
                                        }}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    daysContainer:{
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
        marginTop: scale(5),
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