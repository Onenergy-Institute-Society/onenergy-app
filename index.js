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
import {getApi} from "@src/services";
import Icon from "@src/components/Icon";
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
                bottom: 15,
                flexDirection: "row",
                width: windowWidth - 90,
                marginLeft: 30,
                marginRight: 30,
                backgroundColor: 'white',
                borderColor: '#000',
                borderWidth: 0,
                borderRadius: 5,
            },
            image: {
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30)) / 9 * 4,
                borderRadius: 9,
                marginLeft: 0,
                marginTop: 0,
                overflow: 'hidden',
                resizeMode: "cover",
            },
            imageView: {
                backgroundColor: 'rgba(255,255,255,0.5)',
                width: windowWidth - scale(30),
                height: (windowWidth - scale(30)) / 9 * 4,
                borderRadius: 9,
                overflow: 'hidden',
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
                justifyContent: "flex-start",
                alignItems: "flex-end",
                paddingRight: 10,
                paddingTop: 10,
            },
            title: {
                fontSize: scale(18),
                textAlign: 'center',
                justifyContent: "center",
                color: 'white',
                textShadowColor: 'grey',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 1,
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
                    onPress={viewModel.price.expired && viewModel.hasAccess ? () => alert('Course is expired') : viewModel.onClick}>
                    <View style={[styles.card, styles.boxShadow]}>
                        <View style={[styles.statusBar, {backgroundColor: statusBarColor}]}><Text
                            style={styles.statusText}>{statusText}</Text></View>
                        <ImageCache style={styles.image} source={{uri: featuredUrl ? featuredUrl : ''}}/>
                        {lessonNote ?
                            <Text style={styles.lessonTime}>{lessonNote}</Text>
                            : null}
                        {viewModel.progression > 0 && viewModel.progression < 100 && !viewModel.price.expired ?
                            <View style={styles.progressBar}><View style={{
                                backgroundColor: colors.primaryColor,
                                width: viewModel.progression + '%'
                            }}/></View>
                            : null}
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
        (state = {quotes:[]}, action) => {
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
                lastPractice:'',
                latestUpdate:'',
                lastUpload:'',
                actionList:[],
                practicesStats: [],
                routinesStats: [],
                groupStats: [],
                progressUpdate: '',
                completedLessons:[],
                enrolledCourses:[],
                completedCourses:[]
            },
            achievementReducer: {
                weekly: {days:[], complete_date:'', claim_date:''},
                monthly: {days:[], complete_date:'', claim_date:''},
                achievements:[],
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
                    if(loadGroup) {
                        if(data.groups){
                            idPracticeReducer.groups = data.groups;
                        }
                        idPracticeReducer.groupUpdate = new Date().toISOString();
                    }
                    console.log('4')
                    if(loadGuide) {
                        if (data.guides) {
                            idPracticeReducer.guides = data.guides;
                        }
                        idPracticeReducer.guideUpdate = new Date().toISOString();
                    }
                    console.log('5')
                    if(loadAchievement) {
                        if (data.achievements) {
                            idAchievementReducer.achievements = data.achievements.achievements.sort((a, b) => {
                                return a.complete_date > b.complete_date
                            }).sort((a, b) => {
                                return a.claim_date > b.claim_date
                            });
                            idAchievementReducer.weekly = data.achievements.weekly?data.achievements.weekly:{days:[], complete_date:'', claim_date:''};
                            idAchievementReducer.monthly = data.achievements.monthly?data.achievements.monthly:{days:[], complete_date:'', claim_date:''};
                        }
                        idAchievementReducer.achievementUpdate = new Date().toISOString();
                    }
                    console.log('6')
                    if(loadProgress) {
                        if (data.progress) {
                            idProgressReducer = data.progress;
                        } else {
                            idProgressReducer.points = {'qi': 0};
                            idProgressReducer.totalDuration =  0;
                            idProgressReducer.todayDuration = 0;
                            idProgressReducer.weekDuration = 0;
                            idProgressReducer.totalDays = 0;
                            idProgressReducer.lastPractice ='';
                            idProgressReducer.latestUpdate ='';
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
                    if(updateDaily)
                    {
                        console.log('21')
                        acpTempProgressState.todayDuration = 0;
                        if (new Date().getDay() === 1) {
                            acpTempProgressState.weekDuration = 0;
                        }
                        acpTempProgressState.totalDays += 1;
                        console.log('22')

                        acpTempAchievementState.achievements.map((item, tempIndex) => {
                            if(item.type === 'daily') {
                                acpTempAchievementState.achievements[tempIndex].complete_date = '';
                                acpTempAchievementState.achievements[tempIndex].claim_date = '';
                            }
                            if(item.trigger === 'progress' && item.triggerField === 'totalDays' && item.complete_date !== today){
                                acpTempAchievementState.achievements[tempIndex].step += 1;
                                if (parseInt(item.total) <= acpTempProgressState.totalDays) {
                                    acpTempAchievementState.achievements[tempIndex].complete_date = Math.floor(new Date().getTime() / 1000);
                                    if(acpTempAchievementState.achievements[tempIndex].type === 'daily')
                                    {
                                        acpTempAchievementState.achievements[tempIndex].step = 0;
                                        acpTempAchievementState.achievements[tempIndex].list.push(today);
                                    }
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id':item.id, 'points':item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            }
                        })

                        console.log('23')

                        //weekly
                        if(acpTempAchievementState.weekly.days&&acpTempAchievementState.weekly.days.length)
                        {
                            console.log('w1')
                            let lastDay = acpTempAchievementState.weekly.days[acpTempAchievementState.weekly.days.length-1];
                            if(moment(today).diff(moment(lastDay), 'days') > 1){
                                console.log('w2')
                                acpTempAchievementState.weekly.days = [];
                                acpTempAchievementState.weekly.days.push(today);
                            }else if(acpTempAchievementState.weekly.days.length>7) {
                                console.log('w3')
                                acpTempAchievementState.weekly.days = [];
                                acpTempAchievementState.weekly.days.push(today);
                            }else{
                                console.log('w4')
                                acpTempAchievementState.weekly.days.push(today);
                                if(acpTempAchievementState.weekly.days.length===7){
                                    acpTempAchievementState.weekly.complete_date = today;
                                    acpTempAchievementState.weekly.claim_date  = '';
                                }
                            }
                        }else{
                            console.log('w5')
                            acpTempAchievementState.weekly.days = [];
                            acpTempAchievementState.weekly.days.push(today);
                        }

                        //monthly
                        if(acpTempAchievementState.monthly.days&&acpTempAchievementState.monthly.days.length)
                        {
                            let lastDay = acpTempAchievementState.monthly.days[acpTempAchievementState.monthly.days.length-1];
                            if(moment(today).diff(moment(lastDay), 'days') > 1){
                                acpTempAchievementState.monthly.days=[];
                                acpTempAchievementState.monthly.days.push(today);
                            }else if(acpTempAchievementState.monthly.days.length>30) {
                                acpTempAchievementState.monthly.days=[];
                                acpTempAchievementState.monthly.days.push(today);
                            }else{
                                acpTempAchievementState.monthly.days.push(today);
                                if(acpTempAchievementState.monthly.days.length===30){
                                    acpTempAchievementState.monthly.complete_date = today;
                                    acpTempAchievementState.monthly.claim_date = '';
                                }
                            }
                        }else{
                            acpTempAchievementState.monthly.days=[];
                            acpTempAchievementState.monthly.days.push(today)
                        }
                    }

                    console.log('24')
                    console.log('3')

                    let tempArray = [];
                    switch (acpMode)
                    {
                        case 'PP':
                            console.log('31')

                            tempArray.push({'id':acpData, 'count':1});
                            break;
                        case 'PR':
                            console.log('32')

                            let routineIndex;
                            routineIndex = state.practiceReducer.routines.findIndex((temp) => temp.id === acpData);
                            tempArray = state.practiceReducer.routines[routineIndex].routine;

                            acpTempIndex = acpTempProgressState.routinesStats.findIndex(item => item.id === acpData)
                            if(acpTempIndex>=0) {
                                acpTempProgressState.routinesStats[acpTempIndex].count += 1;
                                acpTempProgressState.routinesStats[acpTempIndex].duration += acpTempPracticeState.routines[routineIndex].duration;
                            }else{
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
                                tempArray.push({'id':tempGuide, 'count':1});
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
                                if(acpTempAchievementState.achievements[tempIndex].total <= acpTempAchievementState.achievements[tempIndex].step) {
                                    acpTempAchievementState.achievements[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempAchievementState.achievements[tempIndex].claim_date = '';
                                    if(acpTempAchievementState.achievements[tempIndex].type==='daily') {
                                        acpTempAchievementState.achievements[tempIndex].list.push(acpTempAchievementState.achievements[tempIndex].complete_date);
                                    }
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id':item.id, 'points':item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            })

                            acpTempIndex = acpTempProgressState.groupStats.findIndex(item => item.id === acpData);
                            if(acpTempIndex>=0) {
                                acpTempProgressState.groupStats[acpTempIndex].count += 1;
                                acpTempProgressState.groupStats[acpTempIndex].duration += acpTempPracticeState.groups[groupIndex].duration;
                            }else{
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
                            if(section.data.find(guide => guide.id === tempGuide.id))
                                return true
                        });
                        console.log('41', tempSection)

                        tmpAchievements = state.achievementReducer.achievements.filter((item) => {
                            if(item.trigger === 'practice' &&
                                (
                                    (item.triggerPracticeOption === 'single' && (parseInt(item.triggerSinglePractice) === tempGuide.id || !item.triggerSinglePractice)) ||
                                    (item.triggerPracticeOption === 'section' && (parseInt(item.triggerSectionPractice) === tempSection.id))
                                ) &&
                                !item.complete_date)
                            {
                                return true;
                            }});
                        console.log('42',state.achievementReducer.achievements, tmpAchievements)

                        tmpAchievements.map((item) => {
                            let tempIndex = acpTempAchievementState.achievements.findIndex(achievement => achievement.id === item.id);
                            acpTempAchievementState.achievements[tempIndex].step += 1;
                            if(acpTempAchievementState.achievements[tempIndex].total <= acpTempAchievementState.achievements[tempIndex].step) {
                                acpTempAchievementState.achievements[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                                acpTempAchievementState.achievements[tempIndex].claim_date = '';
                                if(acpTempAchievementState.achievements[tempIndex].type==='daily') {
                                    acpTempAchievementState.achievements[tempIndex].list.push(acpTempAchievementState.achievements[tempIndex].complete_date);
                                }
                                acpTempProgressState.actionList.push({
                                    'mode': 'CA',
                                    'data': {'id':item.id, 'points':item.awards},
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
                                if(acpTempIndex >= 0)
                                {
                                    acpTempProgressState.practicesStats[acpTempIndex].count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count;
                                    acpTempProgressState.practicesStats[acpTempIndex].duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                }else{
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
                                if(acpTempIndex >= 0)
                                {
                                    acpTempProgressState.practicesStats[acpTempIndex].count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count * tempGuide.count;
                                    acpTempProgressState.practicesStats[acpTempIndex].duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration * tempGuide.count;
                                }else{
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
                    if(action.payload.mode==='daily'){
                        let dailyListItemIndex =  acTempAchievementState[acAchievementIndex].list.findIndex(item => item === action.payload.date)
                        if(dailyListItemIndex >=0 ){
                            acTempAchievementState[acAchievementIndex].list.splice(dailyListItemIndex, 1);
                        }
                    }
                    acTempAchievementState[acAchievementIndex].awards.map(award => {
                        if(acTempProgressState.points[award.name]) {
                            acTempProgressState.points[award.name] += parseInt(award.point);
                        }else{
                            acTempProgressState.points[award.name] = parseInt(award.point);
                        }
                    })
                    acTempProgressState.actionList.push({
                        'mode': 'CM',
                        'data': {'id':action.payload.id, 'points':acTempAchievementState[acAchievementIndex].awards},
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
                    if(awcAchievementIndex>=0) {
                        awcTempQuestState[awcAchievementIndex].list.splice(awcWaitItemIndex, 1);
                        awcTempQuestState[awcAchievementIndex].awards.map(award => {
                            if(awcTempProgressState.points[award.name]) {
                                awcTempProgressState.points[award.name] += parseInt(award.point);
                            }else{
                                awcTempProgressState.points[award.name] = parseInt(award.point);
                            }
                        })
                        awcTempProgressState.actionList.push({
                            'mode': 'CM',
                            'data': {'id':action.payload.id, 'points':awcTempQuestState[awcAchievementIndex].awards},
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
                    switch(action.payload.mode) {
                        case 'weekly':
                            acwTempAchievementState.weekly.claim_date = new moment().format('YYYY-MM-DD');
                            acwTempProgressState.points.qi += 20;
                            acwTempProgressState.actionList.push({
                                'mode': 'CM',
                                'data': {'id':action.payload.id, 'points':{'qi':20}},
                                'time': Math.floor(new Date().getTime() / 1000)
                            });
                            break;
                        case 'monthly':
                            acwTempAchievementState.monthly.claim_date = new moment().format('YYYY-MM-DD');
                            acwTempProgressState.points.qi += 100;
                            acwTempProgressState.actionList.push({
                                'mode': 'CM',
                                'data': {'id':action.payload.id, 'points':{'qi':100}},
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

                        if(!lesson.settings.next_lesson) {
                            olcTempAchievementState[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                            olcTempAchievementState[tempIndex].claim_date = '';
                            if(olcTempAchievementState[tempIndex].type==='daily'){
                                olcTempAchievementState[tempIndex].list.push(olcTempAchievementState[tempIndex].complete_date);
                            }

                            olcTempProgressState.actionList.push({
                                'mode': 'CA',
                                'data': {'id':item.id, 'points':item.awards},
                                'time': Math.floor(new Date().getTime() / 1000)
                            });
                        }
                    })
                    console.log('5')
                    olcTempProgressState.completedLessons.push({"id":lesson.id, "date":Math.floor(new Date().getTime() / 1000)});
                    olcTempProgressState.actionList.push({
                        'mode': 'LC',
                        'data': lesson.id,
                        'time': Math.floor(new Date().getTime() / 1000)
                    });
                    console.log('6')
                    if(!lesson.settings.next_lesson) {
                        olcTempProgressState.completedCourses.push({"id":lesson.parent.id, "date":Math.floor(new Date().getTime() / 1000)});
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
                    oceTempProgressState.enrolledCourses.push({"id":action.payload, "date":Math.floor(new Date().getTime() / 1000)});
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
                            weekly: {days:[], complete_date:'', claim_date:''},
                            monthly: {days:[], complete_date:'', claim_date:''},
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
                            latestUpdate:'',
                            lastUpload:'',
                            actionList:[],
                            practicesStats: [],
                            routinesStats: [],
                            groupStats: [],
                            completedLessons:[],
                            enrolledCourses:[],
                            completedCourses:[],
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
        const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
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
            if (user && courseVM.price.required_points > 0 && progressReducer&&progressReducer.points&&progressReducer.points.length?progressReducer.points.qi:0 < courseVM.price.required_points && courseVM.error.message) {
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
        const iconBackgroundColor = hasCover ? "#fff" : "#A6ADB5";
        const iconTintColor = hasCover ? "#4942e1" : "#fff";
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
                        source={require('./assets/images/onenergy.png')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: iconProps.tintColor,
                            alignContent: 'center',
                            marginBottom: 0,
                        }}
                    />
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
                    <Image
                        source={require('./assets/images/wisdom.png')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: iconProps.tintColor,
                            alignContent: 'center',
                            marginBottom: 0,
                        }}
                    />
                    <AuthWrapper actionOnGuestLogin={'hide'}>
                        <NotificationTabBarIcon notificationID={'blog'} top={-3} right={-3} size={scale(10)}
                                                showNumber={false}/>
                    </AuthWrapper>
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
        const config = useSelector((state) => state.config?state.config:null);
        const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
        const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer:null);
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
            /*  ChooseLanguage: {
                screen: ChooseLanguage
            },*/
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
}



