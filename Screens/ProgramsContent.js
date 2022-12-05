import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView, TouchableWithoutFeedback, FlatList, ActivityIndicator
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import {NavigationActions, withNavigation} from "react-navigation";
import CoursesScreen from "@src/containers/Custom/CoursesScreen";
import TouchableScale from "../Components/TouchableScale";
import { scale } from '../Utils/scale';
import EventList from "../Components/EventList";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import analytics from '@react-native-firebase/analytics';
import AuthWrapper from "@src/components/AuthWrapper";
import Svg, {Circle, Path} from "react-native-svg";
import ImageCache from "../Components/ImageCache";
import CourseIcons from "../Components/CourseIcons";
import moment from 'moment';

const ProgramsContent = props => {
    const { navigation, screenProps } = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const coursesCache = useSelector((state) => state.coursesCache.byId);
    const { global, colors } = screenProps;
    const dispatch = useDispatch();

    const onFocusHandler=() =>{
        try
        {
            navigation.closeDrawer();

        }catch (e) {

        }
    }
    analytics().logScreenView({
        screen_class: 'ProgramsScreen',
        screen_name: 'Program Screen',
    });
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'programs_title').title,
        });
        if(progressReducer.loadCourses){
            dispatch({
                type: 'ONENERGY_COURSE_UPDATE',
            });
        }
        if(user) {
            navigation.addListener('willFocus', onFocusHandler)
            return () => {
                navigation.removeListener('willFocus', onFocusHandler)
            }
        }
    },[]);
    const renderCourse = ({item}) => {
        let viewModel = item;
        let featuredUrl = viewModel.featured_media.large;
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
        } else if (viewModel.has_course_access) {
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
        return (
            <View style={styles.containerStyle} key={'course-' + viewModel.id}>
                <TouchableWithoutFeedback
                    key={viewModel.id + 'img'}
                    onPress={() => {viewModel.price.expired && viewModel.has_course_access ? alert('Course is expired') :
                        navigation.dispatch(
                            NavigationActions.navigate({
                                routeName: "CourseScreen",
                                params: {
                                    courseId: parseInt(viewModel.id),
                                }
                            })
                        )
                    }}
                >
                    <View style={[styles.card, styles.boxShadow, {backgroundColor: "#C5B3E9"}]}>
                        <View style={[styles.statusBar, styles.boxShadow, {backgroundColor: statusBarColor}]}><Text
                            style={styles.statusText}>{statusText}</Text></View>
                        {viewModel.progression === 100 ?
                            <View style={{position: "absolute", top: 10, right: 5}}>
                                <Svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 32 32"
                                >
                                    <Path
                                        d="M23 13H9a1 1 0 0 0-1 1v16a1 1 0 0 0 1.39.92L16 28.09l6.61 2.83A1 1 0 0 0 23 31a1 1 0 0 0 .55-.17A1 1 0 0 0 24 30V14a1 1 0 0 0-1-1Z"
                                        fill="#0083fd"/>
                                    <Path d="M23 13H9a1 1 0 0 0-1 1v8.23a12.94 12.94 0 0 0 16 0V14a1 1 0 0 0-1-1Z"
                                          fill="#0072fc"/>
                                    <Circle cx="16" cy="12" r="11" fill="#ffcb5b"/>
                                    <Path d="M6 13a11 11 0 0 1 18.25-8.25 11 11 0 1 0-15.5 15.5A10.92 10.92 0 0 1 6 13Z"
                                          fill="#f7b737"/>
                                    <Path
                                        d="M22.38 10.38a1.9 1.9 0 0 0-1.83-1.33l-2.06.06-.66-2a1.92 1.92 0 0 0-3.66 0l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49L12 13.7l-.65 2a1.89 1.89 0 0 0 .69 2.15 1.93 1.93 0 0 0 2.27 0L16 16.63l1.72 1.25a1.92 1.92 0 0 0 3-2.15L20 13.79l1.72-1.25a1.91 1.91 0 0 0 .66-2.16Z"
                                        fill="#fff5f5"/>
                                    <Path
                                        d="m19.49 10.11 2.06-.06a1.87 1.87 0 0 1 .75.17 1.88 1.88 0 0 0-1.75-1.17h-1.39ZM10.62 11.38a1.9 1.9 0 0 1 1.83-1.33h2.13l.59-2a1.88 1.88 0 0 1 2.58-1.16 1.91 1.91 0 0 0-3.58.16l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49l.42.29a1.91 1.91 0 0 1-.12-1.45ZM12.36 16.73l.65-2-1.08-.73-.57 1.77a1.89 1.89 0 0 0 .69 2.15 2.69 2.69 0 0 0 .38.19 1.87 1.87 0 0 1-.07-1.38Z"
                                        fill="#efe2dd"/>
                                </Svg>
                            </View>
                            :null
                        }
                        <ImageCache style={styles.image} source={{uri: featuredUrl ? featuredUrl : ''}}/>
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
                            {viewModel.price.icon?
                                <CourseIcons icon={viewModel.price.icon} />
                                :null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <SafeAreaView style={[global.container, {flex:1}]}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                <View style={{marginVertical: scale(5)}}>
                    <EventList location={'program'} {...props} />
                </View>
                <View style={styles.heading_title}>
                    <Text style={global.widgetTitle}>Preparatory Courses</Text>
                </View>
                {!progressReducer.loadCourses||coursesCache&&coursesCache.valueSeq()&&coursesCache.valueSeq().toJS().length?
                    <>
                    <Text>Test</Text>
                    <FlatList
                        contentContainerStyle={{paddingBottom: scale(60)}}
                        data={coursesCache.valueSeq().toJS()}
                        renderItem={renderCourse}
                        keyExtractor={item => item.id}
                    />
                    </>
                    :
                    <>
                        <ActivityIndicator style={styles.loading} size="large"/>
                        <CoursesScreen style={{width:0, height:0}} {...props} showSearch={false} hideFilters={true} screenTitle="My Courses"
                                       hideNavigationHeader={true} hideTitle={true} headerHeight={0}/>
                    </>
                }
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
        flex:1,
        justifyContent: "space-between",
    },
    eventRow: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading_title: {
        flexDirection: 'row',
        left: scale(15),
        right: 0,
        width: windowWidth - scale(30),
        justifyContent: "space-between",
    },
    heading: {
        fontSize: scale(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
    block_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    block_half_left: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        marginRight: 20,
        marginVertical:scale(15),
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    row_intro: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_intro: {
        marginTop:scale(15),
        marginHorizontal:scale(15),
        width:windowWidth-scale(30),
        height:windowWidth-scale(30),
        borderRadius: 9,
    },
    image_intro: {
        width:windowWidth-scale(30),
        height:windowWidth-scale(30),
        borderRadius: 9,
    },
    image_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
        resizeMode: "cover",
    },
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
        top: scale(20),
        right:scale(20),
        flexDirection: "row",
        width: (windowWidth -scale(30))/2,
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 0,
        borderRadius: 5,
    },
    image: {
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 9 * 4,
        borderRadius: 9,
        marginLeft: (windowWidth -scale(30))/9,
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
        width:( windowWidth - scale(30))/2,
        height: (windowWidth - scale(30))/2,
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
        marginTop: scale(15),
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
ProgramsContent.navigationOptions = ({ navigation, screenProps }) => {
    const {colors, global} = screenProps;
    let headerLeft;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if(navRoutes.length >= 2){
        headerLeft =
            <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
            >
                <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{marginLeft:scale(10)}}
                >
                    <Path d="m15 18-6-6 6-6"
                          fill="none"
                          stroke={screenProps.colors.headerIconColor}
                          strokeWidth="2"
                    />
                </Svg>
            </TouchableOpacity>
    }else{
        headerLeft=
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
                    <NotificationTabBarIcon notificationID={'left_menu'}  top={-5} right={-5} size={scale(10)} showNumber={false} />
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
                <View style={{flexDirection: "row", justifyContent:"flex-end", marginRight:15}}>
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
                            <Path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1Zm0 28a13 13 0 1 1 13-13 13 13 0 0 1-13 13Z" fill={colors.primaryButtonBg} />
                            <Path d="M16 5a11 11 0 1 0 11 11A11 11 0 0 0 16 5Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" fill={colors.primaryButtonBg} />
                            <Path d="M22.9 14.26a2 2 0 0 0-1.9-1.39h-2.36l-.72-2.22a2 2 0 0 0-3.84 0l-.73 2.23H11a2 2 0 0 0-1.19 3.64l1.89 1.38-.7 2.21a2 2 0 0 0 .73 2.25 2 2 0 0 0 1.19.39 2 2 0 0 0 1.18-.39L16 21l1.89 1.37A2 2 0 0 0 21 20.11l-.72-2.23 1.89-1.37a2 2 0 0 0 .73-2.25Zm-3.79 2a2 2 0 0 0-.74 2.25l.7 2.23-1.89-1.37a2 2 0 0 0-2.36 0l-1.91 1.36.72-2.22a2 2 0 0 0-.74-2.25L11 14.87h2.33a2 2 0 0 0 1.92-1.39l.75-2.24.72 2.22a2 2 0 0 0 1.92 1.39h2.34Z" fill={colors.primaryButtonBg} />
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
                            style={{marginRight:scale(5)}}
                        >
                            <Path d="m30.77 24.21-3.36-4a13 13 0 1 0-22.82 0l-3.36 4a1 1 0 0 0-.18 1 1 1 0 0 0 .72.66l3.86.92 1.58 3.61A1 1 0 0 0 8 31h.15a1 1 0 0 0 .76-.36l3.5-4.16a12.79 12.79 0 0 0 7.22 0l3.5 4.16a1 1 0 0 0 .76.36H24a1 1 0 0 0 .77-.59l1.58-3.65 3.86-.92a1 1 0 0 0 .72-.66 1 1 0 0 0-.16-.97ZM8.4 28.12 7.27 25.5a1 1 0 0 0-.69-.58l-2.77-.66L5.74 22a13.07 13.07 0 0 0 4.67 3.77ZM5 14a11 11 0 1 1 11 11A11 11 0 0 1 5 14Zm20.42 10.92a1 1 0 0 0-.69.58l-1.13 2.62-2-2.4A13.07 13.07 0 0 0 26.26 22l1.93 2.31Z" fill={colors.primaryButtonBg} />
                            <Path d="M23.89 12a2.15 2.15 0 0 0-2.07-1.51h-2.73a.17.17 0 0 1-.17-.12l-.84-2.57a2.19 2.19 0 0 0-4.16 0l-.84 2.59a.17.17 0 0 1-.17.12h-2.73a2.19 2.19 0 0 0-1.28 4l2.2 1.6a.16.16 0 0 1 .07.2l-.84 2.59a2.15 2.15 0 0 0 .79 2.44 2.18 2.18 0 0 0 2.57 0l2.2-1.6a.18.18 0 0 1 .22 0l2.2 1.6a2.18 2.18 0 0 0 2.57 0 2.15 2.15 0 0 0 .79-2.44l-.84-2.59a.17.17 0 0 1 .06-.2l2.21-1.6a2.14 2.14 0 0 0 .79-2.51Zm-2 .82-2.2 1.6a2.16 2.16 0 0 0-.79 2.44l.84 2.59a.16.16 0 0 1-.07.2.16.16 0 0 1-.21 0l-2.21-1.6a2.16 2.16 0 0 0-2.56 0l-2.21 1.6a.16.16 0 0 1-.21 0 .16.16 0 0 1-.07-.2l.84-2.59a2.16 2.16 0 0 0-.79-2.44l-2.2-1.6a.16.16 0 0 1-.07-.2.16.16 0 0 1 .17-.13h2.73A2.16 2.16 0 0 0 15 11l.85-2.59a.18.18 0 0 1 .34 0L17 11a2.16 2.16 0 0 0 2.07 1.5h2.73a.16.16 0 0 1 .17.13.16.16 0 0 1-.05.21Z" fill={colors.primaryButtonBg} />
                        </Svg>
                        <NotificationTabBarIcon notificationID={'milestone'} top={-5} right={5} size={scale(10)} showNumber={false} />
                    </TouchableScale>
                </View>
            </AuthWrapper>
    }
}
export default withNavigation(ProgramsContent);
