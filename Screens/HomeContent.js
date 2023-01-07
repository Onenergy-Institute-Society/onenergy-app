import React, {useEffect} from "react";
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
import TopSlider from '../Components/TopSlider';
import DailyQuotes from '../Components/DailyQuotes'
import PostRow from '../Components/PostRow';
import ImageCache from "../Components/ImageCache";
import {NavigationActions} from "react-navigation";
import AuthWrapper from "@src/components/AuthWrapper";
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import EventList from "../Components/EventList";
import TrackPlayer, {Capability, RepeatMode, AppKilledPlaybackBehavior} from 'react-native-track-player';
import analytics from '@react-native-firebase/analytics';
import ForumsScreen from "@src/containers/Custom/ForumsScreen";
import Svg, {Circle, Path} from "react-native-svg";
import {
    ProgressChart,
} from "react-native-chart-kit";
import { Modalize } from 'react-native-modalize';

this.todayGoalDialog = undefined;
const HomeContent = (props) => {
    const {navigation, screenProps} = props;
    const {global, colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const practiceReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer:null);
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer:null);
    const postReducer = useSelector((state) => state.postReducer?state.postReducer:null);
    const dispatch = useDispatch();

    const chartConfig = {
        backgroundGradientFrom: "#FFEEE7",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#FFEEE7",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(236, 87, 24, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
    };

    const onFocusHandler=() =>
    {
        try
        {
            navigation.closeDrawer();
        }catch (e) {
        }
    }
    analytics().logScreenView({
       screen_class: 'MainActivity',
       screen_name: 'Home Screen',
     });

    const _handleAppStateChange = async () => {
        if(user) {
            if((Platform.OS === "android" && AppState.currentState==='background') || (Platform.OS === "ios" && AppState.currentState==='inactive')) {
                console.log(AppState.currentState)
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
                        }
                    });
                }
            }
        }
    };

    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'home_title').title,
        });
        if(user) {
            navigation.addListener('willFocus', onFocusHandler)
            const subscription = AppState.addEventListener("change", _handleAppStateChange);
            TrackPlayer.setupPlayer();
            TrackPlayer.updateOptions({
/*                android: {
                    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
                },*/
                alwaysPauseOnInterruption: false,
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                ],
                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                ],
            });
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            let load = false;
            if (optionData.cache.guide && practiceReducer.guideUpdate && optionData.cache.guide > practiceReducer.guideUpdate || !practiceReducer.guideUpdate) {
                load = true;
            }
            if (optionData.cache.group && practiceReducer.groupUpdate && optionData.cache.group > practiceReducer.groupUpdate || !practiceReducer.groupUpdate) {
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
                props.navigation.navigate("InitData", { transition: 'fade' });
            }
            return () => {
                navigation.removeListener('willFocus', onFocusHandler);
                subscription.remove();
            }
        }
    }, []);

    const OnPress = async (item) => {
        if (item) {
            switch(item.link)
            {
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
    const minutes = [5,10,15,20,25,30,35,40,45,50,55,60];
    const renderGoalSelector = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        switch(item.index)
        {
            case 0:
                cornerStyle = {borderTopLeftRadius:9, borderTopRightRadius:9, marginTop:25};
                bottomStyle = {borderBottomWidth:1, borderBottomColor:'#E6E6E8'};
                break;
            case 11:
                cornerStyle = {borderBottomLeftRadius:9, borderBottomRightRadius:9, marginBottom:25};
                break;
            default:
                bottomStyle = {borderBottomWidth:1, borderBottomColor:'#E6E6E8'};
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
                <View style={[cornerStyle, bottomStyle, {width: windowWidth-50, marginHorizontal:25, paddingHorizontal:25, backgroundColor:colors.bodyBg, paddingVertical:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <Text
                        style={global.text}>
                        {item.item} minutes
                    </Text>
                    {progressReducer.todayGoal&&
                        parseInt(progressReducer.todayGoal) === parseInt(item.item)?(
                            <Svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                style={{marginLeft:scale(10)}}
                            >
                                <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                      fill="none"
                                      stroke={colors.primaryColor}
                                      strokeWidth="2"
                                />
                                <Path d="M22 4 12 14.01l-3-3"
                                      fill="none"
                                      stroke={colors.primaryColor}
                                      strokeWidth="2"
                                />
                            </Svg>
                    ):null}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                {optionData.show.includes('slider')?
                    <TopSlider
                        loop={true}
                        timer={5000}
                        onPress={(item) => {
                            OnPress(item).then();
                        }}
                        indicatorContainerStyle={{position: 'absolute', bottom: -10}}
                        indicatorActiveColor={'#8e44ad'}
                        indicatorInActiveColor={'#ffffff'}
                        indicatorActiveWidth={30}
                        animation
                    />:null
                }
                {user?
                <>
                    <View style={styles.topRow}>
                        <View style={{width: windowWidth*2/3, justifyContent:"space-between"}}>
                            <Text style={global.textHeaderTitle}>Hi, {user.name}</Text>
                            <Text style={[global.title, {fontSize: scale(12)}]}>{optionData.greetings[Math.floor(Math.random() * optionData.greetings.length)]}</Text>
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
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                        <TouchableScale
                            onPress={
                                () => {
                                    navigation.dispatch(
                                        NavigationActions.navigate({
                                            routeName: "StatsScreen"
                                        })
                                    )}}>
                            <View style={[styles.progressRow, styles.boxShadow, {height: windowWidth*3/5}]}>
                                <View style={{width:"100%", paddingTop:scale(10), paddingLeft:scale(10), alignItems:"flex-start"}}>
                                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                        <Text style={[global.itemTitle,{fontSize:scale(14),color:colors.primaryColor}]}>Daily Goal: </Text><Text style={[global.textAlt,{fontSize:scale(10),color:colors.primaryColor}]}>{progressReducer.todayGoal?Math.round(progressReducer.todayGoal)>60?Math.round(progressReducer.todayGoal /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:progressReducer.todayGoal + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0+optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                    </View>
                                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom:scale(10)}}>
                                        <Text style={[global.itemTitle,{fontSize:scale(14),color:colors.primaryColor}]}>Today: </Text><Text style={[global.textAlt,{fontSize:scale(10),color:colors.primaryColor}]}>{progressReducer.todayDuration?Math.round(progressReducer.todayDuration / 60 )>60?Math.round(progressReducer.todayDuration /3600)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.todayDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0+optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                    </View>
                                </View>
                                <ProgressChart
                                    data={{data:[progressReducer.todayDuration/(progressReducer.todayGoal*60)<=1?progressReducer.todayDuration/(progressReducer.todayGoal*60):1]}}
                                    width={(windowWidth-scale(80))/2}
                                    height={(windowWidth-scale(80))/2}
                                    strokeWidth={24}
                                    radius={64}
                                    chartConfig={chartConfig}
                                    hideLegend={true}
                                    style={{
                                        borderRadius: 9
                                    }}
                                />
                                <View>
                                    <TouchableScale
                                        style={{alignItems:"center", justifyContent:"center", marginBottom:scale(10)}}
                                        onPress={
                                            () => {this.todayGoalDialog.open();}}>
                                        <Text style={[styles.link, {fontWeight:"bold", color:colors.primaryButtonBg}]}>Goal setting ></Text>
                                    </TouchableScale>
                                </View>
                            </View>
                        </TouchableScale>
                        <View style={{marginRight:scale(15), justifyContent: "space-between"}}>
                            <View style={[styles.progressRow, styles.boxShadow, {paddingVertical: scale(10), height:(windowWidth*3/5-scale(15))/2, justifyContent: "space-between"}]}>
                                <View style={{width: "100%", flexDirection: "row", justifyContent: "flex-start", paddingLeft:scale(10), alignItems:"center"}}>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <Path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                                              fill="none"
                                              stroke={colors.secondaryButtonColor}
                                              strokeWidth="2"
                                        />
                                    </Svg>
                                    <Text style={[global.itemTitle,{marginLeft:scale(5),fontSize:scale(14),color:colors.primaryColor}]}>In progress</Text>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                                    <Text style={[global.itemTitle,{fontSize:scale(36),color:colors.primaryButtonBg}]}>{progressReducer.enrolledCourses?progressReducer.completedCourses?progressReducer.enrolledCourses.length-progressReducer.completedCourses.length:progressReducer.enrolledCourses.length:0}</Text>
                                </View>
                            </View>
                            <View style={[styles.progressRow, styles.boxShadow, {paddingVertical: scale(10), height:(windowWidth*3/5-scale(15))/2, justifyContent: "space-between"}]}>
                                <View style={{width: "100%", flexDirection: "row", justifyContent: "flex-start", paddingLeft:scale(10), alignItems:"center"}}>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <Circle cx="12" cy="12" r="10"
                                                fill="none"
                                                stroke={colors.secondaryButtonColor}
                                                strokeWidth="2"
                                        />
                                        <Path d="M12 6v6l4 2"
                                              fill="none"
                                              stroke={colors.secondaryButtonColor}
                                              strokeWidth="2"
                                        />
                                    </Svg>
                                    <Text style={[global.itemTitle,{marginLeft:scale(5),fontSize:scale(14),color:colors.primaryColor}]}>Practiced</Text>
                                </View>
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    <Text style={[global.itemTitle,{fontSize:scale(36),color:colors.primaryButtonBg}]}>{progressReducer.totalDuration?Math.round(progressReducer.totalDuration / 60 )>60?Math.round(progressReducer.totalDuration / 60 /60):Math.round(progressReducer.totalDuration / 60):0}</Text><Text style={[global.itemText,{fontSize:scale(24),color:colors.primaryButtonBg}]}>{progressReducer.totalDuration?Math.round(progressReducer.totalDuration / 60 )>60?optionData.titles.find(el => el.id === 'stats_detail_hours').title:optionData.titles.find(el => el.id === 'stats_detail_minutes').title:''}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
                :null}
                {optionData.goals&&optionData.goals.length?
                <View style={styles.programRow}>
                    <EventList location={'home'} {...props} />
                </View>:null}
                {optionData.show.includes('quotes') && optionData.quote && (
                    <View style={[styles.quoteRow, styles.boxShadow]}>
                        <DailyQuotes quote={optionData.quote} screenProps={screenProps} />
                    </View>
                )}
                {optionData.show.includes('events') && (
                    <View style={styles.eventRow}>
                        {optionData.events && (
                            <TouchableScale
                                onPress={() => {
                                    OnPress(optionData.events, 'eventType').then();
                                }}>
                                <View style={[styles.block_event, styles.boxShadow]}>
                                    <ImageCache
                                        source={{uri: optionData.events.image ? optionData.events.image : ''}}
                                        style={styles.image_event}
                                    />
                                </View>
                            </TouchableScale>
                        )}
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
                                <View style={[styles.block_season, styles.boxShadow]}>
                                    <ImageCache
                                        source={{uri: optionData.currentSolarTermImage ? optionData.currentSolarTermImage : ''}}
                                        style={styles.image_season}
                                    />
                                </View>
                            </TouchableScale>
                        )}
                    </View>
                )}
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
                <ForumsScreen {...props} headerHeight={0} hideFilters={true} hideNavigationHeader={true} hideTitle={true} showSearch={false} screenTitle="My Forums" />
                {optionData.show.includes('blogs') && (
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
                                             showAuthor={blog.showAuthor} {...props} />
                                </View>
                            </>
                        ))}
                    </View>
                )}
                <View style={styles.bottomRow}>
                </View>
            </ScrollView>
            <Modalize
                ref={(todayGoalDialog) => { this.todayGoalDialog = todayGoalDialog; }}
                modalStyle={{backgroundColor:colors.bodyFrontBg}}
                modalHeight={windowHeight/2}
                withHandle = "false"
                HeaderComponent={
                    <View style={{
                        padding: scale(25),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{fontSize: scale(24), color: colors.headerColor, fontFamily: "MontserratAlternates-SemiBold", fontWeight: "bold"}}>Daily Goal</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.todayGoalDialog.close();
                            }}
                        >
                            <Svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                style={{marginLeft:scale(10)}}
                            >
                                <Circle cx="12" cy="12" r="10" fill="#d3d3d3"
                                        stroke="#d3d3d3"
                                        strokeWidth="1"/>
                                <Path d="m15 9-6 6M9 9l6 6" fill="#262626"
                                      stroke="#262626"
                                      strokeWidth="1"/>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                }
                flatListProps = {{
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
    progressRow: {
        width: (windowWidth - scale(50)) / 2,
        marginLeft: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: "#FFEEE7",
    },
    quoteRow: {
        marginHorizontal: scale(15),
        marginTop: scale(15),
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
        flex:1,
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
        marginTop: scale(15),
    },
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - scale(30),
        justifyContent: "space-between",
        marginTop: scale(15),
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
    block_event: {
        width: (windowWidth - scale(50)) / 3 * 2,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(15),
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_season: {
        width: (windowWidth - scale(50)) / 3,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(15),
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_half_left: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(15),
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        marginTop: scale(15),
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
        marginTop: scale(15),
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
    return ({
        title: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableScale
                onPress={() => {navigation.openDrawer()
                }}
            >
                <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{marginLeft:scale(10)}}
                >
                    <Path d="M3 12h18M3 6h13M3 18h09"
                          fill="none"
                          stroke={colors.headerIconColor}
                          strokeWidth="2"
                    />
                </Svg>
                <AuthWrapper actionOnGuestLogin={'hide'}>
                    <NotificationTabBarIcon notificationID={'left_menu'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                </AuthWrapper>
            </TouchableScale>,
        headerRight:
            <AuthWrapper actionOnGuestLogin={'hide'}>
                <View style={{justifyContent:"flex-end", flexDirection:"row", marginRight:15}}>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("QuestsScreen")
                        }}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            style={{marginRight:scale(10)}}
                        >
                            <Path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1Zm0 28a13 13 0 1 1 13-13 13 13 0 0 1-13 13Z" fill={colors.headerIconColor} />
                            <Path d="M16 5a11 11 0 1 0 11 11A11 11 0 0 0 16 5Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" fill={colors.headerIconColor} />
                            <Path d="M22.9 14.26a2 2 0 0 0-1.9-1.39h-2.36l-.72-2.22a2 2 0 0 0-3.84 0l-.73 2.23H11a2 2 0 0 0-1.19 3.64l1.89 1.38-.7 2.21a2 2 0 0 0 .73 2.25 2 2 0 0 0 1.19.39 2 2 0 0 0 1.18-.39L16 21l1.89 1.37A2 2 0 0 0 21 20.11l-.72-2.23 1.89-1.37a2 2 0 0 0 .73-2.25Zm-3.79 2a2 2 0 0 0-.74 2.25l.7 2.23-1.89-1.37a2 2 0 0 0-2.36 0l-1.91 1.36.72-2.22a2 2 0 0 0-.74-2.25L11 14.87h2.33a2 2 0 0 0 1.92-1.39l.75-2.24.72 2.22a2 2 0 0 0 1.92 1.39h2.34Z" fill={colors.headerIconColor} />
                        </Svg>
                        <NotificationTabBarIcon notificationID={'quest'} top={-5} right={5} size={scale(10)} showNumber={false} />
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("MilestonesScreen")
                        }}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            style={{marginRight:scale(10)}}
                        >
                            <Path d="m30.77 24.21-3.36-4a13 13 0 1 0-22.82 0l-3.36 4a1 1 0 0 0-.18 1 1 1 0 0 0 .72.66l3.86.92 1.58 3.61A1 1 0 0 0 8 31h.15a1 1 0 0 0 .76-.36l3.5-4.16a12.79 12.79 0 0 0 7.22 0l3.5 4.16a1 1 0 0 0 .76.36H24a1 1 0 0 0 .77-.59l1.58-3.65 3.86-.92a1 1 0 0 0 .72-.66 1 1 0 0 0-.16-.97ZM8.4 28.12 7.27 25.5a1 1 0 0 0-.69-.58l-2.77-.66L5.74 22a13.07 13.07 0 0 0 4.67 3.77ZM5 14a11 11 0 1 1 11 11A11 11 0 0 1 5 14Zm20.42 10.92a1 1 0 0 0-.69.58l-1.13 2.62-2-2.4A13.07 13.07 0 0 0 26.26 22l1.93 2.31Z" fill={colors.headerIconColor} />
                            <Path d="M23.89 12a2.15 2.15 0 0 0-2.07-1.51h-2.73a.17.17 0 0 1-.17-.12l-.84-2.57a2.19 2.19 0 0 0-4.16 0l-.84 2.59a.17.17 0 0 1-.17.12h-2.73a2.19 2.19 0 0 0-1.28 4l2.2 1.6a.16.16 0 0 1 .07.2l-.84 2.59a2.15 2.15 0 0 0 .79 2.44 2.18 2.18 0 0 0 2.57 0l2.2-1.6a.18.18 0 0 1 .22 0l2.2 1.6a2.18 2.18 0 0 0 2.57 0 2.15 2.15 0 0 0 .79-2.44l-.84-2.59a.17.17 0 0 1 .06-.2l2.21-1.6a2.14 2.14 0 0 0 .79-2.51Zm-2 .82-2.2 1.6a2.16 2.16 0 0 0-.79 2.44l.84 2.59a.16.16 0 0 1-.07.2.16.16 0 0 1-.21 0l-2.21-1.6a2.16 2.16 0 0 0-2.56 0l-2.21 1.6a.16.16 0 0 1-.21 0 .16.16 0 0 1-.07-.2l.84-2.59a2.16 2.16 0 0 0-.79-2.44l-2.2-1.6a.16.16 0 0 1-.07-.2.16.16 0 0 1 .17-.13h2.73A2.16 2.16 0 0 0 15 11l.85-2.59a.18.18 0 0 1 .34 0L17 11a2.16 2.16 0 0 0 2.07 1.5h2.73a.16.16 0 0 1 .17.13.16.16 0 0 1-.05.21Z" fill={colors.headerIconColor} />
                        </Svg>
                        <NotificationTabBarIcon notificationID={'milestone'} top={-5} right={5} size={scale(10)} showNumber={false} />
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("StatsScreen")
                        }}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{marginRight:scale(5)}}
                        >
                            <Path
                                d="M12 20V10M18 20V4M6 20v-4"
                                fill="none"
                                stroke={colors.headerIconColor}
                                strokeWidth="2"
                            />
                        </Svg>
                        <NotificationTabBarIcon notificationID={'milestone'} top={-5} right={5} size={scale(10)} showNumber={false} />
                    </TouchableScale>
                </View>
            </AuthWrapper>
    })
}
const mapStateToProps = (state) => ({
    config: state.config?state.config:null,
    accessToken: state.auth.token?state.auth.token:null,
});
export default connect(mapStateToProps)(withDeeplinkClickHandler(HomeContent));