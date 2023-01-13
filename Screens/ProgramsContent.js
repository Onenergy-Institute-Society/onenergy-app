import React, {useEffect} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from "react-native";
import {useSelector} from "react-redux";
import {windowWidth} from "../Utils/Dimensions";
import {withNavigation} from "react-navigation";
import CoursesScreen from "@src/containers/Custom/CoursesScreen";
import TouchableScale from "../Components/TouchableScale";
import {scale} from '../Utils/scale';
import EventList from "../Components/EventList";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import analytics from '@react-native-firebase/analytics';
import AuthWrapper from "@src/components/AuthWrapper";
import PracticeTipsRow from "../Components/PracticeTipsRow";
import {SvgIconBack, SvgIconMenu, SvgIconMilestone, SvgIconProgress, SvgIconQuest} from "../Utils/svg";

const ProgramsContent = props => {
    const {navigation, screenProps} = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const {global} = screenProps;

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
                    <EventList location={'program'} {...props}/>
                </View>
                {
                    user ?
                        <PracticeTipsRow {...props}/>
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
        marginTop: scale(15),
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
ProgramsContent.navigationOptions = ({navigation, screenProps}) => {
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
                <SvgIconBack color = {colors.headerIconColor}/>
            </TouchableOpacity>
   }else{
        headerLeft=
            <TouchableScale
                onPress={() => {navigation.openDrawer()
               }}
            >
                <SvgIconMenu color={colors.headerIconColor}/>
                <AuthWrapper actionOnGuestLogin={'hide'}>
                    <NotificationTabBarIcon notificationID={'left_menu'}  top={-5} right={-5} size={scale(10)} showNumber={false}/>
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
                        <SvgIconQuest color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'quest'} top={-5} right={5} size={scale(10)} showNumber={false}/>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("MilestonesScreen")
                       }}
                    >
                        <SvgIconMilestone color={colors.headerIconColor}/>
                        <NotificationTabBarIcon notificationID={'milestone'} top={-5} right={5} size={scale(10)} showNumber={false}/>
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
export default withNavigation(ProgramsContent);
