import React from 'react';
import {connect, useSelector, useDispatch} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import moment from 'moment';
import Sound from "react-native-sound";
import TouchableScale from "./TouchableScale";
Sound.setCategory('Playback');

const QuestsWeekly = (props) => {
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer.weekly:null);
    const today = new moment().format('YYYY-MM-DD');
    const dispatch = useDispatch();
    const playPause = () => {
        let ding = new Sound('bonus_claim.mp3', Sound.MAIN_BUNDLE,error => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            ding.play(success => {
                ding.release();
            });
        });
    };
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.containerStyle}>
                <Text style={styles.titleText}>Practice consecutively for 7 days to unlock this reward. Miss one day will reset the progress.</Text>
                {Array(7).fill().map((_, idx) => 1 + idx).map((day,index)=>{
                    return (
                        <View style={[styles.row, styles.boxShadow, {backgroundColor: achievementReducer?achievementReducer.days&&achievementReducer.days.length?achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]!==''?'#8c78ff':'#e6e6e8':'#e6e6e8':'#e6e6e8'}]} >
                            <Text style={[styles.title,{textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {width: -1,height: 1}, color:index===6?"gold":achievementReducer?achievementReducer.days&&achievementReducer.days.length?achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]!==''?'white':'white':'white':'white'}]}>Day {day} {index===6?'REWARD +20 Qi':''}</Text>
                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                <Text style={{marginRight:10, color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {width: -1,height: 1}}}>{achievementReducer?achievementReducer.days&&achievementReducer.days.length?achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]!==''?achievementReducer.days[index]:'':'':''}</Text>
                                {
                                    achievementReducer?achievementReducer.days&&achievementReducer.days.length?achievementReducer.days[index]!==undefined&&achievementReducer.days[index]!==null&&achievementReducer.days[index]!==''?
                                        <Image source={require("@src/assets/img/check2.png")} />
                                        :
                                        <Image source={require("@src/assets/img/radio_unchecked_icon.png")} />
                                        :
                                        <Image source={require("@src/assets/img/radio_unchecked_icon.png")} />
                                        :
                                        <Image source={require("@src/assets/img/radio_unchecked_icon.png")} />
                                }
                            </View>
                        </View>
                    )
                })}
                <View style={{paddingBottom: scale(20)}}>
                {achievementReducer&&achievementReducer.list?
                    achievementReducer.list.map(listItem => (
                        listItem.claim_date?
                            <View style={[styles.boxShadow, styles.rowReward]}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.title}>Practice for a week</Text>
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
                                        {listItem.complete_date}
                                    </Text>
                                </View>
                            </View>
                        :
                            <View style={[styles.boxShadow, styles.rowReward]}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.title}>Practice for a week</Text>
                                    <View style={{marginVertical: 10}}>
                                        <View
                                            style={{justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color:"#ED57E1"}}>Expire in {7 - moment(today).diff(moment(achievementReducer.complete_date), 'days')} days</Text></View>
                                    </View>
                                </View>
                                <TouchableScale
                                    onPress={() => {
                                        playPause();
                                        dispatch({
                                            type: "ONENERGY_ACHIEVEMENT_CLAIM_WEEKLY_MONTHLY",
                                            payload:{
                                                mode: "weekly",
                                                date: listItem.complete_date,
                                            },
                                        });
                                    }}
                                >
                                    <View style={[styles.rowRight, {backgroundColor:'gold'}]}>
                                        <Text
                                            style={{color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            CLAIM
                                        </Text>
                                        <Text
                                            style={{fontSize:24, fontWeight:"700", color: '#FFF', textShadowColor: 'grey', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            +20 Qi
                                        </Text>
                                    </View>
                                </TouchableScale>
                            </View>
                        ))
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
    row:{
        paddingHorizontal:scale(10),
        paddingVertical:scale(10),
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth-scale(30),
        flexDirection: 'row',
        backgroundColor: '#e6e6e8',
        marginTop: scale(10),
        marginHorizontal: scale(15),
    },
    rowReward: {
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth - scale(30),
        height: scale(60),
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginTop: scale(10),
        marginHorizontal: scale(15),
    },
    rowLeft: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: (windowWidth - scale(30))*3/4,
        height: scale(60),
        backgroundColor: '#e6e6e8',
    },
    rowRight: {
        paddingHorizontal: scale(10),
        paddingVertical: scale(10),
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: (windowWidth - scale(30))/4,
        height: scale(60),
        backgroundColor: '#7de7fa',
    },
    title: {
      fontSize:scale(14)
    },
    achievementItemBox: {
        marginTop:scale(50),
        marginBottom:scale(20),
        width:windowWidth-scale(30),
        borderRadius: 12,
        backgroundColor: "#fff",
        marginHorizontal: 15,
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
    achievementItemBoxInfo: {
        paddingTop:scale(32),
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between",
    } ,
    achievementItemBoxInfoTop: {
        paddingHorizontal:scale(40),
        paddingBottom:scale(40),
    },
    achievementItemBoxInfoBottom: {

    },
    achievementItemBoxImageWrap: {
        position:"absolute",
        left: 10,
        top:scale(-30),
        justifyContent:"center",
        paddingLeft:scale(16),
        paddingBottom:scale(17),
        alignItems:"flex-start",
        width: scale(150),
        height: scale(150),
        borderRadius:scale(43),
    },
    achievementItemBoxTitle: {
        marginTop:scale(20),
        fontSize:scale(18),
        fontWeight:'700',
        textAlign:"center"
    },
    achievementItemBoxText: {
        marginVertical:scale(10),
        fontSize:scale(14),
        fontWeight:'500',
        lineHeight:scale(24),
        textAlign:"center"
    },
    achievementItemBoxDescription: {
        flexDirection: "row",
        justifyContent:"flex-start",
    },
    achievementItemBoxDescriptionText: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: scale(12),
    },
    achievementItemBoxRequirements: {
        marginTop:scale(10),
    },
    achievementItemBoxSubtitle: {
        flexDirection: "row",
        justifyContent:"flex-start",
    },
    achievementItemBoxSubtitleText: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: scale(12),
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
QuestsWeekly.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsWeekly);