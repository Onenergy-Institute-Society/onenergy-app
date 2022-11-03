import React, {useState} from 'react';
import {connect, useSelector, useDispatch} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    UIManager,
    LayoutAnimation,
    Platform
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import AchievementItem from "./AchievementItem";
import moment from 'moment';
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const QuestsDaily = (props) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.titles.find(el => el.id === 'achievement_quest_empty').title
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer.achievements.filter(achievement => achievement.type === 'daily'):null);
    const today = new moment().format('YYYY-MM-DD');
    const dispatch = useDispatch();
    const handleOnPress = (item, mode) => {
        if (Platform.OS !== "android") {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.spring
            );
        }
        if(item.complete_date&&!item.claim_date) {
            switch (mode) {
                case 'past':
                    dispatch({
                        type: "ONENERGY_ACHIEVEMENT_CLAIM_DAILY",
                        payload: {
                            'id': item.id,
                            'date': item.complete_date,
                            'mode': 'daily'
                        },
                    });
                    break;
                default:
                    if (item.complete_date === today && item.claim_date !== today) {
                        dispatch({
                            type: "ONENERGY_ACHIEVEMENT_CLAIM",
                            payload: {
                                'id': item.id,
                                'mode': mode
                            },
                        });
                    }
                    break;
            }
        }
    }

    const renderItem = ({item}) => {
        let show = false;
        let today = new moment().format('YYYY-MM-DD');

        switch(item.show){
            case 'course':
                switch(item.showCourseOption){
                    case 'enrolled':
                        show = progressReducer.enrolledCourses&&progressReducer.enrolledCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                    case 'completed':
                        show = progressReducer.completedCourses&&progressReducer.completedCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                }
                break;
            case 'lesson':
                show = progressReducer.completedLessons&&progressReducer.completedLessons.findIndex(lesson => lesson.id === parseInt(item.showLesson));
                break;
            case 'achievement':
                show = achievementReducer&&achievementReducer.findIndex(achievement => (achievement.id === parseInt(item.showAchievement) && achievement.complete_date));
                break;
            default:
                show = 1;
                break;
        }
        return (
            show >= 0?
                <>
                    <AchievementItem mode = {''} item = {item} handleOnPress = {handleOnPress} />
                    {item.list.map(date => {
                        let dayDiff = moment(today).diff(moment(date), 'days');
                        if(dayDiff <= 7 && dayDiff >= 1){
                            return (
                                <AchievementItem mode = {'past'} item = {item} date = {date} handleOnPress = {handleOnPress} />
                            )
                        }
                    })}
                </>
            :null
        )
    };
    return (
        <SafeAreaView style={styles.container}>
            {
                achievementReducer && achievementReducer.length ?
                    <FlatList
                        contentContainerStyle={{ paddingBottom: scale(20) }}
                        data={achievementReducer}
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
        height: scale(70),
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginTop: scale(10),
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