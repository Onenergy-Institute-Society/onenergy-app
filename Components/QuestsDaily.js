import React, {useState} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {
    FlatList,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    UIManager,
    View
} from 'react-native';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {scale} from "../Utils/scale";
import AchievementItem from "./AchievementItem";
import moment from 'moment';

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const QuestsDaily = (props) => {
    const {screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.helps.find(el => el.name === 'achievement_quest_empty');
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const uncompletedQuestReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.daily.filter(quest => quest.complete_date==='') : null);
    const completedQuestReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.daily.filter(quest => quest.complete_date!==''&&quest.claim_date==='') : null);
    const claimedQuestReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.daily.filter(quest => quest.claim_date!=='') : null);
    const milestoneReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.milestones : null);
    const [hideEmptyMessage, setHideEmptyMessage] = useState(false);
    const dispatch = useDispatch();

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
                show = milestoneReducer && milestoneReducer.findIndex(milestone => milestone.id === parseInt(item.showAchievement) && milestone.complete_date !== '');
                break;
            default:
                show = 1;
                break;
        }
        if(show >= 0)
            setHideEmptyMessage(true);
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
                <ScrollView style={styles.containerStyle} showsVerticalScrollIndicator={false}>
                    {completedQuestReducer && completedQuestReducer.length ?
                        <FlatList
                            scrollEnabled={false}
                            data={completedQuestReducer}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        :null}
                    {uncompletedQuestReducer && uncompletedQuestReducer.length ?
                        <FlatList
                            scrollEnabled={false}
                            data={uncompletedQuestReducer}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />:null}
                    {claimedQuestReducer && claimedQuestReducer.length ?
                        <FlatList
                            scrollEnabled={false}
                            data={claimedQuestReducer}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />:null}
                    {!hideEmptyMessage ?
                        <View style={{flex: 1, backgroundColor: '#fff'}}>
                            <BlockScreen pageId={emptyText.id}
                                         contentInsetTop={0}
                                         contentOffsetY={0}
                                         hideTitle={true}
                                         hideNavigationHeader={true}
                                         {...props}/>
                        </View>:null
                    }
                </ScrollView>
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: scale(15),
        marginBottom: scale(25)
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