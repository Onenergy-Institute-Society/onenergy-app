import React, {useState} from "react";
import {StyleSheet, View,} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import ScalableImage from "../Components/ScalableImage";
import TouchableScale from './TouchableScale';
import {s, vs, windowWidth} from '../Utils/Scale';
import AwesomeAlert from "../Utils/AwesomeAlert";
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import moment from 'moment';
import * as Analytics from "../Utils/Analytics";
import Blink from "../Utils/Blink";

const EventList = props => {
    const {navigation, location, extraStyle} = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
    const milestoneReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer.milestones : null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const current_time = new moment.utc();
    let displayGroup = [];

    const renderItem = () => {
        return optionData.goalCards.map((item) => {
            let showDate = null;
            let show = false;
            let shadow = item.link;
            switch (item.permission.toString()) {
                case 'all':
                    show = true;
                    break;
                case 'guest':
                    user ? show = false : show = true;
                    break;
                case 'login':
                    user ? show = true : show = false;
                    break;
                case 'user':
                    user && !(user.membership && user.membership.length) ? show = true : show = false;
                    break;
                case 'member':
                    user && (user.membership && user.membership.length) ? show = true : show = false;
                    break;
                default:
                    break;
            }
            if (show && item.location.includes(location)) {
                show = false;
                switch (item.show) {
                    case 'date':
                        let date2 = new moment.utc(item.showDate);
                        if (current_time >= date2) {
                            showDate = item.showDate;
                            show = true
                        }
                        break;
                    case 'course':
                        if (item.showCourseOption === 'enrolled') {
                            let showCourse = progressReducer.enrolledCourses && progressReducer.enrolledCourses.find(course => parseInt(course.id) === parseInt(item.showCourse));
                            if (showCourse) {
                                showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                                if (current_time > showDate) {
                                    show = true;
                                }
                            }
                        } else if (item.showCourseOption === 'completed') {
                            let showCourse = progressReducer.completedCourses && progressReducer.completedCourses.find(course => parseInt(course.id) === parseInt(item.showCourse));
                            if (showCourse) {
                                showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                                if (current_time > showDate) {
                                    show = true;
                                }
                            }
                        }
                        break;
                    case 'lesson':
                        let showLesson = progressReducer.completedLessons && progressReducer.completedLessons.find(lesson => parseInt(lesson.id) === parseInt(item.showLesson));
                        if (showLesson) {
                            show = true;
                        }
                        break;
                    case 'achievement':
                        let showAchievement = user && milestoneReducer && milestoneReducer.find(milestone => milestone.complete_date && parseInt(milestone.id) === parseInt(item.showAchievement));
                        if (showAchievement) {
                            show = true;
                        }
                        break;
                    default:
                        show = true;
                        break;
                }
                if (show) {
                    switch (item.hide) {
                        case 'date':
                            switch (item.hideDateOption.hideDateType) {
                                case 'fix':
                                    let date2 = new moment.utc(item.hideDateOption.date);
                                    if (current_time >= date2) {
                                        show = false
                                    }
                                    break;
                                case 'days':
                                    let diffDays = current_time.diff(showDate, 'days');
                                    if (diffDays >= parseInt(item.hideDateOption.days)) {
                                        show = false
                                    }
                                    break;
                            }
                            break;
                        case 'course':
                            if (item.hideCourseOption === 'enrolled') {
                                if (progressReducer.enrolledCourses && progressReducer.enrolledCourses.find(course => course.id === parseInt(item.hideCourse))) {
                                    show = false;
                                }
                            } else if (item.hideCourseOption === 'completed') {
                                if (progressReducer.completedCourses && progressReducer.completedCourses.find(course => course.id === parseInt(item.hideCourse))) {
                                    show = false;
                                }
                            }
                            break;
                        case 'lesson':
                            if (progressReducer.completedLessons && progressReducer.completedLessons.find(lesson => lesson.id === parseInt(item.hideLesson))) {
                                show = false;
                            }
                            break;
                        case 'achievement':
                            if (milestoneReducer && milestoneReducer.find(milestone => milestone.complete_date && milestone.id === parseInt(item.hideAchievement))) {
                                show = false;
                            }
                            break;
                        case 'user':
                            if (user[item.attribute]) {
                                show = false;
                            }
                            break;
                        default:
                            show = true;
                            break;
                    }
                }
                if (show) {
                    if (item.group) {
                        if (displayGroup.includes(item.group)) {
                            show = false;
                        } else {
                            displayGroup = [...displayGroup, item.group];
                        }
                    }
                }
            } else {
                show = false;
            }
            return (
                show ?
                    <View style={styles.container}>
                        <TouchableScale
                            onPress={async () => {
                                try {
                                    if (item.link) {
                                        switch (item.link) {
                                            case 'alert':
                                                setAlertTitle('Notice');
                                                setAlertBody(item.param);
                                                setShowAlert(true);
                                                break;
                                            case 'app':
                                                Analytics.segmentClient.track('Tap Goal Card', {
                                                    action: 'open app page',
                                                    pageId: item.param
                                                }).then();
                                                navigation.dispatch(
                                                    NavigationActions.navigate({
                                                        routeName: "AppPageScreen",
                                                        params: {
                                                            pageId: item.param,
                                                            title: ''
                                                        }
                                                    })
                                                )
                                                break;
                                            case 'blog':
                                                Analytics.segmentClient.track('Tap Goal Card', {
                                                    action: 'open blog page',
                                                    blogId: item.param
                                                }).then();
                                                navigation.dispatch(
                                                    NavigationActions.navigate({
                                                        routeName: "BlogScreen",
                                                        params: {
                                                            blogId: item.param,
                                                            title: ''
                                                        }
                                                    })
                                                )
                                                break;
                                            case 'course':
                                                Analytics.segmentClient.track('Tap Goal Card', {
                                                    action: 'open course',
                                                    courseId: item.param
                                                }).then();
                                                navigation.dispatch(
                                                    NavigationActions.navigate({
                                                        routeName: "CourseScreen",
                                                        params: {
                                                            courseId: parseInt(item.param),
                                                        }
                                                    })
                                                )
                                                break;
                                            case 'link':
                                                Analytics.segmentClient.track('Tap Goal Card', {
                                                    action: 'open link',
                                                    pageId: item.param
                                                }).then();
                                                await props.attemptDeepLink(false)(null, item.param);
                                                break;
                                            case 'screen':
                                                Analytics.segmentClient.track('Tap Goal Card', {
                                                    action: 'open screen',
                                                    screen: item.param
                                                }).then();
                                                navigation.dispatch(
                                                    NavigationActions.navigate({
                                                        routeName: item.param
                                                    })
                                                )
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                } catch (err) {
                                    console.log(`${err}`);
                                }
                            }
                            }>
                            <View style={[styles.containerStyle, shadow ? styles.boxShadow : null, extraStyle]}>
                                <ScalableImage
                                    width={windowWidth - s(30)}
                                    source={{uri: item.image ? item.image : null}}
                                    style={styles.image}
                                >

                                </ScalableImage>
                                {item.showGuide?
                                    <Blink duration={500} style={{position: 'absolute', top: vs(5), right: s(5),}}>
                                        <View
                                            style={{
                                                width: s(10),
                                                height: s(10),
                                                borderRadius: s(10),
                                                borderWidth: 1,
                                                borderColor: "white",
                                                backgroundColor: '#FF0000',
                                            }}
                                        />
                                    </Blink>
                                :null}
                            </View>
                        </TouchableScale>
                        <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title={alertTitle}
                            message={alertBody}
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={true}
                            showCancelButton={false}
                            showConfirmButton={true}
                            confirmText={'Great!'}
                            confirmButtonColor="#4942E1"
                            onConfirmPressed={() => {
                                setShowAlert(false);
                            }}
                        />
                    </View>
                    : null
            );
        })
    }
    return (
        renderItem()
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerStyle: {
        backgroundColor: "white",
        borderRadius:s(9),
        marginHorizontal: s(15),
        width: windowWidth - s(30),
    },
    rowStyle: {
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        borderRadius:s(9),
        marginLeft: 0,
        marginTop: 0,
        overflow: 'hidden',
        resizeMode: "contain",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {windowWidth: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

EventList.navigationOptions = {header: null};
export default withNavigation(withDeeplinkClickHandler(EventList));
