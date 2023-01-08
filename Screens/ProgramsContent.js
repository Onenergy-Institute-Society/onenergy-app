import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView, TouchableWithoutFeedback, FlatList, ActivityIndicator, Platform
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
import PracticeTipsRow from "../Components/PracticeTipsRow";

const ProgramsContent = props => {
    const { navigation, screenProps } = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
/*    const coursesCache = useSelector((state) => state.coursesCache.byId);*/
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
        if(user) {
            navigation.addListener('willFocus', onFocusHandler)
            return () => {
                navigation.removeListener('willFocus', onFocusHandler)
            }
        }
    },[]);

    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                <View style={{marginVertical: scale(5)}}>
                    <EventList location={'program'} {...props} />
                </View>
                {
                    user ?
                        <PracticeTipsRow {...props} />
                        : null
                }
                <View style={styles.heading_title}>
                    <Text style={global.widgetTitle}>Preparatory Courses</Text>
                </View>
                <CoursesScreen {...props} showSearch={false} hideFilters={true} screenTitle="My Courses"
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
        flex:1,
        justifyContent: "space-between",
        marginBottom: scale(25),
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
                    </TouchableScale>
                </View>
            </AuthWrapper>
    }
}
export default withNavigation(ProgramsContent);
