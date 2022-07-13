import React, {useEffect, useState} from "react";
import {Image, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {NavigationActions} from "react-navigation";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment';
import Share from "react-native-share";
import IconButton from "@src/components/IconButton";
import HomeScreen from './Screens/HomeScreen';
import BlogsScreen from './Screens/BlogsScreen';
import PracticesScreen from './Screens/PracticesScreen';
import CategoryScreen from './Screens/CategoryScreen';
import QuotesScreen from './Screens/QuotesScreen';
import SolarTermScreen from './Screens/SolarTermScreen';
import LessonButton from "./Components/LessonButton";
import VideoPlayer from "./Components/VideoPlayer";
import VimeoPlayer from "./Components/VimeoPlayer";
import VimeoBlockLoader from "./Components/VimeoBlockLoader";
import PracticePersonal from './Screens/PracticePersonal';
import PracticeGroup from './Screens/PracticeGroup';
import PracticeMember from './Screens/PracticeMember';
import OnBoarding from './Screens/OnBoarding';
import MyBlogScreen from './Screens/MyBlogScreen';
import MyCourseScreen from './Screens/MyCourseScreen';
import ChooseLanguage from './Screens/ChooseLanguage';
import MyQuestsScreen from './Screens/MyQuestsScreen';
import MyMilestonesScreen from './Screens/MyMilestonesScreen';
import MyProgressScreen from './Screens/MyProgressScreen';
import MyVouchersScreen from './Screens/MyVouchersScreen';
import MyStatsScreen from './Screens/MyStatsScreen';
import MyMembership from './Screens/MyMembership';
import {scale} from './Utils/scale';
import ImageCache from "./Components/ImageCache";
import {windowWidth} from "./Utils/Dimensions";
import ProgramsScreen from "./Screens/ProgramsScreen";
import EditRoutine from "./Components/EditRoutine";
import MyFeedbackScreen from "./Screens/MyFeedbackScreen";
import NotificationTabBarIcon from "./Components/NotificationTabBarIcon";
import TrackPlayer from 'react-native-track-player';
import CourseActionButton from "@src/components/Course/CourseActionButton";
import MyAppPageScreen from "./Screens/MyAppPageScreen";
import AppAvatar from "@src/components/AppAvatar";
import LessonScreenHeader from "./Components/LessonScreenHeader";
import QuizScreenHeader from "./Components/QuizScreenHeader";
import {FontWeights} from "@src/styles/global";
import TextBlock from "./Components/TextBlock";
import ImageBlock from "./Components/ImageBlock";
import BgVideoBlock from "./Components/BgVideoBlock";
import RelatedPostsRow from "./Components/RelatedPostsRow";

export const applyCustomCode = externalCodeSetup => {
    externalCodeSetup.navigationApi.addNavigationRoute(
        "homePage",
        "Home",
        HomeScreen,
        "Main" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "wisdom",
        "Wisdom",
        BlogsScreen,
        "Main" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "programs",
        "Programs",
        ProgramsScreen,
        "Main" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "practices",
        "QiGong",
        PracticesScreen,
        "Main" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "ProgramsScreen",
        "ProgramsScreen",
        ProgramsScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "PracticesScreen",
        "PracticesScreen",
        PracticesScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "BlogsScreen",
        "BlogsScreen",
        BlogsScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "ChooseLanguage",
        "ChooseLanguage",
        ChooseLanguage,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "OnBoarding",
        "OnBoarding",
        OnBoarding,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyBlogScreen",
        "MyBlogScreen",
        MyBlogScreen,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyCourseScreen",
        "MyCourseScreen",
        MyCourseScreen,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyAppPageScreen",
        "MyAppPageScreen",
        MyAppPageScreen,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "SolarTermScreen",
        "SolarTermScreen",
        SolarTermScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "QuotesScreen",
        "QuotesScreen",
        QuotesScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "videoPlayer",
        "VideoPlayer",
        VideoPlayer,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "vimeoPlayer",
        "VimeoPlayer",
        VimeoPlayer,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "CategoryScreen",
        "CategoryScreen",
        CategoryScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "PracticePersonal",
        "PracticePersonal",
        PracticePersonal,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "PracticeGroup",
        "PracticeGroup",
        PracticeGroup,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "PracticeMember",
        "PracticeMember",
        PracticeMember,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "EditRoutine",
        "EditRoutine",
        EditRoutine,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyQuestsScreen",
        "MyQuestsScreen",
        MyQuestsScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyMilestonesScreen",
        "MyMilestonesScreen",
        MyMilestonesScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyProgressScreen",
        "MyProgressScreen",
        MyProgressScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyVouchersScreen",
        "MyVouchersScreen",
        MyVouchersScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyMembership",
        "MyMembership",
        MyMembership,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyFeedbackScreen",
        "MyFeedbackScreen",
        MyFeedbackScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MyStatsScreen",
        "MyStatsScreen",
        MyStatsScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/textblock',
        props => <TextBlock {...props} />
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/imageblock',
        props => <ImageBlock {...props} />
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/vimeoblock',
        props => <VimeoBlockLoader {...props} />
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/bgvideoblock',
        props => <BgVideoBlock {...props} />
    );
    externalCodeSetup.screenHooksApi.hideCourseSingleAdmin();
    externalCodeSetup.courseSingleApi.setFilterIncomingCourseProps((props) => {
        return {
            ...props,
            enrolledMembers: null
        }
    });
    externalCodeSetup.coursesHooksApi.setSubFiltersFilter((filters) => {
        return ["my_progress"]; //available filters include "title", "recent", "my_progress"
    });
    externalCodeSetup.coursesHooksApi.setFetchParamsFilter(props => {
        return {...props, order: "desc", categories:[93]}
    });

    //Program screen course list
    const NewWidgetItemCourseComponent = (props) => {
        const user = useSelector((state) => state.user.userObject);
        const {viewModel, colors} = props;
        let featuredUrl = viewModel.featuredUrl.replace('-300x200', '-1024x683');
        let statusText;
        let statusBarColor;
        const lesson_time = new moment.utc(viewModel.date);
        const current_time = new moment.utc();
        const diffMinutes = lesson_time.diff(current_time, 'minutes');
        const diffHours = lesson_time.diff(current_time, 'hours');
        const diffDays = lesson_time.diff(current_time, 'days');
        let diffTime = '';
        if(diffMinutes < 60){
            diffTime = 'in ' + diffMinutes + ' Minutes';
        }else{
            if(diffHours < 24){
                diffTime = 'tomorrow';
            }else{
                diffTime = 'in ' + diffDays + ' Days';
            }
        }
        let lessonNote = '';
        if(viewModel.progression === 100)
        {
            statusBarColor = colors.coursesLabelCompleted ;
            statusText = "Completed";
            lessonNote = 'Congratulations on completion';
        }else if(viewModel.price && viewModel.price.expired) {
            statusBarColor = "black";
            statusText = "Expired";
            lessonNote = 'Course is expired, no more access';
        }else if(viewModel.hasAccess){
            if(lesson_time>current_time) {
                lessonNote = 'Next lesson will be available ' + diffTime;
            }else {
                lessonNote = 'Next lesson is available now';
            }
            const expiringTime = new moment.utc(viewModel.price.expires_on);
            const diffExpiringDays = expiringTime.diff(current_time, 'days');
            let diffExpiringTime = '';
            diffExpiringTime = 'Expire in '+diffExpiringDays+' Days';
            if(diffExpiringDays<=7 && diffExpiringDays>0){
                statusBarColor = "grey";
                statusText = diffExpiringTime;
                lessonNote = 'Course is expiring soon';
            }else {
                if (viewModel.progression > 0) {
                    statusBarColor = colors.coursesLabelProgress;
                    statusText = "In Progress";
                } else {
                    statusBarColor = colors.coursesLabelFree;
                    statusText = "Enrolled";
                    lessonNote = 'Please start your first lesson';
                }
            }
        }else{
            if (viewModel.price && viewModel.price.required_points && (viewModel.price.required_points > user.points.point)) {
                statusBarColor = colors.coursesLabelNotEnrolled;
                statusText = viewModel.price.required_points + " Qi Required";
                lessonNote = 'Practice to gather more Qi to unlock';
            } else {
                statusBarColor = colors.coursesLabelStart;
                statusText = "Start Course";
            }
        }
        const styles = StyleSheet.create({
            containerStyle: {
                marginHorizontal: scale(15),
                backgroundColor: 'transparent',
            },
            statusBar:{
                height: scale(25),
                position:'absolute',
                top:10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: scale(105),
                marginLeft: 0,
                borderColor: '#000',
                borderWidth: 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                zIndex: 3, // works on ios
                elevation: 3,
            },
            statusText:{
                color: 'white',
                fontSize: scale(13),
                backgroundColor:'transparent',
            },
            lessonTime:{
                color: "white",
                fontWeight: "700",
                fontSize: scale(14),
                position:'absolute',
                bottom:25,
                alignSelf:"center",
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10
            },
            progressBar:{
                height: 3,
                position:'absolute',
                bottom:15,
                flexDirection: "row",
                width: windowWidth-90,
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: 'white',
                borderColor: '#000',
                borderWidth: 0,
                borderRadius: 5,
            },
            image: {
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30))/9*4,
                borderRadius: 9,
                marginLeft: 0,
                marginTop: 0,
                overflow: 'hidden',
                resizeMode: "cover",
            },
            imageView: {
                backgroundColor: 'rgba(255,255,255,0.5)',
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30))/9*4,
                borderRadius: 9,
                overflow: 'hidden',
            },
            metaOverlay: {
                position:"absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: "flex-start",
                alignItems: "flex-end",
            },
            meta: {
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30))/9*4,
                borderRadius: 9,
                justifyContent:"flex-start",
                alignItems: "flex-end",
                paddingRight:10,
                paddingTop:10,
            },
            title: {
                fontSize: scale(18),
                textAlign: 'center',
                justifyContent:"center",
                color: 'white',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                fontFamily: Platform.OS === 'android'
                    ? 'Roboto' : 'Avenir-Roman',
            },
            card: {
                backgroundColor: 'white',
                borderRadius: 9,
                paddingVertical: 0,
                paddingHorizontal: 0,
                width: '100%',
                marginTop: scale(15),
            },
            boxShadow: {
                shadowColor: "#000",
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 4,
            },
        });
        return (
            <View style={styles.containerStyle} key={'course-' + viewModel.id}>
                <TouchableWithoutFeedback
                    key={viewModel.id + 'img'}
                    onPress={viewModel.price.expired&&viewModel.hasAccess?() => alert('Course is expired'):viewModel.onClick}>
                    <View style={[styles.card, styles.boxShadow]}>
                        <View style={[styles.statusBar, {backgroundColor: statusBarColor}]}><Text style={styles.statusText}>{statusText}</Text></View>
                        <ImageCache style={styles.image} source={{uri: featuredUrl?featuredUrl:''}} />
                        {lessonNote?
                            <Text style={styles.lessonTime}>{lessonNote}</Text>
                            :null}
                        {viewModel.progression>0&&viewModel.progression<100&&!viewModel.price.expired?
                            <View style={styles.progressBar}><View style={{backgroundColor: colors.primaryColor, width:viewModel.progression+'%'}}/></View>
                            :null}
                        <View style={styles.metaOverlay}>
                            <View style={styles.meta}>
                                <Text style={styles.title}>{viewModel.title}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    externalCodeSetup.coursesHooksApi.setWidgetItemCourseComponent(NewWidgetItemCourseComponent)

    //Change author name to nickname in single blog screen
    const BlogHeaderAvatar = ({  blog, global, textStyle }) => {
        return (
            <View style={[global.row, { flex: 1 }]}>
                {blog.avatar?
                    <AppAvatar
                        size={35}
                        source={{ uri: blog.avatar }}
                        style={{ marginRight: 10 }}
                    />
                    :null}
                <View>
                    <Text
                        style={[global.text, { fontWeight: FontWeights.semiBold }, textStyle]}>
                        {blog._embedded?blog._embedded.author[0].name:''}
                    </Text>
                </View>
            </View>
        );
    }
    externalCodeSetup.blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);

    //Add Notification reducer
    externalCodeSetup.reduxApi.addReducer(
        "notifyReducer",
        (state = {notification:{}}, action) => {
            let count;
            switch (action.type){
                case "NOTIFICATION_POST_ADD":
                    if(state.notification[action.mode]){
                        let addIndex = state.notification[action.mode].indexOf(action.payload);
                        if (addIndex === -1) {
                            return {
                                ...state,
                                notification: {
                                    ...state.notification,
                                    [action.mode]: [...state.notification[action.mode], action.payload]
                                }
                            };
                        }else{
                            return state;
                        }
                    }else{
                        return {
                            ...state,
                            notification: {
                                ...state.notification,
                                [action.mode]:[action.payload]
                            }
                        };
                    }
                case "NOTIFICATION_POST_REMOVE":
                    if(state.notification[action.mode]) {
                        let arrayTemp = state.notification[action.mode];
                        let index = arrayTemp.indexOf(action.payload);
                        if (index !== -1) {
                            arrayTemp.splice(index, 1);
                            return {
                                ...state,
                                notification: {...state.notification, [action.mode]: arrayTemp}
                            };
                        } else {
                            return state;
                        }
                    }else{
                        return state;
                    }
                case "NOTIFICATION_PRACTICE_ADD":
                    if(state.notification['practice']){
                        let addIndex = state.notification['practice'].indexOf(action.payload);
                        if (addIndex === -1) {
                            return {
                                ...state,
                                notification: {
                                    ...state.notification,
                                    'practice': [...state.notification['practice'], action.payload]
                                }
                            };
                        }else{
                            return state;
                        }
                    }else{
                        return {
                            ...state,
                            notification: {
                                ...state.notification,
                                'practice':[action.payload]
                            }
                        };
                    }
                case "NOTIFICATION_PRACTICE_REMOVE":
                    if(state.notification['practice']) {
                        let arrayTemp = state.notification['practice'];
                        let index = arrayTemp.indexOf(action.payload);
                        if (index !== -1) {
                            arrayTemp.splice(index, 1);
                            return {
                                ...state,
                                notification: {...state.notification, 'practice': arrayTemp}
                            };
                        } else {
                            return state;
                        }
                    }else{
                        return state;
                    }
                case "NOTIFICATION_INCREMENT":
                    count = state.notification[action.payload]?state.notification[action.payload]:0;
                    return {
                        ...state,
                        notification: {...state.notification, [action.payload]: count+1}
                    };
                case "NOTIFICATION_DECREMENT":
                    count = state.notification[action.payload]?state.notification[action.payload]:0;
                    count>0?
                        state = {
                            ...state,
                            notification: {...state.notification, [action.payload]: count - 1}
                        }:null;
                    return state;
                case "NOTIFICATION_CLEAR":
                    count = state.notification[action.payload]?state.notification[action.payload]:0;
                    count>0?
                        state = {
                            ...state,
                            notification: {...state.notification, [action.payload]: 0}
                        }:null;
                    return state;
                case "NOTIFICATION_TIME":
                    return {
                        ...state,
                        notification: {...state.notification, time: new Date().toLocaleString()}
                    };
                default:
                    return state;
            }
        }
    );

    // Add Video reducer for course completion
    externalCodeSetup.reduxApi.addReducer(
        "videoReducer",
        (state = {videoComplete:false}, action) => {
            let count;
            switch (action.type){
                case "VIDEO_COMPLETED":
                    return {
                        ...state,
                        videoComplete: true
                    };
                case "VIDEO_RESET":
                    return {
                        ...state,
                        videoComplete: false
                    };
                default:
                    return state;
            }
        }
    );

    // Add routine reducer
    externalCodeSetup.reduxApi.addReducer(
        "routinesReducer",
        (state = {routines:[], guides:[], groups:[]}, action) => {
            switch (action.type){
                case "ONENERGY_ROUTINE_UPDATE":
                    return {...state, routines: action.payload};
                case "ONENERGY_ROUTINE_SAVE":
                    let routine = action.payload;
                    let tempState = [...state.routines];
                    let index = tempState.findIndex(el => el.id === routine.id);
                    if(index !== -1){
                        tempState[index] = routine;
                        return {...state, routines: tempState};
                    }else{
                        return {...state, routines: [...state.routines, routine]};
                    }
                case "ONENERGY_GUIDE_UPDATE":
                    return {...state, guides: action.payload};
                case "ONENERGY_GROUP_UPDATE":
                    return {...state, groups: action.payload};
                case "ONENERGY_GUIDE_EMPTY":
                    return {...state, guides: []};
                default:
                    return state;
            }
        }
    );

    // Add Language reducer
    const defaultLanguage = {
        abbr: 'en',
        name: 'English',
        subtitle: 'en',
        initial: '1', //Skip Language Choosing Screen
    }
    externalCodeSetup.reduxApi.addReducer(
        "languagesReducer",
        (state = {languages:defaultLanguage}, action) => {
            switch (action.type) {
                case "DEFAULT_LANGUAGE": {
                    return {
                        ...state,
                        languages: {
                            abbr: action.payload.abbr,
                            name: action.payload.name,
                            subtitle: action.payload.subtitle,
                            initial: '1'
                        }
                    };
                }
                case "CHANGE_SUBTITLE": {
                    return {
                        ...state,
                        languages: {
                            ...state.languages,
                            subtitle: action.payload
                        }
                    };
                }
                default:
                    return state;
            }
        }
    );

    // Make Language and Notification reducer persistent, and remove blog and post from persistent
    externalCodeSetup.reduxApi.addPersistorConfigChanger(props => {
        let whiteList = [...props.whitelist, "languagesReducer", "notifyReducer"];
        let index = whiteList.indexOf('blog');
        if (index !== -1) {
            whiteList.splice(index, 1);
        }
        index = whiteList.indexOf('blogCache');
        if (index !== -1) {
            whiteList.splice(index, 1);
        }
        return {
            ...props,
            whitelist: whiteList
        }
    })

    // Hide categories and tags in Single Course screen
    externalCodeSetup.courseSingleApi.setIsCategoryTagsHidden((course) => {
        return true;
    })

    // Course Action Button
    externalCodeSetup.courseSingleApi.setTransformCourseActionButtons((
        CourseActionBtn,
        courseVM,
        t,
        colors,
        global,
        products,
        navigation,
        startCourse,
        continueCourse,
        priceComponentRender) => {

        const user = useSelector((state) => state.user.userObject);
        const lesson_time = new moment.utc(courseVM.date);
        const current_time = new moment.utc();
        const diffMinutes = lesson_time.diff(current_time, 'minutes');
        const diffHours = lesson_time.diff(current_time, 'hours');
        const diffDays = lesson_time.diff(current_time, 'days');
        const dispatch = useDispatch();
        const [visualGuide, setVisualGuide] = useState(false);

        useEffect(()=>{
            if(user&&!user.firstCourseCompleted){
                setTimeout(function () {
                    setVisualGuide(true);
                }, 5000);
            }
        },[])

        let diffTime = '';
        if(diffMinutes < 60){
            diffTime = 'in ' + diffMinutes + ' minutes';
        }else{
            if(diffHours < 24){
                diffTime = 'tomorrow';
            }else{
                diffTime = 'in ' + diffDays + ' days';
            }
        }
        const [buttonEnroll, setButtonEnroll] = useState('Enroll Now');

        const buttonText = "Next lesson will be available " + diffTime;
        if(courseVM.progression === 100){
            let Info = null;
            return [Info,
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <CourseActionButton
                        title={"Completed"}
                        style={{backgroundColor: colors.coursesLabelCompleted}}
                    />
                </View>];
        }else if(courseVM.price && courseVM.price.expired) {
            let Info = null;
            return [Info,
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <CourseActionButton
                        title={"Expired"}
                        style={{backgroundColor: "black"}}
                    />
                </View>];
        }else if(courseVM.hasAccess){
            let Info = null;
            if(courseVM.price.expires_on) {
                let diffExpiringTime = '';
                const expiringTime = new moment.utc(courseVM.price.expires_on);
                const diffExpiringDays = expiringTime.diff(current_time, 'days');
                diffExpiringTime = 'Course expires in '+diffExpiringDays+' days, please finish all the lesson in time.';
                Info =
                    diffExpiringDays<=7&&diffExpiringDays>0?
                        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                            <Text style={{color:"red", fontSize:scale(14)}}>{diffExpiringTime}</Text>
                        </View>
                        :null
            }
            return [Info,
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    {lesson_time>current_time&&courseVM.progression>0?
                        <CourseActionButton
                            onPress={()=>continueCourse()}
                            title={buttonText}
                            style={{backgroundColor: colors.coursesLabelProgress}}
                        />
                        :
                        <CourseActionButton
                            onPress={()=>continueCourse()}
                            title={"Continue"}
                        />
                    }
                </View>
            ]
        }else{
            if(courseVM.price.required_points > 0 && user.points.point < courseVM.price.required_points && courseVM.error.message){
                const Info =
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Text style={{color:"red", fontSize:scale(14)}}>{courseVM.error.message}</Text>
                    </View>
                const Redirect =
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <CourseActionButton
                            title={"Practice to Gather More Qi"}
                            onPress={() => navigation.dispatch(
                                NavigationActions.navigate( {
                                    routeName: "PracticesScreen",
                                })
                            )}
                            style={{backgroundColor: colors.coursesLabelNotEnrolled}}
                        />
                    </View>
                return [Info, Redirect];
            }else{
                return [
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <CourseActionButton
                            onPress={()=>{
                                setVisualGuide(false);
                                setButtonEnroll('Enrolling, please wait...');
                                startCourse();
                                dispatch({
                                    type: 'UPDATE_USER_ENROLLED_COURSES',
                                    payload: {"id": courseVM.id, "date": new Date().getTime() / 1000}
                                });
                            }}
                            title={buttonEnroll}
                        />
                        {visualGuide?
                            <TouchableWithoutFeedback
                                onPress={()=>{
                                    setVisualGuide(false);
                                    setButtonEnroll('Enrolling, please wait...');
                                    startCourse();
                                    dispatch({
                                        type: 'UPDATE_USER_ENROLLED_COURSES',
                                        payload: {"id": courseVM.id, "date": new Date().getTime() / 1000}
                                    });
                                }}>
                                <FastImage style={{
                                    bottom:scale(-80),
                                    right:scale(80),
                                    position: "absolute",
                                    transform: [{ rotate: '180deg' }],
                                    width:scale(200),
                                    height:scale(240),
                                    shadowColor: "#000",
                                    shadowOffset: {width: 2, height: -4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    elevation: 4,
                                    }} source={{uri:'https://cdn.onenergy.institute/images/TapFinger.gif'}} />
                            </TouchableWithoutFeedback>
                            :null
                        }
                    </View>
                ]
            }
//            return [CourseButton];
        }
    })

    //Custom back button in Single Lesson Screen
    externalCodeSetup.lessonSingleScreenApi.setLessonScreenHeader(props => <LessonScreenHeader {...props}/>)

    //Custom back button in Single Quiz Screen
    externalCodeSetup.quizApi.setQuizScreenHeader(props => <QuizScreenHeader {...props} />)

    //Custom complete button in Single Lesson Screen
    externalCodeSetup.lessonSingleScreenApi.setTransformLessonActionButtons((
        lessonButton,
        showComplete,
        global,
        colors,
        lesson,
        completing,
        labels) => {
        let Buttons =
            <View style={global.row}>
                <LessonButton global={global} colors={colors} lesson={lesson} />
            </View>
        if(lesson.completed){
            return lessonButton
        }else {
            return Buttons;
        }
    })
    externalCodeSetup.blogSingleApi.setTransformBlogHeaderButtons((buttons, blog) => {
        const hasCover = !!blog.featuredImage;
        const iconBackgroundColor = hasCover ? "#fff" : "#A6ADB5";
        const iconTintColor = hasCover ? "#4942e1" : "#fff";
        const regex = /(<([^>]+)>)/ig;

        if(blog.meta_box.share_url && blog.meta_box.share_url !== '')
        {
            const facebook = <IconButton
                pressHandler={() =>
                    Share.shareSingle({
                        message: blog.excerpt.rendered.replace(regex, ''),
                        url: blog.meta_box.share_url,
                        title: blog.title,
                        subject: blog.title,
                        social: Share.Social.FACEBOOK
                    })
                }
                icon={require("@src/assets/img/facebook-new.png")}
                touchableStyle={{
                    backgroundColor: iconBackgroundColor,
                    alignItems: "center",
                    borderRadius: 18,
                    padding: 0,
                    marginRight: 8
                }}
                tintColor={iconTintColor}
                style={{ height: 28, width: 28 }}
                rtlStyleFix={"handled"}
            />

            const twitter = <IconButton
                pressHandler={() =>
                    Share.shareSingle({
                        message: blog.excerpt.rendered.replace(regex, ''),
                        url: blog.meta_box.share_url,
                        title: blog.title,
                        subject: blog.title,
                        social: Share.Social.TWITTER
                    })
                }
                icon={require("@src/assets/img/twitter-new.png")}
                touchableStyle={{
                    backgroundColor: iconBackgroundColor,
                    alignItems: "center",
                    borderRadius: 18,
                    padding: 0,
                    marginRight: 8
                }}
                tintColor={iconTintColor}
                style={{ height: 28, width: 28 }}
                rtlStyleFix={"handled"}
            />

            return [facebook, twitter];
        }else{
            return [];
        }

    })
    externalCodeSetup.navigationApi.setAnimatedSwitchNavigator((routes, options, routeProps) => {
        const feature = routeProps.settings.features.multisite_network;
        const hasMultiSite = Platform.select({
            ios: feature.is_enabled_ios,
            android: feature.is_enabled_android
        })

        // Get the initial switch route based on state data.
        // getInitialSwitchRoute() is based on BB App's AppNavigator.js
        // Feel free to copy and paste this to your own code

        const getInitialSwitchRoute = () => {

            const defaultInitialRoute = "Auth";

            const myCustomRoute = "ChooseLanguage"

            if (!routeProps.hasValidSigning) {
                return "InvalidSigningScreen";
            }

            if (routeProps.shouldEnforceVersionControl) {
                return "VersionControlScreen";
            } else if (routeProps.isLoggedIn) {
                if (
                    routeProps.isFeatureEnabled(hasMultiSite) &&
                    routeProps.sites.selectedSite === null
                ) {
                    return "AuthSiteSelectionScreen";
                } else {
                    return routeProps.shouldLockApp ? "AppLockScreen" : "noAuth";
                }
            }
            else {
                return myCustomRoute; //Use my own custom route instead of the default "Auth" route
                //return defaultInitialRoute;
            }

        };

        const newRoutes = {
            ...routes,
            ChooseLanguage: {
                screen: ChooseLanguage
            },
            OnBoarding: {
                screen: OnBoarding
            }
        }

        const newOptions = {
            ...options,
            initialRouteName: getInitialSwitchRoute()
        }

        return {
            routes: newRoutes,
            options: newOptions,
        }

    })
    externalCodeSetup.navigationApi.setBottomTabBarIcon((icon, iconProps) => {
        const routeLabel = iconProps.route.routes[0].params.item?.label;
        switch (routeLabel){
            case "QiGong":
                return <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{uri:'https://cdn.onenergy.institute/images/onenergy.png'}}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: iconProps.tintColor,
                            alignContent: 'center',
                            marginBottom:0,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'guide_page'}  top={-3} right={-3} size={scale(10)} showNumber={false} />
                </View>
            case "Wisdom":
                return <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{uri:'https://cdn.onenergy.institute/images/wisdom.png'}}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: iconProps.tintColor,
                            alignContent: 'center',
                            marginBottom:0,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'blog'}  top={-3} right={-3} size={scale(10)} showNumber={false} />
                </View>
            default:
                return icon;
        }
    });

    const customUserReducer = reducer => (state = reducer(undefined, {}), action) => {
        switch (action.type) {
            case "COMPLETE_FIRST_COURSE":
                const newState = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        firstCourseCompleted: true
                    }
                }
                return reducer(newState, action);
            case "UPDATE_POINTS":
                const newPoint = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        points:{
                            ...state.userObject.points,
                            point: action.payload,
                        }
                    }
                }
                return reducer(newPoint, action);
            case "UPDATE_USER_POINTS":
                const newUserPoint = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        user_points:state.userObject.user_points.map(item => ({
                            ...item,
                            point: item.label === 'Qi'? action.payload:item.point
                        })),
                    }
                }
                return reducer(newUserPoint, action);
            case "UPDATE_USER_ROUTINE_STATUS":
                const newUserState = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        hasRoutine: action.payload
                    }
                }
                return reducer(newUserState, action);
            case 'UPDATE_USER_COMPLETED_LESSONS':
                const newUserLesson = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        completed_lessons: [...state.userObject.completed_lessons, action.payload]
                    }
                }
                return reducer(newUserLesson, action);
            case 'UPDATE_USER_ENROLLED_COURSES':
                const newUserEnrolledCourse = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        enrolled_courses: [...state.userObject.enrolled_courses, action.payload]
                    }
                }
                return reducer(newUserEnrolledCourse, action);
            case 'UPDATE_USER_COMPLETED_COURSES':
                const newUserCourse = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        completed_courses: [...state.userObject.completed_courses, action.payload]
                    }
                }
                return reducer(newUserCourse, action);
            case 'UPDATE_USER_COMPLETED_ACHIEVEMENTS':
                const newUserAchievement = {
                    ...state,
                    userObject:{
                        ...state.userObject,
                        completed_achievements: action.payload
                    }
                }
                return reducer(newUserAchievement, action);
            default:
                return reducer(state, action);
        }
    }
    externalCodeSetup.profileScreenHooksApi.setIgnoreTabsFilter((
        list,
        isOwnAccount
    ) => [
        ...list,
        "activities",
        "friends",
        "groups",
        "gamipress_ranks",
        "gamipress_achievements"
    ])
    //Add new menu item to profile screen tab list
    externalCodeSetup.profileScreenHooksApi.setTabsList((
        list,
        navigation,
        user,
        isOwnAccount
    ) => {
        return [
            ...list,
            {
                icon: require("@src/assets/img/certificate.png"), //Set icon
                label: "Achievement", //Set label of menu
                onPress: () => navigation.navigate(
                    NavigationActions.navigate({
                        routeName: "MyMilestonesScreen",
                    })
                )
            },
            {
                icon: require("@src/assets/img/privacy_group.png"), //Set icon
                label: "Membership", //Set label of menu
                onPress: () => navigation.navigate(
                    NavigationActions.navigate({
                        routeName: "MyMembership",
                    })
                )
            },
        ]
    })
    externalCodeSetup.reduxApi.wrapReducer(
        'user',
        customUserReducer
    );
    externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
        TrackPlayer.registerPlaybackService(() => require('./Components/TrackPlayerService'));
    })
    externalCodeSetup.blogSingleApi.setAfterBlogSingleBody((props) => {
        const {blog} = props;
        if(blog.meta_box.related_posts&&blog.meta_box.related_posts.length) {
            return(
                <RelatedPostsRow posts={blog.meta_box.related_posts} />
            )
        }else{
            return null;
        }
    })
    externalCodeSetup.deeplinksApi.setDeeplinksWithoutEmbeddedReturnValueFilter((defaultValue, linkObject, navigationService) => {

        if (linkObject.action === "open_screen") {
            switch(linkObject.item_id)
            {
                case 'programs':
                    navigationService.navigate({
                        routeName: "ProgramsScreen",
                    })
                    return true;
                case 'practices':
                    navigationService.navigate({
                        routeName: "PracticesScreen",
                    })
                    return true;
                case 'wisdom':
                    navigationService.navigate({
                        routeName: "BlogsScreen",
                    })
                    return true;
                case 'QuotesScreen':
                    navigationService.navigate({
                        routeName: "QuotesScreen",
                    })
                    return true;
            }
        }
        if(linkObject.action === "inapp") {
            if(linkObject.url.includes('QuotesScreen')) {
                navigationService.navigate({
                    routeName: "QuotesScreen",
                })
                return true;
            }
        }
        return defaultValue;
    });
    const AfterDetailsComponent = ({ user }) => {
        const userInfo = useSelector((state) => state.user.userObject);
        return (
            userInfo.membership&&userInfo.membership.length>0?
            <Text> {userInfo.membership[0].plan.name} </Text>
                :null
        )
    }
    externalCodeSetup.profileScreenHooksApi.setAfterDetailsComponent(AfterDetailsComponent);
    externalCodeSetup.navigationApi.setScreensWithoutTabBar(["EditRoutine", "PracticeGroup", "PracticeMember", "PracticePersonal", "videoPlayer", "vimeoPlayer"])
};



