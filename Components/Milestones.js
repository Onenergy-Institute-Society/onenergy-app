import React from 'react';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import {View, Text, StyleSheet, SafeAreaView, FlatList, TouchableWithoutFeedback} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import MilestonesAccordian from "./MilestonesAccordian";
import * as Progress from 'react-native-progress';
import moment from 'moment';

const Milestones = (props) => {
    const {type} = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.titles.find(el => el.id === 'achievement_milestone_empty').title
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const achievementReducer = useSelector((state) => state.onenergyReducer.achievementReducer.achievements.filter(achievement => achievement.type === type));
    const dispatch = useDispatch();

    const handleOnPress = (item) => {
        if(item.complete_date&&!item.claim_date) {
            dispatch({
                type: "ONENERGY_ACHIEVEMENT_CLAIM",
                payload: {
                    'mode': type,
                    'id': item.id
                }
            });
        }
        const apiMilestone = getApi(props.config);
        apiMilestone.customRequest(
            "wp-json/onenergy/v1/awardClaim",
            "post",
            {"id":item.id},
            null,
            {},
            false
        ).then();
    }

    const renderItem = ({ item }) => {
        let show = -1;
        let complete_date = '';
        let claim_date = '';
        switch(item.show){
            case 'course':
                switch(item.showCourseOption){
                    case 'enrolled':
                        show = progressReducer.enrolledCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                    case 'completed':
                        show = progressReducer.completedCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                }
                break;
            case 'lesson':
                show = progressReducer.completedLessons.findIndex(lesson => lesson.id === parseInt(item.showLesson));
                break;
            case 'achievement':
                show = achievementReducer.findIndex(achievement => (achievement.id === parseInt(item.showAchievement) && achievement.complete_date));
                break;
            default:
                show = 1;
                break;
        }
        if(item.complete_date) complete_date = new moment.unix(item.complete_date).format('YYYY-MM-DD');
        if(item.claim_date) claim_date = new moment.unix(item.claim_date).format('YYYY-MM-DD');
        return (
            show >= 0?
                Array.isArray(item.step)?
                    <MilestonesAccordian item={item} handleOnPress={handleOnPress} optionData={optionData} />
                    :
                    <View style={[styles.boxShadow, styles.row]}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.title}>{item.title}</Text>
                            {!claim_date?
                                <View style={{marginTop:10}}>
                                    <Progress.Bar showsText={true} borderColor={"#4942e1"} color={complete_date?"lightgreen":"#7de7fa"} unfilledColor={"black"} borderRadius={9}
                                                  progress={item.step / item.total}
                                                  width={windowWidth/2} height={scale(16)}/>
                                    <View
                                        style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: '#FFF', textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {
                                        width: -1,
                                        height: 1
                                    }}}>{complete_date?"completed":item.step + ' / ' + item.total}</Text></View>
                                </View>
                            :null}
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                handleOnPress(item);
                            }}
                        >
                            <View style={[styles.rowRight, {backgroundColor:claim_date?'gray':complete_date?'gold':'#7de7fa'}]}>
                                {
                                    claim_date ?
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
                                                {claim_date}
                                            </Text>
                                        </>
                                        :
                                    complete_date ?
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
                                        :
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
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
            :null
        );
    };
    return(
        <SafeAreaView style={styles.container}>
            {achievementReducer&&achievementReducer.length?
                <FlatList
                    contentContainerStyle={{ paddingBottom: scale(20) }}
                    showsVerticalScrollIndicator={false}
                    data={achievementReducer}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                :
                <View style={{
                    flex: 1,
                    width: windowWidth
                }}>
                    <View style={[styles.boxShadow, {padding:15,justifyContent: "center",alignSelf:"center",borderRadius: 9,backgroundColor:"#fff", margin:15}]}>
                        <View style={{marginHorizontal: 0, justifyContent: "center", alignItems: "center"}}>
                            <Text style={[styles.body, {
                                marginHorizontal: 0,
                                fontSize:scale(14),
                                lineHeight:scale(14*1.47),
                                textAlign:"left"
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
        height: scale(70),
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginTop: scale(10),
        marginHorizontal: scale(15),
    },
    rowLeft: {
        marginVertical: 0,
        paddingHorizontal:5,
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))*2/3,
        height: scale(70),
        backgroundColor: '#f2f2f2',
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30))/3,
        height: scale(70),
        backgroundColor: '#7de7fa',
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
        flexDirection: "row",
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
        paddingHorizontal:scale(20),
        paddingBottom:scale(20),
    },
    achievementItemBoxInfoBottom: {
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:scale(20),
    },
    achievementItemBoxImageWrap: {
        position:"absolute",
        top:scale(-40),
        justifyContent:"center",
        alignItems:"center",
        width: scale(86),
        height: scale(86),
        borderRadius:scale(43),
        backgroundColor: "#fff",
        shadowColor: "#5e5c9a",
        shadowOffset: {width: 3, height: 5},
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 3,
    },
    achievementItemBoxImage: {
        width:scale(46),
        flex: 1,
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
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
Milestones.navigationOptions = {header: null};
export default connect(mapStateToProps)(Milestones);