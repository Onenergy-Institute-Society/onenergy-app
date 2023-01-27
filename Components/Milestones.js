import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {FlatList, LayoutAnimation, Platform, SafeAreaView, StyleSheet, UIManager, View, ScrollView} from 'react-native';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {s} from "../Utils/Scale";
import MilestonesAccordian from "./MilestonesAccordian";
import AchievementItem from "./AchievementItem";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Milestones = (props) => {
    const {type, screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.helps.find(el => el.name === 'achievement_milestone_empty');
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const achievementReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer: null);
    const [uncompletedMilestones, setUncompletedMilestones] = useState([]);
    const [completedMilestones, setCompletedMilestones] = useState([]);
    const [claimedMilestones, setClaimedMilestones] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        setUncompletedMilestones(achievementReducer.milestones.filter(achievement => achievement.type === type && achievement.complete_date==='' && showItem(achievement) !== -1));
        setCompletedMilestones(achievementReducer.milestones.filter(achievement => achievement.type === type && achievement.complete_date!=='' && achievement.claim_date==='' && showItem(achievement) !== -1));
        setClaimedMilestones(achievementReducer.milestones.filter(achievement => achievement.type === type && achievement.claim_date!=='' && showItem(achievement) !== -1));
    },[achievementReducer])

    const handleOnPress = (item, date, mode) => {
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

    const showItem = (item) => {
        let show = -1;
        switch (item.show) {
            case 'course':
                switch (item.showCourseOption) {
                    case 'enrolled':
                        show = progressReducer.enrolledCourses.length? progressReducer.enrolledCourses.findIndex(course => course.id === parseInt(item.showCourse)):-1;
                        break;
                    case 'completed':
                        show = progressReducer.completedCourses.length? progressReducer.completedCourses.findIndex(course => course.id === parseInt(item.showCourse)):-1;
                        break;
                }
                break;
            case 'lesson':
                show = progressReducer.completedLessons.length? progressReducer.completedLessons.findIndex(lesson => lesson.id === parseInt(item.showLesson)):-1;
                break;
            case 'achievement':
                show = achievementReducer.milestones && achievementReducer.milestones.findIndex(milestone => (milestone.id === parseInt(item.showAchievement) && milestone.complete_date));
                break;
            default:
                show = -1;
                break;
        }
        if(item.complete_date) show = 1;
        return show;
    }
    const renderItem = ({item}) => {
        return (
            Array.isArray(item.step) ?
                <MilestonesAccordian item={item} handleOnPress={handleOnPress} optionData={optionData} {...props}/>
                :
                <AchievementItem mode={type} item={item} handleOnPress={handleOnPress} {...props}/>
            : null
        );
    };
    return (
        <SafeAreaView style={global.container}>
            {
                <ScrollView style={styles.containerStyle} showsVerticalScrollIndicator={false}>
                    {completedMilestones.length ?
                        <FlatList
                            scrollEnabled={false}
                            data={completedMilestones}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        :null}
                    {uncompletedMilestones.length ?
                        <FlatList
                            scrollEnabled={false}
                            data={uncompletedMilestones}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />:null}
                    {claimedMilestones.length ?
                        <FlatList
                            scrollEnabled={false}
                            data={claimedMilestones}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />:null}
                    {!completedMilestones.length&&!uncompletedMilestones.length&&!claimedMilestones.length ?
                        <View style={{flex: 1, backgroundColor: '#fff'}}>
                            <BlockScreen pageId={emptyText.id}
                                         contentInsetTop={0}
                                         contentOffsetY={0}
                                         hideTitle={true}
                                         hideNavigationHeader={true}
                                         {...props}/>
                        </View>:null
                    }
                    <View style={{marginTop:s(25)}}></View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: s(15),
        paddingBottom: s(15),
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