import React, {useState} from "react";
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
import Icon from "@src/components/Icon";
import HomeModal from "./Screens/HomeModal";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
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
import LoginScreen from "@src/containers/Custom/LoginScreen";
import SignupScreen from "@src/containers/Custom/SignupScreen";
import PracticesContent from "./Screens/PracticesContent";
import ProgramsContent from "./Screens/ProgramsContent";
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
        "OnBoarding",
        "OnBoarding",
        OnBoarding,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "SignupScreen",
        "SignupScreen",
        SignupScreen,
        "All"
    );
    externalCodeSetup.navigationApi.addNavigationRoute(
        "LoginScreen",
        "LoginScreen",
        LoginScreen,
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
        "HomeModal",
        "HomeModal",
        HomeModal,
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
                latestUpdate:'',
                lastUpload:'',
                actionList:[],
                practicesStats: [],
                routinesStats: [],
                gpStats: [],
                progressUpdate: '',
                completedLessons:[],
                enrolledCourses:[],
                completedCourses:[]
            },
            achievementReducer: {
                weekly: [],
                monthly: [],
                achievements:[],
                dailyNotify:0,
                weeklyNotify:0,
                monthlyNotify:0,
                learnNotify:0,
                startupNotify:0,
                enduranceNotify:0,
                achievementUpdate: ''
            }
        }, action) => {
            switch (action.type) {
                case "ONENERGY_INIT_DATA":
                    const data = action.payload.data;
                    const loadGroup = action.payload.loadGroup;
                    const loadGuide = action.payload.loadGuide;
                    const loadAchievement = action.payload.loadAchievement;
                    const loadProgress = action.payload.loadProgress;

                    let idPracticeReducer = state.practiceReducer;
                    let idAchievementReducer = state.achievementReducer;
                    let idProgressReducer = state.progressReducer;

                    if(loadGroup) {
                        if(data.groups){
                            idPracticeReducer.groups = data.groups;
                        }
                        idPracticeReducer.groupUpdate = new Date().toISOString();
                    }

                    console.log("done1")
                    if(loadGuide) {
                        if (data.guides) {
                            idPracticeReducer.guides = data.guides;
                        }
                        idPracticeReducer.guideUpdate = new Date().toISOString();
                    }

                    console.log("done2")
                    if(loadAchievement) {
                        if (data.achievements) {
                            idAchievementReducer.achievements = data.achievements.achievements;
                            idAchievementReducer.weekly = data.achievements.weekly;
                            idAchievementReducer.monthly = data.achievements.monthly;
                        }
                        idAchievementReducer.achievementUpdate = new Date().toISOString();
                    }

                    console.log("done3")
                    if(loadProgress) {
                        if (data.progress) {
                            idProgressReducer = data.progress;
                        } else {
                            idProgressReducer.points = {'qi': 0};
                        }
                        idProgressReducer.progressUpdate = new Date().toISOString();
                    }

                    console.log("done4")
                    return {
                        ...state,
                        practiceReducer: idPracticeReducer,
                        achievementReducer: idAchievementReducer,
                        progressReducer: idProgressReducer,
                    };
                //Practice Reducer
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
                    let ors_tempState = [...state.practiceReducer.routines];
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
                case "ONENERGY_GUIDE_INIT":
                    return {
                        ...state,
                        practiceReducer: {
                            ...state.practiceReducer,
                            guides: action.payload,
                            guideUpdate: new Date().toISOString()
                        }
                    };
                case "ONENERGY_GUIDE_UPDATE":
                    let sectionIndex;
                    let guideIndex;
                    let tempGuides = [...state.practiceReducer.guides];
                    tempGuides.map((section, index) => {
                        let tempIndex = section.data.findIndex(item => item.id === action.payload);
                        if (tempIndex >= 0) {
                            guideIndex = tempIndex
                            sectionIndex = index;
                        }
                    });
                    if (guideIndex >= 0) {
                        tempGuides[sectionIndex].data[guideIndex].show = true;
                        tempGuides[sectionIndex].data[guideIndex].new = true;
                        return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                                guides: tempGuides
                            }
                        };
                    } else {
                        return state;
                    }
                case "ONENERGY_GUIDE_LISTENED":
                    let glSectionIndex;
                    let glGuideIndex;
                    let glTempGuides = [...state.practiceReducer.guides];
                    glTempGuides.map((section, index) => {
                        let tempIndex = section.data.findIndex(item => item.id === action.payload);
                        if (tempIndex >= 0) {
                            glGuideIndex = tempIndex
                            glSectionIndex = index;
                        }
                    });
                    if (glGuideIndex >= 0) {
                        glTempGuides[glSectionIndex].data[glGuideIndex].new = false;
                        return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                                guides: glTempGuides
                            }
                        };
                    } else {
                        return state;
                    }
                case "ONENERGY_GROUP_INIT":
                    return {
                        ...state,
                        practiceReducer: {
                            ...state.practiceReducer,
                            groups: action.payload,
                            groupUpdate: new Date().toISOString()
                        }
                    };
                case "ONENERGY_ROUTINE_RESET":
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
                //Progress Reducer
                case "ONENERGY_PROGRESS_UPDATE":
                    let oruItemIndex;
                    let totalDuration = state.progressReducer.totalDuration;
                    let todayDuration = state.progressReducer.todayDuration;
                    let weekDuration = state.progressReducer.weekDuration;
                    let totalDays = state.progressReducer.totalDays;
                    let practicesStats = state.progressReducer.practicesStats;
                    let routinesStats = state.progressReducer.routinesStats;
                    let gpStats = state.progressReducer.gpStats;
                    let progressUpdate = state.progressReducer.progressUpdate;
                    let latestUpdate = state.progressReducer.latestUpdate;
                    let actionList = state.progressReducer.actionList;
                    let completedLessons = state.progressReducer.completedLessons;
                    let enrolledCourses = state.progressReducer.enrolledCourses;
                    let completedCourses = state.progressReducer.completedCourses;

                    let updatesList = action.payload;
                    updatesList.map((list) => {
                        if (list.mode.startsWith('P') && latestUpdate !== new moment().format('YYYY-MM-DD')) {
                            totalDuration = 0;
                            if (new Date().getDay() === 1) {
                                weekDuration = 0;
                            }
                            totalDays += 1;
                        }
                        switch (list.mode) {
                            case 'PG':
                                oruItemIndex = gpStats.findIndex(item => item.id === list.data);
                                if (oruItemIndex) {
                                    gpStats[oruItemIndex].count += list.count;
                                    gpStats[oruItemIndex].duration += list.duration;
                                }
                                latestUpdate = new moment().format('YYYY-MM-DD');
                                break;
                            case 'LC':
                                completedLessons.push(action.payload.data);
                                break;
                            case 'CE':
                                enrolledCourses.push(action.payload.data);
                                break;
                            case 'CC':
                                completedCourses.push(action.payload.data);
                                break;
                        }
                        actionList.push({
                            'mode': action.payload.mode,
                            'data': action.payload.data,
                            'date': Math.floor(new Date().getTime() / 1000),
                        })
                    })
                    return {
                        ...state,
                        progressReducer: {
                            ...state.progressReducer,
                            totalDuration: totalDuration,
                            todayDuration: todayDuration,
                            weekDuration: weekDuration,
                            totalDays: totalDays,
                            practicesStats: practicesStats,
                            routinesStats: routinesStats,
                            gpStats: gpStats,
                            progressUpdate: progressUpdate,
                            actionList: actionList,
                            completedLessons: completedLessons,
                            completedCourses: completedCourses,
                        }
                    };
                case "ONENERGY_UPDATE_USER_POINTS":
                    let awards = action.payload;
                    let userPoints = state.progressReducer.points;
                    Object.entries(awards).map(([key, point]) => {
                        if(userPoints[key]) {
                            userPoints[key] += point;
                        }else{
                            userPoints[key] = point;
                        }
                    });
                    return {
                        ...state,
                        progressReducer: {
                            ...state.progressReducer,
                            points: userPoints,
                        }
                    }
                case "ONENERGY_PROGRESS_UPLOADED":
                    return {
                        ...state,
                        progressReducer: {
                            ...state.progressReducer,
                            actionList: [],
                            lastUpload: Math.floor(new Date().getTime() / 1000)
                        }
                    };
                case "ONENERGY_PROGRESS_INIT":
                    return {
                        ...state,
                        progressReducer: {
                            ...state.progressReducer,
                            points: action.payload.points,
                            totalDuration: action.payload.totalDuration,
                            todayDuration: action.payload.todayDuration,
                            weekDuration: action.payload.weekDuration,
                            totalDays: action.payload.totalDays,
                            practicesStats: action.payload.practicesStats,
                            routinesStats: action.payload.routinesStats,
                            gpStats: action.payload.gpStats,
                            completedLessons: action.payload.completedLessons,
                            completedCourses: action.payload.completedCourses,
                            progressUpdate: new Date().toISOString()
                        }
                    };
                case "ONENERGY_PROGRESS_RESET":
                    return {
                        ...state,
                        progressReducer: {
                            points: {},
                            totalDuration: 0,
                            todayDuration: 0,
                            weekDuration: 0,
                            totalDays: 0,
                            latestUpdate:'',
                            lastUpload:'',
                            actionList:[],
                            practicesStats: [],
                            routinesStats: [],
                            gpStats: [],
                            completedLessons:[],
                            enrolledCourses:[],
                            completedCourses:[],
                            progressUpdate: '',
                        }
                    }
                //Achievement Reducer
                case "ONENERGY_ACHIEVEMENT_INIT":
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements:
                                action.payload.achievements.sort((a, b) => {
                                    return a.complete_date > b.complete_date
                                }).sort((a, b) => {
                                    return a.claim_date > b.claim_date
                                }),
                            weekly: action.payload.weekly,
                            monthly: action.payload.monthly,
                            achievementUpdate: new Date().toISOString()
                        }
                    };
                case "ONENERGY_ACHIEVEMENT_COMPLETE_PRACTICE":
                    let acpTempAchievementState = [...state.achievementReducer.achievements];
                    let acpTempProgressState = [...state.progressReducer];
                    let acpTempPracticeState = [...state.practiceReducer];
                    let dailyNotify = [...state.achievementReducer.dailyNotify];
                    let learnNotify = [...state.achievementReducer.learnNotify];
                    let startupNotify = [...state.achievementReducer.startupNotify];
                    let enduranceNotify = [...state.achievementReducer.enduranceNotify];
                    let acpMode = action.payload.mode;
                    let acpData = action.payload.data;
                    let today = new moment().format('YYYY-MM-DD');
                    let sectionId;
                    let updateDaily;
                    let acpSectionIndex;
                    let acpGuideIndex;

                    if(!state.progressReducer.latestUpdate)
                    {
                        updateDaily = true;
                    }else{
                        if(today > state.progressReducer.latestUpdate)
                            updateDaily = true;
                    }
                    if(updateDaily)
                    {
                        acpTempProgressState.totalDay += 1;
                        state.achievementReducer.achievements.map((achievement, index) =>
                            (achievement.trigger === 'progress' && achievement.triggerField === 'totalDay' && !achievement.complete_date)
                        ).map((acpIndex) => {
                            if (parseInt(acpTempAchievementState[acpIndex].total) <= acpTempProgressState.totalDay) {
                                acpTempAchievementState[acpIndex].complete_date = Math.floor(new Date().getTime() / 1000);
                                acpTempAchievementState[acpIndex].awards.map(award => {
                                    acpTempProgressState.points[award.name] += parseInt(award.point);
                                })
                            }
                        })
                    }
                    switch (acpMode)
                    {
                        case 'single':
                            //Get the section ID from the guide ID
                            sectionId = state.practiceReducer.guides.find((section) => {
                                if(section.data.find(guide => guide.id === acpData))
                                    return section.id
                            });
                            state.achievementReducer.achievements.map((achievement, index) => {
                                 if (achievement.trigger === 'practice' &&
                                        ((achievement.triggerPracticeOption === 'single' && (parseInt(achievement.triggerSinglePractice) === acpData || !achievement.triggerSinglePractice)) ||
                                            (achievement.triggerPracticeOption === 'section' && (parseInt(achievement.triggerSectionPractice) === sectionId || !achievement.triggerSectionPractice))) &&
                                        !achievement.complete_date) {
                                     return index;
                                 }
                            }).map((acpIndex) => {
                                acpTempAchievementState[acpIndex].step += 1;
                                if(acpTempAchievementState[acpIndex].total <= acpTempAchievementState[acpIndex].step) {
                                    acpTempAchievementState[acpIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempAchievementState[acpIndex].claim_date = '';
                                    switch(acpTempAchievementState[acpIndex].type)
                                    {
                                        case 'daily':
                                            acpTempAchievementState[acpIndex].list.push(acpTempAchievementState[acpIndex].complete_date);
                                            dailyNotify += 1;
                                            break;
                                        case 'learn':
                                            learnNotify += 1;
                                            break;
                                        case 'startup':
                                            startupNotify += 1;
                                            break;
                                        case 'endurance':
                                            enduranceNotify += 1;
                                            break;
                                    }
                                    acpTempAchievementState[acpIndex].awards.map(award => {
                                        acpTempProgressState.points[award.name] += parseInt(award.point);
                                    })
                                }
                            })
                            acpTempPracticeState.guides.map((section, index) => {
                                let tempIndex = section.data.findIndex(item => item.id === acpData);
                                if (tempIndex >= 0) {
                                    acpGuideIndex = tempIndex
                                    acpSectionIndex = index;
                                }
                            });
                            if (acpGuideIndex >= 0) {
                                acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].new = false;
                                acpTempProgressState.totalDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.todayDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.weekDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.practicesStats[acpSectionIndex].count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count;
                                acpTempProgressState.practicesStats[acpSectionIndex].duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.latestUpdate = new moment().format('YYYY-MM-DD');
                            }
                            break;
                        case 'routine':
                            state.practiceReducer.routines.find(routine => routine.id === acpData).guides.map()


                            //Get the section ID from the guide ID
                            sectionId = state.practiceReducer.guides.find((section) => {
                                if(section.data.find(guide => guide.id === acpData))
                                    return section.id
                            });
                            state.achievementReducer.achievements.map((achievement, index) => {
                                if (achievement.trigger === 'practice' &&
                                    ((achievement.triggerPracticeOption === 'single' && (parseInt(achievement.triggerSinglePractice) === acpData || !achievement.triggerSinglePractice)) ||
                                        (achievement.triggerPracticeOption === 'section' && (parseInt(achievement.triggerSectionPractice) === sectionId || !achievement.triggerSectionPractice))) &&
                                    !achievement.complete_date) {
                                    return index;
                                }
                            }).map((acpIndex) => {
                                acpTempAchievementState[acpIndex].step += 1;
                                if(acpTempAchievementState[acpIndex].total <= acpTempAchievementState[acpIndex].step) {
                                    acpTempAchievementState[acpIndex].complete_date = new moment().format('YYYY-MM-DD');
                                    acpTempAchievementState[acpIndex].claim_date = '';
                                    switch(acpTempAchievementState[acpIndex].type)
                                    {
                                        case 'daily':
                                            acpTempAchievementState[acpIndex].list.push(acpTempAchievementState[acpIndex].complete_date);
                                            dailyNotify += 1;
                                            break;
                                        case 'learn':
                                            learnNotify += 1;
                                            break;
                                        case 'startup':
                                            startupNotify += 1;
                                            break;
                                        case 'endurance':
                                            enduranceNotify += 1;
                                            break;
                                    }
                                    acpTempAchievementState[acpIndex].awards.map(award => {
                                        acpTempProgressState.points[award.name] += parseInt(award.point);
                                    })
                                }
                            })
                            acpTempPracticeState.guides.map((section, index) => {
                                let tempIndex = section.data.findIndex(item => item.id === acpData);
                                if (tempIndex >= 0) {
                                    acpGuideIndex = tempIndex
                                    acpSectionIndex = index;
                                }
                            });
                            if (acpGuideIndex >= 0) {
                                acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].new = false;
                                acpTempProgressState.totalDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.todayDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.weekDuration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.practicesStats[acpSectionIndex].count += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].count;
                                acpTempProgressState.practicesStats[acpSectionIndex].duration += acpTempPracticeState.guides[acpSectionIndex].data[acpGuideIndex].duration;
                                acpTempProgressState.latestUpdate = new moment().format('YYYY-MM-DD');
                            }
                            break;
                    }

                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements:
                                acpTempAchievementState.sort((a, b) => {
                                    return a.complete_date > b.complete_date
                                }).sort((a, b) => {
                                    return a.claim_date > b.claim_date
                                }),
                            dailyNotify: dailyNotify,
                            learnNotify: learnNotify,
                            startupNotify: startupNotify,
                            enduranceNotify: enduranceNotify,
                        },
                        progressReducer: acpTempProgressState,
                        practiceReducer: acpTempPractice
                    };
                case "ONENERGY_ACHIEVEMENT_CLAIM":
                    let acTempState = [...state.achievementReducer.achievements];
                    let acAchievementIndex = acTempState.findIndex(achievement => achievement.id === action.payload);
                    acTempState[acAchievementIndex].claim_date = Math.floor(new Date().getTime() / 1000);
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements: acTempState.sort((a, b) => {
                                return a.complete_date > b.complete_date
                            }).sort((a, b) => {
                                return a.claim_date > b.claim_date
                            }),
                        }
                    };
                case "ONENERGY_ACHIEVEMENT_WAIT_CLAIM":
                    let awcTempQuestState = [...state.achievementReducer.achievements];
                    let awcAchievementIndex = awcTempQuestState.findIndex(achievement => achievement.id === action.item);
                    let awcWaitItemIndex = awcTempQuestState[awcAchievementIndex].list.findIndex(waitItem => waitItem.log_id === action.log);
                    awcTempQuestState[awcAchievementIndex].list.splice(awcWaitItemIndex, 1);
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements: awcTempQuestState,
                        }
                    };
                case "ONENERGY_ACHIEVEMENT_CLAIM_WEEKLY_MONTHLY":
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            [action.quest_mode]: {
                                ...state[action.quest_mode],
                                list: ''
                            },
                        }
                    };
                case "ONENERGY_ACHIEVEMENT_COMPLETE_LESSON":
                    let aclTempState = [...state.achievementReducer.achievements];
                    let aclCourseIndex = aclTempState.findIndex(item => item.trigger === 'course' && parseInt(item.triggerCourse) === parseInt(action.payload.course));
                    let aclLessonIndex = aclTempState[aclCourseIndex].step.findIndex(lesson => lesson.id === action.payload.lesson);
                    aclTempState[aclCourseIndex].step[aclLessonIndex].completed = 1;
                    if(action.payload.course_completed)
                        aclTempState[aclCourseIndex].complete_date = Math.floor(new Date().getTime() / 1000);
                    return {
                        ...state,
                        achievementReducer: {
                            ...state.achievementReducer,
                            achievements: aclTempState.sort((a, b) => {
                                return a.complete_date > b.complete_date
                            }).sort((a, b) => {
                                return a.claim_date > b.claim_date
                            }),
                        }
                    };
                case 'ONENERGY_ACHIEVEMENT_RESET':
                    return {
                        ...state,
                        achievementReducer: {
                            achievements: [],
                            weekly: [],
                            monthly: [],
                            achievementUpdate: ''
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
/*        let index = whiteList.indexOf('blog');
        if (index !== -1) {
            whiteList.splice(index, 1);
        }
        index = whiteList.indexOf('blogCache');
        if (index !== -1) {
            whiteList.splice(index, 1);
        }*/
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
        const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
        const lesson_time = new moment.utc(courseVM.date);
        const current_time = new moment.utc();
        const diffMinutes = lesson_time.diff(current_time, 'minutes');
        const diffHours = lesson_time.diff(current_time, 'hours');
        const diffDays = lesson_time.diff(current_time, 'days');
        const dispatch = useDispatch();
        const [visualGuide, setVisualGuide] = useState(false);

        let diffTime = '';
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
            if (user && courseVM.price.required_points > 0 && progressReducer.points.qi < courseVM.price.required_points && courseVM.error.message) {
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
                                    type: 'ONENERGY_PROGRESS_UPDATE',
                                    payload: {"mode": "CE", "data": courseVM.id}
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
                                        type: 'ONENERGY_PROGRESS_UPDATE',
                                        payload: {"mode": "CE", "data": courseVM.id}
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
                    <NotificationTabBarIcon notificationID={'guide_page'} top={-3} right={-3} size={scale(10)}
                                            showNumber={false}/>
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
                    <NotificationTabBarIcon notificationID={'blog'} top={-3} right={-3} size={scale(10)}
                                            showNumber={false}/>
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
                        routeName: "MilestonesScreen",
                    })
                )
            },
            {
                icon: require("@src/assets/img/privacy_group.png"), //Set icon
                label: "Membership", //Set label of menu
                onPress: () => navigation.navigate(
                    NavigationActions.navigate({
                        routeName: "Membership",
                    })
                )
            },
        ]
    })
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
                                        dispatch({
                                            type: 'ONENERGY_POSTS_RESET',
                                        });
                                        dispatch({
                                            type: 'ONENERGY_ROUTINE_RESET',
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
};



