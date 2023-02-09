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
import Orientation from 'react-native-orientation';
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
import LocalVideoPlayer from "./Components/LocalVideoPlayer";
import VimeoBlockLoader from "./Components/VimeoBlockLoader";
import VideoBlock from "./Components/VideoBlock";
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
import {ms, mvs, s, windowWidth} from './Utils/Scale';
import ImageCache from "./Components/ImageCache";
import ProgramsScreen from "./Screens/ProgramsScreen";
import EditRoutine from "./Components/EditRoutine";
import FeedbackScreen from "./Screens/FeedbackScreen";
import NotificationTabBarIcon from "./Components/NotificationTabBarIcon";
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './Services';
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
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import * as Analytics from "./Utils/Analytics";

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
        "LocalVideoPlayer",
        "LocalVideoPlayer",
        LocalVideoPlayer,
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
    externalCodeSetup.blocksApi.addCustomBlockRender(
        'bbapp/localvideoblock',
        props => <VideoBlock {...props}/>
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
        const optionData = useSelector((state) => state.settings.settings.onenergy_option);

        let featuredUrl = viewModel.featuredUrl.replace('-300x200', '-1024x683');
        let statusText;
        let statusBarColor;
        const current_time = new moment.utc();
        if (viewModel.progression === 100) {
            statusBarColor = colors.coursesLabelCompleted;
            statusText = optionData.titles.find(el => el.id === 'programs_label_completed').title;
        } else if (viewModel.price && viewModel.price.expired) {
            statusBarColor = "black";
            statusText = optionData.titles.find(el => el.id === 'programs_label_expired').title;
        } else if (viewModel.hasAccess) {
            const expiringTime = new moment.utc(viewModel.price.expires_on);
            const diffExpiringDays = expiringTime.diff(current_time, 'days');
            let diffExpiringTime;
            diffExpiringTime = 'Expire in ' + diffExpiringDays + ' Days';
            if (diffExpiringDays <= 7 && diffExpiringDays > 0) {
                statusBarColor = "grey";
                statusText = diffExpiringTime;
            } else {
                if (viewModel.progression > 0) {
                    statusBarColor = colors.coursesLabelProgress;
                    statusText = optionData.titles.find(el => el.id === 'programs_label_in_progress').title;
                } else {
                    statusBarColor = colors.coursesLabelFree;
                    statusText = optionData.titles.find(el => el.id === 'programs_label_enrolled').title;
                }
            }
        } else {
            statusBarColor = colors.coursesLabelStart;
            statusText = optionData.titles.find(el => el.id === 'programs_label_start_course').title;
        }
        const styles = StyleSheet.create({
            containerStyle: {
                marginHorizontal: s(15),
                backgroundColor: 'transparent',
            },
            statusBar: {
                height: s(25),
                position: 'absolute',
                top: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: s(105),
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
                fontSize: s(13),
                backgroundColor: 'transparent',
                fontFamily: "MontserratAlternates-Regular"
            },
            progressBar: {
                height: 3,
                position: 'absolute',
                top: s(20),
                right: s(20),
                flexDirection: "row",
                width: (windowWidth - s(30)) / 2,
                backgroundColor: 'white',
                borderColor: '#000',
                borderWidth: 0,
                borderRadius: 5,
            },
            image: {
                width: windowWidth - s(30),
                height: (windowWidth - s(30)) / 9 * 4,
                borderRadius:s(9),
                marginLeft: (windowWidth - s(30)) / 9,
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
                width: windowWidth - s(30),
                height: (windowWidth - s(30)) / 9 * 4,
                borderRadius:s(9),
                justifyContent: "center",
                alignItems: "center",
                paddingRight: ms(10),
                paddingTop: mvs(10),
            },
            icon: {
                width: (windowWidth - s(30)) / 2,
                height: (windowWidth - s(30)) / 2,
                position: "absolute",
                left: (windowWidth - s(30)) / 9,
                top: (windowWidth - s(30)) / 9 + s(10),
            },
            title: {
                fontSize: s(20),
                textAlign: 'center',
                justifyContent: "center",
                color: 'white',
                textShadowColor: 'grey',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 1,
                fontWeight: "bold",
                fontFamily: 'MontserratAlternates-SemiBold',
                position: "absolute",
                bottom: s(10),
                left: 0,
                right: 0,
            },
            card: {
                backgroundColor: 'white',
                borderRadius:s(9),
                width: '100%',
                height: s(150),
                marginTop: mvs(25),
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
        "postsReducer",
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
                    let categoryIndex = state.lastView.findIndex(lv => parseInt(lv.category) === parseInt(action.category));

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
                    let postIndex = state.posts.findIndex(post => parseInt(post.id) === parseInt(action.payload));
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
        "onenergyAppReducer",
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
                totalPracticeDays: 0,
                totalLoginDays: 1,
                lastPractice: '',
                latestUpdate: 0,
                lastUpload: 0,
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
                    console.log('ONENERGY_INIT_DATA');
                    const data = action.payload.data;
                    const loadGroup = action.payload.loadGroup;
                    const loadGuide = action.payload.loadGuide;
                    const loadRoutine = action.payload.loadRoutine;
                    const loadAchievement = action.payload.loadAchievement;
                    const loadProgress = action.payload.loadProgress;
                    const idPracticeReducer = {...state.practiceReducer};
                    const idAchievementReducer = {...state.achievementReducer};
                    const idProgressReducer = {...state.progressReducer};

                    const oidToday = new moment().format('YYYY-MM-DD');
                    const oidUpdateDaily = data.progress.latestUpdate===0 || (data.progress.latestUpdate && oidToday !== new moment.unix(data.progress.latestUpdate).format('YYYY-MM-DD'));
                    console.log('loadGroup', loadGroup )
                    if (loadGroup) {
                        if (data.groups) {
                            idPracticeReducer.groups = data.groups;
                        }
                        idPracticeReducer.groupUpdate = new Date().toISOString();
                        console.log('groupUpdate', idPracticeReducer.groupUpdate )
                    }
                    console.log('loadGuide', loadGuide )
                    if (loadGuide) {
                        if (data.guidesData) {
                            idPracticeReducer.guides = data.guidesData;
                        }
                        idPracticeReducer.guideUpdate = new Date().toISOString();
                        console.log('guideUpdate', idPracticeReducer.guideUpdate  )
                    }
                    console.log('loadRoutine', loadRoutine )
                    if (loadRoutine) {
                        if (data.routines) {
                            idPracticeReducer.routines = data.routines;
                        }
                        idPracticeReducer.routineUpdate = new Date().toISOString();
                        console.log('routineUpdate', idPracticeReducer.routineUpdate  )
                    }
                    console.log('loadAchievement', loadAchievement )
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
                            if(oidUpdateDaily){
                                idAchievementReducer.daily.forEach((item, tempIndex) => {
                                    idAchievementReducer.daily[tempIndex].complete_date = '';
                                    idAchievementReducer.daily[tempIndex].claim_date = '';
                                })
                            }
                        }
                        idAchievementReducer.achievementUpdate = new Date().toISOString();
                        console.log('achievementUpdate', idAchievementReducer.achievementUpdate  )
                    }
                    console.log('loadProgress', loadProgress )
                    if (loadProgress) {
                        if (data.progress) {
                            Object.keys(data.progress.points).forEach(key =>
                                idProgressReducer.points[key] = parseInt(data.progress.points[key])
                            )
                            idProgressReducer.lastPractice = data.progress.lastPractice ? data.progress.lastPractice : '';
                            idProgressReducer.latestUpdate = Math.floor(new Date().getTime() / 1000);
                            idProgressReducer.lastUpload = data.progress.lastUpload ? parseInt(data.progress.lastUpload) : 0;
                            idProgressReducer.totalDuration = data.progress.totalDuration ? parseInt(data.progress.totalDuration) : 0;
                            idProgressReducer.todayDuration = oidUpdateDaily? 0 : data.progress.todayDuration ? parseInt(data.progress.todayDuration) : 0;
                            idProgressReducer.todayGoal = data.progress.todayGoal ? parseInt(data.progress.todayGoal) : 10;
                            idProgressReducer.weekDuration = oidUpdateDaily && (new Date().getDay() === 1) ? 0 : data.progress.weekDuration ? parseInt(data.progress.weekDuration) : 0;
                            idProgressReducer.progress = [];
                            if (data.progress.progress) {
                                data.progress.progress.forEach(progress => {
                                    idProgressReducer.progress.push({
                                        'date': progress.date,
                                        'duration': parseInt(progress.duration)
                                    });
                                })
                            } else {
                                idProgressReducer.progress = [];
                            }
                            idProgressReducer.totalPracticeDays = data.progress.totalPracticeDays ? parseInt(data.progress.totalPracticeDays) : 0;
                            idProgressReducer.totalLoginDays = oidUpdateDaily? data.progress.totalLoginDays ? parseInt(data.progress.totalLoginDays)+1 : 1 : data.progress.totalLoginDays ? parseInt(data.progress.totalLoginDays) : 1;
                            idProgressReducer.guideStats = data.progress.guideStats ? data.progress.guideStats : [];
                            idProgressReducer.sectionStats = data.progress.sectionStats ? data.progress.sectionStats : [];
                            idProgressReducer.routineStats = data.progress.routineStats ? data.progress.routineStats : [];
                            idProgressReducer.groupStats = data.progress.groupStats ? data.progress.groupStats : [];
                            idProgressReducer.completedLessons = data.progress.completedLessons ? data.progress.completedLessons : [];
                            idProgressReducer.enrolledCourses = data.progress.enrolledCourses ? data.progress.enrolledCourses : [];
                            idProgressReducer.completedCourses = data.progress.completedCourses ? data.progress.completedCourses : [];
                        } else {
                            idProgressReducer.points = {'qi': 0};
                            idProgressReducer.totalDuration = 0;
                            idProgressReducer.todayDuration = 0;
                            idProgressReducer.todayGoal = 10;
                            idProgressReducer.weekDuration = 0;
                            idProgressReducer.progress = [];
                            idProgressReducer.totalPracticeDays = 0;
                            idProgressReducer.totalLoginDays = 1;
                            idProgressReducer.lastPractice = '';
                            idProgressReducer.latestUpdate = Math.floor(new Date().getTime() / 1000);
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
                        console.log('progressUpdate', idPracticeReducer.progressUpdate  )
                    }
                    return {
                        ...state,
                        practiceReducer: idPracticeReducer,
                        achievementReducer: idAchievementReducer,
                        progressReducer: idProgressReducer,
                    };
                case "ONENERGY_ROUTINE_UPDATE":
                    console.log('ONENERGY_ROUTINE_UPDATE');
                    return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                            routines: action.payload,
                            routineUpdate: new Date().toISOString()
                            }
                        };
                case "ONENERGY_ROUTINE_SAVE":
                    console.log('ONENERGY_ROUTINE_SAVE');
                    let orsRoutine = action.payload;
                    const ors_tempPracticeState = {...state.practiceReducer};

                    if(ors_tempPracticeState.routines) {
                        if (ors_tempPracticeState.routines.length) {
                            let orsIndex = ors_tempPracticeState.routines.findIndex(el => el.id === orsRoutine.id);
                            if (orsIndex >= 0) {
                                ors_tempPracticeState.routines[orsIndex] = orsRoutine;
                            } else {
                                ors_tempPracticeState.routines.push(orsRoutine);
                            }
                        } else {
                            ors_tempPracticeState.routines.push(orsRoutine);
                        }
                        return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                                routines: ors_tempPracticeState.routines,
                                routineUpdate: new Date().toISOString()
                            }
                        }
                    }else{
                        return {
                            ...state,
                            practiceReducer: {
                                ...state.practiceReducer,
                                routines: [...state.practiceReducer.routines, orsRoutine],
                                routineUpdate: new Date().toISOString()
                            }
                        }
                    }
                case "ONENERGY_GUIDE_UPDATE":
                    console.log('ONENERGY_GUIDE_UPDATE');
                    let lessonGuides = action.payload;
                    let tempGuides = {...state.practiceReducer};
                    loop1:
                    for(let [levelIndex, level] of state.practiceReducer.guides.entries()) {
                        for (let [sectionIndex, section] of level.sections.entries()) {
                            let tempIndex = section.data.findIndex(item => lessonGuides.includes(item.id));
                            if (tempIndex >= 0) {
                                tempGuides.guides[levelIndex].sections[sectionIndex].data[tempIndex].show = true;
                                tempGuides.guides[levelIndex].sections[sectionIndex].data[tempIndex].new = true;
                                break loop1;
                            }
                        }
                    }
                    return {
                        ...state,
                        practiceReducer: tempGuides
                    };
                case "ONENERGY_PROGRESS_GOAL":
                    console.log('ONENERGY_PROGRESS_GOAL');
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
                    console.log('ONENERGY_PROGRESS_UPLOADED', Math.floor(new Date().getTime() / 1000));
                    return {
                        ...state,
                        progressReducer: {
                            ...state.progressReducer,
                            actionList: [],
                            lastUpload: Math.floor(new Date().getTime() / 1000)
                        }
                    };
                case "ONENERGY_DAILY_UPDATE":
                    console.log('ONENERGY_DAILY_UPDATE');
                    const oduTempProgressState = {...state.progressReducer};
                    const oduTempDailyState = {...state.achievementReducer};

                    oduTempProgressState.totalLoginDays += 1;
                    oduTempProgressState.todayDuration = 0;
                    if (new Date().getDay() === 1) {
                        oduTempProgressState.weekDuration = 0;
                    }
                    oduTempDailyState.daily.forEach((item, tempIndex) => {
                        oduTempDailyState.daily[tempIndex].complete_date = '';
                        oduTempDailyState.daily[tempIndex].claim_date = '';
                    })
                    oduTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000)

                    return {
                        ...state,
                        achievementReducer: oduTempDailyState,
                        progressReducer: oduTempProgressState,
                    };
                case "ONENERGY_PRACTICE_COMPLETED":
                    console.log('ONENERGY_PRACTICE_COMPLETED');
                    const acpTempPracticeState = {...state.practiceReducer};
                    const acpTempProgressState = {...state.progressReducer};
                    const acpTempAchievementState = {...state.achievementReducer};
                    let acpMode = action.payload.mode;
                    let acpData = action.payload.data;
                    let acpToday = new moment().format('YYYY-MM-DD');
                    let tmpAchievements;
                    let acpTempIndex;
                    if (acpToday > acpTempProgressState.lastPractice) {
                        acpTempProgressState.totalPracticeDays += 1;
                        acpTempAchievementState.milestones.forEach((item, tempIndex) => {
                            if (item.trigger === 'progress' && item.triggerField === 'totalDays' && item.complete_date !== acpToday) {
                                acpTempAchievementState.milestones[tempIndex].step += 1;
                                if (parseInt(item.total) <= acpTempProgressState.totalPracticeDays) {
                                    acpTempAchievementState.milestones[tempIndex].complete_date = acpToday;
                                    Analytics.segmentClient.track('Achievement Completed', {
                                        id: item.id,
                                    }).then();
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            }
                        })
                    }
                    //weekly
                    if (acpTempAchievementState.weekly.days && acpTempAchievementState.weekly.days.length) {
                        let lastDay = acpTempAchievementState.weekly.days[acpTempAchievementState.weekly.days.length - 1];
                        if (moment(acpToday).diff(moment(lastDay), 'days') > 1) {
                            acpTempAchievementState.weekly.days = [];
                            acpTempAchievementState.weekly.days.push(acpToday);
                        } else if (acpTempAchievementState.weekly.days.length > 7) {
                            acpTempAchievementState.weekly.days = [];
                            acpTempAchievementState.weekly.days.push(acpToday);
                        } else if (acpToday !== lastDay){
                            acpTempAchievementState.weekly.days.push(acpToday);
                            if (acpTempAchievementState.weekly.days.length === 7) {
                                acpTempAchievementState.weekly.complete_date = acpToday;
                                acpTempAchievementState.weekly.claim_date = '';
                            }
                        }
                    } else {
                        acpTempAchievementState.weekly.days = [];
                        acpTempAchievementState.weekly.days.push(acpToday);
                    }

                    //monthly
                    if (acpTempAchievementState.monthly.days && acpTempAchievementState.monthly.days.length) {
                        let lastDay = acpTempAchievementState.monthly.days[acpTempAchievementState.monthly.days.length - 1];
                        if (moment(acpToday).diff(moment(lastDay), 'days') > 1) {
                            acpTempAchievementState.monthly.days = [];
                            acpTempAchievementState.monthly.days.push(acpToday);
                        } else if (acpTempAchievementState.monthly.days.length > 30) {
                            acpTempAchievementState.monthly.days = [];
                            acpTempAchievementState.monthly.days.push(acpToday);
                        } else if (acpToday !== lastDay){
                            acpTempAchievementState.monthly.days.push(acpToday);
                            if (acpTempAchievementState.monthly.days.length === 30) {
                                acpTempAchievementState.monthly.complete_date = acpToday;
                                acpTempAchievementState.monthly.claim_date = '';
                            }
                        }
                    } else {
                        acpTempAchievementState.monthly.days = [];
                        acpTempAchievementState.monthly.days.push(acpToday)
                    }

                    let tempArray = [];
                    switch (acpMode) {
                        case 'PP':
                            tempArray.push({'guide': acpData, 'duration': acpData.duration, 'count': acpData.count});
                            break;
                        case 'PR':
                            console.log('R1')
                            let routineIndex;
                            routineIndex = state.practiceReducer.routines.findIndex((temp) => temp.id === acpData);
                            let tempGuides = state.practiceReducer.routines[routineIndex].routine;
                            let guideDuration = 0;
                            console.log('R2', tempGuides)
                            tempGuides.forEach(guide => {
                                let startCount = parseInt(guide.startCount);
                                let endDuration = parseInt(guide.endDuration);
                                let remainCount;
                                if(guide.count>startCount) {
                                    remainCount = guide.count - startCount;
                                }
                                guide.parts.forEach(part => {
                                    if(part.start){
                                        guideDuration = guideDuration + parseInt(part.start_duration);
                                    }
                                    if(part.repeat){
                                        guideDuration = guideDuration + parseInt(part.repeat_duration) * remainCount;
                                    }
                                })
                                guideDuration = guideDuration + endDuration;
                                console.log(guide.count, startCount, remainCount, guideDuration)
                                tempArray.push({'guide': guide, 'duration':guideDuration, 'count': guide.count});
                            })
                            console.log('R3')
                            acpTempIndex = acpTempProgressState.routineStats.findIndex(item => item.routine_id === acpData)
                            if (acpTempIndex >= 0) {
                                acpTempProgressState.routineStats[acpTempIndex].routine_count += 1;
                                acpTempProgressState.routineStats[acpTempIndex].routine_duration += guideDuration;
                            } else {
                                acpTempProgressState.routineStats.push({
                                    'routine_id': acpData,
                                    'routine_count': 1,
                                    'routine_duration': guideDuration,
                                })
                            }
                            break;
                        case 'PG':
                            let groupIndex;
                            console.log('G1')
                            groupIndex = state.practiceReducer.groups.findIndex((temp) => temp.id === acpData);
                            state.practiceReducer.groups[groupIndex].guides.forEach(guide_id => {
                                loop1:
                                for(let level of state.practiceReducer.guides){
                                    for(let section of level.sections){
                                        for(let guide of section.data){
                                            if(guide.id === guide_id){
                                                tempArray.push({'guide': guide, 'duration':guide.count, 'count': guide.count});
                                                break loop1
                                            }
                                        }
                                    }
                                }
                            });
                            console.log('G2')
                            tmpAchievements = state.achievementReducer.milestones.filter((item) =>
                                (item.trigger === 'practice' &&
                                    (
                                        (item.triggerPracticeOption === 'group' && (parseInt(item.triggerGroupPractice) === acpData || !item.triggerGroupPractice))
                                    ) &&
                                    !item.complete_date));
                            console.log('G3')
                            tmpAchievements.forEach((item) => {
                                let tempIndex = acpTempAchievementState.milestones.findIndex(achievement => achievement.id === item.id);
                                acpTempAchievementState.milestones[tempIndex].step += 1;
                                if (acpTempAchievementState.milestones[tempIndex].total <= acpTempAchievementState.milestones[tempIndex].step) {
                                    acpTempAchievementState.milestones[tempIndex].complete_date = acpToday;
                                    acpTempAchievementState.milestones[tempIndex].claim_date = '';
                                    Analytics.segmentClient.track('Achievement Completed', {
                                        id: item.id,
                                    }).then();
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            })
                            console.log('G4')

                            tmpAchievements = state.achievementReducer.daily.filter((item) =>
                                (item.trigger === 'practice' &&
                                    (
                                        (item.triggerPracticeOption === 'group' && (parseInt(item.triggerGroupPractice) === acpData || !item.triggerGroupPractice))
                                    ) &&
                                    !item.complete_date));
                            console.log('G5')

                            tmpAchievements.forEach((item) => {
                                let tempIndex = acpTempAchievementState.daily.findIndex(achievement => achievement.id === item.id);
                                acpTempAchievementState.daily[tempIndex].step += 1;
                                if (acpTempAchievementState.daily[tempIndex].total <= acpTempAchievementState.daily[tempIndex].step) {
                                    acpTempAchievementState.daily[tempIndex].complete_date = acpToday
                                    acpTempAchievementState.daily[tempIndex].claim_date = '';
                                    acpTempAchievementState.daily[tempIndex].list.push(acpTempAchievementState.daily[tempIndex].complete_date);
                                    Analytics.segmentClient.track('Achievement Completed', {
                                        id: item.id,
                                    }).then();
                                    acpTempProgressState.actionList.push({
                                        'mode': 'CA',
                                        'data': {'id': item.id, 'points': item.awards},
                                        'time': Math.floor(new Date().getTime() / 1000)
                                    });
                                }
                            })
                            console.log('G6')

                            if (acpTempProgressState.groupStats) {
                                acpTempIndex = acpTempProgressState.groupStats.findIndex(item => item.group_id === acpData);
                                if (acpTempIndex >= 0) {
                                    acpTempProgressState.groupStats[acpTempIndex].group_count += 1;
                                    acpTempProgressState.groupStats[acpTempIndex].group_duration += parseInt(acpTempPracticeState.groups[groupIndex].duration);
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
                    console.log('G7')

                    tempArray.forEach(tempGuide => {
                        //milestones
                        tmpAchievements = state.achievementReducer.milestones.filter((item) => {
                            if (item.trigger === 'practice' &&
                                (
                                    (item.triggerPracticeOption === 'single' && (parseInt(item.triggerSinglePractice) === tempGuide.guide.id || !item.triggerSinglePractice)) ||
                                    (item.triggerPracticeOption === 'section' && (parseInt(item.triggerSectionPractice) === tempGuide.guide.sectionId))
                                ) &&
                                !item.complete_date) {
                                return true;
                            }
                        });
                        console.log('1')
                        tmpAchievements.forEach((item) => {
                            let tempIndex = acpTempAchievementState.milestones.findIndex(achievement => achievement.id === item.id);
                            acpTempAchievementState.milestones[tempIndex].step += 1;
                            if (acpTempAchievementState.milestones[tempIndex].total <= acpTempAchievementState.milestones[tempIndex].step) {
                                acpTempAchievementState.milestones[tempIndex].complete_date = acpToday;
                                acpTempAchievementState.milestones[tempIndex].claim_date = '';
                                Analytics.segmentClient.track('Achievement Completed', {
                                    id: item.id,
                                }).then();
                                acpTempProgressState.actionList.push({
                                    'mode': 'CA',
                                    'data': {'id': item.id, 'points': item.awards},
                                    'time': Math.floor(new Date().getTime() / 1000)
                                });
                            }
                        })
                        console.log('2')

                        tmpAchievements = state.achievementReducer.daily.filter((item) => {
                            if (item.trigger === 'practice' &&
                                (
                                    (item.triggerPracticeOption === 'single' && (parseInt(item.triggerSinglePractice) === tempGuide.guide.id || !item.triggerSinglePractice)) ||
                                    (item.triggerPracticeOption === 'section' && (parseInt(item.triggerSectionPractice) === tempGuide.guide.sectionId))
                                ) &&
                                !item.complete_date) {
                                return true;
                            }
                        });
                        console.log('3')

                        tmpAchievements.forEach((item) => {
                            let tempIndex = acpTempAchievementState.daily.findIndex(achievement => achievement.id === item.id);
                            acpTempAchievementState.daily[tempIndex].step += 1;
                            if (acpTempAchievementState.daily[tempIndex].total <= acpTempAchievementState.daily[tempIndex].step) {
                                acpTempAchievementState.daily[tempIndex].complete_date = acpToday;
                                acpTempAchievementState.daily[tempIndex].claim_date = '';
                                acpTempAchievementState.daily[tempIndex].list.push(acpTempAchievementState.daily[tempIndex].complete_date);
                                Analytics.segmentClient.track('Achievement Completed', {
                                    id: item.id,
                                }).then();
                                acpTempProgressState.actionList.push({
                                    'mode': 'CA',
                                    'data': {'id': item.id, 'points': item.awards},
                                    'time': Math.floor(new Date().getTime() / 1000)
                                });
                            }
                        })
                        console.log('4', acpTempPracticeState)

                        let acpLevelIndex = acpTempPracticeState.guides.findIndex(level => level.id === tempGuide.guide.levelId);
                        console.log('a', acpLevelIndex, acpTempPracticeState.guides, tempGuide.guide);
                        let acpSectionIndex = acpTempPracticeState.guides[acpLevelIndex].sections.findIndex(section => section.id === tempGuide.guide.sectionId);
                        console.log('b')
                        let acpGuideIndex = acpTempPracticeState.guides[acpLevelIndex].sections[acpSectionIndex].data.findIndex(guide => guide.id === tempGuide.guide.id);
                        console.log('5')
                        if (acpGuideIndex >= 0) {

                            console.log(tempGuide.duration, tempGuide.count);

                            acpTempPracticeState.guides[acpLevelIndex].sections[acpSectionIndex].data[acpGuideIndex].new = false;
                            acpTempProgressState.totalDuration = acpTempProgressState.totalDuration?acpTempProgressState.totalDuration+tempGuide.duration:tempGuide.duration;
                            acpTempProgressState.todayDuration = acpTempProgressState.todayDuration?acpTempProgressState.todayDuration+tempGuide.duration:tempGuide.duration;
                            acpTempProgressState.weekDuration = acpTempProgressState.weekDuration?acpTempProgressState.weekDuration+tempGuide.duration:tempGuide.duration;
                            console.log('6')

                            acpTempIndex = acpTempProgressState.guideStats.findIndex(item => parseInt(item.guide_id) === parseInt(tempGuide.guide.id))
                            console.log('7')
                            if (acpTempIndex >= 0) {
                                acpTempProgressState.guideStats[acpTempIndex].guide_count += parseInt(tempGuide.count);
                                acpTempProgressState.guideStats[acpTempIndex].guide_duration += parseInt(tempGuide.duration);
                            } else {
                                acpTempProgressState.guideStats.push({
                                    'guide_id': parseInt(tempGuide.guide.id),
                                    'guide_count': parseInt(tempGuide.count),
                                    'guide_duration': parseInt(tempGuide.duration)
                                })
                            }

                            console.log('8')
                            acpTempIndex = acpTempProgressState.sectionStats.findIndex(item => parseInt(item.section_id) === parseInt(tempGuide.guide.sectionId))
                            if (acpTempIndex >= 0) {
                                acpTempProgressState.sectionStats[acpTempIndex].section_count += parseInt(tempGuide.count);
                                acpTempProgressState.sectionStats[acpTempIndex].section_duration += parseInt(tempGuide.duration);
                            } else {
                                acpTempProgressState.sectionStats.push({
                                    'section_id': parseInt(tempGuide.guide.sectionId),
                                    'section_count': parseInt(tempGuide.count),
                                    'section_duration': parseInt(tempGuide.duration)
                                })
                            }
                        }
                    })
                    console.log('10')

                    let todayProgressIndex = acpTempProgressState.progress && acpTempProgressState.progress.findIndex(item => item.date === acpToday);
                    if (acpTempProgressState.progress && todayProgressIndex >= 0) {
                        acpTempProgressState.progress[todayProgressIndex].duration = acpTempProgressState.todayDuration;
                    } else {
                        if (acpTempProgressState.progress) {
                            acpTempProgressState.progress.push({
                                date: acpToday,
                                duration: acpTempProgressState.todayDuration
                            })
                        } else {
                            acpTempProgressState.progress = [{
                                date: acpToday,
                                duration: acpTempProgressState.todayDuration
                            }]
                        }
                    }
                    console.log('11')

                    acpTempProgressState.actionList.push({
                        'mode': acpMode,
                        'data': acpData,
                        'time': Math.floor(new Date().getTime() / 1000)
                    });

                    console.log('7', Math.floor(new Date().getTime() / 1000))
                    acpTempProgressState.latestUpdate = Math.floor(new Date().getTime() / 1000);
                    acpTempProgressState.lastPractice = new moment().format('YYYY-MM-DD');

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
                    console.log('ONENERGY_MILESTONE_CLAIM');
                    const mcTempMilestoneState = {...state.achievementReducer};
                    const mcTempProgressState = {...state.progressReducer};
                    let mcMilestoneIndex = mcTempMilestoneState.milestones.findIndex(achievement => achievement.id === action.payload.id);

                    mcTempMilestoneState.milestones[mcMilestoneIndex].claim_date = new moment().format('YYYY-MM-DD');
                    mcTempMilestoneState.milestones[mcMilestoneIndex].awards.forEach(award => {
                        if (mcTempProgressState.points[award.name]) {
                            mcTempProgressState.points[award.name] += parseInt(award.point);
                        } else {
                            mcTempProgressState.points[award.name] = parseInt(award.point);
                        }
                    })
                    Analytics.segmentClient.track('Milestone Claimed', {
                        id:mcTempMilestoneState.milestones[mcMilestoneIndex].id,
                        title: mcTempMilestoneState.milestones[mcMilestoneIndex].title,
                    }).then();

                    return {
                        ...state,
                        achievementReducer: mcTempMilestoneState,
                        progressReducer: mcTempProgressState
                    };
                case "ONENERGY_DAILY_CLAIM":
                    console.log('ONENERGY_DAILY_CLAIM');
                    const dcTempDailyState = {...state.achievementReducer};
                    const dcTempProgressState = {...state.progressReducer};
                    let dcDailyIndex = dcTempDailyState.daily.findIndex(achievement => achievement.id === action.payload.id);
                    const odcToday = new moment().format('YYYY-MM-DD');

                    dcTempDailyState.daily[dcDailyIndex].claim_date = odcToday;
                    let dailyListItemIndex = dcTempDailyState.daily[dcDailyIndex].list.findIndex(item => item === odcToday)
                    if (dailyListItemIndex >= 0) {
                        dcTempDailyState.daily[dcDailyIndex].list.splice(dailyListItemIndex, 1);
                    }
                    dcTempDailyState.daily[dcDailyIndex].awards.forEach(award => {
                        if (dcTempProgressState.points[award.name]) {
                            dcTempProgressState.points[award.name] += parseInt(award.point);
                        } else {
                            dcTempProgressState.points[award.name] = parseInt(award.point);
                        }
                    })
                    Analytics.segmentClient.track('Quest Claimed', {
                        id:dcTempDailyState.daily[dcDailyIndex].id,
                        title: dcTempDailyState.milestones[dcDailyIndex].title,
                    }).then();

                    return {
                        ...state,
                        achievementReducer: dcTempDailyState,
                        progressReducer: dcTempProgressState
                    };
                case "ONENERGY_PAST_CLAIM":
                    console.log('ONENERGY_PAST_CLAIM');
                    const awcTempQuestState = {...state.achievementReducer};
                    const awcTempProgressState = {...state.progressReducer};
                    let awcAchievementIndex = awcTempQuestState.daily.findIndex(achievement => achievement.id === action.payload.id);
                    let awcWaitItemIndex = awcTempQuestState.daily[awcAchievementIndex].list.findIndex(waitItem => waitItem === action.payload.date);

                    if (awcAchievementIndex >= 0) {
                        awcTempQuestState.daily[awcAchievementIndex].list.splice(awcWaitItemIndex, 1);
                        awcTempQuestState.daily[awcAchievementIndex].awards.forEach(award => {
                            if (awcTempProgressState.points[award.name]) {
                                awcTempProgressState.points[award.name] += parseInt(award.point);
                            } else {
                                awcTempProgressState.points[award.name] = parseInt(award.point);
                            }
                        })
                        Analytics.segmentClient.track('Past Quest Claimed', {
                            id: action.payload.id,
                            title: awcTempQuestState.daily[awcAchievementIndex].title,
                        }).then();
                    }
                    return {
                        ...state,
                        achievementReducer: awcTempQuestState,
                        progressReducer: awcTempProgressState
                    };
                case "ONENERGY_WEEKLY_MONTHLY_CLAIM":
                    console.log('ONENERGY_WEEKLY_MONTHLY_CLAIM');
                    const acwTempAchievementState = {...state.achievementReducer};
                    const acwTempProgressState = {...state.progressReducer};
                    switch (action.payload.mode) {
                        case 'weekly':
                            acwTempAchievementState.weekly.claim_date = new moment().format('YYYY-MM-DD');
                            acwTempProgressState.points.qi += 20;
                            Analytics.segmentClient.track('Weekly Quest Claimed', {
                                date: new moment().format('YYYY-MM-DD')
                            }).then();
                            break;
                        case 'monthly':
                            acwTempAchievementState.monthly.claim_date = new moment().format('YYYY-MM-DD');
                            acwTempProgressState.points.qi += 100;
                            Analytics.segmentClient.track('Monthly Quest Claimed', {
                                date: new moment().format('YYYY-MM-DD')
                            }).then();
                            break;
                    }
                    return {
                        ...state,
                        achievementReducer: acwTempAchievementState,
                        progressReducer: acwTempProgressState
                    };
                case "ONENERGY_LESSON_COMPLETED":
                    console.log('ONENERGY_LESSON_COMPLETED');
                    const olcTempProgressState = {...state.progressReducer};
                    const olcTempMilestoneState = {...state.achievementReducer};
                    let lesson = action.payload.lesson;
                    let course = action.payload.course;
                    let olcTempMilestone = olcTempMilestoneState.milestones.filter(item =>
                        (item.trigger === 'course' &&
                            (
                                parseInt(item.triggerCourse) === course.id || !item.triggerCourse
                            ) &&
                            !item.complete_date)
                    );
                    olcTempMilestone.forEach((item) => {
                        let tempIndex = olcTempMilestone.findIndex(achievement => achievement.id === item.id);
                        let tempLessonIndex = olcTempMilestone[tempIndex].step.findIndex(item => item.id === lesson.id);
                        olcTempMilestone[tempIndex].step[tempLessonIndex].completed = 1;

                        if (course.completed) {
                            olcTempMilestone[tempIndex].complete_date = new moment().format('YYYY-MM-DD');
                            olcTempMilestone[tempIndex].claim_date = '';
                            Analytics.segmentClient.track('Achievement Completed', {
                                id: item.id
                            }).then();
                        }
                    })
                    olcTempProgressState.completedLessons.push({
                        "id": lesson.id,
                        "date": Math.floor(new Date().getTime() / 1000)
                    });
                    if (course.completed) {
                        olcTempProgressState.completedCourses.push({
                            "id": course.id,
                            "date": Math.floor(new Date().getTime() / 1000)
                        });
                        Analytics.segmentClient.track('Course Completed', {
                            id: course.id,
                        }).then();
                    }
                    return {
                        ...state,
                        achievementReducer: olcTempMilestoneState,
                        progressReducer: olcTempProgressState
                    };
                case 'ONENERGY_COURSE_ENROLLED':
                    console.log('ONENERGY_COURSE_ENROLLED');
                    const oceTempProgressState = {...state.progressReducer};
                    oceTempProgressState.enrolledCourses.push({
                        "id": action.payload,
                        "date": Math.floor(new Date().getTime() / 1000)
                    });
                    Analytics.segmentClient.track('Course Enrolled', {
                        "id": action.payload,
                    }).then();
                    return {
                        ...state,
                        progressReducer: oceTempProgressState
                    }
                case 'ONENERGY_ACHIEVEMENT_RESET':
                    console.log('ONENERGY_ACHIEVEMENT_RESET');
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
                    console.log('ONENERGY_PRACTICE_RESET');
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
                    console.log('ONENERGY_PROGRESS_RESET');
                    return {
                        ...state,
                        progressReducer: {
                            points: {"qi": 0},
                            totalDuration: 0,
                            todayDuration: 0,
                            weekDuration: 0,
                            totalPracticeDays: 0,
                            totalLoginDays: 1,
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

    const customUserReducer = reducer => (state = reducer(undefined, {}), action) => {
        switch (action.type) {
            case "USER_UPDATE_MEMBERSHIP":
                let umTempUser = state.userObject;
                umTempUser.membership = action.payload;
                const umNewState = {
                    ...state,
                    userObject: umTempUser
                }
                return reducer(umNewState, action);
            case "USER_VIP_SURVEY_COMPLETED":
                let vscTempUser = state.userObject;
                vscTempUser.vip_survey_completed = true;
                const vscNewState = {
                    ...state,
                    userObject: vscTempUser
                }
                return reducer(vscNewState, action);
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
        "settingReducer",
        (state = {languages: defaultLanguage, settings: {ip:'', latitude:0, longitude:0, vouchers:[]}}, action) => {
            switch (action.type) {
                case "SETTINGS_LOCAL_INFO":
                    console.log('SETTINGS_LOCAL_INFO',action.payload )
                    return {
                        ...state,
                        settings: {
                            ...state.settings,
                            ip: action.payload.ip,
                            latitude: action.payload.latitude,
                            longitude: action.payload.longitude
                        }
                    }
                case "SETTINGS_ADD_VOUCHER_NOTIFICATION":
                    const savnVoucher = state.settings.vouchers;
                    console.log('add')
                    if(!savnVoucher.find(voucher => voucher === action.payload))
                    {
                        savnVoucher.push(action.payload);
                        return {
                            ...state,
                            settings: {
                                ...state.settings,
                                vouchers: savnVoucher
                            }
                        }
                    }else{
                        return state;
                    }
                case "SETTINGS_REMOVE_VOUCHER_NOTIFICATION":
                    const srvnVoucher = state.settings.vouchers;
                    const srvnIndexVoucher = srvnVoucher.findIndex(voucher => voucher === action.payload);
                    if(srvnIndexVoucher >=0)
                    {
                        srvnVoucher.splice(srvnIndexVoucher);
                        return {
                            ...state,
                            settings: {
                                ...state.settings,
                                vouchers: srvnVoucher
                            }
                        }
                    }else{
                        return state;
                    }
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
        let whiteList = [...props.whitelist, "settingReducer", "postsReducer", "onenergyAppReducer", "videoReducer"];

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
        const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
        const lesson_time = new moment.utc(courseVM.date);
        const current_time = new moment.utc();
        const diffMinutes = lesson_time.diff(current_time, 'minutes');
        const diffHours = lesson_time.diff(current_time, 'hours');
        const diffDays = lesson_time.diff(current_time, 'days');
        const dispatch = useDispatch();

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
                    paddingHorizontal: ms(20),
                    paddingVertical: mvs(16),
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
                    paddingHorizontal: ms(20),
                    paddingVertical: mvs(16),
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
                const expiringTime = new moment.utc(courseVM.price.expires_on);
                const diffExpiringDays = expiringTime.diff(current_time, 'days');
                let diffExpiringTime = 'Course expires in ' + diffExpiringDays + ' days, please finish all the lesson in time.';
                Info =
                    diffExpiringDays <= 7 && diffExpiringDays > 0 ?
                        <View style={{paddingHorizontal: ms(20), paddingVertical: mvs(10)}}>
                            <Text style={{color: "red", fontSize: s(14)}}>{diffExpiringTime}</Text>
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
                        <Text style={{color: "red", fontSize: s(14)}}>{courseVM.error.message}</Text>
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
                                setButtonEnroll('Enrolling, please wait...');
                                startCourse();
                                dispatch({
                                    type: 'ONENERGY_COURSE_ENROLLED',
                                    payload: courseVM.id
                                });
                            }}
                            title={buttonEnroll}
                        />
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
        const routeLabel = iconProps.route.routes[0].params.item?.object;
        switch (routeLabel) {
            case "homePage":
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
            case "programs":
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
                        <NotificationTabBarIcon notificationID={'blog'} top={-3} right={-3} size={10}
                                                showNumber={false}/>
                    </AuthWrapper>
                </View>
            case "practices":
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
                        <NotificationTabBarIcon notificationID={'guide_page'} top={-3} right={-3} size={10}
                                                showNumber={false}/>
                    </AuthWrapper>
                </View>
            case "wisdom":
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
                        <NotificationTabBarIcon notificationID={'blog'} top={-3} right={-3} size={10}
                                                showNumber={false}/>
                    </AuthWrapper>
                </View>
            case "more":
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
        "groups",
        "documents",
        "gamipress_points",
        "gamipress_achievements",
        "gamipress_ranks",
        "forums"
    ])
    externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
        Orientation.lockToPortrait();
        TrackPlayer.registerPlaybackService(() => PlaybackService);
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function(err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
        PushNotification.createChannel({
            channelId: 'onenergyReminders',
            channelName: 'Onenergy Routines Reminder',
            channelDescription: 'Reminder for routines'
        })

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
    const AfterDetailsComponent = () => {
        const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
        const optionData = useSelector((state) => state.settings.settings.onenergy_option);
        const user = useSelector((state) => state.user.userObject);
        return (
            <View style={{marginLeft:s(35),marginTop:mvs(15)}}>
                {progressReducer && progressReducer.points && Object.keys(progressReducer.points).length ? Object.entries(progressReducer.points).map(([key, value]) => (
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}>
                        <Text style={{
                            color: '#262626',
                            textAlign: "left",
                            marginRight: s(10),
                            fontWeight: "normal",
                            fontFamily: "Montserrat-Regular",
                            fontSize: s(16)
                        }}>
                            {optionData.titles.find(el => el.id === 'profile_detail_label_point').title}
                        </Text>
                        <FastImage
                            source={require('./assets/images/icon-ray.png')} style={{width: 24, height: 24}}/>
                        <Text style={{
                            color: '#262626',
                            textAlign: "left",
                            marginLeft: s(5),
                            fontWeight: "normal",
                            fontFamily: "Montserrat-Regular",
                            fontSize: s(16)
                        }}>
                            {value} {optionData.points.find(pt => pt.pointName === key).pointTitle}
                        </Text>
                    </View>
                )) : null}
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: '#262626',
                        textAlign: "left",
                        marginRight: s(10),
                        fontWeight: "normal",
                        fontFamily: "Montserrat-Regular",
                        fontSize: s(16)
                    }}>
                        {optionData.titles.find(el => el.id === 'profile_detail_label_rank').title}
                    </Text>
                    <FastImage source={{uri: optionData.ranks[user.rank?parseInt(user.rank):0].rankImage}}
                               style={{width: 24, height: 24, alignSelf: "center"}}/>
                    <Text style={{
                        color: '#262626',
                        textAlign: "left",
                        marginLeft: s(5),
                        fontWeight: "normal",
                        fontFamily: "Montserrat-Regular",
                        fontSize: s(16)
                    }}>
                        {optionData.ranks[user.rank?parseInt(user.rank):0].rankName}
                    </Text>
                </View>
                {user.membership.length > 0 ?
                    <Text style={{color: "#262626",fontWeight: "normal",
                        alignItems:"flex-start",
                        fontFamily: "Montserrat-Regular",
                        fontSize: s(16)}}>{user.membership[0].plan.name}</Text>
                    : null}
            </View>
        )
    }

    externalCodeSetup.profileScreenHooksApi.setAfterDetailsComponent(AfterDetailsComponent);
    //externalCodeSetup.navigationApi.setScreensWithoutTabBar(["EditRoutine", "PracticeGroup", "PracticeMember", "PracticePersonal", "PracticePlayer", "LocalVideoPlayer", "MilestonesScreen", "QuestsScreen", "StatsScreen", "myVouchersScreen", "FeedbackScreen", "SettingsScreen", "CoursesSingleScreen", "LessonSingleScreen"])
    externalCodeSetup.settingsScreenApi.setLogoutComponent(({
                                                                global,
                                                                t,
                                                                isLoggingOut,
                                                                logout
                                                            }) => {
        const dispatch = useDispatch();

        const config = useSelector((state) => state.config ? state.config : null);
        const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
        const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer : null);
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
                                                    achievementReducer.milestones.forEach((milestone) => {
                                                        achievements.milestones.push({
                                                            'id': milestone.id,
                                                            'step': milestone.step,
                                                            'complete_date': milestone.complete_date,
                                                            'claim_date': milestone.claim_date,
                                                        });
                                                    });
                                                    achievementReducer.daily.forEach((quest) => {
                                                        achievements.daily.push({
                                                            'id': quest.id,
                                                            'step': quest.step,
                                                            'complete_date': quest.complete_date,
                                                            'claim_date': quest.claim_date,
                                                            'list': quest.list
                                                        });
                                                    });
                                                    const apiRequest = getApi(config);
                                                    console.log('statsUpdate logout', progressReducer, achievements);
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
                    return routeProps.shouldLockApp ? "AppLockScreen" : "InitData";
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
            },
            InitData: {
                screen: InitData
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
    externalCodeSetup.cssApi.addGlobalStyle("appHeaderTitle", {"fontSize": s(17)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textHeaderTitle", {"fontSize": s(28)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("heading", {"fontSize": s(17.6)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("desc", {"fontSize": s(16)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("title", {"fontSize": s(18)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("text", {"fontSize": s(17.6)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("textAlt", {"fontSize": s(15.4)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("link", {"fontSize": s(12)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("widgetTitle", {"fontSize": s(18)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("forumListTitle", {"fontSize": s(20)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("subForumTitle", {"fontSize": s(12)}, false);
    externalCodeSetup.cssApi.addGlobalStyle("settingsItemTitle", {"fontSize": s(17)}, false);
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
                marginBottom: mvs(10),
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
                                    marginBottom: mvs(15),
                                    marginTop: courseVM?.members?.length > 0 ? mvs(20) : 0
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



