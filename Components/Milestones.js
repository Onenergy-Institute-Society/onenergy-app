import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {FlatList, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, UIManager, View} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import MilestonesAccordian from "./MilestonesAccordian";
import AchievementItem from "./AchievementItem";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Milestones = (props) => {
    const {type, screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.titles.find(el => el.id === 'achievement_milestone_empty').title
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const milestoneReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.milestones.filter(achievement => achievement.type === type) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        milestoneReducer.sort((a, b) => {
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
    }, [milestoneReducer])

    const handleOnPress = (item) => {
        if (item.complete_date && !item.claim_date) {
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.spring
            );
            dispatch({
                type: "ONENERGY_MILESTONE_CLAIM",
                payload: {
                    'id': item.id
                }
            });
        }
    }

    const renderItem = ({item}) => {
        let show = -1;

        switch (item.show) {
            case 'course':
                switch (item.showCourseOption) {
                    case 'enrolled':
                        show = progressReducer.enrolledCourses.length && progressReducer.enrolledCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                    case 'completed':
                        show = progressReducer.completedCourses.length && progressReducer.completedCourses.findIndex(course => course.id === parseInt(item.showCourse));
                        break;
                }
                break;
            case 'lesson':
                show = progressReducer.completedLessons.length && progressReducer.completedLessons.findIndex(lesson => lesson.id === parseInt(item.showLesson));
                break;
            case 'achievement':
                show = milestoneReducer && milestoneReducer.findIndex(milestone => (milestone.id === parseInt(item.showAchievement) && milestone.complete_date));
                break;
            default:
                show = 1;
                break;
        }
        return (
            show >= 0 ?
                Array.isArray(item.step) ?
                    <MilestonesAccordian item={item} handleOnPress={handleOnPress} optionData={optionData} {...props}/>
                    :
                    <AchievementItem mode={type} item={item} handleOnPress={handleOnPress} {...props}/>
                : null
        );
    };
    return (
        <SafeAreaView style={global.container}>
            {milestoneReducer && milestoneReducer.length ?
                <FlatList
                    contentContainerStyle={{paddingBottom: scale(20)}}
                    data={milestoneReducer}
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
Milestones.navigationOptions = {header: null};
export default connect(mapStateToProps)(Milestones);