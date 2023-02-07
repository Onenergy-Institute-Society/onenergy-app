import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from "react-native";
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import {withNavigation} from "react-navigation";
import CoursesScreen from "@src/containers/Custom/CoursesScreen";
import TouchableScale from "../Components/TouchableScale";
import {ms, mvs, s, windowWidth} from '../Utils/Scale';
import EventList from "../Components/EventList";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import AuthWrapper from "@src/components/AuthWrapper";
import moment from 'moment';
import PracticeTipsRow from "../Components/PracticeTipsRow";
import {SvgIconBack, SvgIconMenu, SvgIconMilestone, SvgIconProgress, SvgIconQuest} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

const ProgramsContent = props => {
    const {navigation, screenProps} = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
    const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer : null);
    const dispatch = useDispatch();
    const {global} = screenProps;

    const onFocusHandler = async () => {
        try {
            navigation.closeDrawer();
            if(user){
                if (progressReducer.latestUpdate && checkTodayDate()) {
                    dispatch({
                        type: 'ONENERGY_DAILY_UPDATE',
                    });
                }
                await updateStatus();
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        Analytics.segmentClient.screen('Programs').then();
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'programs_title').title,
        });
        if (user) {
            navigation.addListener('willFocus', onFocusHandler)
            return () => {
                navigation.removeListener('willFocus', onFocusHandler)
            }
        }
    }, []);
    const updateStatus = async () => {
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
    const checkTodayDate = () => {
        const today = new moment().format('YYYY-MM-DD');
        if (progressReducer.latestUpdate !== 0)
            return today !== new moment.unix(progressReducer.latestUpdate).format('YYYY-MM-DD');
    }
    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                <EventList location={'program'} {...props} extraStyle={{marginTop:mvs(20)}}/>
                {
                    user ?
                        <PracticeTipsRow {...props}/>
                        : null
                }
                <View style={styles.heading_title}>
                    <Text style={global.widgetTitle}>{optionData.titles.find(el => el.id === 'programs_title_preparatory_courses').title}</Text>
                </View>
                <CoursesScreen {...props} showSearch={false} hideFilters={true} screenTitle=""
                               hideNavigationHeader={true} hideTitle={true} headerHeight={0}/>
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
        flex: 1,
        justifyContent: "space-between",
        marginBottom: mvs(20),
    },
    eventRow: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading_title: {
        flexDirection: 'row',
        left: s(15),
        right: 0,
        width: windowWidth - s(30),
        justifyContent: "space-between",
        marginTop: mvs(15),
    },
    heading: {
        fontSize: s(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
    block_half: {
        width: (windowWidth - s(50)) / 2,
        height: (windowWidth - s(30)) / 2,
        backgroundColor: 'white',
        borderRadius: s(9),
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    block_half_left: {
        width: (windowWidth - s(50)) / 2,
        height: (windowWidth - s(30)) / 2,
        marginRight: 20,
        marginVertical: s(15),
        backgroundColor: 'white',
        borderRadius: s(9),
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    row_intro: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_intro: {
        marginTop: mvs(15),
        marginHorizontal: s(15),
        width: windowWidth - s(30),
        height: windowWidth - s(30),
        borderRadius: s(9),
    },
    image_intro: {
        width: windowWidth - s(30),
        height: windowWidth - s(30),
        borderRadius: s(9),
    },
    image_half: {
        width: (windowWidth - s(50)) / 2,
        height: (windowWidth - s(30)) / 2,
        flex: 1,
        borderRadius: s(9),
        overflow: 'hidden',
        resizeMode: "cover",
    },
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
        borderRadius: s(9),
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
        borderRadius: s(9),
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
        borderRadius: s(9),
        width: '100%',
        height: s(150),
        marginTop: mvs(15),
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
ProgramsContent.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    let headerLeft;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if (navRoutes.length >= 2) {
        headerLeft =
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <SvgIconBack color={colors.headerIconColor}/>
            </TouchableOpacity>
    } else {
        headerLeft =
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
            </TouchableScale>
    }
    return {
        title: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft: headerLeft,
        headerRight:
            <AuthWrapper actionOnGuestLogin={'hide'}>
                <View style={{flexDirection: "row", justifyContent: "flex-end", marginRight: 15}}>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("QuestsScreen")
                        }}
                    >
                        <SvgIconQuest style={{marginRight: s(5)}} color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'quest'} top={-5} right={5} size={10}
                                                showNumber={false}/>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("MilestonesScreen")
                        }}
                    >
                        <SvgIconMilestone style={{marginRight: s(5)}} color={colors.headerIconColor}/>
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
export default connect(mapStateToProps)(withNavigation(ProgramsContent));
