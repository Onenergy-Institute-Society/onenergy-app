import React, { useState } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    FlatList,
    Text
} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import { windowWidth, windowHeight, scale, verticalScale } from '../Utils/scale';
import AwesomeAlert from "../Components/AwesomeAlert";
import moment from 'moment';

const EventList = props => {
    const {navigation, location, eventsData} = props;
    const user = useSelector((state) => state.user.userObject);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const current_time = new moment.utc();
    const renderItem = ({ item }) => {
        let showDate = null;
        let show = false;
        if(item.location.includes(location)) {
            console.log(item.location, location)
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
                        let showCourse = user.enrolled_courses.find(course => course.id === parseInt(item.showCourse));
                        if (showCourse) {
                            showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                            if (current_time > showDate) {
                                show = true;
                            }
                        }
                    } else if (item.showCourseOption === 'completed') {
                        let showCourse = user.completed_courses.find(course => course.id === parseInt(item.showCourse));
                        if (showCourse) {
                            showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                            if (current_time > showDate) {
                                show = true;
                            }
                        }
                    }
                    break;
                case 'lesson':
                    let showLesson = user.completed_lessons.find(lesson => lesson.id === parseInt(item.showLesson));
                    if (showLesson) {
                        showDate = new moment.unix(showLesson['date']).add(item.delay, 'd');
                        if (current_time > showDate) {
                            show = true;
                        }
                    }
                    break;
                case 'achievement':
                    let showAchievement = user.completed_achievements.find(achievement => achievement.id === parseInt(item.showAchievement));
                    if (showAchievement) {
                        showDate = new moment.unix(showAchievement['date']).add(item.delay, 'd');
                        if (current_time > showDate) {
                            show = true;
                        }
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
                            if (user.enrolled_courses.find(course => course.id === parseInt(item.hideCourse))) {
                                show = false;
                            }
                        } else if (item.hideCourseOption === 'completed') {
                            if (user.completed_courses.find(course => course.id === parseInt(item.hideCourse))) {
                                show = false;
                            }
                        }
                        break;
                    case 'lesson':
                        if (user.completed_lessons.find(lesson => lesson.id === parseInt(item.hideLesson))) {
                            show = false;
                        }
                        break;
                    case 'achievement':
                        if (user.completed_achievements.find(achievement => achievement.id === parseInt(item.hideAchievement))) {
                            show = false;
                        }
                        break;
                    default:
                        show = true;
                        break;
                }
            }
        }
        return (
            show?
                <TouchableScale
                    onPress={async () => {
                        try {
                            if(item.link)
                            {
                                switch(item.link)
                                {
                                    case 'alert':
                                        setAlertTitle('Notice');
                                        setAlertBody(item.param);
                                        setShowAlert(true);
                                        break;
                                    case 'app':
                                        navigation.dispatch(
                                            NavigationActions.navigate({
                                                routeName: "MyAppPageScreen",
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
                                                routeName: "MyBlogScreen",
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
                                                routeName: "MyCourseScreen",
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
                    <View style={[styles.containerStyle, styles.boxShadow]}>
                        <ImageCache style={styles.image}
                                    source={{uri: item.image ? item.image : ''}}/>
                    </View>
                </TouchableScale>
            :null
        );
    }
    return (
        <View style={styles.container}>
             <FlatList
                data={eventsData}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.key}
            />
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerStyle: {
        backgroundColor:"white",
        borderRadius: 9,
        marginVertical: verticalScale(10),
        marginHorizontal: scale(15),
        width: windowWidth - scale(30),
        height:(windowWidth-scale(30))/16*9,
    },
    rowStyle: {
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width:windowWidth-scale(30),
        height:(windowWidth-scale(30))/16*9,
        borderRadius: 9,
        overflow: 'hidden',
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
export default withNavigation(EventList);
