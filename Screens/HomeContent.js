import React, {useEffect, useRef} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView,
    Text,
    AppState, TouchableOpacity
} from "react-native";
import {getApi} from "@src/services";
import IconButton from "@src/components/IconButton";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from '../Utils/scale';
import TouchableScale from "../Components/TouchableScale";
import TopSlider from '../Components/TopSlider';
import DailyQuotes from '../Components/DailyQuotes'
import PostRow from '../Components/PostRow';
import ImageCache from "../Components/ImageCache";
import {NavigationActions} from "react-navigation";
import AuthWrapper from "@src/components/AuthWrapper"; //This line is a workaround while we figure out the cause of the error
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import EventList from "../Components/EventList";
import TrackPlayer, {Capability, RepeatMode} from 'react-native-track-player';
import analytics from '@react-native-firebase/analytics';
import ForumsScreen from "@src/containers/Custom/ForumsScreen";

const HomeContent = (props) => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const practiceReducer = useSelector((state) => state.onenergyReducer.practiceReducer);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const achievementReducer = useSelector((state) => state.onenergyReducer.achievementReducer);
    const postReducer = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();

    const onFocusHandler=() =>{
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
        console.log(progressReducer.latestUpdate, progressReducer.lastUpload)
        if (progressReducer.latestUpdate > progressReducer.lastUpload) {
            let achievements = {
                'achievements': [],
                'weekly': achievementReducer.weekly,
                'monthly': achievementReducer.monthly
            }
            console.log('step 1')
            achievementReducer.achievements.map((achievement) => {
                achievements.achievements.push({
                    'id': achievement.id,
                    'step': achievement.step,
                    'complete_date': achievement.complete_date,
                    'claim_date': achievement.claim_date,
                    'list': achievement.list
                });
            });
            console.log(achievements)
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
                if(response.data){
                    dispatch({
                        type: 'ONENERGY_PROGRESS_UPLOADED'
                    });
                }
            });
        }
    };
    useEffect(() => {
        navigation.addListener('willFocus', onFocusHandler)
        const subscription = AppState.addEventListener("change", _handleAppStateChange);
        console.log('action')
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'home_title').title,
            user: user
        });
        if(user) {
            TrackPlayer.setupPlayer();
            TrackPlayer.updateOptions({
                stoppingAppPausesPlayback: true,
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
            console.log("1", optionData.cache.guide, practiceReducer.guideUpdate, practiceReducer);
            let load = false;
            if (optionData.cache.guide && practiceReducer.guideUpdate && optionData.cache.guide > practiceReducer.guideUpdate || !practiceReducer.guideUpdate) {
                load = true;
            }
            console.log("2", optionData.cache.group, practiceReducer.groupUpdate, practiceReducer);
            if (optionData.cache.group && practiceReducer.groupUpdate && optionData.cache.group > practiceReducer.groupUpdate || !practiceReducer.groupUpdate) {
                load = true;
            }
            console.log("3", optionData.cache.post, postReducer.postUpdate, postReducer);
            if (optionData.cache.post && postReducer.postUpdate && optionData.cache.post > postReducer.postUpdate || !postReducer.postUpdate) {
                dispatch({
                    type: 'ONENERGY_POSTS_RESET',
                });
            }
            console.log("4", optionData.cache.achievement, achievementReducer.achievementUpdate, achievementReducer);
            if (optionData.cache.achievement && achievementReducer.achievementUpdate && optionData.cache.achievement > achievementReducer.achievementUpdate || !achievementReducer.achievementUpdate) {
                load = true;
            }
            console.log("5", optionData.cache.progress, progressReducer.progressUpdate, progressReducer);
            if (optionData.cache.progress && progressReducer.progressUpdate && optionData.cache.progress > progressReducer.progressUpdate || !progressReducer.progressUpdate) {
                load = true;
            }
            if (load) {
                props.navigation.navigate("HomeModal", { transition: 'fade' });
            }
        }
        return () => {
            subscription.remove();
            navigation.removeListener('willFocus', onFocusHandler);
        }

    }, []);

    const OnPress = async (item, typeName) => {
        if (item) {
            switch (item[typeName]) {
                case 'post':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "BlogScreen",
                            params: {
                                blogId: item.post,
                                title: item.title
                            }
                        })
                    )
                    break;
                case 'page':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "AppPageScreen",
                            params: {
                                pageId: item.page,
                                title: item.title
                            }
                        })
                    )
                    break;
                case 'link':
                    let secTimer = setInterval(() => {
                        clearInterval(secTimer);
                    }, 1000)
                    await props.attemptDeepLink(false)(null, item.link);
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                {optionData.show.includes('slider') && (
                    <View style={[styles.slideRow, styles.boxShadow]}>
                        {optionData.topSlides && (
                            <TopSlider
                                data={optionData.topSlides}
                                loop={true}
                                timer={5000}
                                onPress={(item) => {
                                    OnPress(item, 'slideType').then();
                                }}
                                indicatorContainerStyle={{position: 'absolute', bottom: -10}}
                                indicatorActiveColor={'#8e44ad'}
                                indicatorInActiveColor={'#ffffff'}
                                indicatorActiveWidth={30}
                                animation
                            />
                        )}
                    </View>
                )}
                {optionData.show.includes('quotes') && optionData.quote && (
                    <View style={[styles.quoteRow, styles.boxShadow]}>
                        <DailyQuotes quote={optionData.quote}/>
                    </View>
                )}
                <View style={styles.programRow}>
                    <EventList location={'home'} eventsDate={optionData.goals}/>
                </View>
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
                            <Text style={styles.heading}>Q & A</Text>
                            <Text style={styles.heading_more}>See All ></Text>
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
                                        <Text style={styles.heading}>{blog.name}</Text>
                                        <Text style={styles.heading_more}>See All ></Text>
                                    </View>
                                </TouchableScale>
                                <View style={styles.eventRow}>
                                    <PostRow postType={'categories'} postCategory={blog.category}
                                             postPerPage={blog.count} postOrder={blog.order} postOrderBy={blog.orderBy}
                                             showAuthor={blog.showAuthor}/>
                                </View>
                            </>
                        ))}
                    </View>
                )}
                <View style={styles.bottomRow}>
                </View>
            </ScrollView>
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
    slideRow: {
        marginHorizontal: scale(15),
        marginTop: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: "white",
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
        justifyContent: 'flex-start',
        paddingLeft: 15,
        marginTop: scale(10),
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

HomeContent.navigationOptions = ({navigation}) => {
    return ({
        title: navigation.getParam('title'),
        headerLeft:
            <TouchableScale
                onPress={() => {navigation.openDrawer()
                }}
            >
                <IconButton
                    icon={require("@src/assets/img/menu.png")}
                    tintColor={"#4942e1"}
                    style={{
                        height: 20,
                        marginLeft: 20,
                    }}
                />
                <NotificationTabBarIcon notificationID={'left_menu'} top={0} right={0} size={scale(10)} showNumber={false} />
            </TouchableScale>,
        headerRight:
            navigation.getParam('user')?
            <View style={{justifyContent:"flex-end", flexDirection:"row", marginRight:15}}>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("MilestonesScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/certificate.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 5,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'milestone'} top={0} right={0} size={scale(10)} showNumber={false} />
                </TouchableScale>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("QuestsScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/achievement-action-icon.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 5,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'quest'} top={0} right={0} size={scale(10)} showNumber={false} />
                </TouchableScale>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("NotificationsScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/notification-icon.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 0,
                        }}
                    />
                </TouchableScale>
            </View>
            :null
    })
}
const mapStateToProps = (state) => ({
    config: state.config?state.config:null,
    accessToken: state.auth.token?state.auth.token:null,
});
export default connect(mapStateToProps)(withDeeplinkClickHandler(HomeContent));