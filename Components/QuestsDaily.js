import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {FlatList, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, UIManager, View} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import AchievementItem from "./AchievementItem";
import moment from 'moment';

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const QuestsDaily = (props) => {
    const {screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.titles.find(el => el.id === 'achievement_quest_empty').title
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const questReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.daily : null);
    const milestoneReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.milestones : null);
    const dispatch = useDispatch();

    useEffect(() => {
        questReducer.sort((a, b) => {
            if (a.claim_date === '' && b.claim_date === '') {
                if (a.complete_date < b.complete_date) {
                    return 1
                } else {
                    return -1
                }
            } else {
                if (a.claim_date > b.claim_date) {
                    return 1
                } else {
                    return -1
                }
            }
        })
    }, [questReducer])
    const handleOnPress = (item, date, mode) => {
        switch (mode) {
            case 'past':
                if (item.list.find(pastDate => pastDate === date)) {
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.spring
                    );
                    dispatch({
                        type: "ONENERGY_PAST_CLAIM",
                        payload: {
                            'id': item.id,
                            'date': date,
                        },
                    });
                }
                break;
            default:
                if (item.complete_date !== '' && item.claim_date === '') {
                    LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.spring
                    );
                    dispatch({
                        type: "ONENERGY_DAILY_CLAIM",
                        payload: {
                            'id': item.id
                        },
                    });
                }
                break;
        }
    }

    const renderItem = ({item}) => {
        let show = -1;
        let today = new moment().format('YYYY-MM-DD');

        console.log(item.title, item)
        switch (item.show) {
            case 'course':
                switch (item.showCourseOption) {
                    case 'enrolled':
                        show = progressReducer.enrolledCourses && progressReducer.enrolledCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                    case 'completed':
                        show = progressReducer.completedCourses && progressReducer.completedCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                }
                break;
            case 'lesson':
                show = progressReducer.completedLessons && progressReducer.completedLessons.findIndex(lesson => lesson.id === parseInt(item.showLesson));
                break;
            case 'achievement':
                show = milestoneReducer && milestoneReducer.findIndex(milestone => milestone.id === parseInt(item.showAchievement) && milestone.complete_date !== '');
                break;
            default:
                show = 1;
                break;
        }
        return (
            show >= 0 ?
                <>
                    <AchievementItem mode={'daily'} item={item} date={item.complete_date}
                                     handleOnPress={handleOnPress} {...props}/>
                    {item.list.map(date => {
                        let dayDiff = moment(today).diff(moment(date), 'days');
                        if (dayDiff <= 7 && dayDiff >= 1) {
                            return (
                                <AchievementItem mode={'past'} item={item} date={date}
                                                 handleOnPress={handleOnPress} {...props}/>
                            )
                        }
                    })}
                </>
                : null
        );
    };

    return (
        <SafeAreaView style={global.container}>
            {
                questReducer && questReducer.length ?
                    <FlatList
                        contentContainerStyle={{paddingBottom: scale(20)}}
                        data={questReducer}
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
        width: (windowWidth - scale(30)) * 2 / 3,
        height: scale(70),
        backgroundColor: '#f2f2f2',
    },
    rowRight: {
        marginVertical: 0,
        borderTopRightRadius: 9,
        borderBottomRightRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth - scale(30)) / 3,
        height: scale(70),
        backgroundColor: '#7de7fa',
    },
    pointText: {
        fontSize: scale(14),
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
QuestsDaily.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsDaily);