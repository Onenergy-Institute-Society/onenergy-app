import React, {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Text,
    AppState, Platform, TouchableOpacity, TouchableWithoutFeedback
} from "react-native";
import {getApi} from "@src/services";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from '../Utils/scale';
import FastImage from 'react-native-fast-image';
import TouchableScale from "../Components/TouchableScale";
import DailyQuotes from '../Components/DailyQuotes'
import PostRow from '../Components/PostRow';
import ImageCache from "../Components/ImageCache";
import {NavigationActions} from "react-navigation";
import AuthWrapper from "@src/components/AuthWrapper";
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import EventList from "../Components/EventList";
import analytics from '@react-native-firebase/analytics';
import ForumsScreen from "@src/containers/Custom/ForumsScreen";
import {
    ProgressChart,
} from "react-native-chart-kit";
import {Modalize} from 'react-native-modalize';
import RNRestart from 'react-native-restart';
import moment from 'moment';
import SunCalc from "suncalc";
import GetLocation from 'react-native-get-location'
import {
    SvgIconCheck,
    SvgIconCross,
    SvgIconLogin, SvgIconMenu, SvgIconMilestone,
    SvgIconMoonPhase, SvgIconProgress, SvgIconQuest,
    SvgIconSignup,
    SvgIconSunrise,
    SvgIconSunset, SvgVIPMedal
} from "../Utils/svg";
import messaging from '@react-native-firebase/messaging';
import TrackPlayer from 'react-native-track-player';
import { SetupService } from '../Services';

this.todayGoalDialog = undefined;
const HomeContent = (props) => {
    const {navigation, screenProps} = props;
    const {global, colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const allowLocation = useSelector((state) => state.settingsReducer.settings ? state.settingsReducer.settings.allowLocation : null);
    const practiceReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.practiceReducer : null);
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const achievementReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.achievementReducer : null);
    const postReducer = useSelector((state) => state.postReducer ? state.postReducer : null);
    const dispatch = useDispatch();
    const [location, setLocation] = useState(null);
    const [sunrise, setSunrise] = useState('');
    const [phase, setPhase] = useState('');
    const [nextMoonPhase, setNextMoonPhase] = useState({});

    const onFocusHandler = () => {
        try {
            navigation.closeDrawer();
        } catch (e) {
        }
    }
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Home Screen',
    });
    useEffect(() => {
        async function run() {
            const isSetup = await SetupService();
            console.log(isSetup);

            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                await QueueInitialTracksService();
            }
        }
        run().then();
    }, []);

    const _handleAppStateChange = async () => {
        if (user) {
            console.log(AppState.currentState, checkTodayDate())
            if (AppState.currentState === 'active' && checkTodayDate()) {
                dispatch({
                    type: 'ONENERGY_DAILY_UPDATE',
                });
            }
            if ((Platform.OS === "android" && AppState.currentState === 'background') || (Platform.OS === "ios" && AppState.currentState === 'inactive')) {
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
                    const apiRequest = getApi(props.config);
                    await apiRequest.customRequest(
                        "wp-json/onenergy/v1/statsUpdate",
                        "post",
                        {
                            "progress": progressReducer,
                            "achievements": achievements
                        },
                        null,
                        {},
                        false
                    ).then(response => {
                        if (response.data) {
                            dispatch({
                                type: 'ONENERGY_PROGRESS_UPLOADED'
                            });
                        } else {
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
                            RNRestart.Restart()
                        }
                    });
                }
            }
        }
    };

    const checkTodayDate = () => {
        const today = new moment().format('YYYY-MM-DD');
        if (progressReducer.latestUpdate && today !== new moment.unix(progressReducer.latestUpdate).format('YYYY-MM-DD')) {
            return true;
        } else {
            return false;
        }
    }
    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            setLocation(location);
            const sunTimes = SunCalc.getTimes(new Date(), location.latitude, location.longitude, 0);
            setSunrise(sunTimes);
            if(!allowLocation) {
                dispatch({
                    type: 'SETTINGS_ALLOW_LOCATION',
                    payload: true,
                });
            }
        })
    }

    useEffect(() => {
       // setupIfNecessary().then();
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'home_title').title,
        });

        if(allowLocation) {
            getLocation();
        }
        const moonIllumination = SunCalc.getMoonIllumination(new Date());
        const phaseNumber = Math.floor(moonIllumination.phase * 100) / 100;
        let phaseName = '';

        if (phaseNumber === 0) {
            phaseName = 'New Moon';
        } else if (phaseNumber > 0 && phaseNumber < 0.25) {
            phaseName = 'Waxing Crescent';
        } else if (phaseNumber === 0.25) {
            phaseName = 'First Quarter';
        } else if (phaseNumber > 0.25 && phaseNumber < 0.5) {
            phaseName = 'Waxing Gibbous';
        } else if (phaseNumber === 0.5) {
            phaseName = 'Full Moon';
        } else if (phaseNumber > 0.5 && phaseNumber < 0.75) {
            phaseName = 'Waning Gibbous';
        } else if (phaseNumber === 0.75) {
            phaseName = 'Last Quarter';
        } else if (phaseNumber > 0.75 && phaseNumber < 1) {
            phaseName = 'Waning Crescent';
        }
        setPhase(phaseName)
        const lunarAge = Math.floor(phaseNumber * 30);
        let dateDiff;
        let moonPhase = '';
        let moonPhaseDate = '';
        const today = new moment().format('YYYY-MM-DD');
        if (lunarAge <= 14) {
            dateDiff = 15 - lunarAge;
            moonPhase = 'Full Moon';
        } else {
            dateDiff = 29 - lunarAge;
            moonPhase = 'New Moon';
        }
        moonPhaseDate = moment(today).add(dateDiff, 'days').format('MMM DD');
        setNextMoonPhase({'date': moonPhaseDate, 'phase': moonPhase});
        if (user) {
            navigation.addListener('willFocus', onFocusHandler)
            const subscription = AppState.addEventListener("change", _handleAppStateChange);

            let load = false;
            if (optionData.cache.guide && practiceReducer.guideUpdate && optionData.cache.guide > practiceReducer.guideUpdate || !practiceReducer.guideUpdate) {
                load = true;
            }
            if (optionData.cache.group && practiceReducer.groupUpdate && optionData.cache.group > practiceReducer.groupUpdate || !practiceReducer.groupUpdate) {
                load = true;
            }
            if (optionData.cache.routine && practiceReducer.routineUpdate && optionData.cache.routine > practiceReducer.routineUpdate || !practiceReducer.routineUpdate) {
                load = true;
            }
            if (optionData.cache.post && postReducer.postUpdate && optionData.cache.post > postReducer.postUpdate || !postReducer.postUpdate) {
                dispatch({
                    type: 'ONENERGY_POSTS_RESET',
                });
            }
            if (optionData.cache.achievement && achievementReducer.achievementUpdate && optionData.cache.achievement > achievementReducer.achievementUpdate || !achievementReducer.achievementUpdate) {
                load = true;
            }
            if (optionData.cache.progress && progressReducer.progressUpdate && optionData.cache.progress > progressReducer.progressUpdate || !progressReducer.progressUpdate) {
                load = true;
            }
            if (load) {
                props.navigation.navigate("InitData", {transition: 'fade'});
            }
            return () => {
                navigation.removeListener('willFocus', onFocusHandler);
                subscription.remove();
            }
        }
    }, []);
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const data = remoteMessage.data;
            if (data.notification_type && data.notification_type === 'pn_functions') {
                switch (data.function_type) {
                    case "survey_vip":
                        dispatch({
                            type: 'USER_VIP_SURVEY_COMPLETED',
                        });
                        if(!(user.membership && user.membership.length)){
                            dispatch({
                                type: 'SETTINGS_ADD_VOUCHER_NOTIFICATION',
                                payload: data.extra_data
                            });
                        }
                        break;
                    case "profile_updated":
                        dispatch({
                            type: 'USER_PROFILE_UPDATED',
                        });
                        break;
                }
            }
        });
        return unsubscribe;
    }, []);

    const OnPress = async (item) => {
        if (item) {
            switch (item.link) {
                case 'app':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "AppPageScreen",
                            params: {
                                pageId: item.param,
                                title: item.title
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
                                title: item.title
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
                    let secTimer = setInterval(() => {
                        clearInterval(secTimer);
                    }, 1000)
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
    }
    const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const renderGoalSelector = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: 9, borderTopRightRadius: 9, marginTop: 25};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case 11:
                cornerStyle = {borderBottomLeftRadius: 9, borderBottomRightRadius: 9, marginBottom: 25};
                break;
            default:
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                dispatch({
                    type: "ONENERGY_PROGRESS_GOAL",
                    payload: {
                        'mode': 'todayGoal',
                        'data': item.item
                    }
                });
                this.todayGoalDialog.close();
            }}>
                <View style={[cornerStyle, bottomStyle, {
                    width: windowWidth - 30,
                    marginHorizontal: 15,
                    paddingHorizontal: 15,
                    backgroundColor: colors.bodyBg,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}>
                    <Text
                        style={global.text}>
                        {item.item} minutes
                    </Text>
                    {progressReducer.todayGoal &&
                    parseInt(progressReducer.todayGoal) === parseInt(item.item) ? (
                        <SvgIconCheck size={24} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                {user ?
                    <>
                        <View style={styles.topRow}>
                            <View style={{width: windowWidth * 2 / 3, justifyContent: "space-between"}}>
                                <Text style={[global.textHeaderTitle, {fontSize: scale(16)}]}>{optionData.salute}, {user.name}</Text>
                                <Text style={[global.title, {fontSize: scale(12)}]}>{optionData.greetings}</Text>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "flex-end"}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProfileScreen")}
                                >
                                    <FastImage
                                        source={{uri: user && user.avatar_urls['full'] ? user.avatar_urls['full'] : user.avatar_urls['96']}}
                                        style={{
                                            height: scale(50),
                                            width: scale(50),
                                            borderRadius: 100,
                                            margin: scale(10)
                                        }}
                                    />
                                    {user.membership&&user.membership.length?
                                    <SvgVIPMedal style={{position:"absolute", top:0, right:-10}} />
                                        :null}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: scale(15)}}>
                            <TouchableScale
                                onPress={
                                    () => {
                                        navigation.dispatch(
                                            NavigationActions.navigate({
                                                routeName: "StatsScreen"
                                            })
                                        )
                                    }}>
                                <View style={[styles.progressLeftRow, styles.boxShadow, {height: windowWidth * 3 / 5}]}>
                                    <View style={{
                                        width: "100%",
                                        paddingTop: scale(10),
                                        paddingLeft: scale(10),
                                        alignItems: "flex-start"
                                    }}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: scale(14),
                                                color: colors.primaryColor
                                            }]}>Daily Goal: </Text><Text style={[global.textAlt, {
                                            fontSize: scale(12),
                                            color: colors.primaryColor
                                        }]}>{progressReducer.todayGoal ? Math.round(progressReducer.todayGoal) > 60 ? Math.round(progressReducer.todayGoal / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : progressReducer.todayGoal + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title : 0 + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: scale(10)
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: scale(14),
                                                color: colors.primaryColor
                                            }]}>Today: </Text><Text style={[global.textAlt, {
                                            fontSize: scale(12),
                                            color: colors.primaryColor
                                        }]}>{progressReducer.todayDuration ? Math.round(progressReducer.todayDuration / 60) > 60 ? Math.round(progressReducer.todayDuration / 3600) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : Math.round(progressReducer.todayDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title : 0 + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                    </View>
                                    <ProgressChart
                                        data={{data: [progressReducer.todayDuration / (progressReducer.todayGoal * 60) <= 1 ? progressReducer.todayDuration / (progressReducer.todayGoal * 60) : 1]}}
                                        width={(windowWidth - scale(80)) / 2}
                                        height={(windowWidth - scale(80)) / 2}
                                        strokeWidth={scale(24)}
                                        radius={scale(52)}
                                        chartConfig={{
                                            backgroundGradientFrom: "#FFF",
                                            backgroundGradientFromOpacity: 1,
                                            backgroundGradientTo: "#FFF",
                                            backgroundGradientToOpacity: 1,
                                            color: (opacity = 1) => `rgba(236, 87, 24, ${opacity})`,
                                            strokeWidth: 3, // optional, default 3
                                            barPercentage: 1,
                                            useShadowColorFromDataset: false, // optional
                                        }}
                                        hideLegend={true}
                                        style={{
                                            borderRadius: 9
                                        }}
                                    />
                                    <View>
                                        <TouchableScale
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: scale(10)
                                            }}
                                            onPress={
                                                () => {
                                                    this.todayGoalDialog.open();
                                                }}>
                                            <Text style={[global.linkWithArrow, {
                                                fontWeight: "bold",
                                                color: colors.primaryButtonBg
                                            }]}>Goal setting ></Text>
                                        </TouchableScale>
                                    </View>
                                </View>
                            </TouchableScale>
                            <View style={{marginRight: scale(15), justifyContent: "space-between"}}>
                                <View style={[styles.progressRightRow, styles.boxShadow]}>
                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Text style={[global.itemTitle, {
                                            fontSize: scale(14),
                                            color: colors.primaryColor
                                        }]}>courses{"\n"}in progress</Text>
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                        <Text style={[global.itemTitle, {
                                            fontSize: scale(40),
                                            color: colors.primaryButtonBg
                                        }]}>{progressReducer.enrolledCourses ? progressReducer.completedCourses ? progressReducer.enrolledCourses.length - progressReducer.completedCourses.length : progressReducer.enrolledCourses.length : 0}</Text>
                                    </View>
                                </View>
                                <View style={[styles.progressRightRow, styles.boxShadow]}>
                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Text style={[global.itemTitle, {
                                            lineHeight: scale(14),
                                            fontSize: scale(14),
                                            color: colors.primaryColor
                                        }]}>time{"\n"}practiced</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "baseline"
                                    }}>
                                        <Text style={[global.itemTitle, {
                                            fontSize: scale(40),
                                            color: colors.primaryButtonBg
                                        }]}>{progressReducer.totalDuration ? Math.round(progressReducer.totalDuration / 60) > 60 ? Math.round(progressReducer.totalDuration / 60 / 60) : Math.round(progressReducer.totalDuration / 60) : 0}</Text><Text
                                        style={[global.itemText, {
                                            fontSize: scale(14),
                                            color: colors.primaryButtonBg
                                        }]}>{progressReducer.totalDuration ? Math.round(progressReducer.totalDuration / 60) > 60 ? optionData.titles.find(el => el.id === 'stats_detail_hours').title : optionData.titles.find(el => el.id === 'stats_detail_minutes').title : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                    :
                    <View style={[styles.topRow, {marginTop: scale(15), justifyContent: 'space-evenly'}]}>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("MySignupScreen");
                        }}>
                            <View style={{
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(5),
                                backgroundColor: colors.primaryButtonBg,
                                borderRadius: 9,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <SvgIconSignup color={colors.primaryButtonColor}/>
                                    <Text
                                        style={[global.settingsItemTitle, {
                                            color: colors.primaryButtonColor,
                                            marginLeft: scale(5)
                                        }]}>
                                        Create account
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("MyLoginScreen");
                        }}>
                            <View style={{
                                paddingHorizontal: scale(10),
                                paddingVertical: scale(5),
                                backgroundColor: colors.secondaryButtonBg,
                                borderRadius: 9,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <SvgIconLogin color={colors.secondaryButtonColor}/>
                                    <Text
                                        style={[global.settingsItemTitle, {
                                            color: colors.secondaryButtonColor,
                                            marginLeft: scale(5)
                                        }]}>
                                        Sign in
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
                {optionData.goals && optionData.goals.length ?
                    <View style={styles.programRow}>
                        <EventList location={'top'} {...props}/>
                        <EventList location={'home'} {...props}/>
                    </View> : null}
                {optionData.quote && (
                    <View style={[styles.quoteRow, styles.boxShadow]}>
                        <DailyQuotes quote={optionData.quote} screenProps={screenProps}/>
                    </View>
                )}
                <View style={styles.eventRow}>
                    {allowLocation||location?
                        <View style={[styles.block_season_left, styles.boxShadow]}>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text style={{
                                    fontFamily: "MontserratAlternates-SemiBold",
                                    fontWeight: "bold",
                                    fontSize: scale(16),
                                    color: colors.textColor
                                }}>{moment.utc(sunrise.sunrise).local().format('HH:mm')}</Text>
                                <SvgIconSunrise/>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text style={{
                                    fontFamily: "MontserratAlternates-SemiBold",
                                    fontWeight: "bold",
                                    fontSize: scale(16),
                                    color: colors.textColor
                                }}>{moment.utc(sunrise.sunset).local().format('HH:mm')}</Text>
                                <SvgIconSunset/>
                            </View>
                        </View>
                        :
                        <TouchableScale onPress={() => {
                            getLocation();
                        }}>
                            <View style={[styles.block_season_left, styles.boxShadow, {backgroundColor: colors.primaryButtonBg}]}>
                                <View style={{justifyContent: "center", alignItems: "center", padding: scale(15)}}>
                                    <Text style={{
                                        fontFamily: "MontserratAlternates-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: scale(14),
                                        color: colors.primaryButtonColor
                                    }}>Tap Here</Text>
                                    <Text style={{
                                        fontFamily: "MontserratAlternates-Regular",
                                        fontWeight: "normal",
                                        fontSize: scale(14),
                                        color: colors.primaryButtonColor
                                    }}>show sunrise/sunset time</Text>
                                </View>
                            </View>
                        </TouchableScale>
                    }
                    <View style={[styles.block_season_center, styles.boxShadow]}>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Text style={{
                                fontFamily: "MontserratAlternates-Regular",
                                fontWeight: "normal",
                                fontSize: scale(12),
                                color: "white"
                            }}>{phase}</Text>
                            <SvgIconMoonPhase moonPhase={phase}/>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Text style={{
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontWeight: "bold",
                                fontSize: scale(14),
                                color: "white"
                            }}>{nextMoonPhase.phase}</Text>
                            <Text style={{
                                fontFamily: "Montserrat-SemiBold",
                                fontWeight: "bold",
                                fontSize: scale(18),
                                color: "white"
                            }}>{nextMoonPhase.date}</Text>
                        </View>
                    </View>
                    {optionData.currentSolarTermImage && (
                        <TouchableScale
                            onPress={
                                () => {
                                    optionData.solarTerm.solarTermType === 'page' ?
                                        navigation.dispatch(
                                            NavigationActions.navigate({
                                                routeName: "AppPageScreen",
                                                params: {
                                                    pageId: optionData.solarTerm.page,
                                                    title: optionData.solarTerm.title
                                                }
                                            })
                                        )
                                        :
                                        optionData.solarTerm.solarTermType === 'screen' ?
                                            NavigationActions.navigate({
                                                routeName: "SolarTermScreen"
                                            })
                                            : null
                                }
                            }>
                            <View style={[styles.block_season_right, styles.boxShadow]}>
                                <ImageCache
                                    source={{uri: optionData.currentSolarTermImage ? optionData.currentSolarTermImage : ''}}
                                    style={styles.image_season}
                                />
                                <View style={{
                                    position: "absolute",
                                    left: scale(12),
                                    bottom: scale(3),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: scale(16),
                                        lineHeight: scale(16),
                                        color: '#FFF'
                                    }}>{new moment(optionData.currentSolarTermStart).format('MMM')}</Text>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: scale(22),
                                        lineHeight: scale(22),
                                        color: '#FFF'
                                    }}>{new moment(optionData.currentSolarTermStart).format('DD')}</Text></View>
                                <View style={{
                                    position: "absolute",
                                    right: scale(10),
                                    bottom: scale(3),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: scale(16),
                                        lineHeight: scale(16),
                                        color: '#FFF'
                                    }}>{new moment(optionData.currentSolarTermEnd).format('MMM')}</Text>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: scale(22),
                                        lineHeight: scale(22),
                                        color: '#FFF'
                                    }}>{new moment(optionData.currentSolarTermEnd).format('DD')}</Text></View>
                            </View>
                        </TouchableScale>
                    )}
                </View>

                <View style={styles.programRow}>
                    <TouchableScale onPress={
                        () => {
                            navigation.dispatch(
                                NavigationActions.navigate({
                                    routeName: "HomeForumsScreen",
                                })
                            )
                        }
                    }>
                        <View style={styles.view_blog_title}>
                            <Text style={global.widgetTitle}>Q & A</Text>
                            <Text style={global.link}>See All ></Text>
                        </View>
                    </TouchableScale>
                </View>
                <ForumsScreen {...props} headerHeight={0} hideFilters={true} hideNavigationHeader={true}
                              hideTitle={true} showSearch={false} screenTitle="My Forums"/>
                <View style={styles.blogRow}>
                    {optionData.blogs.map((blog) => (
                        <>
                            <TouchableScale onPress={
                                () => {
                                    navigation.dispatch(
                                        NavigationActions.navigate({
                                            routeName: "CategoryScreen",
                                            params: {
                                                category: blog.category,
                                                name: blog.name,
                                            }
                                        })
                                    )
                                }
                            }>
                                <View style={styles.view_blog_title}>
                                    <Text style={global.widgetTitle}>{blog.name}</Text>
                                    <Text style={global.link}>See All ></Text>
                                </View>
                            </TouchableScale>
                            <View style={styles.eventRow}>
                                <PostRow postType={'categories'} postCategory={blog.category}
                                         postPerPage={blog.count} postOrder={blog.order} postOrderBy={blog.orderBy}
                                         showAuthor={blog.showAuthor} {...props}/>
                            </View>
                        </>
                    ))}
                </View>
                <View style={styles.bottomRow}>
                </View>
            </ScrollView>
            <Modalize
                ref={(todayGoalDialog) => {
                    this.todayGoalDialog = todayGoalDialog;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                modalHeight={windowHeight / 2}
                childrenStyle={{padding: 25}}
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: scale(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: scale(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>Daily Goal</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.todayGoalDialog.close();
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
                flatListProps={{
                    data: minutes,
                    renderItem: renderGoalSelector,
                    keyExtractor: (item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll_view: {
        flexGrow: 1,
        paddingVertical: scale(15),
    },
    tapFinger: {
        position: "absolute",
        width: scale(200),
        height: scale(240),
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    topRow: {
        flexDirection: "row",
        marginHorizontal: scale(15),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressLeftRow: {
        width: (windowWidth - scale(45)) * 5 / 8,
        marginLeft: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: "#FFF",
    },
    progressRightRow: {
        width: (windowWidth - scale(45)) * 3 / 8,
        paddingVertical: scale(5),
        height: (windowWidth * 3 / 5 - scale(15)) / 2,
        justifyContent: "space-between",
        marginLeft: scale(15),
        alignItems: 'center',
        borderRadius: 9,
        backgroundColor: "#FFF",
    },
    quoteRow: {
        marginHorizontal: scale(15),
        marginTop: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        height: (windowWidth - scale(30)) / 3.25,
    },
    eventRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    programRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blogRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    bottomRow: {
        minHeight: 50,
    },
    view_title: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: scale(25),
    },
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - scale(30),
        justifyContent: "space-between",
        marginTop: scale(25),
    },
    heading: {
        fontSize: scale(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
    heading_more: {
        fontSize: scale(13),
        fontWeight: "normal",
        alignSelf: "baseline",
        color: "#4942e1",
    },
    block_season_left: {
        width: (windowWidth - scale(50)) / 3,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(25),
        marginLeft: 15,
        borderRadius: 9,
        backgroundColor: '#ffeee7',
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    block_season_center: {
        width: (windowWidth - scale(50)) / 3,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(25),
        marginLeft: 10,
        borderRadius: 9,
        backgroundColor: '#2e2e2e',
        paddingTop: scale(10),
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    block_season_right: {
        width: (windowWidth - scale(50)) / 3,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(25),
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 9,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    block_half_left: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(25),
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(25),
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    row_intro: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_intro: {
        marginTop: scale(25),
        marginHorizontal: scale(15),
        width: windowWidth - scale(30),
        height: windowWidth - scale(30),
        borderRadius: 9,
    },
    image_intro: {
        width: windowWidth - scale(30),
        height: windowWidth - scale(30),
        borderRadius: 9,
    },
    image_event: {
        width: (windowWidth - scale(50)) / 3 * 2,
        height: (windowWidth - scale(30)) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
    },
    image_season: {
        width: (windowWidth - scale(50)) / 3,
        height: (windowWidth - scale(30)) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
    },
    image_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

HomeContent.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    return {
        title: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableScale
                onPress={() => {
                    navigation.openDrawer()
                }}
            >
                <SvgIconMenu color={colors.headerIconColor}/>
                <AuthWrapper actionOnGuestLogin={'hide'}>
                    <NotificationTabBarIcon notificationID={'left_menu'} top={-5} right={-5} size={scale(10)}
                                            showNumber={false}/>
                </AuthWrapper>
            </TouchableScale>,
        headerRight:
            <AuthWrapper actionOnGuestLogin={'hide'}>
                <View style={{justifyContent: "flex-end", flexDirection: "row", marginRight: 15}}>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("QuestsScreen")
                        }}
                    >
                        <SvgIconQuest color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'quest'} top={-5} right={5} size={scale(10)}
                                                showNumber={false}/>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("MilestonesScreen")
                        }}
                    >
                        <SvgIconMilestone color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'milestone'} top={-5} right={5} size={scale(10)}
                                                showNumber={false}/>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("StatsScreen")
                        }}
                    >
                        <SvgIconProgress color={colors.headerIconColor}/>
                    </TouchableScale>
                </View>
            </AuthWrapper>
    }
}
const mapStateToProps = (state) => ({
    config: state.config ? state.config : null,
    accessToken: state.auth.token ? state.auth.token : null,
});
export default connect(mapStateToProps)(withDeeplinkClickHandler(HomeContent));