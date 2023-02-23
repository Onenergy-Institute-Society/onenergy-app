import React, {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import {getApi} from "@src/services";
import {ms, mvs, s, windowHeight, windowWidth} from '../Utils/Scale';
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
import ForumsScreen from "@src/containers/Custom/ForumsScreen";
import {ProgressChart} from "react-native-chart-kit";
import {Modalize} from 'react-native-modalize';
import moment from 'moment';
import SunCalc from "suncalc";
import {
    SvgIconCheck,
    SvgIconCross,
    SvgIconLogin, SvgIconMenu, SvgIconMilestone,
    SvgIconMoonPhase, SvgIconProgress, SvgIconQuest,
    SvgIconSignup,
    SvgIconSunrise,
    SvgIconSunset, SvgVIPMedal
} from "../Utils/svg";

import { SetupService } from '../Services';
import * as Analytics from "../Utils/Analytics";

this.todayGoalDialog = undefined;
const HomeContent = (props) => {
    const {navigation, screenProps} = props;
    const {global, colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const settings = useSelector((state) => state.settingReducer.settings ? state.settingReducer.settings : null);
    const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
    const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer : null);
    const dispatch = useDispatch();
    const [sunrise, setSunrise] = useState('');
    const [moonPhase, setMoonPhase] = useState({});
    const [nextMoonPhase, setNextMoonPhase] = useState({});
    const [currentSolarTerm, setCurrentSolarTerm] = useState(null);
    const [points, setPoints] = useState(null);

    const onFocusHandler = async () => {
        try {
            navigation.closeDrawer();
        } catch (e) {
        }
    }
    useEffect(() => {
        if (progressReducer.latestUpdate !== 0)
            if (new moment().format('YYYY-MM-DD') !== new moment.unix(progressReducer.latestUpdate).format('YYYY-MM-DD')) {
                console.log('Daily Update', new moment().format('YYYY-MM-DD'));
                calcSolarMoon();
                dispatch({
                    type: 'ONENERGY_DAILY_UPDATE',
                });
                fetchCurrentSolarTerm().then();
            }
    },[new moment().format('YYYY-MM-DD')])
    useEffect(()=>{
        updateStatus().then();
    },[progressReducer.latestUpdate])
    useEffect(()=>{
        if(points) {
            updateClaim().then();
            setPoints(progressReducer.points)
        }
    },[...Object.values(progressReducer.points)])
    const fetchCurrentSolarTerm = async () => {
        try {
            const {customRequest} = getApi(props.config);
            const data = await customRequest(
                "wp-json/onenergy/v1/currentSolar/",
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            if(data){
                setCurrentSolarTerm({
                    Image:data.Image,
                    Start:data.Start,
                    End:data.End
                })
            }
        } catch (e) {
            console.error(e);
        }
    }
    const updateStatus = async () => {
        console.log('lastUpload', progressReducer.lastUpload, 'latestUpdate', progressReducer.latestUpdate);
        if (progressReducer.lastUpload && progressReducer.latestUpdate > progressReducer.lastUpload || !progressReducer.lastUpload) {
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
            console.log('statsUpdate home', progressReducer, achievements);
            const {customRequest} = getApi(props.config);
            await customRequest(
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
                }
            });
        }
    }
    const updateClaim = async () => {
        console.log('lastUpload', progressReducer.lastUpload, 'latestUpdate', progressReducer.latestUpdate);
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
        const {customRequest} = getApi(props.config);
        console.log('claimUpdate home', progressReducer.points, achievements);
        await customRequest(
            "wp-json/onenergy/v1/claimUpdate",
            "post",
            {
                "points": progressReducer.points,
                "achievements": achievements
            },
            null,
            {},
            false
        ).then();
    }
    const calcSolarMoon = () => {
        if(!settings.ip){
            fetchIpAndLocation().then();
        }
        const moonIllumination = SunCalc.getMoonIllumination(new Date());
        const phaseNumber = moonIllumination.phase * 200;
        let phaseName = '';
        let phaseTitle = '';
        if (phaseNumber >= 0 && phaseNumber <= 4) {
            phaseName = 'New Moon';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_new_moon').title;
        } else if (phaseNumber > 4 && phaseNumber < 50) {
            phaseName = 'Waxing Crescent';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_waxing_crescent').title;
        } else if (phaseNumber >= 50 && phaseNumber <= 54) {
            phaseName = 'First Quarter';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_first_quarter').title;
        } else if (phaseNumber > 54 && phaseNumber < 100) {
            phaseName = 'Waxing Gibbous';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_waxing_gibbous').title;
        } else if (phaseNumber >= 100 && phaseNumber <= 104) {
            phaseName = 'Full Moon';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_full_moon').title;
        } else if (phaseNumber > 104 && phaseNumber < 150) {
            phaseName = 'Waning Gibbous';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_waning_gibbous').title;
        } else if (phaseNumber >= 150 && phaseNumber <= 154) {
            phaseName = 'Last Quarter';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_last_quarter').title;
        } else if (phaseNumber > 154 && phaseNumber < 200) {
            phaseName = 'Waning Crescent';
            phaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_waning_crescent').title;
        }

        setMoonPhase({phaseName, phaseTitle})
        const lunarAge = (phaseNumber * 3)/20;
        let dateDiff;
        let moonPhaseTitle;
        let moonPhaseDate;

        if (lunarAge <= 14.765) {
            dateDiff = 14.765 - lunarAge;
            moonPhaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_full_moon').title;
        } else {
            dateDiff = 29.530 - lunarAge;
            moonPhaseTitle = optionData.titles.find(el => el.id === 'home_moonphase_new_moon').title;
        }
        moonPhaseDate = moment.utc().add(dateDiff, 'days').format('MMM DD');
        setNextMoonPhase({'date': moonPhaseDate, 'phase': moonPhaseTitle});
    }
    const fetchIpAndLocation = async () => {
        try {
            const {customRequest} = getApi(props.config);
            const localInfo = await customRequest(
                "wp-json/onenergy/v1/getLocalInfo/",
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            if(localInfo) {
                dispatch({
                    type: 'SETTINGS_LOCAL_INFO',
                    payload: localInfo
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(()=>{
        if(settings.latitude&&settings.longitude){
            const sunTimes = SunCalc.getTimes(new Date(), settings.latitude, settings.longitude, 0);
            setSunrise(sunTimes);
        }
    },[settings.latitude])
    useEffect(async () => {
        Analytics.segmentClient.screen('Home').then();
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'home_title').title,
        });
        calcSolarMoon();
        setCurrentSolarTerm({
            Image:optionData.currentSolarTermImage,
            Start:optionData.currentSolarTermStart,
            End:optionData.currentSolarTermEnd,
        });
        if(user) {
            async function run() {
                await SetupService();
            }
            run().then();
            setPoints(progressReducer.points);
        }
        navigation.addListener('willFocus', onFocusHandler)
        return () => {
            navigation.removeListener('willFocus', onFocusHandler);
        }
    }, []);

    const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const renderGoalSelector = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: s(9), borderTopRightRadius: s(9), marginTop: mvs(20)};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case 11:
                cornerStyle = {borderBottomLeftRadius: s(9), borderBottomRightRadius: s(9), marginBottom: mvs(20)};
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
                Analytics.segmentClient.track('Set Daily Goal', {
                    time: item.item
                }).then();
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
                        {item.item} {optionData.titles.find(el => el.id === 'home_popup_daily_goal_minutes').title}
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
                                <Text style={[global.textHeaderTitle, {fontSize: s(16)}]}>{optionData.salute}, {user.name}</Text>
                                <Text style={[global.title, {fontSize: s(12)}]}>{optionData.greetings}</Text>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "flex-end"}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProfileScreen")}
                                >
                                    <FastImage
                                        source={{uri: user && user.avatar_urls['full'] ? user.avatar_urls['full'] : user.avatar_urls['96']}}
                                        style={{
                                            height: s(50),
                                            width: s(50),
                                            borderRadius: 100,
                                            margin: s(10)
                                        }}
                                    />
                                    < FastImage source={{uri: optionData.ranks[user.rank?parseInt(user.rank):0].rankImage}}
                                    style={{position:"absolute", bottom:5, right:10, width: 24, height: 24, alignSelf: "center"}}/>
                                    {user.membership&&user.membership.length?
                                    <SvgVIPMedal style={{position:"absolute", top:0, right:-10}} />
                                        :null}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: mvs(15)}}>
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
                                        paddingTop: s(10),
                                        paddingLeft: s(10),
                                        alignItems: "flex-start"
                                    }}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: s(14),
                                                color: colors.primaryColor,
                                                marginRight:s(5)
                                            }]}>{optionData.titles.find(el => el.id === 'home_stats_daily_goal').title}</Text><Text style={[global.textAlt, {
                                            fontSize: s(12),
                                            color: colors.primaryColor
                                        }]}>{progressReducer.todayGoal ? Math.round(progressReducer.todayGoal) > 60 ? Math.round(progressReducer.todayGoal / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : progressReducer.todayGoal + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title : 0 + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: mvs(10),
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: s(14),
                                                color: colors.primaryColor,
                                                marginRight:s(5)
                                            }]}>{optionData.titles.find(el => el.id === 'home_stats_today').title}</Text><Text style={[global.textAlt, {
                                            fontSize: s(12),
                                            color: colors.primaryColor
                                        }]}>{progressReducer.todayDuration ? Math.round(progressReducer.todayDuration / 60) > 60 ? Math.round(progressReducer.todayDuration / 3600) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : Math.round(progressReducer.todayDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title : 0 + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                    </View>
                                    <ProgressChart
                                        data={{data: [progressReducer.todayDuration / (progressReducer.todayGoal * 60) <= 1 ? progressReducer.todayDuration / (progressReducer.todayGoal * 60) : 1]}}
                                        width={(windowWidth - s(80)) / 2}
                                        height={(windowWidth - s(80)) / 2}
                                        strokeWidth={24}
                                        radius={52}
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
                                            borderRadius: s(9)
                                        }}
                                    />
                                    <View>
                                        <TouchableScale
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: mvs(10)
                                            }}
                                            onPress={
                                                () => {
                                                    this.todayGoalDialog.open();
                                                }}>
                                            <Text style={[global.link, {
                                                fontWeight: "normal",
                                                color: colors.primaryButtonBg
                                            }]}>{optionData.titles.find(el => el.id === 'home_stats_goal_setting').title}</Text>
                                        </TouchableScale>
                                    </View>
                                </View>
                            </TouchableScale>
                            <View style={{marginRight: s(15), justifyContent: "space-between"}}>
                                <TouchableScale
                                    onPress={
                                        () => {
                                            navigation.dispatch(
                                                NavigationActions.navigate({
                                                    routeName: "ProgramsScreen"
                                                })
                                            )
                                        }}>
                                    <View style={[styles.progressRightRow, styles.boxShadow]}>
                                        <View style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: s(14),
                                                color: colors.primaryColor,
                                                flexWrap: 'wrap'
                                            }]}>{optionData.titles.find(el => el.id === 'home_stats_course_in_progress').title.replace('\\n', '\n')}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: s(40),
                                                color: colors.primaryButtonBg
                                            }]}>{progressReducer.enrolledCourses ? progressReducer.completedCourses ? progressReducer.enrolledCourses.length - progressReducer.completedCourses.length : progressReducer.enrolledCourses.length : 0}</Text>
                                        </View>
                                    </View>
                                </TouchableScale>
                                <TouchableScale
                                    onPress={
                                        () => {
                                            navigation.dispatch(
                                                NavigationActions.navigate({
                                                    routeName: "PracticesScreen"
                                                })
                                            )
                                        }}>
                                    <View style={[styles.progressRightRow, styles.boxShadow]}>
                                        <View style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: s(14),
                                                color: colors.primaryColor,
                                                flexWrap: 'wrap'
                                            }]}>{optionData.titles.find(el => el.id === 'home_stats_total_practiced').title.replace('\\n', '\n')}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "baseline"
                                        }}>
                                            <Text style={[global.itemTitle, {
                                                fontSize: s(40),
                                                color: colors.primaryButtonBg
                                            }]}>{progressReducer.totalDuration ? Math.round(progressReducer.totalDuration / 60) > 60 ? Math.round(progressReducer.totalDuration / 60 / 60) : Math.round(progressReducer.totalDuration / 60) : 0}</Text><Text
                                            style={[global.itemText, {
                                                fontSize: s(14),
                                                color: colors.primaryButtonBg
                                            }]}>{progressReducer.totalDuration ? Math.round(progressReducer.totalDuration / 60) > 60 ? optionData.titles.find(el => el.id === 'stats_detail_hours').title : optionData.titles.find(el => el.id === 'stats_detail_minutes').title : ''}</Text>
                                        </View>
                                    </View>
                                </TouchableScale>
                            </View>
                        </View>
                    </>
                    :
                    <View style={[styles.topRow, {marginTop: mvs(15), justifyContent: 'space-evenly'}]}>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("MySignupScreen");
                        }}>
                            <View style={{
                                paddingHorizontal: ms(10),
                                paddingVertical: ms(5),
                                backgroundColor: colors.primaryButtonBg,
                                borderRadius: s(9),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <SvgIconSignup size={s(24)} color={colors.primaryButtonColor}/>
                                    <Text
                                        style={[global.settingsItemTitle, {
                                            fontSize: s(16),
                                            color: colors.primaryButtonColor,
                                            marginLeft: ms(5)
                                        }]}>
                                        {optionData.titles.find(el => el.id === 'home_sign_up').title}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("MyLoginScreen");
                        }}>
                            <View style={{
                                paddingHorizontal: ms(10),
                                paddingVertical: ms(5),
                                backgroundColor: colors.secondaryButtonBg,
                                borderRadius: s(9),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <SvgIconLogin size={s(24)} color={colors.secondaryButtonColor}/>
                                    <Text
                                        style={[global.settingsItemTitle, {
                                            fontSize: s(16),
                                            color: colors.secondaryButtonColor,
                                            marginLeft: s(5)
                                        }]}>
                                        {optionData.titles.find(el => el.id === 'home_sign_in').title}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
                {optionData.goalCards && optionData.goalCards.length ?
                    <View style={styles.programRow}>
                        <EventList location={'top'} {...props} extraStyle={{marginTop:mvs(20)}}/>
                        <EventList location={'home'} {...props} extraStyle={{marginTop:mvs(20)}}/>
                    </View> : null}
                {optionData.quote && (
                    <View style={[styles.quoteRow, styles.boxShadow]}>
                        <DailyQuotes quote={optionData.quote} screenProps={screenProps}/>
                    </View>
                )}
                <View style={styles.eventRow}>
                    {settings.latitude&&settings.longitude?
                        <View style={[styles.block_season_left, styles.boxShadow]}>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text style={{
                                    fontFamily: "MontserratAlternates-SemiBold",
                                    fontWeight: "bold",
                                    fontSize: s(16),
                                    color: colors.textColor
                                }}>{moment.utc(sunrise.sunrise).local().format('HH:mm')}</Text>
                                <SvgIconSunrise/>
                            </View>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text style={{
                                    fontFamily: "MontserratAlternates-SemiBold",
                                    fontWeight: "bold",
                                    fontSize: s(16),
                                    color: colors.textColor
                                }}>{moment.utc(sunrise.sunset).local().format('HH:mm')}</Text>
                                <SvgIconSunset/>
                            </View>
                        </View>
                        :
                        <TouchableScale onPress={() => {
                            fetchIpAndLocation().then();
                        }}>
                            <View style={[styles.block_season_left, styles.boxShadow, {backgroundColor: colors.primaryButtonBg}]}>
                                <View style={{justifyContent: "center", alignItems: "center", padding: s(15)}}>
                                    <Text style={{
                                        fontFamily: "MontserratAlternates-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: s(14),
                                        color: colors.primaryButtonColor
                                    }}>Tap Here</Text>
                                    <Text style={{
                                        fontFamily: "MontserratAlternates-Regular",
                                        fontWeight: "normal",
                                        fontSize: s(14),
                                        color: colors.primaryButtonColor
                                    }}>show sunrise/sunset time</Text>
                                </View>
                            </View>
                        </TouchableScale>
                    }
                    <View style={[styles.block_season_center, styles.boxShadow]}>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Text style={{
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontWeight: "bold",
                                fontSize: s(14),
                                color: "white",
                                textAlign: "center"
                            }}>{optionData.titles.find(el => el.id === 'home_moonphase_today').title} {moonPhase.phaseTitle}</Text>
                            <SvgIconMoonPhase moonPhase={moonPhase.phaseName}/>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center"}}>
                            <Text style={{
                                fontFamily: "Montserrat-Regular",
                                fontWeight: "normal",
                                fontSize: s(14),
                                color: "white"
                            }}>{nextMoonPhase.date}</Text>
                            <Text style={{
                                fontFamily: "MontserratAlternates-Regular",
                                fontWeight: "normal",
                                fontSize: s(12),
                                color: "white"
                            }}>{nextMoonPhase.phase}</Text>
                        </View>
                    </View>
                    {currentSolarTerm && (
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
                                    source={{uri: currentSolarTerm.Image ? currentSolarTerm.Image : ''}}
                                    style={styles.image_season}
                                />
                                <View style={{
                                    position: "absolute",
                                    left: s(12),
                                    bottom: s(3),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: s(16),
                                        lineHeight: s(16),
                                        color: '#FFF'
                                    }}>{currentSolarTerm.Start?new moment(currentSolarTerm.Start).format('MMM'):''}</Text>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: s(22),
                                        lineHeight: s(22),
                                        color: '#FFF'
                                    }}>{currentSolarTerm.Start?new moment(currentSolarTerm.Start).format('DD'):''}</Text></View>
                                <View style={{
                                    position: "absolute",
                                    right: s(10),
                                    bottom: s(3),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: s(16),
                                        lineHeight: s(16),
                                        color: '#FFF'
                                    }}>{currentSolarTerm.End?new moment(currentSolarTerm.End).format('MMM'):''}</Text>
                                    <Text style={{
                                        fontFamily: "Montserrat-SemiBold",
                                        fontWeight: "bold",
                                        fontSize: s(22),
                                        lineHeight: s(22),
                                        color: '#FFF'
                                    }}>{currentSolarTerm.End?new moment(currentSolarTerm.End).format('DD'):''}</Text></View>
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
                            <Text style={global.widgetTitle}>{optionData.titles.find(el => el.id === 'home_title_faq').title}</Text>
                            <Text style={global.link}>{optionData.titles.find(el => el.id === 'home_title_see_all').title}</Text>
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
                                    <Text style={global.link}>{optionData.titles.find(el => el.id === 'home_title_see_all').title}</Text>
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
                childrenStyle={{marginBottom: mvs(20)}}
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: s(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>{optionData.titles.find(el => el.id === 'home_popup_daily_goal').title}</Text>
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
        paddingVertical: s(15),
    },
    tapFinger: {
        position: "absolute",
        width: s(200),
        height: s(240),
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    topRow: {
        flexDirection: "row",
        marginHorizontal: s(15),
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressLeftRow: {
        width: (windowWidth - s(45)) * 5 / 8,
        marginLeft: s(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:s(9),
        backgroundColor: "#FFF",
    },
    progressRightRow: {
        width: (windowWidth - s(45)) * 3 / 8,
        paddingVertical: s(5),
        height: (windowWidth * 3 / 5 - s(15)) / 2,
        justifyContent: "space-around",
        marginLeft: s(15),
        alignItems: 'center',
        borderRadius:s(9),
        backgroundColor: "#FFF",
    },
    quoteRow: {
        marginHorizontal: s(15),
        marginTop: mvs(20),
        alignItems: 'center',
        justifyContent: 'center',
        height: (windowWidth - s(30)) / 3.25,
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
        marginTop: mvs(50),
    },
    view_title: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: mvs(20),
    },
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - s(30),
        justifyContent: "space-between",
        marginTop: mvs(20),
    },
    heading: {
        fontSize: s(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
    heading_more: {
        fontSize: s(13),
        fontWeight: "normal",
        alignSelf: "baseline",
        color: "#4942e1",
    },
    block_season_left: {
        width: (windowWidth - s(50)) / 3,
        height: (windowWidth - s(30)) / 2,
        marginTop: mvs(20),
        marginLeft: s(15),
        borderRadius: s(9),
        backgroundColor: '#ffeee7',
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    block_season_center: {
        width: (windowWidth - s(50)) / 3,
        height: (windowWidth - s(30)) / 2,
        marginTop: mvs(20),
        marginLeft: s(10),
        borderRadius: s(9),
        backgroundColor: '#2e2e2e',
        paddingTop: s(5),
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    block_season_right: {
        width: (windowWidth - s(50)) / 3,
        height: (windowWidth - s(30)) / 2,
        marginTop: mvs(20),
        marginLeft: s(10),
        marginRight: s(15),
        borderRadius: s(9),
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    block_half_left: {
        width: (windowWidth - s(50)) / 2,
        height: (windowWidth - s(30)) / 2,
        marginTop: mvs(20),
        marginLeft: 15,
        marginRight: 10,
        borderRadius:s(9),
        backgroundColor: 'white',
    },
    block_half: {
        width: (windowWidth - s(50)) / 2,
        height: (windowWidth - s(30)) / 2,
        marginTop: mvs(20),
        marginLeft: 10,
        marginRight: 15,
        borderRadius:s(9),
        backgroundColor: 'white',
    },
    row_intro: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_intro: {
        marginTop: mvs(20),
        marginHorizontal: s(15),
        width: windowWidth - s(30),
        height: windowWidth - s(30),
        borderRadius:s(9),
    },
    image_intro: {
        width: windowWidth - s(30),
        height: windowWidth - s(30),
        borderRadius:s(9),
    },
    image_event: {
        width: (windowWidth - s(50)) / 3 * 2,
        height: (windowWidth - s(30)) / 2,
        flex: 1,
        borderRadius:s(9),
        overflow: 'hidden',
    },
    image_season: {
        width: (windowWidth - s(50)) / 3,
        height: (windowWidth - s(30)) / 2,
        flex: 1,
        borderRadius: s(9),
        overflow: 'hidden',
    },
    image_half: {
        width: (windowWidth - s(50)) / 2,
        height: (windowWidth - s(30)) / 2,
        flex: 1,
        borderRadius:s(9),
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
                    <NotificationTabBarIcon notificationID={'left_menu'} top={-5} right={-5} size={10}
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
                        <SvgIconQuest style={{marginRight:s(5)}} color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'quest'} top={-5} right={5} size={10}
                                                showNumber={false}/>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("MilestonesScreen")
                        }}
                    >
                        <SvgIconMilestone style={{marginRight:s(5)}} color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'milestone'} top={-5} right={5} size={10}
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