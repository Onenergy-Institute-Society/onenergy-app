import React, {useState} from "react";
import OnBoarding from './Screens/OnBoarding';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Alert
} from "react-native";
import Svg, {Circle, Path, Rect} from 'react-native-svg';
import {getApi} from "@src/services";
import Icon from "@src/components/Icon";
import AppImageBackground from "@src/components/AppImageBackground";
import { CourseVideo } from "@src/components/Course/CourseStatus";
import InitData from "./Screens/InitData";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {NavigationActions} from "react-navigation";
import {useDispatch, useSelector} from "react-redux";
import AuthWrapper from "@src/components/AuthWrapper";
import moment from 'moment';
import Share from "react-native-share";
import IconButton from "@src/components/IconButton";
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
import BlogScreen from './Screens/BlogScreen';
import CourseScreen from './Screens/CourseScreen';
import ChooseLanguage from './Screens/ChooseLanguage';
import QuestsScreen from './Screens/QuestsScreen';
import MilestonesScreen from './Screens/MilestonesScreen';
import ProgressScreen from './Screens/ProgressScreen';
import VouchersScreen from './Screens/VouchersScreen';
import StatsScreen from './Screens/StatsScreen';
import Membership from './Screens/Membership';
import {scale} from './Utils/scale';
import ImageCache from "./Components/ImageCache";
import {windowWidth} from "./Utils/Dimensions";
import ProgramsScreen from "./Screens/ProgramsScreen";
import EditRoutine from "./Components/EditRoutine";
import FeedbackScreen from "./Screens/FeedbackScreen";
import NotificationTabBarIcon from "./Components/NotificationTabBarIcon";
import TrackPlayer from 'react-native-track-player';
import CourseActionButton from "@src/components/Course/CourseActionButton";
import AppPageScreen from "./Screens/AppPageScreen";
import AppAvatar from "@src/components/AppAvatar";
import LessonScreenHeader from "./Components/LessonScreenHeader";
import TopicScreenHeader from "./Components/TopicScreenHeader";
import QuizScreenHeader from "./Components/QuizScreenHeader";
import {FontWeights} from "@src/styles/global";
import TextBlock from "./Components/TextBlock";
import ImageBlock from "./Components/ImageBlock";
import BgVideoBlock from "./Components/BgVideoBlock";
import RelatedPostsRow from "./Components/RelatedPostsRow";
import FastImage from 'react-native-fast-image';
import PracticesContent from "./Screens/PracticesContent";
import ProgramsContent from "./Screens/ProgramsContent";
import HomeScreen from './Screens/HomeScreen';
import ForumItem from "./Components/ForumItem";
import CourseIcons from "./Components/CourseIcons";

