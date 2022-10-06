import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import * as Progress from 'react-native-progress';

const QuestsDaily = (props) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const user = useSelector((state) => state.user.userObject);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'achievement_quest_empty');
    const emptyText = optionData.titles[emptyTextIndex].title
    const questsSelector = state => ({questsReducer: state.questsReducer.daily})
    const {questsReducer} = useSelector(questsSelector);
    const dispatch = useDispatch();

    const fetchQuests = async () => {
        try {
            const apiQuotes = getApi(props.config);
            const data = await apiQuotes.customRequest(
                "wp-json/onenergy/v1/quests/?type=daily",
                "get",
                {},
                null,
                {},
                false
            ).then(response => response.data);
            if(data&&data.length) {
                dispatch({
                    type: 'QUEST_ADD',
                    quest_mode: 'daily',
                    payload: data,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchQuests().then();
    }, []);
    const renderItem = ({item}) => {
        return (
            <>
            <View style={[styles.boxShadow, styles.row]}>
                <View style={styles.rowLeft}>
                    <Text style={styles.title}>{item.name}</Text>
                    {!item.awarded?
                        <View style={{marginVertical: 10}}>
                            <Progress.Bar showsText={true} borderColor={"#4942e1"} color={"#7de7fa"} unfilledColor={"black"} borderRadius={9}
                                          progress={item.steps.length > 1 ? item.completed_steps / item.steps.length : item.steps[0].progress.current / item.steps[0].progress.total}
                                          width={windowWidth/2} height={scale(16)}/>
                            <View
                                style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                    width: -1,
                                    height: 1
                                }}}>{item.completed?"completed":item.steps.length > 1 ? item.completed_steps + ' / ' + item.steps.length : item.steps[0].progress.current + ' / ' + item.steps[0].progress.total}</Text></View>
                        </View>
                        :null}
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        console.log(item)
                        if(item.completed&&!item.awarded) {
                            dispatch({
                                type: "UPDATE_POINTS",
                                payload: user.points.point + item.points
                            });
                            dispatch({
                                type: "QUEST_CLAIM",
                                quest_mode: "daily",
                                payload: item.id,
                            });
                            const apiQuotes = getApi(props.config);
                            apiQuotes.customRequest(
                                "wp-json/onenergy/v1/awardClaim",
                                "post",
                                {"id":item.id, "log_id":item.wait[0].log_id},
                                null,
                                {},
                                false
                            ).then();
                        }
                    }}
                >
                    <View style={[styles.rowRight, {backgroundColor:item.awarded?'gray':item.completed?'gold':'#7de7fa'}]}>
                        {
                            item.awarded ?
                                <>
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
                                        {item.date}
                                    </Text>
                                </>
                                :
                                item.completed ?
                                    <>
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
                                            +{item.points} Qi
                                        </Text>
                                    </>
                                    :
                                    <>
                                        <Text
                                            style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            REWARD
                                        </Text>
                                        <Text
                                            style={{fontSize:24, fontWeight:700, color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }}}
                                        >
                                            +{item.points} Qi
                                        </Text>
                                    </>
                        }
                    </View>
                </TouchableWithoutFeedback>
            </View>

        {item.wait&&item.wait.length?
            item.wait.map(waitItem => {
                if(parseInt(waitItem.days)<7)
                return (
                <View style={[styles.boxShadow, styles.row]}>
                    <View style={styles.rowLeft}>
                        <Text style={styles.title}>{item.name}</Text>
                            <View style={{marginVertical: 10}}>
                                <View
                                    style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color:"#ED57E1"}}>Expire in {waitItem.days} days</Text></View>
                            </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            dispatch({
                                type: "UPDATE_POINTS",
                                payload: user.points.point + item.points
                            });
                            dispatch({
                                type: "QUEST_WAIT_CLAIM",
                                quest_mode: "daily",
                                item: item.id,
                                log: waitItem.log_id
                            });
                            const apiQuotes = getApi(props.config);
                            apiQuotes.customRequest(
                                "wp-json/onenergy/v1/awardClaim",
                                "post",
                                {"id":item.id, "log_id":waitItem.log_id},
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
                                +{item.points} Qi
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>)})
            :null
        }</>
        )
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                questsReducer && questsReducer.length ?
                    <FlatList
                        data={questsReducer}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                    :
                    <View style={{
                        flex: 1,
                        width: windowWidth
                    }}>
                        <View style={[styles.boxShadow, {
                            padding: 15,
                            justifyContent: "center",
                            alignSelf: "center",
                            borderRadius: 9,
                            backgroundColor: "#fff",
                            margin: 15
                        }]}>
                            <View style={{marginHorizontal: 0, justifyContent: "center", alignItems: "center"}}>
                                <Text style={[styles.body, {
                                    marginHorizontal: 0,
                                    fontSize: scale(14),
                                    lineHeight: scale(14 * 1.47),
                                    textAlign: "left"
                                }]}>{emptyText}</Text>
                            </View>
                        </View>
                    </View>
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    row: {
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
        backgroundColor: '#f2f2f2',
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
    achievementItemBox: {
        marginTop: scale(50),
        marginBottom: scale(20),
        width: windowWidth - scale(30),
        borderRadius: 12,
        backgroundColor: "#fff",
        marginHorizontal: 15,
    },
    textSticker: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 25,
    },
    pointText: {
        fontSize: scale(14),
    },
    achievementItemBoxInfo: {
        paddingTop: scale(32),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    achievementItemBoxInfoTop: {
        paddingHorizontal: scale(40),
        paddingBottom: scale(40),
    },
    achievementItemBoxInfoBottom: {},
    achievementItemBoxImageWrap: {
        position: "absolute",
        left: 10,
        top: scale(-30),
        justifyContent: "center",
        paddingLeft: scale(16),
        paddingBottom: scale(17),
        alignItems: "flex-start",
        width: scale(150),
        height: scale(150),
        borderRadius: scale(43),
    },
    achievementItemBoxTitle: {
        marginTop: scale(20),
        fontSize: scale(18),
        fontWeight: '700',
        textAlign: "center"
    },
    achievementItemBoxText: {
        marginVertical: scale(10),
        fontSize: scale(14),
        fontWeight: '500',
        lineHeight: scale(24),
        textAlign: "center"
    },
    achievementItemBoxDescription: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    achievementItemBoxDescriptionText: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: scale(12),
    },
    achievementItemBoxRequirements: {
        marginTop: scale(10),
    },
    achievementItemBoxSubtitle: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    achievementItemBoxSubtitleText: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: scale(12),
    },
    checklistItems: {
        marginTop: scale(12),
        paddingRight: scale(12),
        maxHeight: scale(80),
        flexDirection: "row",
    },
    calendarItems: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "blue",
        marginBottom: 5,
        height: scale(45),
        width: scale(45),
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
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
QuestsDaily.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsDaily);