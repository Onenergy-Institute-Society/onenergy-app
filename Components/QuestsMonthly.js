import React, {useEffect} from 'react';
import {getApi} from "@src/services";
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

const QuestsMonthly = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const questsSelector = state => ({questsReducer: state.questsReducer.monthly})
    const {questsReducer} = useSelector(questsSelector);
    const dispatch = useDispatch();
    const fetchQuests = async () => {
        try {
            const apiQuotes = getApi(props.config);
            const data = await apiQuotes.customRequest(
                "wp-json/onenergy/v1/quests/?type=monthly",
                "get",
                {},
                null,
                {},
                false
            ).then(response => response.data);
            dispatch({
                type: 'QUEST_ADD',
                quest_mode: 'monthly',
                payload: data,
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchQuests().then();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.containerStyle}>
                <Text style={styles.titleText}>Practice consecutively for 30 days to unlock this reward. Miss one day will reset the progress. Completion reward: +100 Qi</Text>
                <View style={styles.daysContainer}>
                {Array(30).fill().map((_, idx) => 1 + idx).map((day,index)=>{
                    return (
                        <View style={styles.row} >
                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                {

                                    questsReducer? questsReducer.days && questsReducer.days.length ? questsReducer.days[index] !== undefined && questsReducer.days[index] !== null && questsReducer.days[index] !== '' ?
                                    <Image source={require("@src/assets/img/check2.png")}/>
                                    :
                                    <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                    :
                                    <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                    :
                                    <Image source={require("@src/assets/img/radio_unchecked_icon.png")}/>
                                }
                            </View>
                            <Text style={{color:day===30?"green":null}}>Day {day}</Text>
                        </View>
                    )
                })}
                </View>
                <View style={{marginHorizontal: scale(15), paddingHorizontal:scale(10),
                    paddingVertical:scale(10),
                    borderRadius: 9, alignItems: 'center',
                    justifyContent: 'center',backgroundColor: '#e6e6e8',
                    marginTop: scale(2),}}><Text style={{color:"green"}}>Practice consecutively 30 days REWARD +100 Qi</Text></View>

                {questsReducer.log?
                    <View style={[styles.boxShadow, styles.rowReward]}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.title}>Practice for a month</Text>
                            <View style={{marginVertical: 10}}>
                                <View
                                    style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color:"#ED57E1"}}>Expire in {questsReducer.log.days} days</Text></View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                dispatch({
                                    type: "UPDATE_POINTS",
                                    payload: user.points.point + 100
                                });
                                dispatch({
                                    type: "QUEST_CLAIM_WEEKLY_MONTHLY",
                                    quest_mode: "monthly",
                                });
                                const apiQuotes = getApi(props.config);
                                apiQuotes.customRequest(
                                    "wp-json/onenergy/v1/awardClaim",
                                    "post",
                                    {"id":32272, "log_id":questsReducer.log.log_id},
                                    null,
                                    {},
                                    false
                                ).then();
                            }}
                        >
                            <View style={[styles.rowRight, {backgroundColor:'gold'}]}>
                                <Text
                                    style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    CLAIM
                                </Text>
                                <Text
                                    style={{fontSize:24, fontWeight:700, color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    +100 Qi
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>:null
                }
                {questsReducer.list?
                    questsReducer.list.map(listItem => (
                        <View style={[styles.boxShadow, styles.rowReward]}>
                            <View style={styles.rowLeft}>
                                <Text style={styles.title}>Practice for a month</Text>
                            </View>
                            <View style={[styles.rowRight, {backgroundColor:'grey'}]}>
                                <Text
                                    style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    CLEARED
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    style={{fontSize:11, fontWeight:700, color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }}}
                                >
                                    {listItem.date}
                                </Text>
                            </View>
                        </View>
                    ))
                    :null
                }
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
        width: (windowWidth-46)/5,
        backgroundColor: '#e6e6e8',
        marginTop: scale(2),
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
QuestsMonthly.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsMonthly);