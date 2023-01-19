import React, {useEffect, useState} from "react";
import {StyleSheet, View,} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import ScalableImage from "../Components/ScalableImage";
import TouchableScale from './TouchableScale';
import {scale, windowWidth} from '../Utils/scale';
import AwesomeAlert from "../Components/AwesomeAlert";
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import moment from 'moment';
import FastImage from "react-native-fast-image";

const EventList = props => {
    const {navigation, location} = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const milestoneReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer.milestones : null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const [visualGuide, setVisualGuide] = useState(false);
    const current_time = new moment.utc();
    let displayGroup = [];
    useEffect(() => {
        setTimeout(function () {
            setVisualGuide(true);
        }, 10000);
    }, [])
    const renderItem = () => {
        return optionData.goals.map((item) => {
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
                            let showCourse = progressReducer.enrolledCourses && progressReducer.enrolledCourses.find(course => course.id === parseInt(item.showCourse));
                            if (showCourse) {
                                showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                                if (current_time > showDate) {
                                    show = true;
                                }
                            }
                        } else if (item.showCourseOption === 'completed') {
                            let showCourse = progressReducer.completedCourses && progressReducer.completedCourses.find(course => course.id === parseInt(item.showCourse));
                            if (showCourse) {
                                showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                                if (current_time > showDate) {
                                    show = true;
                                }
                            }
                        }
                        break;
                    case 'lesson':
                        let showLesson = progressReducer.completedLessons && progressReducer.completedLessons.find(lesson => lesson.id === parseInt(item.showLesson));
                        if (showLesson) {
                            show = true;
                        }
                        break;
                    case 'achievement':
                        let showAchievement = user && milestoneReducer && milestoneReducer.find(milestone => milestone.complete_date && milestone.id === parseInt(item.showAchievement));
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
                                                await props.attemptDeepLink(false)(null, item.param);
                                                break;
                                            case 'screen':
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
                            <View style={[styles.containerStyle, shadow ? styles.boxShadow : null]}>
                                <ScalableImage
                                    width={windowWidth - scale(30)}
                                    source={{uri: item.image ? item.image : null}}
                                    style={styles.image}
                                />
                            </View>
                            {visualGuide && item.showGuide === "1" ?
                                <FastImage style={{
                                    bottom: 5,
                                    alignSelf: "center",
                                    position: "absolute",
                                    width: scale(200),
                                    height: scale(240),
                                    shadowColor: "#000",
                                    shadowOffset: {width: -2, height: 4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    elevation: 4,
                                }} source={require('../assets/images/tapFinger.gif')}/>
                                : null
                            }
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
        borderRadius: 9,
        marginTop: scale(25),
        marginHorizontal: scale(15),
        width: windowWidth - scale(30),
    },
    rowStyle: {
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: 200,
        borderRadius: 9,
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