export const applyCustomCode = externalCodeSetup => {
    externalCodeSetup.navigationApi.addNavigationRoute(
        "homePage",
        "Home",
        HomeScreen,
        "Main" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "OnBoarding",
        "OnBoarding",
        OnBoarding,
        "All"
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
        ProgramsContent,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "PracticesScreen",
        "PracticesScreen",
        PracticesContent,
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
        "BlogScreen",
        "BlogScreen",
        BlogScreen,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "CourseScreen",
        "CourseScreen",
        CourseScreen,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "AppPageScreen",
        "AppPageScreen",
        AppPageScreen,
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
        "VideoPlayer",
        "VideoPlayer",
        VideoPlayer,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "VimeoPlayer",
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
        "QuestsScreen",
        "QuestsScreen",
        QuestsScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "MilestonesScreen",
        "MilestonesScreen",
        MilestonesScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "ProgressScreen",
        "ProgressScreen",
        ProgressScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "VouchersScreen",
        "VouchersScreen",
        VouchersScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "Membership",
        "Membership",
        Membership,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "FeedbackScreen",
        "FeedbackScreen",
        FeedbackScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "StatsScreen",
        "StatsScreen",
        StatsScreen,
        "All" // "Auth" | "noAuth" | "Main" | "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "InitData",
        "InitData",
        InitData,
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
        return {...props, order: "desc", categories: [93]}
    });
    //Program screen course list
    const NewWidgetItemCourseComponent = (props) => {
        const {viewModel, colors, global} = props;

        let featuredUrl = viewModel.featuredUrl.replace('-300x200', '-1024x683');
        let statusText;
        let statusBarColor;
        const lesson_time = new moment.utc(viewModel.date);
        const current_time = new moment.utc();
        const diffMinutes = lesson_time.diff(current_time, 'minutes');
        const diffHours = lesson_time.diff(current_time, 'hours');
        const diffDays = lesson_time.diff(current_time, 'days');
        let diffTime;
        if (diffMinutes < 60) {
            diffTime = 'in ' + diffMinutes + ' Minutes';
        } else {
            if (diffHours < 24) {
                diffTime = 'tomorrow';
            } else {
                diffTime = 'in ' + diffDays + ' Days';
            }
        }
        let lessonNote = '';
        if (viewModel.progression === 100) {
            statusBarColor = colors.coursesLabelCompleted;
            statusText = "Completed";
            lessonNote = 'Congratulations on completion';
        } else if (viewModel.price && viewModel.price.expired) {
            statusBarColor = "black";
            statusText = "Expired";
            lessonNote = 'Course is expired, no more access';
        } else if (viewModel.hasAccess) {
            if (lesson_time > current_time) {
                lessonNote = 'Next lesson will be available ' + diffTime;
            } else {
                lessonNote = 'Next lesson is available now';
            }
            const expiringTime = new moment.utc(viewModel.price.expires_on);
            const diffExpiringDays = expiringTime.diff(current_time, 'days');
            let diffExpiringTime;
            diffExpiringTime = 'Expire in ' + diffExpiringDays + ' Days';
            if (diffExpiringDays <= 7 && diffExpiringDays > 0) {
                statusBarColor = "grey";
                statusText = diffExpiringTime;
                lessonNote = 'Course is expiring soon';
            } else {
                if (viewModel.progression > 0) {
                    statusBarColor = colors.coursesLabelProgress;
                    statusText = "In Progress";
                } else {
                    statusBarColor = colors.coursesLabelFree;
                    statusText = "Enrolled";
                    lessonNote = 'Please start your first lesson';
                }
            }
        } else {
            statusBarColor = colors.coursesLabelStart;
            statusText = "Start Course";
        }
        const styles = StyleSheet.create({
            containerStyle: {
                marginHorizontal: scale(15),
                backgroundColor: 'transparent',
            },
            statusBar: {
                height: scale(25),
                position: 'absolute',
                top: 10,
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
            statusText: {
                color: 'white',
                fontSize: scale(13),
                backgroundColor: 'transparent',
                fontFamily: "MontserratAlternates-Regular"
            },
            lessonTime: {
                color: "white",
                fontWeight: "700",
                fontSize: scale(14),
                position: 'absolute',
                bottom: 25,
                alignSelf: "center",
                textShadowColor: 'grey',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 1
            },
            progressBar: {
                height: 3,
                position: 'absolute',
                top: scale(20),
                right:scale(20),
                flexDirection: "row",
                width: (windowWidth -scale(30))/2,
                backgroundColor: 'white',
                borderColor: '#000',
                borderWidth: 0,
                borderRadius: 5,
            },
            image: {
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30)) / 9 * 4,
                borderRadius: 9,
                marginLeft: (windowWidth -scale(30))/9,
                overflow: 'hidden',
                resizeMode: "cover",
            },
            metaOverlay: {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: "flex-start",
                alignItems: "flex-end",
            },
            meta: {
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30)) / 9 * 4,
                borderRadius: 9,
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 10,
                paddingTop: 10,
            },
            icon: {
                width:( windowWidth - scale(30))/2,
                height: (windowWidth - scale(30))/2,
                position: "absolute",
                left: (windowWidth - scale(30)) / 9,
                top: (windowWidth - scale(30)) / 9 + scale(10),
            },
            title: {
                fontSize: scale(20),
                textAlign: 'center',
                justifyContent: "center",
                color: 'white',
                textShadowColor: 'grey',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 1,
                fontWeight: "bold",
                fontFamily: 'MontserratAlternates-SemiBold',
                position: "absolute",
                bottom: scale(10),
                left: 0,
                right: 0,
            },
            card: {
                backgroundColor: 'white',
                borderRadius: 9,
                width: '100%',
                height: scale(150),
                marginTop: scale(15),
                justifyContent: "space-between",
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
                    onPress={viewModel.price.expired && viewModel.hasAccess ? () => alert('Course is expired') : viewModel.onClick}>
                    <View style={[styles.card, styles.boxShadow, {backgroundColor: "#C5B3E9"}]}>
                        <View style={[styles.statusBar, styles.boxShadow, {backgroundColor: statusBarColor}]}><Text
                            style={styles.statusText}>{statusText}</Text></View>
                        {viewModel.progression === 100 ?
                            <View style={{position: "absolute", top: 10, right: 5}}>
                                <Svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 32 32"
                                >
                                    <Path
                                        d="M23 13H9a1 1 0 0 0-1 1v16a1 1 0 0 0 1.39.92L16 28.09l6.61 2.83A1 1 0 0 0 23 31a1 1 0 0 0 .55-.17A1 1 0 0 0 24 30V14a1 1 0 0 0-1-1Z"
                                        fill="#0083fd"/>
                                    <Path d="M23 13H9a1 1 0 0 0-1 1v8.23a12.94 12.94 0 0 0 16 0V14a1 1 0 0 0-1-1Z"
                                          fill="#0072fc"/>
                                    <Circle cx="16" cy="12" r="11" fill="#ffcb5b"/>
                                    <Path d="M6 13a11 11 0 0 1 18.25-8.25 11 11 0 1 0-15.5 15.5A10.92 10.92 0 0 1 6 13Z"
                                          fill="#f7b737"/>
                                    <Path
                                        d="M22.38 10.38a1.9 1.9 0 0 0-1.83-1.33l-2.06.06-.66-2a1.92 1.92 0 0 0-3.66 0l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49L12 13.7l-.65 2a1.89 1.89 0 0 0 .69 2.15 1.93 1.93 0 0 0 2.27 0L16 16.63l1.72 1.25a1.92 1.92 0 0 0 3-2.15L20 13.79l1.72-1.25a1.91 1.91 0 0 0 .66-2.16Z"
                                        fill="#fff5f5"/>
                                    <Path
                                        d="m19.49 10.11 2.06-.06a1.87 1.87 0 0 1 .75.17 1.88 1.88 0 0 0-1.75-1.17h-1.39ZM10.62 11.38a1.9 1.9 0 0 1 1.83-1.33h2.13l.59-2a1.88 1.88 0 0 1 2.58-1.16 1.91 1.91 0 0 0-3.58.16l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49l.42.29a1.91 1.91 0 0 1-.12-1.45ZM12.36 16.73l.65-2-1.08-.73-.57 1.77a1.89 1.89 0 0 0 .69 2.15 2.69 2.69 0 0 0 .38.19 1.87 1.87 0 0 1-.07-1.38Z"
                                        fill="#efe2dd"/>
                                </Svg>
                            </View>
                            :null
                        }
                        <ImageCache style={styles.image} source={{uri: featuredUrl ? featuredUrl : ''}}/>
                        <Text style={styles.title}>{viewModel.title}</Text>
                        <View style={styles.metaOverlay}>
                            {viewModel.progression > 0 && viewModel.progression < 100 && !viewModel.price.expired ?
                                <View style={styles.progressBar}><View style={{
                                    backgroundColor: colors.primaryColor,
                                    width: viewModel.progression + '%'
                                }}/></View>
                                : null}
                            <View style={styles.meta}>
                            </View>
                        </View>
                        <View style={styles.icon}>
                            {viewModel.price.icon?
                                <CourseIcons icon={viewModel.price.icon} />
                                :null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    externalCodeSetup.coursesHooksApi.setWidgetItemCourseComponent(NewWidgetItemCourseComponent)

    //Change author name to nickname in single blog screen
    const BlogHeaderAvatar = ({blog, global, textStyle}) => {
        return (
            <View style={[global.row, {flex: 1}]}>
                {blog.avatar ?
                    <AppAvatar
                        size={35}
                        source={{uri: blog.avatar}}
                        style={{marginRight: 10}}
                    />
                    : null}
                <View>
                    <Text
                        style={[global.text, {fontWeight: FontWeights.semiBold}, textStyle]}>
                        {blog._embedded ? blog._embedded.author[0].name : ''}
                    </Text>
                </View>
            </View>
        );
    }
    externalCodeSetup.blogSingleApi.setBlogHeaderAvatar(BlogHeaderAvatar);

    //Add Blog reducer
    externalCodeSetup.reduxApi.addReducer(
        "postReducer",
        (state = {posts: [], lastView: [], postUpdate: ''}, action) => {
            const currentDate = new Date().toISOString();
            switch (action.type) {
                case "ONENERGY_POSTS_ADD":
                    let posts = action.payload;
                    let postsState;
                    if (state.posts.length > 0) {
                        postsState = {
                            ...state,
                            posts: [...state.posts, ...posts],
                        };
                    } else {
                        postsState = {
                            ...state,
                            posts: posts,
                        };
                    }
                    posts = postsState.posts.sort((a, b) => {
                        if (a.date < b.date) {
                            return 1
                        } else if (a.date > b.date) {
                            return -1
                        } else {
                            return 0
                        }
                    })
                    let categoryIndex = state.lastView.findIndex(lv => lv.category === action.category);

                    if (categoryIndex && categoryIndex >= 0) {
                        return {
                            ...state,
                            posts: posts,
                            lastView: [
                                ...state.lastView.slice(0, categoryIndex),
                                {
                                    category: action.category,
                                    date: currentDate
                                },
                                ...state.lastView.slice(categoryIndex + 1)
                            ],
                            postUpdate: currentDate
                        };
                    } else {
                        return {
                            ...state,
                            posts: posts,
                            lastView: [
                                ...state.lastView,
                                {
                                    category: parseInt(action.category),
                                    date: currentDate
                                }
                            ],
                            postUpdate: currentDate
                        };
                    }
                case "ONENERGY_POSTS_REMOVE_NOTIFY":
                    let postIndex = state.posts.findIndex(post => post.id === action.payload);
                    return {
                        ...state,
                        posts: [
                            ...state.posts.slice(0, postIndex),
                            {
                                ...state.posts[postIndex],
                                notify: false
                            },
                            ...state.posts.slice(postIndex + 1)
                        ]
                    }
                case "ONENERGY_POSTS_RESET":
                    return {
                        ...state,
                        posts: [],
                        lastView: [],
                        postUpdate: '',
                    };
                default:
                    return state;
            }
        }
    );

    //Add Quote Reducer
    externalCodeSetup.reduxApi.addReducer(
        "quoteReducer",
        (state = {quotes: []}, action) => {
            switch (action.type) {
                case "ONENERGY_QUOTES_ADD":
                    let quotes = action.payload;
                    let quotesState;
                    if (state.quotes.length > 0) {
                        quotesState = {
                            ...state,
                            quotes: [...state.quotes, ...quotes],
                        };
                    } else {
                        quotesState = {
                            ...state,
                            quotes: quotes,
                        };
                    }
                    quotes = quotesState.quotes.sort((a, b) => {
                        if (a.date < b.date) {
                            return 1
                        } else if (a.date > b.date) {
                            return -1
                        } else {
                            return 0
                        }
                    })
                    return {
                        ...state,
                        quotes: quotes,
                    };
                default:
                    return state;
            }
        }
    );

    //Add Progress reducer
    externalCodeSetup.reduxApi.addReducer(
        "onenergyReducer",
        (state = {
            practiceReducer: {
                routines: [],
                guides: [],
                groups: [],
                routineUpdate: '',
                guideUpdate: '',
                groupUpdate: '',
            },
            progressReducer: {
                points: {},
                totalDuration: 0,
                todayDuration: 0,
                weekDuration: 0,
                totalDays: 0,
                lastPractice: '',
                latestUpdate: '',
                lastUpload: '',
                actionList: [],
                practicesStats: [],
                routinesStats: [],
                groupStats: [],
                progressUpdate: '',
                completedLessons: [],
                enrolledCourses: [],
                completedCourses: []
            },
            achievementReducer: {
                weekly: {days: [], complete_date: '', claim_date: ''},
                monthly: {days: [], complete_date: '', claim_date: ''},
                achievements: [],
                achievementUpdate: ''
            }
        }, action) => {
            switch (action.type) {
                case "ONENERGY_INIT_DATA":
                    console.log('1')
                    const data = action.payload.data;
                    const loadGroup = action.payload.loadGroup;
                    const loadGuide = action.payload.loadGuide;
                    const loadAchievement = action.payload.loadAchievement;
                    const loadProgress = action.payload.loadProgress;
                    console.log('2')
                    let idPracticeReducer = state.practiceReducer;
                    let idAchievementReducer = state.achievementReducer;
                    console.log(data.achievements)
                    let idProgressReducer = state.progressReducer;
                    console.log('3')
                    if (loadGroup) {
                        if (data.groups) {
                            idPracticeReducer.groups = data.groups;
                        }
                        idPracticeReducer.groupUpdate = new Date().toISOString();
                    }
                    console.log('4')
                    if (loadGuide) {
                        if (data.guides) {
                            idPracticeReducer.guides = data.guides;
                        }
                        idPracticeReducer.guideUpdate = new Date().toISOString();
                    }
                    console.log('5')
                    if (loadAchievement) {
                        if (data.achievements) {
                            idAchievementReducer.achievements = data.achievements.achievements.sort((a, b) => {
                                return a.complete_date > b.complete_date
                            }).sort((a, b) => {
                                return a.claim_date > b.claim_date
                            });
                            idAchievementReducer.weekly = data.achievements.weekly ? data.achievements.weekly : {
                                days: [],
                                complete_date: '',
                                claim_date: ''
                            };
                            idAchievementReducer.monthly = data.achievements.monthly ? data.achievements.monthly : {
                                days: [],
                                complete_date: '',
                                claim_date: ''
                            };
                        }
                        idAchievementReducer.achievementUpdate = new Date().toISOString();
                    }
                    console.log('6')
                    if (loadProgress) {
                        if (data.progress) {
                            idProgressReducer = data.progress;
                        } else {
                            idProgressReducer.points = {'qi': 0};
                            idProgressReducer.totalDuration = 0;
                            idProgressReducer.todayDuration = 0;
                            idProgressReducer.weekDuration = 0;
                            idProgressReducer.totalDays = 0;
                            idProgressReducer.lastPractice = '';
                            idProgressReducer.latestUpdate = '';
                            idProgressReducer.lastUpload = '';
                            idProgressReducer.practicesStats = [];
                            idProgressReducer.routinesStats = [];
                            idProgressReducer.groupStats = [];
                            idProgressReducer.completedLessons = [];
                            idProgressReducer.enrolledCourses = [];
                            idProgressReducer.completedCourses = [];
                        }
                        idProgressReducer.actionList = [];
                        idProgressReducer.progressUpdate = new Date().toISOString();
                    }
                    console.log('7', idPracticeReducer, idAchievementReducer, idProgressReducer)
                    return {
                        ...state,
                        practiceReducer: idPracticeReducer,
                        achievementReducer: idAchievementReducer,
                        progressReducer: idProgressReducer,
                    };
                case "ONENERGY_ROUTINE_UPDATE":
                    return {
                        ...state,
                        practiceReducer: {
                            ...state.practiceReducer,
                            routines: action.payload,
                            routineUpdate: new Date().toISOString()
                        }
                    };
                case "ONENERGY_ROUTINE_SAVE":
                    let routine = action.payload;
                    let ors_tempState = state.practiceReducer.routines;
                    let index = ors_tempState.findIndex(el => el.id === routine.id);
                    if (index !== -1) {
                        ors_tempState[index] = routine;
                        return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                                routines: ors_tempState,
                                routineUpdate: new Date().toISOString()
                            }
                        };
                    } else {
                        return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                                routines:
                                    [
                                        ...state.routines,
                                        routine
                                    ],
                                routineUpdate: new Date().toISOString()
                            }
                        };
                    }
                case "ONENERGY_GUIDE_UPDATE":
                    let lessonGuides = action.payload;
                    let tempGuides = state.practiceReducer.guides;
                    state.practiceReducer.guides.map((section, index) => {
                        let tempIndex = section.data.findIndex(item => lessonGuides.includes(item.id));
                        if (tempIndex >= 0) {
                            tempGuides[index].data[tempIndex].show = true;
                            tempGuides[index].data[tempIndex].new = true;
                        }
                    });
                    return {
                        ...state,
                        practiceReducer: {
                            ...state.practiceReducer,
                            guides: tempGuides
                        }
                    };
                case "ONENERGY_PROGRESS_UPLOADED":
                    console.log('upload_done')
                    return {
                        ...state,
                        progressReducer: {
                            ...state.progressReducer,
                            actionList: [],
                            lastUpload: Math.floor(new Date().getTime() / 1000),
                        }
                    };
                case "ONENERGY_PRACTICE_COMPLETED":
                    let acpTempPracticeState = state.practiceReducer;
                    let acpTempProgressState = state.progressReducer;
                    let acpTempAchievementState = state.achievementReducer;
                    let acpMode = action.payload.mode;
                    let acpData = action.payload.data;
                    let today = new moment().format('YYYY-MM-DD');
                    let tempSection;
                    let updateDaily;
                    let tmpAchievements;
                    let acpTempIndex;

                    updateDaily = today !== state.progressReducer.lastPractice;
                    if (updateDaily) {
                        console.log('21')
                        acpTempProgressState.todayDuration = 0;
                        if (new Date().getDay() === 1) {
                            acpTempProgressState.weekDuration = 0;
                        }
                        acpTempProgressState.totalDays += 1;
                        console.log('22')

                        acpTempAchievementState.achievements.map((item, tempIndex) => {
                            if (item.type === 'daily') {
                                acpTempAchievementState.achievements[tempIndex].complete_date = '';
                                acpTempAchievementState.achievements[tempIndex].claim_date = '';
                            }
                            if (item.trigger === 'progress' && item.triggerField === 'totalDays' && item.complete_date !== today) {
                                acpTempAchievementState.achievements[tempIndex].step += 1;
                                if (parseInt(item.total) <= acpTempProgressState.totalDays) {
                                    acpTempAchievementState.achievements[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    if (acpTempAchievementState.achievements[tempIndex].type === 'daily') {
                                        acpTempAchievementState.achievements[tempIndex].step = 0;
                                        acpTempAchievementState.achievements[tempIndex].list.push(today);
                                    }
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            }
                        })

                        console.log('23')

                        //weekly
                        if (acpTempAchievementState.weekly.days && acpTempAchievementState.weekly.days.length) {
                            console.log('w1')
                            let lastDay = acpTempAchievementState.weekly.days[acpTempAchievementState.weekly.days.length - 1];
                            if (moment(today).diff(moment(lastDay), 'days') > 1) {
                                console.log('w2')
                                acpTempAchievementState.weekly.days = [];
                                acpTempAchievementState.weekly.days.push(today);
                            } else if (acpTempAchievementState.weekly.days.length > 7) {
                                console.log('w3')
                                acpTempAchievementState.weekly.days = [];
                                acpTempAchievementState.weekly.days.push(today);
                            } else {
                                console.log('w4')
                                acpTempAchievementState.weekly.days.push(today);
                                if (acpTempAchievementState.weekly.days.length === 7) {
                                    acpTempAchievementState.weekly.complete_date = today;
                                    acpTempAchievementState.weekly.claim_date = '';
                                }
                            }
                        } else {
                            console.log('w5')
                            acpTempAchievementState.weekly.days = [];
                            acpTempAchievementState.weekly.days.push(today);
                        }

                        //monthly
                        if (acpTempAchievementState.monthly.days && acpTempAchievementState.monthly.days.length) {
                            let lastDay = acpTempAchievementState.monthly.days[acpTempAchievementState.monthly.days.length - 1];
                            if (moment(today).diff(moment(lastDay), 'days') > 1) {
                                acpTempAchievementState.monthly.days = [];
                                acpTempAchievementState.monthly.days.push(today);
                            } else if (acpTempAchievementState.monthly.days.length > 30) {
                                acpTempAchievementState.monthly.days = [];
                                acpTempAchievementState.monthly.days.push(today);
                            } else {
                                acpTempAchievementState.monthly.days.push(today);
                                if (acpTempAchievementState.monthly.days.length === 30) {
                                    acpTempAchievementState.monthly.complete_date = today;
                                    acpTempAchievementState.monthly.claim_date = '';
                                }
                            }
                        } else {
                            acpTempAchievementState.monthly.days = [];
                            acpTempAchievementState.monthly.days.push(today)
                        }
                    }

                    console.log('24')
                    console.log('3')

                    let tempArray = [];
                    switch (acpMode) {
                        case 'PP':
                            console.log('31')

                            tempArray.push({'id': acpData, 'count': 1});
                            break;
                        case 'PR':
                            console.log('32')

                            let routineIndex;
                            routineIndex = state.practiceReducer.routines.findIndex((temp) => temp.id === acpData);
                            tempArray = state.practiceReducer.routines[routineIndex].routine;

                            acpTempIndex = acpTempProgressState.routinesStats.findIndex(item => item.id === acpData)
                            if (acpTempIndex >= 0) {
                                acpTempProgressState.routinesStats[acpTempIndex].count += 1;
                                acpTempProgressState.routinesStats[acpTempIndex].duration += acpTempPracticeState.routines[routineIndex].duration;
                            } else {
                                acpTempProgressState.groupStats.push({
                                    'id': acpData,
                                    'title': state.practiceReducer.routines[routineIndex].title,
                                    'count': 1,
                                    'duration': state.practiceReducer.routines[routineIndex].duration,
                                })
                            }
                            break;
                        case 'PG':
                            console.log('33')

                            let groupIndex;
                            groupIndex = state.practiceReducer.groups.findIndex((temp) => temp.id === acpData);
                            state.practiceReducer.groups[groupIndex].guides.map(tempGuide => {
                                tempArray.push({'id': tempGuide, 'count': 1});
                            });

                            tmpAchievements = state.achievementReducer.achievements.filter((item) =>
                                (item.trigger === 'practice' &&
                                    (
                                        (item.triggerPracticeOption === 'group' && (parseInt(item.triggerGroupPractice) === acpData || !item.triggerGroupPractice))
                                    ) &&
                                    !item.complete_date));

                            tmpAchievements.map((item) => {
                                let tempIndex = acpTempAchievementState.achievements.findIndex(achievement => achievement.id === item.id);
                                acpTempAchievementState.achievements[tempIndex].step += 1;
                                if (acpTempAchievementState.achievements[tempIndex].total <= acpTempAchievementState.achievements[tempIndex].step) {
                                    acpTempAchievementState.achievements[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempAchievementState.achievements[tempIndex].claim_date = '';
                                    if (acpTempAchievementState.achievements[tempIndex].type === 'daily') {
                                        acpTempAchievementState.achievements[tempIndex].list.push(acpTempAchievementState.achievements[tempIndex].complete_date);
                                    }
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            })

                            acpTempIndex = acpTempProgressState.groupStats.findIndex(item => item.id === acpData);
                            if (acpTempIndex >= 0) {
                                acpTempProgressState.groupStats[acpTempIndex].count += 1;
                                acpTempProgressState.groupStats[acpTempIndex].duration += acpTempPracticeState.groups[groupIndex].duration;
                            } else {
                                acpTempProgressState.groupStats.push({
                                    'id': acpData,
                                    'title': state.practiceReducer.groups[groupIndex].name,
                                    'count': 1,
                                    'duration': state.practiceReducer.groups[groupIndex].duration,
                                })
                            }
                            break;
                    }
                    console.log('4')
                    console.log(tempArray);
                    tempArray.map(tempGuide => {
                        //Get the section ID from the guide ID
                        tempSection = state.practiceReducer.guides.find((section) => {
                            if (section.data.find(guide => guide.id === tempGuide.id))
                                return true
                        });
                        console.log('41', tempSection)

                        tmpAchievements = state.achievementReducer.achievements.filter((item) => {
                            if (item.trigger === 'practice' &&
                                (
                                    (item.triggerPracticeOption === 'single' && (parseInt(item.triggerSinglePractice) === tempGuide.id || !item.triggerSinglePractice)) ||
                                    (item.triggerPracticeOption === 'section' && (parseInt(item.triggerSectionPractice) === tempSection.id))
                                ) &&
                                !item.complete_date) {
                                return true;
                            }
                        });
                        console.log('42', state.achievementReducer.achievements, tmpAchievements)

                        tmpAchievements.map((item) => {
                            let tempIndex = acpTempAchievementState.achievements.findIndex(achievement => achievement.id === item.id);
                            acpTempAchievementState.achievements[tempIndex].step += 1;
                            if (acpTempAchievementState.achievements[tempIndex].total <= acpTempAchievementState.achievements[tempIndex].step) {
                                acpTempAchievementState.achievements[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                acpTempAchievementState.achievements[tempIndex].claim_date = '';
                                if (acpTempAchievementState.achievements[tempIndex].type === 'daily') {
                                    acpTempAchievementState.achievements[tempIndex].list.push(acpTempAchievementState.achievements[tempIndex].complete_date);
                                }
                                acpTempProgressState.actionList.push({
                                    'mode': 'CA',
                                    'data': {'id': item.id, 'points': item.awards},
                                    'time': Math.floor(new Date().getTime() / 1000)
                                });
                            }
                        })
                        console.log('43')

                        acpTempPracticeState.guides.map((section, acpSectionIndex) => {
                            let acpGuideIndex = section.data.findIndex(item => item.id === tempGuide.id);
                            if (acpGuideIndex >= 0) {
                                acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].new = false;
                                acpTempProgressState.totalDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                acpTempProgressState.todayDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                acpTempProgressState.weekDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;

                                acpTempIndex = acpTempProgressState.practicesStats.findIndex(item => item.id === acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].id)
                                if (acpTempIndex >= 0) {
                                    acpTempProgressState.practicesStats[acpTempIndex].count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count;
                                    acpTempProgressState.practicesStats[acpTempIndex].duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                } else {
                                    acpTempProgressState.practicesStats.push({
                                        'id': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].id,
                                        'title': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].title,
                                        'type': 'PP_SINGLE',
                                        'count': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count,
                                        'duration': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count
                                    })
                                }
                                console.log(acpTempPracticeState.guides[acpSectionIndex])
                                acpTempIndex = acpTempProgressState.practicesStats.findIndex(item => item.id === acpTempPracticeState.guides[acpSectionIndex].id)
                                if (acpTempIndex >= 0) {
                                    acpTempProgressState.practicesStats[acpTempIndex].count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count;
                                    acpTempProgressState.practicesStats[acpTempIndex].duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                } else {
                                    acpTempProgressState.practicesStats.push({
                                        'id': acpTempPracticeState.guides[acpSectionIndex].id,
                                        'title': acpTempPracticeState.guides[acpSectionIndex].title,
                                        'type': 'PP_SECTION',
                                        'count': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count,
                                        'duration': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count
                                    })
                                }

                            }
                        });
                    })
                    console.log('5', acpTempProgressState)

                    acpTempProgressState.actionList.push({
                        'mode': acpMode,
                        'data': acpData,
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    console.log('6')
                    acpTempProgressState.lastPractice = new moment().format('YYYY-MM-DD');
                    acpTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)

                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements:
                                acpTempAchievementState.achievements.sort((a, b) => {
                                    return a.complete_date > b.complete_date
                                }).sort((a, b) => {
                                    return a.claim_date > b.claim_date
                                }),
                            weekly: acpTempAchievementState.weekly,
                            monthly: acpTempAchievementState.monthly
                        },
                        progressReducer: acpTempProgressState,
                        practiceReducer: acpTempPracticeState
                    };
                case "ONENERGY_ACHIEVEMENT_CLAIM":
                    let acTempAchievementState = state.achievementReducer.achievements;
                    let acTempProgressState = state.progressReducer;
                    let acAchievementIndex = acTempAchievementState.findIndex(achievement => achievement.id === action.payload.id);
                    acTempAchievementState[acAchievementIndex].claim_date = new moment().format('YYYY-MM-DD');
                    console.log('claim');
                    if (action.payload.mode === 'daily') {
                        let dailyListItemIndex = acTempAchievementState[acAchievementIndex].list.findIndex(item => item === action.payload.date)
                        if (dailyListItemIndex >= 0) {
                            acTempAchievementState[acAchievementIndex].list.splice(dailyListItemIndex, 1);
                        }
                    }
                    acTempAchievementState[acAchievementIndex].awards.map(award => {
                        if (acTempProgressState.points[award.name]) {
                            acTempProgressState.points[award.name] += parseInt(award.point);
                        } else {
                            acTempProgressState.points[award.name] = parseInt(award.point);
                        }
                    })
                    acTempProgressState.actionList.push({
                        'mode': 'CM',
                        'data': {'id': action.payload.id, 'points': acTempAchievementState[acAchievementIndex].awards},
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    acTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)

                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements: acTempAchievementState.sort((a, b) => {
                                return a.complete_date > b.complete_date
                            }).sort((a, b) => {
                                return a.claim_date > b.claim_date
                            }),
                        },
                        progressReducer: acTempProgressState
                    };
                case "ONENERGY_ACHIEVEMENT_CLAIM_DAILY":
                    let awcTempQuestState = state.achievementReducer.achievements;
                    let awcAchievementIndex = awcTempQuestState.findIndex(achievement => achievement.id === action.payload.id);
                    let awcTempProgressState = state.progressReducer;
                    let awcWaitItemIndex = awcTempQuestState[awcAchievementIndex].list.findIndex(waitItem => waitItem === action.payload.date);
                    console.log('claim daily')
                    console.log(awcTempQuestState[awcAchievementIndex], awcAchievementIndex, awcWaitItemIndex)
                    if (awcAchievementIndex >= 0) {
                        awcTempQuestState[awcAchievementIndex].list.splice(awcWaitItemIndex, 1);
                        awcTempQuestState[awcAchievementIndex].awards.map(award => {
                            if (awcTempProgressState.points[award.name]) {
                                awcTempProgressState.points[award.name] += parseInt(award.point);
                            } else {
                                awcTempProgressState.points[award.name] = parseInt(award.point);
                            }
                        })
                        awcTempProgressState.actionList.push({
                            'mode': 'CM',
                            'data': {'id': action.payload.id, 'points': awcTempQuestState[awcAchievementIndex].awards},
                            'time': Math.floor(new Date().getTime() / 1000)
                        });
                        awcTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)
                    }
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements: awcTempQuestState,
                        }
                    };
                case "ONENERGY_ACHIEVEMENT_CLAIM_WEEKLY_MONTHLY":
                    let acwTempAchievementState = state.achievementReducer;
                    let acwTempProgressState = state.progressReducer;
                    switch (action.payload.mode) {
                        case 'weekly':
                            acwTempAchievementState.weekly.claim_date = new moment().format('YYYY-MM-DD');
                            acwTempProgressState.points.qi += 20;
                            acwTempProgressState.actionList.push({
                                'mode': 'CM',
                                'data': {'id': action.payload.id, 'points': {'qi': 20}},
                                'time': Math.floor(new Date().getTime() / 1000)
                            });
                            break;
                        case 'monthly':
                            acwTempAchievementState.monthly.claim_date = new moment().format('YYYY-MM-DD');
                            acwTempProgressState.points.qi += 100;
                            acwTempProgressState.actionList.push({
                                'mode': 'CM',
                                'data': {'id': action.payload.id, 'points': {'qi': 100}},
                                'time': Math.floor(new Date().getTime() / 1000)
                            });
                            break;
                    }
                    acwTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            weekly: acwTempAchievementState.weekly,
                            monthly: acwTempAchievementState.monthly
                        },
                        progressReducer: acwTempProgressState
                    };
                case "ONENERGY_LESSON_COMPLETED":
                    let olcTempProgressState = state.progressReducer;
                    let olcTempAchievementState = state.achievementReducer.achievements;
                    let lesson = action.payload;
                    let olcTempAchievements = state.achievementReducer.achievements.filter(item =>
                        (item.trigger === 'course' &&
                            (
                                parseInt(item.triggerCourse) === lesson.parent.id || !item.triggerCourse
                            ) &&
                            !item.complete_date)
                    );
                    console.log('2', lesson);

                    olcTempAchievements.map((item) => {
                        let tempIndex = olcTempAchievementState.findIndex(achievement => achievement.id === item.id);
                        let tempLessonIndex = olcTempAchievementState[tempIndex].step.findIndex(item => item.id === lesson.id);
                        olcTempAchievementState[tempIndex].step[tempLessonIndex].completed = 1;
                        console.log('3', lesson.settings.next_lesson);

                        if (!lesson.settings.next_lesson) {
                            olcTempAchievementState[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                            olcTempAchievementState[tempIndex].claim_date = '';
                            if (olcTempAchievementState[tempIndex].type === 'daily') {
                                olcTempAchievementState[tempIndex].list.push(olcTempAchievementState[tempIndex].complete_date);
                            }

                            olcTempProgressState.actionList.push({
                                'mode': 'CA',
                                'data': {'id': item.id, 'points': item.awards},
                                'time': Math.floor(new Date().getTime() / 1000)
                            });
                        }
                    })
                    console.log('5')
                    olcTempProgressState.completedLessons.push({
                        "id": lesson.id,
                        "date": Math.floor(new Date().getTime() / 1000)
                    });
                    olcTempProgressState.actionList.push({
                        'mode': 'LC',
                        'data': lesson.id,
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    console.log('6')
                    if (!lesson.settings.next_lesson) {
                        olcTempProgressState.completedCourses.push({
                            "id": lesson.parent.id,
                            "date": Math.floor(new Date().getTime() / 1000)
                        });
                        olcTempProgressState.actionList.push({
                            'mode': 'CC',
                            'data': lesson.parent.id,
                            'time': Math.floor(new Date().getTime() / 1000)
                        });
                    }
                    olcTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements:
                                olcTempAchievementState.sort((a, b) => {
                                    return a.complete_date > b.complete_date
                                }).sort((a, b) => {
                                    return a.claim_date > b.claim_date
                                }),
                        },
                        progressReducer: olcTempProgressState
                    };
                case 'ONENERGY_COURSE_ENROLLED':
                    let oceTempProgressState = state.progressReducer;
                    oceTempProgressState.enrolledCourses.push({
                        "id": action.payload,
                        "date": Math.floor(new Date().getTime() / 1000)
                    });
                    oceTempProgressState.actionList.push({
                        'mode': 'CE',
                        'data': action.payload,
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    oceTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)
                    return {
                        ...state,
                        progressReducer: oceTempProgressState
                    }
                case 'ONENERGY_ACHIEVEMENT_RESET':
                    return {
                        ...state,
                        achievementReducer: {
                            achievements: [],
                            weekly: {days: [], complete_date: '', claim_date: ''},
                            monthly: {days: [], complete_date: '', claim_date: ''},
                            achievementUpdate: ''
                        }
                    }
                case "ONENERGY_PRACTICE_RESET":
                    return {
                        ...state,
                        practiceReducer: {
                            routines: [],
                            guides: [],
                            groups: [],
                            routineUpdate: '',
                            guideUpdate: '',
                            groupUpdate: ''
                        }
                    };
                case "ONENERGY_PROGRESS_RESET":
                    return {
                        ...state,
                        progressReducer: {
                            points: {"qi": 0},
                            totalDuration: 0,
                            todayDuration: 0,
                            weekDuration: 0,
                            totalDays: 0,
                            latestUpdate: '',
                            lastUpload: '',
                            actionList: [],
                            practicesStats: [],
                            routinesStats: [],
                            groupStats: [],
                            completedLessons: [],
                            enrolledCourses: [],
                            completedCourses: [],
                            progressUpdate: '',
                        }
                    }
                default:
                    return state;
            }
        }
    );

    // Add Video reducer for course completion
    externalCodeSetup.reduxApi.addReducer(
        "videoReducer",
        (state = {videoComplete: false}, action) => {
            switch (action.type) {
                case "ONENERGY_VIDEO_COMPLETED":
                    return {
                        ...state,
                        videoComplete: true
                    };
                case "ONENERGY_VIDEO_RESET":
                    return {
                        ...state,
                        videoComplete: false
                    };
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
        (state = {languages: defaultLanguage}, action) => {
            switch (action.type) {
                case "ONENERGY_DEFAULT_LANGUAGE": {
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
                case "ONENERGY_CHANGE_SUBTITLE": {
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
        let whiteList = [...props.whitelist, "languagesReducer", "postReducer", "onenergyReducer",];
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
        const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
        const lesson_time = new moment.utc(courseVM.date);
        const current_time = new moment.utc();
        const diffMinutes = lesson_time.diff(current_time, 'minutes');
        const diffHours = lesson_time.diff(current_time, 'hours');
        const diffDays = lesson_time.diff(current_time, 'days');
        const dispatch = useDispatch();
        const [visualGuide, setVisualGuide] = useState(false);

        let diffTime;
        if (diffMinutes < 60) {
            diffTime = 'in ' + diffMinutes + ' minutes';
        } else {
            if (diffHours < 24) {
                diffTime = 'tomorrow';
            } else {
                diffTime = 'in ' + diffDays + ' days';
            }
        }
        const [buttonEnroll, setButtonEnroll] = useState('Start Now');

        const buttonText = "Next lesson will be available " + diffTime;
        if (courseVM.progression === 100) {
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
        } else if (courseVM.price && courseVM.price.expired) {
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
        } else if (courseVM.hasAccess) {
            let Info = null;
            if (courseVM.price.expires_on) {
                let diffExpiringTime = '';
                const expiringTime = new moment.utc(courseVM.price.expires_on);
                const diffExpiringDays = expiringTime.diff(current_time, 'days');
                diffExpiringTime = 'Course expires in ' + diffExpiringDays + ' days, please finish all the lesson in time.';
                Info =
                    diffExpiringDays <= 7 && diffExpiringDays > 0 ?
                        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                            <Text style={{color: "red", fontSize: scale(14)}}>{diffExpiringTime}</Text>
                        </View>
                        : null
            }
            return [Info,
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    {lesson_time > current_time && courseVM.progression > 0 ?
                        <CourseActionButton
                            onPress={() => continueCourse()}
                            title={buttonText}
                            style={{backgroundColor: colors.coursesLabelProgress}}
                        />
                        :
                        <CourseActionButton
                            onPress={() => continueCourse()}
                            title={"Continue"}
                        />
                    }
                </View>
            ]
        } else {
            if (user && courseVM.price.required_points > 0 && progressReducer && progressReducer.points && progressReducer.points.length ? progressReducer.points.qi : 0 < courseVM.price.required_points && courseVM.error.message) {
                const Info =
                    <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                        <Text style={{color: "red", fontSize: scale(14)}}>{courseVM.error.message}</Text>
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
                                NavigationActions.navigate({
                                    routeName: "PracticesScreen",
                                })
                            )}
                            style={{backgroundColor: colors.coursesLabelNotEnrolled}}
                        />
                    </View>
                return [Info, Redirect];
            } else {
                return [
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <CourseActionButton
                            onPress={() => {
                                setVisualGuide(false);
                                setButtonEnroll('Enrolling, please wait...');
                                startCourse();
                                dispatch({
                                    type: 'ONENERGY_COURSE_ENROLLED',
                                    payload: courseVM.id
                                });
                            }}
                            title={buttonEnroll}
                        />
                        {visualGuide ?
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setVisualGuide(false);
                                    setButtonEnroll('Enrolling, please wait...');
                                    startCourse();
                                    dispatch({
                                        type: 'ONENERGY_COURSE_ENROLLED',
                                        payload: courseVM.id
                                    });
                                }}>
                                <FastImage style={{
                                    bottom: scale(-80),
                                    right: scale(80),
                                    position: "absolute",
                                    transform: [{rotate: '180deg'}],
                                    width: scale(200),
                                    height: scale(240),
                                    shadowColor: "#000",
                                    shadowOffset: {width: 2, height: -4},
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    elevation: 4,
                                }} source={require('./assets/images/tapFinger.gif')}/>
                            </TouchableWithoutFeedback>
                            : null
                        }
                    </View>
                ]
            }
            //            return [CourseButton];
        }
    })

    //Custom back button in Single Lesson Screen
    externalCodeSetup.lessonSingleScreenApi.setLessonScreenHeader(props => <LessonScreenHeader {...props}/>)

    //Custom back button in Single Topic Screen
    externalCodeSetup.learnTopicSingleScreenApi.setLearnTopicScreenHeader(props => <TopicScreenHeader {...props}/>)

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
        if (lesson.completed) {
            return lessonButton
        } else {
            return Buttons;
        }
    })
    externalCodeSetup.blogSingleApi.setTransformBlogHeaderButtons((buttons, blog) => {
        const hasCover = !!blog.featuredImage;
        const iconBackgroundColor = hasCover ? "#FFFFEF" : "#4A4D34";
        const iconTintColor = hasCover ? "#4A4D34" : "#FFFFEF";
        const regex = /(<([^>]+)>)/ig;

        if (blog.meta_box.share_url && blog.meta_box.share_url !== '') {
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
                style={{height: 28, width: 28}}
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
                style={{height: 28, width: 28}}
                rtlStyleFix={"handled"}
            />

            return [facebook, twitter];
        } else {
            return [];
        }

    })

    externalCodeSetup.navigationApi.setBottomTabBarIcon((icon, iconProps) => {
        const routeLabel = iconProps.route.routes[0].params.item?.label;
        switch (routeLabel) {
            case "Home":
                return <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                    >
                        {iconProps.focused ?
                            <Path
                                d="m19.16 8.04-4-3.57a4.739 4.739 0 0 0-6.32 0l-4 3.57c-1.01.9-1.59 2.19-1.59 3.55v6.36c0 2.1 1.68 3.81 3.75 3.81h10c2.07 0 3.75-1.71 3.75-3.81v-6.36c0-1.35-.58-2.65-1.59-3.55Zm-3.41 10.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-1.24-1.01-2.25-2.25-2.25s-2.25 1.01-2.25 2.25v3c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3C8.25 13.68 9.93 12 12 12s3.75 1.68 3.75 3.75v3Z"
                                fill={iconProps.tintColor}
                            />
                            :
                            <Path
                                d="m19.16 8.04-4-3.57a4.739 4.739 0 0 0-6.32 0l-4 3.57c-1.01.9-1.59 2.19-1.59 3.55v6.36c0 2.1 1.68 3.81 3.75 3.81h10c2.07 0 3.75-1.71 3.75-3.81v-6.36c0-1.35-.58-2.65-1.59-3.55Zm-4.91 12.21h-4.5V17c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v3.25Zm5-2.31c0 1.27-1.01 2.31-2.25 2.31h-1.25V17c0-2.07-1.68-3.75-3.75-3.75S8.25 14.93 8.25 17v3.25H7c-1.24 0-2.25-1.03-2.25-2.31v-6.36c0-.93.4-1.81 1.09-2.43l4-3.57a3.24 3.24 0 0 1 4.32 0l4 3.57c.69.62 1.09 1.5 1.09 2.43v6.36Z"
                                fill={iconProps.tintColor}
                            />
                        }
                    </Svg>
                </View>
            case "Programs":
                return <View
                    style={{
                        height: 24,
                        width: 24,
                        borderRadius: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 512 512"
                    >
                        {iconProps.focused ?
                            <>
                                <Path d="M88.772 385.787c-12.01 0-21.781 9.771-21.781 21.782s9.771 21.781 21.781 21.781 21.782-9.771 21.782-21.781-9.772-21.782-21.782-21.782z" fill={iconProps.tintColor} />
                                <Path d="M177.544 407.568c0-48.949-39.823-88.772-88.772-88.772S0 358.619 0 407.568s39.823 88.771 88.772 88.771 88.772-39.822 88.772-88.771zM88.772 459.35c-28.552 0-51.781-23.229-51.781-51.781 0-28.553 23.229-51.782 51.781-51.782 28.553 0 51.782 23.229 51.782 51.782 0 28.552-23.229 51.781-51.782 51.781z" fill={iconProps.tintColor} />
                                <Path d="M491.361 97.918H207.544v309.65c0 45.059-25.223 84.338-62.29 104.46h346.107c11.435 0 20.704-9.27 20.704-20.704V118.622c0-11.434-9.269-20.704-20.704-20.704zM269.404 464.28c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm60.618 281.779c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zM390.64 464.28c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm60.618 281.779c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z" fill={iconProps.tintColor} />
                                <Path d="M177.544 88.809c0-48.949-39.823-88.772-88.772-88.772S0 39.859 0 88.809v239.946c21.772-24.496 53.498-39.958 88.772-39.958s67 15.462 88.772 39.958z" fill={iconProps.tintColor} />
                            </>
                            :
                            <>
                                <Path d="M497.018 102.758H219.872C216.108 45.464 168.304 0 110.074 0 49.395 0 .028 49.366.028 110.045V402c0 60.68 49.366 110.046 110.045 110.046h386.944c8.284 0 15-6.716 15-15V117.758c.001-8.284-6.715-15-14.999-15zm-466.99 7.287C30.028 65.908 65.937 30 110.074 30c44.138 0 80.046 35.908 80.046 80.045v216.521c-20.08-21.296-48.536-34.612-80.046-34.612s-59.965 13.316-80.045 34.612V110.045zm0 291.955c0-44.137 35.908-80.045 80.045-80.045 44.138 0 80.046 35.908 80.046 80.045 0 44.138-35.908 80.046-80.046 80.046-44.136 0-80.045-35.908-80.045-80.046zm451.99 80.046h-296.51c21.296-20.08 34.612-48.536 34.612-80.046V132.758h261.898z" fill={iconProps.tintColor} />
                                <Path d="M158.763 402c0-26.847-21.842-48.688-48.689-48.688S61.386 375.154 61.386 402s21.842 48.688 48.688 48.688c26.847.001 48.689-21.841 48.689-48.688zm-67.378 0c0-10.305 8.384-18.688 18.688-18.688 10.305 0 18.689 8.384 18.689 18.688s-8.384 18.688-18.689 18.688c-10.304.001-18.688-8.383-18.688-18.688zM266.347 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15z" fill={iconProps.tintColor} />
                            </>
                        }
                    </Svg>
                    <AuthWrapper actionOnGuestLogin={'hide'}>
                        <NotificationTabBarIcon notificationID={'blog'} top={-3} right={-3} size={scale(10)}
                                                showNumber={false}/>
                    </AuthWrapper>
                </View>
            case "QiGong":
                return <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 512 512"
                    >
                        {iconProps.focused ?
                            <>
                                <Path d="M206 6c-27.3 2.4-57 12.3-81.9 27.2C102.7 46 76.7 68.8 60.6 89c-6.8 8.6-21 29.4-26.2 38.5l-2.8 4.9 7.8-6.6c60.4-51.6 146.4-59 224.2-19.3 24 12.3 45.7 28.5 63.7 47.6l9.6 10.1 2-6.5c3.5-11.4 5.3-21.9 6-34.2.8-15.1-.2-25.9-3.4-37.2C328.1 39 284 8.2 226 5.7c-5.8-.3-14.8-.1-20 .3zM356.6 26.2c41.4 40.3 75.3 101 94 168.3 23.5 84.7 20.3 170.7-8.6 230.9-2.6 5.5-4.7 10.2-4.5 10.4.5.5 17.9-19.9 24.2-28.4 13.5-18.3 26.9-43.3 34.8-64.8 10.7-29.2 16.4-65.2 15.1-96.1-1.7-38.9-9.9-71.2-27.2-106-25.7-51.9-70.5-94.9-123.3-118.4-5.9-2.7-11.8-5.2-13-5.6-1.2-.3 2.7 4 8.5 9.7z" fill={iconProps.tintColor} />
                                <Path d="M339.4 39c.8 1.4 3.4 5.2 5.6 8.5 12.2 18 20 44.1 20 67 0 45.3-13.4 80.2-41.6 108.8-18.6 18.8-39.8 32.1-68.7 43-19.4 7.3-33.6 16.7-48.8 32-19.9 20.1-33.5 45.7-37 69.7-1.4 10-.7 28.4 1.5 39 10.2 47.8 46 86.5 89.1 96.5 37.7 8.8 84.6-3.1 118.8-29.9 36.3-28.4 58.2-73.1 65.2-133.1 2-17 2-52.1 0-71.3-8.9-85.9-45.2-170-96-222.7-5.4-5.5-9-8.9-8.1-7.5zm54.2 185.7c7.4 3.6 15.6 12.5 18.5 20 3.1 8.1 3 19.6-.1 27.8-3.2 8.4-13.2 18.3-21.4 21.4-6.2 2.3-16.1 3-22.6 1.6-10.3-2.2-21-11.1-25.8-21.3-2.4-5-2.7-7-2.7-15.7 0-8.8.3-10.7 2.7-15.7 8.9-19.1 32.5-27.4 51.4-18.1zm-81.1 90.7c29.8 10.1 48.5 35.9 48.7 67.1.1 12.1-1.7 20-7.2 31-11.6 23.7-32.8 37.7-59.1 39.2-11.5.7-20.2-.7-30.1-4.7-16.2-6.6-28.7-18.2-36.3-33.5-5.9-11.8-7.8-19.6-7.8-32 0-33.6 22.5-61.4 55.8-69.1 9.6-2.2 26.2-1.3 36 2z" fill={iconProps.tintColor} />
                                <Path d="M372.4 239c-9.3 2.2-15.4 9.9-15.4 19.4 0 10.8 6.2 18 17.1 20.1 7.3 1.4 16.8-3.6 20.4-10.5 7.7-15-6-32.9-22.1-29zM279.3 334.4c-25 6.1-42 32.2-37 56.9 2.1 10.3 5.9 17.8 12.8 25.1 23.7 25.3 64.7 19.1 80.2-12.2l4.2-8.5v-13.1c0-13.1 0-13.1-3.7-20.9-10.3-21.4-33.8-32.8-56.5-27.3zM141.6 103.1c-32.8 3.8-62.7 16.9-89.4 39.3-8 6.7-22.1 21.2-23 23.5-.1.5 3.2-.2 7.5-1.4 27.9-8.1 57.9-7.8 86.8.7 11.5 3.4 30.8 12.5 41 19.3 23.1 15.6 42.7 37.4 55.6 61.9l5.3 10.2 7.5-3.8c4.1-2.1 10.5-4.7 14.1-5.9 17-5.4 41-19.6 56.4-33.2 6.8-6 18-19.4 21.2-25.2l1.8-3.3-4.3-5.6c-2.4-3-8.3-9.6-13.2-14.5-44.3-44.5-109.6-68.7-167.3-62z" fill={iconProps.tintColor} />
                                <Path d="M51.5 180.5c-12.9 2.1-34.5 8.6-34.5 10.4 0 .4 1.5 1.4 3.3 2.3 10 4.8 30.1 22.4 41 35.8 19.8 24.5 34.6 52.9 60.7 115.9 14.6 35.4 25 59.2 26.3 60.6.6.7.7.1.3-1.5-1.7-6-1.8-30.5-.2-40.5 5.2-31.3 21.4-60.1 48.3-85.4l10.6-10-3.7-7.8c-18.8-39.5-56.8-69-101.3-78.4-13-2.8-38.1-3.4-50.8-1.4zM3.1 216.7c-4.5 30.5-3.8 59.1 2.4 89.9 18 89.5 82.5 162.2 170 191.5 7.7 2.6 14.1 4.6 14.3 4.5.1-.2-3.9-4.3-8.9-9.2-25.3-24.8-43.2-55.8-71.4-123.9-29.8-72-36.9-86.9-54.1-112.7-9-13.4-22.8-28.9-32.4-36.3C17.4 216.2 6.1 209 4.9 209c-.4 0-1.2 3.5-1.8 7.7z" fill={iconProps.tintColor} />
                            </>
                            :
                            <>
                                <Path d="M230 1.5C169.8 8.1 118 32.9 75.4 75.4 32.6 118.3 7.9 170.1 1.5 230.8c-5.7 53.7 7.3 111.1 35.7 157.7 20.8 34 52.3 65.5 86.3 86.3 46.5 28.4 104.1 41.4 157.5 35.7 32.6-3.4 58.5-10.9 87.5-25 51.3-25 93.8-67.9 118.4-119.5 33.3-70.1 33.3-149.8 0-220-20.9-43.9-56.4-83.1-98.4-108.8C341.9 8.8 283.5-4.4 230 1.5zm21 24.3c38 8.1 65.6 28.5 79.6 58.8 5.8 12.5 7.6 21 8.1 37.9.5 15.3-.6 25.4-4.3 38.3-3.2 11.4-2 11.5-14.1-.9-5.9-6.1-14.2-13.8-18.3-17.2-27.1-21.9-61.8-38.1-97-45.3-12.3-2.5-15.5-2.8-36-2.8-19.6-.1-23.9.2-33.5 2.2-30.6 6.3-58.2 19.5-80 38-3.8 3.3-7.2 5.9-7.4 5.7-.4-.5 5.7-10.6 13.1-21.7C74.7 98.6 96 75.6 113.8 62.1c28-21.2 59.1-34 93.2-38.5 8.4-1 34.7.3 44 2.2zM348.1 36c55 22.7 102.3 69.5 125.8 124.2 9.7 22.7 16.6 48.7 19 71.8 1.3 13 .6 45.3-1.3 57.5-6.5 41.1-22.6 78.7-47.6 111.5-6.2 8.1-19 22.3-19.6 21.7-.2-.2 1.4-3.9 3.5-8.3 21.8-44.7 28.5-105.4 18.5-169.2-6.4-41.5-19-81-37.9-118.9-16.7-33.7-36.6-61.6-59.8-84.1-5.3-5-9.2-9.2-8.8-9.2.5 0 4.1 1.4 8.2 3zm-4.2 28.2c18.9 21 31.6 39.3 45.1 65.1 20.6 39.4 34 82.4 40.7 130.7 2.2 15.8 2.5 62.2.5 78-8.3 66-39.2 114.4-87.2 136.9-20.7 9.7-38 13.5-60 13.5-13.5-.1-16.8-.4-25.4-2.7-41.8-11.2-73.6-47.4-82.1-93.6-6.4-34.8 6.4-70.3 35.7-98.7 14.6-14.2 26.3-21.7 43.9-28.2 44.9-16.7 76.9-45.6 91.9-83 5-12.4 7.5-23.8 9.1-40.7 3.2-35.3-4.5-63.1-24.4-88.3-.6-.8-.6-1.2.1-1.2.6 0 6 5.5 12.1 12.2zm-151.6 50.3c17.2 2.6 30.2 6.1 46 12.4 29.4 11.7 58.4 32.8 78 56.5l5.6 6.9-1.7 2.9c-3.4 5.9-14.4 18.8-20.5 24.1-14.8 13-30.8 22.5-50.3 29.8-5.8 2.2-12.9 5.2-15.7 6.7-2.9 1.4-5.5 2.7-5.8 2.7-.4 0-2.8-4.2-5.5-9.2-20.4-38.8-55.3-66.6-97-77.3-9.9-2.6-14.5-3.2-27.4-3.7-17.3-.6-27.9.4-42.7 4.3-5.3 1.3-9.8 2.2-10.1 1.9-1.3-1.3 17.3-19.2 29.3-28.4 22.5-17 46.4-26.7 75-30.4 8.1-1.1 33.4-.6 42.8.8zM112.9 187c40.9 8 77.1 36.1 95 73.7l3.5 7.2-3 2.2c-1.6 1.2-7.7 7-13.5 12.9-27.3 27.6-41.2 61.3-39.6 95.9.3 6.9.9 13.7 1.3 15.1.5 1.7.3 2.2-.4 1.5-1.5-1.5-8.6-17.6-24.3-55.3-22.5-54.1-34.1-77.4-48.7-98-12.7-18-24.7-29.9-40.9-40.8-5.2-3.5-8.1-6-7.5-6.6 1.3-1.3 16.6-6.3 23.8-7.8 15.8-3.3 37.5-3.3 54.3 0zm-80.1 31c20.9 14 38.4 36.2 55.6 70.8 8.8 17.7 13.7 28.7 29.6 67.2 28.4 68.5 44.3 96.4 68.3 120.1 4.9 4.9 8.5 8.9 7.9 8.9-2.1 0-17.8-5.3-27.7-9.3-18.5-7.4-36.9-17.9-53.4-30.2-13.3-9.9-37.5-34-46.9-46.6-25.2-33.9-40-70.2-46.3-113.4-3-20.5-.7-73.5 3.1-73.5.5 0 4.9 2.7 9.8 6z" fill={iconProps.tintColor} />
                                <Path d="M361 224.4c-28 6.4-37.3 40.4-16.3 59.6 13.4 12.3 33.2 12.2 46.8-.1 7-6.5 10.6-13.7 11.3-22.8 1.6-23.4-19.3-41.9-41.8-36.7zm16 17.1c6.4 3.3 10.4 10.7 9.8 18.1-1.6 19.3-26.7 24.2-35.3 7-3.1-6.1-3.2-10.6-.4-16.3 4.6-9.6 16.5-13.6 25.9-8.8zM275.5 309.5c-3.8.8-11.2 3.5-16.4 6.1-39.9 19.7-48.1 72.9-16 104.6 8.4 8.3 21.3 15 33.8 17.4 26.9 5.3 56.2-8.8 68.8-33.2 5.5-10.6 7.6-18.8 7.7-30.4.1-11.8-1.4-18-7-29.8-12.3-25.7-42.6-40.5-70.9-34.7zm21 18.5c24.1 3.9 41.7 28.5 37.7 52.6-6.2 37.2-51.6 52.1-78.1 25.6-18.7-18.7-18.7-46.5.1-65.5 10.6-10.8 24.8-15.2 40.3-12.7z" fill={iconProps.tintColor} strokeWidth="2" />
                            </>
                        }
                    </Svg>
                    <AuthWrapper actionOnGuestLogin={'hide'}>
                        <NotificationTabBarIcon notificationID={'guide_page'} top={-3} right={-3} size={scale(10)}
                                                showNumber={false}/>
                    </AuthWrapper>
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
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 512 512"
                    >
                        {iconProps.focused ?
                            <Path
                                d="M123.745 304.866c3.279 15.385 19.544 28.438 44.625 35.81 28.632 8.417 64.718 8.721 101.61.861 36.892-7.862 69.718-22.852 92.432-42.209 19.897-16.957 29.429-35.506 26.15-50.892-4.235-19.87-34.819-36.617-74.936-41.313-12.384 4.382-26.52 6.745-41.649 6.746-8.842.001-18.019-.814-27.378-2.486-35.706 8.026-69.236 23.351-92.363 42.277-21.322 17.447-31.707 36.112-28.491 51.206zM245.423 180.989c21.233 4.524 42.959 3.521 59.609-2.754 8.456-3.187 23.089-10.635 26.088-24.708 3-14.076-7.334-26.854-13.761-33.217-12.151-12.033-30.563-21.516-50.809-26.257-.854.119-1.705.245-2.564.347a129.31 129.31 0 0 1-15.3.916c-9.676 0-19.079-1.12-27.871-3.298-22.952 3.836-39.481 15.029-42.45 28.959-2.999 14.073 7.327 26.84 13.749 33.197 12.645 12.516 32.075 22.29 53.309 26.815zM252.818.718c-16.445 1.96-31.838 7.995-42.233 16.557-5.013 4.129-13.248 12.52-12.08 22.318s11.145 16.017 16.987 18.852c12.115 5.878 28.494 8.125 44.942 6.166 16.445-1.96 31.839-7.995 42.232-16.557 5.013-4.129 13.248-12.519 12.08-22.317C313.162 12.435 292.918 0 264.729 0a100.6 100.6 0 0 0-11.911.718zM256.154 512.308c104.785 0 177.809-38.98 177.809-73.963 0-14.514-13.387-29.815-37.695-43.086-26.265-14.339-62.36-24.545-101.896-28.847a298.285 298.285 0 0 1-18.139 4.466c-20.161 4.296-39.797 6.341-58.254 6.341-15.583.001-30.329-1.46-43.861-4.247-56.554 13.237-95.771 39.9-95.771 65.374-.002 34.982 73.022 73.962 177.807 73.962zm100.568-101.78c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15c0-8.285 6.716-15 15-15zm-48.173 38.1c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z"
                                fill={iconProps.tintColor}
                            />
                            :
                            <>
                                <Path
                                    d="M394.118 354.777c-14.919-8.145-32.781-14.945-52.448-20.091 10.021-5.64 19.155-11.922 27.158-18.743 26.232-22.356 37.802-48.176 32.575-72.702-3.569-16.753-15.566-31.269-34.694-41.978-7.591-4.25-16.162-7.815-25.467-10.648 4.411-5.911 7.542-12.583 9.106-19.922 5.808-27.256-11.671-54.966-42.376-72.395a80.953 80.953 0 0 0 7.389-5.387c15.178-12.502 22.779-28.925 20.856-45.059-3.779-31.698-41.789-52.349-86.53-47.015-20.15 2.403-38.687 9.854-52.196 20.982-15.178 12.502-22.78 28.925-20.856 45.058 1.13 9.477 5.499 18.267 12.481 25.657-15.878 8.773-26.635 21.823-29.958 37.419-5.664 26.58 10.83 53.591 40.141 71.072-20.365 8.169-38.696 18.642-53.598 30.837-27.851 22.791-40.313 48.838-35.091 73.345 3.307 15.522 12.976 28.77 28.007 38.873-43.394 17.482-68.981 44.135-68.981 73.861 0 27.311 20.921 52.004 58.909 69.533 34.296 15.825 79.563 24.54 127.462 24.54 47.898 0 93.166-8.715 127.462-24.54 37.988-17.528 58.909-42.222 58.909-69.533 0-30.43-26.245-51.145-48.26-63.164zM216.565 44.975c8.999-7.413 22.366-12.642 36.674-14.348a78.964 78.964 0 0 1 9.339-.543c21.036 0 42.264 8.005 43.852 21.321.689 5.785-3.007 12.474-10.141 18.351-8.999 7.412-22.366 12.642-36.675 14.348-14.307 1.706-28.53-.235-39.02-5.324-8.316-4.035-13.481-9.667-14.171-15.454-.689-5.786 3.007-12.475 10.142-18.351zm-28.067 91.23c1.494-7.012 6.921-12.022 11.211-14.991 6.496-4.497 15.035-7.717 24.82-9.392 7.851 1.914 16.233 2.895 24.847 2.895 4.546 0 9.159-.273 13.789-.825.672-.08 1.337-.18 2.005-.272 17.583 4.168 33.537 12.406 44.064 22.83 5.471 5.417 14.274 16.256 11.773 27.991-2.423 11.373-14.192 17.644-21.467 20.488-.062.026-.127.046-.189.073-.164.064-.329.128-.488.188-14.507 5.467-33.479 6.333-52.046 2.377-18.569-3.957-35.538-12.482-46.556-23.389-5.467-5.411-14.263-16.24-11.763-27.973zm-23.799 118.874c20.301-16.613 49.742-30.064 81.127-37.159 8.269 1.454 16.38 2.166 24.205 2.165 13.484-.001 26.102-2.091 37.203-5.965 34.788 4.138 61.223 18.454 64.828 35.374 2.783 13.057-5.488 28.954-22.692 43.616-19.981 17.029-48.897 30.224-81.421 37.154-32.524 6.929-64.307 6.669-89.495-.734-21.687-6.375-35.72-17.519-38.503-30.576-2.724-12.783 6.296-28.775 24.748-43.875zM370.9 460.233c-30.439 14.045-71.243 21.78-114.894 21.78s-84.455-7.735-114.894-21.78c-26.36-12.163-41.478-27.578-41.478-42.292 0-21.819 34.192-44.796 83.53-56.4 12.2 2.463 25.296 3.712 38.925 3.712 16.817 0 34.43-1.879 52.11-5.647a263.845 263.845 0 0 0 15.898-3.91c75.61 8.276 122.279 38.55 122.279 62.245.002 14.714-15.117 30.129-41.476 42.292z"
                                    fill={iconProps.tintColor}
                                />
                                <Circle cx="301.784" cy="440.371" r="15" transform="rotate(-67.48 301.935 440.311)" fill={iconProps.tintColor} />
                                <Circle cx="344.917" cy="406.697" r="15" fill={iconProps.tintColor} />
                            </>
                        }
                    </Svg>
                    <AuthWrapper actionOnGuestLogin={'hide'}>
                        <NotificationTabBarIcon notificationID={'blog'} top={-3} right={-3} size={scale(10)}
                                                showNumber={false}/>
                    </AuthWrapper>
                </View>
            case "More":
                return <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 58,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        {iconProps.focused ?
                            <Path
                                d="M3 12h18M3 6h18M3 18h18"
                                fill="none"
                                stroke={iconProps.tintColor}
                                strokeWidth="4"
                            />
                            :
                            <Path
                                d="M3 12h18M3 6h18M3 18h18"
                                fill="none"
                                stroke={iconProps.tintColor}
                                strokeWidth="2"
                            />
                        }
                    </Svg>
                </View>
            default:
                return icon;
        }
    });

    externalCodeSetup.profileScreenHooksApi.setIgnoreTabsFilter((
        list,
        isOwnAccount
    ) => [
        ...list,
        "activities",
        "friends",
        "groups"
    ])

    externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
        TrackPlayer.registerPlaybackService(() => require('./Components/TrackPlayerService'));
    })
    externalCodeSetup.blogSingleApi.setAfterBlogSingleBody((props) => {
        const {blog} = props;
        if (blog.meta_box.related_posts && blog.meta_box.related_posts.length) {
            return (
                <RelatedPostsRow posts={blog.meta_box.related_posts}/>
            )
        } else {
            return null;
        }
    })
    externalCodeSetup.deeplinksApi.setDeeplinksWithoutEmbeddedReturnValueFilter((defaultValue, linkObject, navigationService) => {

        if (linkObject.action === "open_screen") {
            switch (linkObject.item_id) {
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
        if (linkObject.action === "inapp") {
            if (linkObject.url.includes('QuotesScreen')) {
                navigationService.navigate({
                    routeName: "QuotesScreen",
                })
                return true;
            }
            if (linkObject.url.includes('wisdom')) {
                navigationService.navigate({
                    routeName: "BlogsScreen",
                })
                return true;
            }
            if (linkObject.url.includes('practices')) {
                navigationService.navigate({
                    routeName: "PracticesScreen",
                })
                return true;
            }
            if (linkObject.url.includes('programs')) {
                navigationService.navigate({
                    routeName: "ProgramsScreen",
                })
                return true;
            }
        }
        return defaultValue;
    });
    const AfterDetailsComponent = ({user}) => {
        const userInfo = useSelector((state) => state.user.userObject);
        return (
            userInfo.membership && userInfo.membership.length > 0 ?
                <Text> {userInfo.membership[0].plan.name} </Text>
                : null
        )
    }

    externalCodeSetup.profileScreenHooksApi.setAfterDetailsComponent(AfterDetailsComponent);
    externalCodeSetup.navigationApi.setScreensWithoutTabBar(["EditRoutine", "PracticeGroup", "PracticeMember", "PracticePersonal", "VideoPlayer", "VimeoPlayer", "MilestonesScreen", "QuestsScreen", "StatsScreen", "myVouchersScreen", "FeedbackScreen", "SettingsScreen", "CoursesSingleScreen", "LessonSingleScreen"])
    externalCodeSetup.settingsScreenApi.setLogoutComponent(({
                                                                global,
                                                                t,
                                                                isLoggingOut,
                                                                logout
                                                            }) => {
        const dispatch = useDispatch();
        const config = useSelector((state) => state.config ? state.config : null);
        const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
        const achievementReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer : null);
        return <View style={global.tabLinksContainer}>
            <AppTouchableOpacity
                style={global.logout}
                onPress={() => {
                    if (!isLoggingOut) {
                        Alert.alert('Logout', 'Are you sure you want to logout?',
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "OK", onPress: () => {
                                        if (progressReducer.latestUpdate && progressReducer.lastUpload && progressReducer.latestUpdate > progressReducer.lastUpload || !progressReducer.lastUpload) {
                                            let achievements = {
                                                'achievements': [],
                                                'weekly': achievementReducer.weekly,
                                                'monthly': achievementReducer.monthly
                                            }
                                            achievementReducer.achievements.map((achievement) => {
                                                achievements.achievements.push({
                                                    'id': achievement.id,
                                                    'step': achievement.step,
                                                    'complete_date': achievement.complete_date,
                                                    'claim_date': achievement.claim_date,
                                                    'list': achievement.list
                                                });
                                            });
                                            const apiRequest = getApi(config);
                                            apiRequest.customRequest(
                                                "wp-json/onenergy/v1/statsUpdate",
                                                "post",
                                                {
                                                    "progress": progressReducer,
                                                    "achievements": achievements
                                                },
                                                null,
                                                {},
                                                false
                                            ).then();
                                        }
                                        dispatch({
                                            type: 'ONENERGY_POSTS_RESET',
                                        });
                                        dispatch({
                                            type: 'ONENERGY_PRACTICE_RESET',
                                        });
                                        dispatch({
                                            type: 'ONENERGY_ACHIEVEMENT_RESET',
                                        });
                                        dispatch({
                                            type: 'ONENERGY_ACHIEVEMENT_RESET',
                                        });
                                        dispatch({
                                            type: 'ONENERGY_PROGRESS_RESET',
                                        });
                                        logout();
                                    }
                                }
                            ]
                        )
                    }
                }}
            >
                {isLoggingOut ? (
                    <ActivityIndicator animating={true} size="small"/>
                ) : (
                    <View style={[global.row]}>
                        <Icon
                            webIcon={"IconFeedSettings"}
                            icon={require("@src/assets/img/logout.png")}
                            styles={[global.settingsItemIcon]}
                        />
                        <Text
                            style={[
                                global.settingsItemTitle,
                                global.logoutInner,
                                {marginLeft: 5}
                            ]}
                        >
                            {t("settings:logout")}
                        </Text>
                    </View>
                )}
            </AppTouchableOpacity>
        </View>
    })

    externalCodeSetup.forumsHooksApi.setForumItemComponent(props => <ForumItem {...props} />)
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

            const myCustomRoute = "OnBoarding"

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
            } else {
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
    externalCodeSetup.forumSingleHooksApi.setHeaderRightComponent(({
                                                                       t,
                                                                       forum,
                                                                       colors,
                                                                       global,
                                                                       headerColor,
                                                                       actionButtons,
                                                                       ...rest
                                                                   }) => {
        //Pass the necessary props to the custom component
        return null;
    })
    externalCodeSetup.cssApi.addGlobalStyle("boxTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("appHeaderTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("forumListTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("subForumTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("settingsItemTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("widgetTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("itemTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("pointTitle", {"fontWeight": "medium"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("itemMeta", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addCustomColors({"altCardColor": "#FFEEE7"});

    externalCodeSetup.courseSingleApi.setCourseHeaderDetails(props => {

        const {
            courseVM,
            global,
            labels,
            colors,
            t,
            lCount,
            tCount,
            qCount,
            navigation,
            learndashCourseParticipants
        } = props;

        const size = 26;

        const shouldShowParticipants = !!+learndashCourseParticipants;

        const showIncludesTitle = lCount !== 0 ||
            tCount !== 0 ||
            qCount !== 0 ||
            courseVM.certificate?.available

        const styles = StyleSheet.create({
            videoContainer: {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden",
                ...(!shouldShowParticipants && {
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                })
            },

            avatar: {
                width: size + 4,
                height: size + 4,
                borderRadius: size + 4 / 2,
                borderColor: colors.bodyFrontBg,
                borderWidth: 2
            },
            enrolledText: {
                ...global.textAlt,
                left: -8,
                fontSize: 13
            },
            courseDetailsText: {
                ...global.itemText,
                marginBottom: 10,
                marginLeft: 14
            }

        });

        return (
            <>
                <View
                    style={styles.videoContainer}
                >
                    {typeof courseVM.videoUrl === "string" &&
                        courseVM.videoUrl !== "" && (
                            <CourseVideo
                                url={courseVM.videoUrl}
                                feature={courseVM.featuredUrl}
                                global={global}
                                colors={colors}
                                navigation={navigation}
                            />
                        )}
                </View>

                <View
                    style={{
                        paddingHorizontal: 16,
                        ...(shouldShowParticipants && { paddingVertical: 12 })
                    }}
                >
                    {showIncludesTitle && (
                        <Text
                            style={[
                                global.courseIncludesTitle,
                                {
                                    marginBottom: 15,
                                    marginTop: courseVM?.members?.length > 0 ? 20 : 0
                                }
                            ]}
                        >
                            {t("course:includesTitle", { label: labels.course })}
                        </Text>
                    )}
                    {lCount !== 0 && (
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                webIcon={"IconAndroidGroup"}
                                tintColor={colors.descLightTextColor}
                                icon={require("@src/assets/img/book.png")}
                            />
                            <Text
                                style={styles.courseDetailsText}
                            >
                                {lCount === ""
                                    ? "  " + labels.lessons
                                    : t("course:itemCount", {
                                        count: lCount,
                                        slabel: labels.lesson,
                                        plabel: labels.lessons
                                    })}
                            </Text>
                        </View>
                    )}
                    {tCount !== 0 && (
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                webIcon={"IconAndroidGroup"}
                                tintColor={colors.descLightTextColor}
                                icon={require("@src/assets/img/topic.png")}
                            />
                            <Text
                                style={styles.courseDetailsText}
                            >
                                {tCount === ""
                                    ? "  " + labels.topics
                                    : t("course:itemCount", {
                                        count: tCount,
                                        slabel: labels.topic,
                                        plabel: labels.topics
                                    })}
                            </Text>
                        </View>
                    )}
                    {qCount !== 0 && (
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                webIcon={"IconAndroidGroup"}
                                tintColor={colors.descLightTextColor}
                                icon={require("@src/assets/img/quiz.png")}
                            />
                            <Text
                                style={styles.courseDetailsText}
                            >
                                {qCount === ""
                                    ? "  " + labels.quiz
                                    : t("course:itemCount", {
                                        count: qCount,
                                        slabel: labels.quiz,
                                        plabel: labels.quizzes
                                    })}
                            </Text>
                        </View>
                    )}
                    {courseVM.certificate?.available && (
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                webIcon={"IconAndroidGroup"}
                                tintColor={colors.descLightTextColor}
                                icon={require("@src/assets/img/small-certificate.png")}
                            />
                            <Text
                                style={styles.courseDetailsText}
                            >
                                {t("course:certificate", { label: labels.course })}
                            </Text>
                        </View>
                    )}
                </View>
            </>
        );
    })
}



