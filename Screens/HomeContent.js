import React, {useEffect, useState} from "react";
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {
    StyleSheet,
    ScrollView,
    View,
    SafeAreaView, Text, FlatList, Image
} from "react-native";
import {windowWidth} from "../Utils/Dimensions";
import {scale, verticalScale} from '../Utils/scale';
import IconButton from "@src/components/IconButton";
import TouchableScale from "../Components/TouchableScale";
import TopSlider from '../Components/TopSlider';
import DailyQuotes from '../Components/DailyQuotes'
import Skeleton from '../Components/Loaders/QuoteSkeletonLoading';
import PostRow from '../Components/PostRow';
import ImageCache from "../Components/ImageCache";
import PopupDialog from 'react-native-popup-dialog';
import {NavigationActions} from "react-navigation";
import TrackPlayer, {Capability, RepeatMode} from 'react-native-track-player';
import AuthWrapper from "@src/components/AuthWrapper"; //This line is a workaround while we figure out the cause of the error
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import * as Progress from 'react-native-progress';
import EventList from "../Components/EventList";

const HomeContent = (props) => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const [quotesData, setQuotesData] = useState([]);
    const [quotesLoading, setQuotesLoading] = useState(true);
    TrackPlayer.updateOptions({
        stopWithApp: user?!(user.membership&&user.membership.length):true, // false=> music continues in background even when app is closed
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
    TrackPlayer.setupPlayer();
    const fetchQuotesData = async () => {
        try {
            const apiQuotes = getApi(props.config);
            await apiQuotes.customRequest(
                "wp-json/wp/v2/posts?_embed&categories=125&order=desc&orderby=id&per_page=1",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                setQuotesData(response.data);
                setQuotesLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchQuotesData().then();
        let titleIndex = optionData.titles.findIndex(el => el.id === 'home_title');
        props.navigation.setParams({
            showNotification: !!user,
            title: optionData.titles[titleIndex].title,
        });
    }, []);
    const renderFeaturedPrograms = (item) => {
        return (
            <TouchableScale
                onPress={() => {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "MyAppPageScreen",
                            params: {
                                pageId: item.item.page,
                                title: item.item.title,
                            }
                        })
                    );
                }}>
                <View style={[styles.block_half_left, styles.boxShadow]}>
                    <ImageCache
                        source={{uri: item.item.image}}
                        style={styles.image_half}
                    />
                </View>
            </TouchableScale>
        )
    }
    const OnPress = async (item, typeName) => {
        if(item)
        {
            switch(item[typeName])
            {
                case 'post':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "MyBlogScreen",
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
                            routeName: "MyAppPageScreen",
                            params: {
                                pageId: item.page,
                                title: item.title
                            }
                        })
                    )
                    break;
                case 'link':
                    this.loadingDialog.show();
                    let secTimer = setInterval( () => {
                        this.loadingDialog.dismiss();
                        clearInterval(secTimer);
                    },1000)
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
                {optionData.show.includes('quotes') && (
                    quotesLoading?
                        <View style={[styles.quoteRow, styles.boxShadow]}>
                            <Skeleton/>
                        </View>
                    :
                        <View style={[styles.quoteRow, styles.boxShadow]}>
                            {quotesData.map(item => {
                                return (
                                    <DailyQuotes item={item}/>
                                )
                            })}
                        </View>
                )}
                {user?
                    <View style={styles.programRow}>
                        <EventList location={'home'} eventsData={optionData.webinars} />
                        <EventList location={'home'} eventsData={optionData.goals} />
                    </View>
                :null}
                {user && user.firstCourseCompleted && optionData.show.includes('events') && (
                <View style={styles.eventRow}>
                    {optionData.events && (
                        <TouchableScale
                            onPress={() =>{
                                OnPress(optionData.events, 'eventType').then();
                            }}>
                            <View style={[styles.block_event,styles.boxShadow]}>
                                <ImageCache
                                    source={{uri: optionData.events.image?optionData.events.image:''}}
                                    style={styles.image_event}
                                />
                            </View>
                        </TouchableScale>
                    )}
                    {optionData.currentSolarTermImage && (
                        <TouchableScale
                            onPress={
                                () => {
                                    optionData.solarTerm.solarTermType==='page'?
                                        navigation.dispatch(
                                            NavigationActions.navigate({
                                                routeName: "MyAppPageScreen",
                                                params: {
                                                    pageId: optionData.solarTerm.page,
                                                    title: optionData.solarTerm.title
                                                }
                                            })
                                        )
                                    :
                                    optionData.solarTerm.solarTermType==='screen'?
                                        NavigationActions.navigate({
                                          routeName: "SolarTermScreen"
                                        })
                                        :null
                                }
                            }>
                            <View style={[styles.block_season,styles.boxShadow]}>
                                <ImageCache
                                    source={{uri: optionData.currentSolarTermImage?optionData.currentSolarTermImage:''}}
                                    style={styles.image_season}
                                />
                            </View>
                        </TouchableScale>
                    )}
                </View>
                )}
                {user && user.firstCourseCompleted && optionData.show.includes('entries') && (
                <View style={styles.eventRow}>
                    {optionData.entries && (
                    <TouchableScale
                        onPress={
                            () => {
                                navigation.dispatch(
                                    NavigationActions.navigate({
                                        routeName: "ProgramsScreen"
                                    })
                                )
                            }
                        }>
                        <View style={[styles.block_half_left,styles.boxShadow]}>
                            <ImageCache
                                source={{uri: optionData.entries.courseImage?optionData.entries.courseImage:''}}
                                style={styles.image_half}
                            />
                        </View>
                    </TouchableScale>
                    )}
                    {optionData.entries && (
                    <TouchableScale
                        onPress={
                            () => {
                                navigation.dispatch(
                                    NavigationActions.navigate({
                                        routeName: "PracticesScreen"
                                    })
                                )
                            }
                        }>
                        <View style={[styles.block_half,styles.boxShadow]}>
                            <ImageCache
                                source={{uri: optionData.entries.practiceImage?optionData.entries.practiceImage:''}}
                                style={styles.image_half}
                            />
                        </View>
                    </TouchableScale>
                    )}
                </View>
                )}
                {!user||!user.firstCourseCompleted?
                    <View style={styles.row_intro}>
                        <TouchableScale
                            onPress={
                                () => {
                                    navigation.dispatch(
                                        NavigationActions.navigate({
                                            routeName: "MyCourseScreen",
                                            params: {
                                                courseId: 29421
                                            }
                                        })
                                    )
                                }
                            }>
                            <View style={[styles.view_intro, styles.boxShadow]}>
                                <ImageCache
                                    source={{uri: optionData.intro.image}}
                                    style={styles.image_intro}
                                />
                            </View>
                        </TouchableScale>
                    </View>
                    :null
                }
                {optionData.show.includes('blogs') && (
                <View style={styles.blogRow}>
                    {optionData.blogs.map((blog)=>(
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
                                <PostRow postType={'categories'} postCategory={blog.category} postPerPage={blog.count} postOrder={blog.order} postOrderBy={blog.orderBy} showAuthor={blog.showAuthor}/>
                            </View>
                        </>
                    ))}
                </View>
                )}
                <View style={styles.bottomRow}>
                </View>
            </ScrollView>
            <PopupDialog
                ref={(loadingDialog) => { this.loadingDialog = loadingDialog; }}
                width = {windowWidth*2/3}
                height = {windowWidth/5}
            >
                <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Loading</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
            </PopupDialog>
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
    slideRow: {
        marginHorizontal: scale(15),
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: "white",
    },
    quoteRow: {
        marginHorizontal: scale(15),
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: (windowWidth-30)/3.75,
    },
    eventRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    programRow: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    blogRow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 15,
        marginVertical: 10,
        flex:1,
    },
    bottomRow: {
        minHeight: 50,
    },
    view_title: {
        flex:1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginVertical: 10,
    },
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - 30,
        justifyContent: "space-between",
        marginVertical: 10,
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
        width: (windowWidth - 50) / 3 * 2,
        height: (windowWidth - 30) / 2,
        marginVertical: 10,
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_season: {
        width: (windowWidth - 50) / 3,
        height: (windowWidth - 30) / 2,
        marginVertical: 10,
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_half_left: {
        width: (windowWidth - 50) / 2,
        height: (windowWidth - 30) / 2,
        marginVertical: 10,
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 9,
        backgroundColor: 'white',
    },
    block_half: {
        width: (windowWidth - 50) / 2,
        height: (windowWidth - 30) / 2,
        marginVertical: 10,
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
        marginVertical:10,
        marginHorizontal:scale(15),
        width:windowWidth-30,
        height:windowWidth-30,
        borderRadius: 9,
    },
    image_intro: {
        width:windowWidth-30,
        height:windowWidth-30,
        borderRadius: 9,
    },
    image_event: {
        width: (windowWidth - 50) / 3 * 2,
        height: (windowWidth - 30) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
    },
    image_season: {
        width: (windowWidth - 50) / 3,
        height: (windowWidth - 30) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
    },
    image_half: {
        width: (windowWidth - 50) / 2,
        height: (windowWidth - 30) / 2,
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
});

const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
HomeContent.navigationOptions = ({navigation}) => {
    const showNotification = navigation.getParam('showNotification');
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
                <NotificationTabBarIcon notificationID={'left_menu'}  top={0} right={0} size={10} showNumber={false} />
            </TouchableScale>,
        headerRight:
            showNotification?
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
                        marginRight: 20,
                    }}
                />
            </TouchableScale>
                :null
    })
}

export default connect(mapStateToProps)(withDeeplinkClickHandler(HomeContent));