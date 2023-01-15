import React, {useState} from "react";
import OnBoarding from './Screens/OnBoarding';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Alert
} from "react-native";
import {getApi} from "@src/services";
import Icon from "@src/components/Icon";
import {CourseVideo} from "@src/components/Course/CourseStatus";
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
import PracticePlayer from "./Components/PracticePlayer";
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
import TopicItem from "./Components/TopicItem";
import Immutable from "immutable";
import {
    SvgIconHomeFocused,
    SvgIconHomeUnfocused,
    SvgIconMedal,
    SvgIconMoreFocused,
    SvgIconMoreUnfocused,
    SvgIconProgramFocused,
    SvgIconProgramUnfocused,
    SvgIconQiGongFocused,
    SvgIconQiGongUnfocused,
    SvgIconWisdomFocused,
    SvgIconWisdomUnfocused
} from "./Utils/svg";

export const applyCustomCode = (externalCodeSetup: any) => {
    externalCodeSetup.topicsApi.setTopicItemComponent(props => {
        return <TopicItem {...props}/>;
    })
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
        "PracticePlayer",
        "PracticePlayer",
        PracticePlayer,
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
        props => <TextBlock {...props}/>
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/imageblock',
        props => <ImageBlock {...props}/>
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/vimeoblock',
        props => <VimeoBlockLoader {...props}/>
    );
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/bgvideoblock',
        props => <BgVideoBlock {...props}/>
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
        const {viewModel, colors} = props;

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
            progressBar: {
                height: 3,
                position: 'absolute',
                top: scale(20),
                right: scale(20),
                flexDirection: "row",
                width: (windowWidth - scale(30)) / 2,
                backgroundColor: 'white',
                borderColor: '#000',
                borderWidth: 0,
                borderRadius: 5,
            },
            image: {
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30)) / 9 * 4,
                borderRadius: 9,
                marginLeft: (windowWidth - scale(30)) / 9,
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
                width: (windowWidth - scale(30)) / 2,
                height: (windowWidth - scale(30)) / 2,
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
                marginTop: scale(25),
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
                                <SvgIconMedal/>
                            </View>
                            : null
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
                            {viewModel.price.icon ?
                                <CourseIcons icon={viewModel.price.icon}/>
                                : null
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
                todayGoal: 10,
                weekDuration: 0,
                totalDays: 0,
                lastPractice: '',
                latestUpdate: '',
                lastUpload: '',
                actionList: [],
                guideStats: [],
                sectionStats: [],
                routineStats: [],
                groupStats: [],
                progressUpdate: '',
                completedLessons: [],
                enrolledCourses: [],
                completedCourses: [],
                progress: [],
            },
            achievementReducer: {
                weekly: {days: [], complete_date: '', claim_date: ''},
                monthly: {days: [], complete_date: '', claim_date: ''},
                daily: [],
                milestones: [],
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
                            idAchievementReducer.milestones = data.achievements.milestones;
                            idAchievementReducer.daily = data.achievements.daily;
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
                        console.log('data.progress', data.progress)
                        if (data.progress) {
                            Object.keys(data.progress.points).map(key =>
                                idProgressReducer.points[key] = parseInt(data.progress.points[key])
                            )
                            idProgressReducer.totalDuration = data.progress.totalDuration ? parseInt(data.progress.totalDuration) : 0;
                            idProgressReducer.todayDuration = data.progress.todayDuration ? parseInt(data.progress.todayDuration) : 0;
                            idProgressReducer.todayGoal = data.progress.todayGoal ? parseInt(data.progress.todayGoal) : 10;
                            idProgressReducer.weekDuration = data.progress.weekDuration ? parseInt(data.progress.weekDuration) : 0;
                            idProgressReducer.progress = [];
                            if (data.progress.progress) {
                                data.progress.progress.map(progress => {
                                    idProgressReducer.progress.push({
                                        'date': progress.date,
                                        'duration': parseInt(progress.duration)
                                    });
                                })
                            } else {
                                idProgressReducer.progress = [];
                            }
                            idProgressReducer.totalDays = data.progress.totalDays ? parseInt(data.progress.totalDays) : 0;
                            idProgressReducer.lastPractice = '';
                            idProgressReducer.latestUpdate = 0;
                            idProgressReducer.lastUpload = 0;
                            idProgressReducer.guideStats = data.progress.guideStats ? data.progress.guideStats : [];
                            idProgressReducer.sectionStats = data.progress.sectionStats ? data.progress.sectionStats : [];
                            idProgressReducer.routineStats = data.progress.routineStats ? data.progress.routineStats : [];
                            idProgressReducer.groupStats = data.progress.groupStats ? data.progress.groupStats : [];
                            idProgressReducer.completedLessons = data.progress.completedLessons ? data.progress.completedLessons : [];
                            idProgressReducer.enrolledCourses = data.progress.enrolledCourses ? data.progress.enrolledCourses : [];
                            idProgressReducer.completedCourses = data.progress.completedCourses ? data.progress.completedCourses : [];
                            console.log(idProgressReducer)
                        } else {
                            idProgressReducer.points = {'qi': 0};
                            idProgressReducer.totalDuration = 0;
                            idProgressReducer.todayDuration = 0;
                            idProgressReducer.todayGoal = 10;
                            idProgressReducer.weekDuration = 0;
                            idProgressReducer.progress = [];
                            idProgressReducer.totalDays = 0;
                            idProgressReducer.lastPractice = '';
                            idProgressReducer.latestUpdate = 0;
                            idProgressReducer.lastUpload = 0;
                            idProgressReducer.guideStats = [];
                            idProgressReducer.sectionStats = [];
                            idProgressReducer.routineStats = [];
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
                    if (index >= 0) {
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
                case "ONENERGY_PROGRESS_GOAL":
                    switch (action.payload.mode) {
                        case 'todayGoal':
                            let goal = action.payload.data;
                            return {
                                ...state,
                                progressReducer: {
                                    ...state.progressReducer,
                                    todayGoal: goal,
                                }
                            };
                    }
                    break;
                case "ONENERGY_PROGRESS_UPLOADED":
                    console.log('upload_done')
                    const newUpload = Math.floor(new Date().getTime() / 1000);
                    console.log(newUpload)
                    let opuTempProgressState = state.progressReducer;
                    opuTempProgressState.actionList = [];
                    opuTempProgressState.lastUpload = newUpload;
                    return {
                        ...state,
                        progressReducer: opuTempProgressState
                    };
                case "ONENERGY_DAILY_UPDATE":
                    let oduTempProgressState = state.progressReducer;
                    let oduTempAchievementState = state.achievementReducer;

                    oduTempProgressState.todayDuration = 0;
                    if (new Date().getDay() === 1) {
                        oduTempProgressState.weekDuration = 0;
                    }
                    oduTempProgressState.totalDays += 1;

                    oduTempAchievementState.daily.map((item, tempIndex) => {
                        oduTempAchievementState.daily[tempIndex].complete_date = '';
                        oduTempAchievementState.daily[tempIndex].claim_date = '';
                    })
                    oduTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)

                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            daily: oduTempAchievementState.daily,
                        },
                        progressReducer: oduTempProgressState,
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
                        acpTempAchievementState.milestones.map((item, tempIndex) => {
                            if (item.trigger === 'progress' && item.triggerField === 'totalDays' && item.complete_date !== today) {
                                acpTempAchievementState.milestones[tempIndex].step += 1;
                                if (parseInt(item.total) <= acpTempProgressState.totalDays) {
                                    acpTempAchievementState.milestones[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            }
                        })
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
                        acpTempProgressState.lastPractice = new moment().format('YYYY-MM-DD');
                    }

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

                            acpTempIndex = acpTempProgressState.routineStats.findIndex(item => item.routine_id === acpData)
                            if (acpTempIndex >= 0) {
                                acpTempProgressState.routineStats[acpTempIndex].routine_count += 1;
                                acpTempProgressState.routineStats[acpTempIndex].routine_duration += acpTempPracticeState.routines[routineIndex].duration;
                            } else {
                                acpTempProgressState.routineStats.push({
                                    'routine_id': acpData,
                                    'routine_count': 1,
                                    'routine_duration': state.practiceReducer.routines[routineIndex].duration,
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
                            tmpAchievements = state.achievementReducer.milestones.filter((item) =>
                                (item.trigger === 'practice' &&
                                    (
                                        (item.triggerPracticeOption === 'group' && (parseInt(item.triggerGroupPractice) === acpData || !item.triggerGroupPractice))
                                    ) &&
                                    !item.complete_date));
                            tmpAchievements.map((item) => {
                                let tempIndex = acpTempAchievementState.milestones.findIndex(achievement => achievement.id === item.id);
                                acpTempAchievementState.milestones[tempIndex].step += 1;
                                if (acpTempAchievementState.milestones[tempIndex].total <= acpTempAchievementState.milestones[tempIndex].step) {
                                    acpTempAchievementState.milestones[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempAchievementState.milestones[tempIndex].claim_date = '';
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            })
                            tmpAchievements = state.achievementReducer.daily.filter((item) =>
                                (item.trigger === 'practice' &&
                                    (
                                        (item.triggerPracticeOption === 'group' && (parseInt(item.triggerGroupPractice) === acpData || !item.triggerGroupPractice))
                                    ) &&
                                    !item.complete_date));
                            tmpAchievements.map((item) => {
                                let tempIndex = acpTempAchievementState.daily.findIndex(achievement => achievement.id === item.id);
                                acpTempAchievementState.daily[tempIndex].step += 1;
                                if (acpTempAchievementState.daily[tempIndex].total <= acpTempAchievementState.daily[tempIndex].step) {
                                    acpTempAchievementState.daily[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempAchievementState.daily[tempIndex].claim_date = '';
                                    acpTempAchievementState.daily[tempIndex].list.push(acpTempAchievementState.daily[tempIndex].complete_date);
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            })
                            if (acpTempProgressState.groupStats) {
                                acpTempIndex = acpTempProgressState.groupStats.findIndex(item => item.group_id === acpData);
                                if (acpTempIndex >= 0) {
                                    acpTempProgressState.groupStats[acpTempIndex].group_count += 1;
                                    acpTempProgressState.groupStats[acpTempIndex].group_duration += acpTempPracticeState.groups[groupIndex].duration;
                                } else {
                                    acpTempProgressState.groupStats.push({
                                        'group_id': acpData,
                                        'group_count': 1,
                                        'group_duration': state.practiceReducer.groups[groupIndex].duration,
                                    })
                                }
                            } else {
                                acpTempProgressState.groupStats.push({
                                    'group_id': acpData,
                                    'group_count': 1,
                                    'group_duration': state.practiceReducer.groups[groupIndex].duration,
                                })
                            }
                            break;
                    }

                    tempArray.map(tempGuide => {
                        //Get the section ID from the guide ID
                        tempSection = state.practiceReducer.guides.find((section) => {
                            if (section.data.find(guide => guide.id === tempGuide.id))
                                return true
                        });
                        console.log('41', tempSection)

                        //milestones
                        tmpAchievements = state.achievementReducer.milestones.filter((item) => {
                            if (item.trigger === 'practice' &&
                                (
                                    (item.triggerPracticeOption === 'single' && (parseInt(item.triggerSinglePractice) === tempGuide.id || !item.triggerSinglePractice)) ||
                                    (item.triggerPracticeOption === 'section' && (parseInt(item.triggerSectionPractice) === tempSection.id))
                                ) &&
                                !item.complete_date) {
                                return true;
                            }
                        });
                        console.log('42', state.achievementReducer.milestones, tmpAchievements)

                        tmpAchievements.map((item) => {
                            let tempIndex = acpTempAchievementState.milestones.findIndex(achievement => achievement.id === item.id);
                            acpTempAchievementState.milestones[tempIndex].step += 1;
                            if (acpTempAchievementState.milestones[tempIndex].total <= acpTempAchievementState.milestones[tempIndex].step) {
                                acpTempAchievementState.milestones[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                acpTempAchievementState.milestones[tempIndex].claim_date = '';
                                acpTempProgressState.actionList.push({
                                    'mode': 'CA',
                                    'data': {'id': item.id, 'points': item.awards},
                                    'time': Math.floor(new Date().getTime() / 1000)
                                });
                            }
                        })

                        tmpAchievements = state.achievementReducer.daily.filter((item) => {
                            if (item.trigger === 'practice' &&
                                (
                                    (item.triggerPracticeOption === 'single' && (parseInt(item.triggerSinglePractice) === tempGuide.id || !item.triggerSinglePractice)) ||
                                    (item.triggerPracticeOption === 'section' && (parseInt(item.triggerSectionPractice) === tempSection.id))
                                ) &&
                                !item.complete_date) {
                                return true;
                            }
                        });
                        console.log('42', state.achievementReducer.daily, tmpAchievements)

                        tmpAchievements.map((item) => {
                            let tempIndex = acpTempAchievementState.daily.findIndex(achievement => achievement.id === item.id);
                            acpTempAchievementState.daily[tempIndex].step += 1;
                            if (acpTempAchievementState.daily[tempIndex].total <= acpTempAchievementState.daily[tempIndex].step) {
                                acpTempAchievementState.daily[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                acpTempAchievementState.daily[tempIndex].claim_date = '';
                                acpTempAchievementState.daily[tempIndex].list.push(acpTempAchievementState.daily[tempIndex].complete_date);
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
                                console.log('44')
                                acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].new = false;
                                acpTempProgressState.totalDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                acpTempProgressState.todayDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                acpTempProgressState.weekDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                console.log('45', acpTempProgressState.guideStats)
                                if (acpTempProgressState.guideStats && acpTempProgressState.guideStats.length) {
                                    console.log('46')
                                    acpTempIndex = acpTempProgressState.guideStats.findIndex(item => item.guide_id === acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].id)
                                    console.log('47')
                                    if (acpTempIndex >= 0) {
                                        acpTempProgressState.guideStats[acpTempIndex].guide_count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count;
                                        acpTempProgressState.guideStats[acpTempIndex].guide_duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                    } else {
                                        acpTempProgressState.guideStats.push({
                                            'guide_id': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].id,
                                            'guide_count': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count,
                                            'guide_duration': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count
                                        })
                                    }
                                    console.log('48')
                                } else {
                                    console.log('49')
                                    acpTempProgressState.guideStats = [];
                                    acpTempProgressState.guideStats.push({
                                        'guide_id': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].id,
                                        'guide_count': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count,
                                        'guide_duration': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count
                                    })
                                    console.log('48')
                                }
                                console.log('52')
                                console.log(acpTempPracticeState.guides[acpSectionIndex])
                                acpTempIndex = acpTempProgressState.sectionStats.findIndex(item => item.section_id === acpTempPracticeState.guides[acpSectionIndex].id)
                                if (acpTempIndex >= 0) {
                                    acpTempProgressState.sectionStats[acpTempIndex].section_count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count;
                                    acpTempProgressState.sectionStats[acpTempIndex].section_duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                } else {
                                    acpTempProgressState.sectionStats.push({
                                        'section_id': acpTempPracticeState.guides[acpSectionIndex].id,
                                        'section_count': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count,
                                        'section_duration': acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count
                                    })
                                }

                            }
                        });
                    })
                    console.log('5', acpTempProgressState)

                    let todayProgressIndex = acpTempProgressState.progress && acpTempProgressState.progress.findIndex(item => item.date === today);
                    if (acpTempProgressState.progress && todayProgressIndex >= 0) {
                        acpTempProgressState.progress[todayProgressIndex].duration = acpTempProgressState.todayDuration;
                    } else {
                        if (acpTempProgressState.progress) {
                            acpTempProgressState.progress.push({
                                date: today,
                                duration: acpTempProgressState.todayDuration
                            })
                        } else {
                            acpTempProgressState.progress = [{
                                date: today,
                                duration: acpTempProgressState.todayDuration
                            }]
                        }
                    }

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
                            milestones: acpTempAchievementState.milestones,
                            daily: acpTempAchievementState.daily,
                            weekly: acpTempAchievementState.weekly,
                            monthly: acpTempAchievementState.monthly
                        },
                        progressReducer: acpTempProgressState,
                        practiceReducer: acpTempPracticeState
                    };
                case "ONENERGY_MILESTONE_CLAIM":
                    let mcTempMilestoneState = state.achievementReducer.milestones;
                    let mcTempProgressState = state.progressReducer;
                    let mcMilestoneIndex = mcTempMilestoneState.findIndex(achievement => achievement.id === action.payload.id);

                    mcTempMilestoneState[mcMilestoneIndex].claim_date = new moment().format('YYYY-MM-DD');
                    mcTempMilestoneState[mcMilestoneIndex].awards.map(award => {
                        if (mcTempProgressState.points[award.name]) {
                            mcTempProgressState.points[award.name] += parseInt(award.point);
                        } else {
                            mcTempProgressState.points[award.name] = parseInt(award.point);
                        }
                    })
                    mcTempProgressState.actionList.push({
                        'mode': 'CM', //Milestone Claim
                        'data': {'id': action.payload.id, 'points': mcTempMilestoneState[mcMilestoneIndex].awards},
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    mcTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)

                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            milestones: mcTempMilestoneState,
                        },
                        progressReducer: mcTempProgressState
                    };
                case "ONENERGY_DAILY_CLAIM":
                    let dcTempDailyState = state.achievementReducer.daily;
                    let dcTempProgressState = state.progressReducer;
                    let dcDailyIndex = dcTempDailyState.findIndex(achievement => achievement.id === action.payload.id);
                    const odcToday = new moment().format('YYYY-MM-DD');

                    dcTempDailyState[dcDailyIndex].claim_date = odcToday;
                    let dailyListItemIndex = dcTempDailyState[dcDailyIndex].list.findIndex(item => item === odcToday)
                    if (dailyListItemIndex >= 0) {
                        dcTempDailyState[dcDailyIndex].list.splice(dailyListItemIndex, 1);
                    }
                    dcTempDailyState[dcDailyIndex].awards.map(award => {
                        if (dcTempProgressState.points[award.name]) {
                            dcTempProgressState.points[award.name] += parseInt(award.point);
                        } else {
                            dcTempProgressState.points[award.name] = parseInt(award.point);
                        }
                    })
                    dcTempProgressState.actionList.push({
                        'mode': 'CM',
                        'data': {'id': action.payload.id, 'points': dcTempDailyState[dcDailyIndex].awards},
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    dcTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)

                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            daily: dcTempDailyState,
                        },
                        progressReducer: dcTempProgressState
                    };
                case "ONENERGY_PAST_CLAIM":
                    let awcTempQuestState = state.achievementReducer.daily;
                    let awcAchievementIndex = awcTempQuestState.findIndex(achievement => achievement.id === action.payload.id);
                    let awcTempProgressState = state.progressReducer;
                    let awcWaitItemIndex = awcTempQuestState[awcAchievementIndex].list.findIndex(waitItem => waitItem === action.payload.date);

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
                            daily: awcTempQuestState,
                        }
                    };
                case "ONENERGY_WEEKLY_MONTHLY_CLAIM":
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
                    let olcTempMilestoneState = state.achievementReducer.milestones;
                    let lesson = action.payload;
                    let olcTempMilestone = olcTempMilestoneState.filter(item =>
                        (item.trigger === 'course' &&
                            (
                                parseInt(item.triggerCourse) === lesson.parent.id || !item.triggerCourse
                            ) &&
                            !item.complete_date)
                    );
                    olcTempMilestone.map((item) => {
                        let tempIndex = olcTempMilestone.findIndex(achievement => achievement.id === item.id);
                        let tempLessonIndex = olcTempMilestone[tempIndex].step.findIndex(item => item.id === lesson.id);
                        olcTempMilestone[tempIndex].step[tempLessonIndex].completed = 1;
                        console.log('3', lesson.settings.next_lesson);

                        if (!lesson.settings.next_lesson) {
                            olcTempMilestone[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                            olcTempMilestone[tempIndex].claim_date = '';
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
                            milestones:
                            olcTempMilestoneState,
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
                            milestones: [],
                            daily: [],
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
                            guideStats: [],
                            routineStats: [],
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

    /*    const customBlogReducer = reducer => (state = reducer(undefined, {}), action) => {
            switch (action.type) {
                case "ONENERGY_BLOG_UPDATE":
                    let blogCache = state.byId;
                    if(blogCache) {
                        action.payload.map((item) => {
                            blogCache = blogCache.set(-1, item);
                        });
                        console.log('blogCache', blogCache)
                    }else{
                        blogCache = Immutable.fromJS(action.payload);
                    }
    /!*                action.payload.map((item) => {
                        newBlogCache = blogCache.splice(0, 0, item);
                   });*!/
                    console.log('blogCache', blogCache)
                    const newBlogs = {
                        ...state,
                        blogCache: blogCache
                   }
                    return reducer(newBlogs, action);
                default:
                    return reducer(state, action);
           }
       }
        externalCodeSetup.reduxApi.wrapReducer(
            'blogCache',
            customBlogReducer
        );*/
    const customUserReducer = reducer => (state = reducer(undefined, {}), action) => {
        switch (action.type) {
            case "USER_VIP_SURVEY_COMPLETED":
                let uvscTempUser = state.userObject;
                uvscTempUser.vip_survey_completed = true;
                const uvscNewState = {
                    ...state,
                    userObject: uvscTempUser
                }
                return reducer(uvscNewState, action);
            case "USER_PROFILE_UPDATED":
                let upuTempUser = state.userObject;
                upuTempUser.profile_updated = true;
                const upuNewState = {
                    ...state,
                    userObject: upuTempUser
                }
                return reducer(upuNewState, action);
            default:
                return reducer(state, action);
        }
    }
    externalCodeSetup.reduxApi.wrapReducer(
        'user',
        customUserReducer
    );
    const customSettingsReducer = reducer => (state = reducer(undefined, {}), action) => {
        switch (action.type) {
            case "SETTINGS_ALLOW_LOCATION":
                const salNewState = {
                    ...state,
                    allowLocation: action.payload
                }
                return reducer(salNewState, action);
            default:
                return reducer(state, action);
        }
    }
    externalCodeSetup.reduxApi.wrapReducer(
        'settings',
        customSettingsReducer
    );
    // Add Video reducer for course completion
    externalCodeSetup.reduxApi.addReducer(
        "videoReducer",
        (state = {videos: [], videoComplete: false}, action) => {
            switch (action.type) {
                case "ONENERGY_VIDEO_COMPLETED":
                    const ovcTempVideos = state.videos;
                    const ovcVideoId = action.payload;
                    if (ovcTempVideos.length) {
                        const ovcVideoIndex = ovcTempVideos.findIndex(item => item.videoId === ovcVideoId);
                        if (ovcVideoIndex >= 0) {
                            ovcTempVideos.splice(ovcVideoIndex, 1);
                        }
                    }
                    return {
                        ...state,
                        videos: ovcTempVideos,
                        videoComplete: true
                    };
                case "ONENERGY_VIDEO_EXIT":
                    const ovxTempVideos = state.videos;
                    const ovxVideoId = action.payload.videoId;
                    const ovxDuration = action.payload.duration;
                    if (ovxTempVideos.length) {
                        const ovxVideoIndex = ovxTempVideos.findIndex(item => item.videoId === ovxVideoId);
                        if (ovxVideoIndex >= 0) {
                            ovxTempVideos[ovxVideoIndex].duration = ovxDuration;
                        } else {
                            ovxTempVideos.push({'videoId': ovxVideoId, 'duration': ovxDuration});
                        }
                    } else {
                        ovxTempVideos.push({'videoId': ovxVideoId, 'duration': ovxDuration});
                    }
                    return {
                        ...state,
                        videos: ovxTempVideos,
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
        let whiteList = [...props.whitelist, "languagesReducer", "postReducer", "onenergyReducer", "videoReducer"];
        console.log(whiteList);
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
                <LessonButton global={global} colors={colors} lesson={lesson}/>
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
                    {iconProps.focused ?
                        <SvgIconHomeFocused color={iconProps.tintColor}/>
                        :
                        <SvgIconHomeUnfocused color={iconProps.tintColor}/>
                    }
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
                    {iconProps.focused ?
                        <SvgIconProgramFocused color={iconProps.tintColor}/>
                        :
                        <SvgIconProgramUnfocused color={iconProps.tintColor}/>
                    }
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
                    {iconProps.focused ?
                        <SvgIconQiGongFocused color={iconProps.tintColor}/>
                        :
                        <SvgIconQiGongUnfocused color={iconProps.tintColor}/>
                    }
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
                    {iconProps.focused ?
                        <SvgIconWisdomFocused color={iconProps.tintColor}/>
                        :
                        <SvgIconWisdomUnfocused color={iconProps.tintColor}/>
                    }
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
                    {iconProps.focused ?
                        <SvgIconMoreFocused color={iconProps.tintColor}/>
                        :
                        <SvgIconMoreUnfocused color={iconProps.tintColor}/>
                    }
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
    externalCodeSetup.navigationApi.setScreensWithoutTabBar(["EditRoutine", "PracticeGroup", "PracticeMember", "PracticePersonal", "PracticePlayer", "VimeoPlayer", "MilestonesScreen", "QuestsScreen", "StatsScreen", "myVouchersScreen", "FeedbackScreen", "SettingsScreen", "CoursesSingleScreen", "LessonSingleScreen"])
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
        const user = useSelector((state) => state.user.userObject);
        return (
            user ?
                <View style={global.tabLinksContainer}>
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
                                                        'milestones': [],
                                                        'daily': [],
                                                        'weekly': achievementReducer.weekly,
                                                        'monthly': achievementReducer.monthly
                                                    }
                                                    achievementReducer.milestones.map((milestone) => {
                                                        achievements.milestones.push({
                                                            'id': milestone.id,
                                                            'step': milestone.step,
                                                            'complete_date': milestone.complete_date,
                                                            'claim_date': milestone.claim_date,
                                                        });
                                                    });
                                                    achievementReducer.daily.map((quest) => {
                                                        achievements.daily.push({
                                                            'id': quest.id,
                                                            'step': quest.step,
                                                            'complete_date': quest.complete_date,
                                                            'claim_date': quest.claim_date,
                                                            'list': quest.list
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
                : null
        )
    })

    externalCodeSetup.forumsHooksApi.setForumItemComponent(props => <ForumItem {...props}/>)
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
    externalCodeSetup.cssApi.addGlobalStyle("subTitle", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textItemSubTitle", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("settingsItemTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textHeaderTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textAlt", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textAltMedium", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textAltSemi", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textMeta", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("topicSingleTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("topicTagText", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("widgetTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("itemTitle", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("itemTopicTitle", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("pointTitle", {"fontWeight": "medium"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("itemMeta", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("courseRoundBoxTitleAbove", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("bodyText", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("heading", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("text", {"fontWeight": "normal"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("semiBoldText", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("boldText", {"fontWeight": "bold"}, false);
    externalCodeSetup.cssApi.addGlobalStyle("text", {"fontWeight": "normal"}, false);
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
                        ...(shouldShowParticipants && {paddingVertical: 12})
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
                            {t("course:includesTitle", {label: labels.course})}
                        </Text>
                    )}
                    {lCount !== 0 && (
                        <View style={{flexDirection: "row"}}>
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
                        <View style={{flexDirection: "row"}}>
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
                        <View style={{flexDirection: "row"}}>
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
                        <View style={{flexDirection: "row"}}>
                            <Icon
                                webIcon={"IconAndroidGroup"}
                                tintColor={colors.descLightTextColor}
                                icon={require("@src/assets/img/small-certificate.png")}
                            />
                            <Text
                                style={styles.courseDetailsText}
                            >
                                {t("course:certificate", {label: labels.course})}
                            </Text>
                        </View>
                    )}
                </View>
            </>
        );
    })

    externalCodeSetup.pageScreenHooksApi.setOnShouldStartLoadWithRequest(props => {
        const {
            index,
            req,
            isLoading,
            isFocused,
            currentUrl,
            nextUrl,
            isExternalDeeplink,
            onNext,
            openExternal,
            shouldOpenInExternalBrowser,
            isSameSite,
            attemptDeepLink
        } = props;

        // If webview was not tapped, handle loading in the active webview
        if (req.navigationType !== "click") {
            return true;
        }
        // If webview is loading, handle redirection in the same webview
        if (isLoading) {
            return true;
        }

        if (!req.url) {
            return true;
        }

        if (nextUrl.pathname === null) {
            return true;
        }

        if (
            currentUrl.pathname === nextUrl.pathname &&
            currentUrl.host === nextUrl.host
        ) {
            return true;
        }

        if (!isFocused) {
            return false;
        }
    })
}



