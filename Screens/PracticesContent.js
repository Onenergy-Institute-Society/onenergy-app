import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    StyleSheet,
    View,
    SafeAreaView, Text, TouchableOpacity, ScrollView, ImageBackground
} from "react-native";
import {NavigationActions} from "react-navigation";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import TouchableScale from "../Components/TouchableScale";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {Modalize} from 'react-native-modalize';
import {scale} from "../Utils/scale";
import EventList from "../Components/EventList";
import LoginScreen from "@src/containers/Custom/LoginScreen";
import analytics from '@react-native-firebase/analytics';
import AuthWrapper from "@src/components/AuthWrapper";
import {
    SvgIconCross,
    SvgIconMenu,
    SvgIconMilestone,
    SvgIconProgress,
    SvgIconQuest,
    SvgIconBack
} from "../Utils/svg";
import {setupIfNecessary} from "../Components/SetupService";

const PracticesContent = props => {

    try {
        const {navigation, screenProps} = props;
        const {colors, global} = screenProps;
        const user = useSelector((state) => state.user.userObject);
        const [helpModal, setHelpModal] = useState({title: '', id: 0});
        const optionData = useSelector((state) => state.settings.settings.onenergy_option);
        const onFocusHandler = () => {
            try {
                navigation.closeDrawer();
           } catch (e) {

           }
       }
        analytics().logScreenView({
            screen_class: 'PracticeScreen',
            screen_name: 'Practice Screen',
       });
        useEffect(() => {
            setupIfNecessary().then();
            props.navigation.setParams({
                title: optionData.titles.find(el => el.id === 'practices_title').title,
           });
            if (user) {
                navigation.addListener('willFocus', onFocusHandler)
                return () => {
                    navigation.removeListener('willFocus', onFocusHandler)
               }
           }
       }, [])
        const personalPracticePressed = () => {
            if (user) {
                navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticePersonal",
                   })
                )
           } else {
                setHelpModal(optionData.helps.find(el => el.name === 'all_login_required_popup_guest'));
                this.popupLoginDialog.open();
           }
       }

        const groupPracticePressed = () => {
            if (user) {
                navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticeGroup",
                   })
                )
           } else {
                setHelpModal(optionData.helps.find(el => el.name === 'all_login_required_popup_guest'));
                this.popupLoginDialog.open();
           }
       }

        const customPracticePressed = () => {
            if (user) {
                if (user.membership.length > 0) {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "PracticeMember",
                       })
                    )
               } else {
                    setHelpModal(optionData.helps.find(el => el.name === 'practice_customize_popup_nonmember'));
                    this.popupPracticeDialog.open();
               }
           } else {
                setHelpModal(optionData.helps.find(el => el.name === 'all_login_required_popup_guest'));
                this.popupLoginDialog.open();
           }
       }

        return (
            <SafeAreaView style={global.container}>
                <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                    {(optionData.goals && optionData.goals.length) ?
                        <View>
                            <EventList location={'practice'} {...props}/>
                        </View>
                        : null
                   }
                    <TouchableScale
                        onPress={personalPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            resizeMode={"cover"}
                            imageStyle={{borderRadius: 9}}
                            source={require('../assets/images/guided_practice.jpg')}
                        >
                            <Text style={styles.practiceType}>Guided{"\n"}Practice</Text>

                            <AuthWrapper actionOnGuestLogin={'hide'}>
                                <NotificationTabBarIcon notificationID={'guide_personal'} top={10} right={10}
                                                        size={scale(25)} fontSize={12} showNumber={true}/>
                            </AuthWrapper>

                        </ImageBackground>
                    </TouchableScale>

                    <TouchableScale
                        onPress={groupPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            resizeMode={"cover"}
                            imageStyle={{borderRadius: 9}}
                            source={require('../assets/images/group_practice.jpg')}
                        >
                            <Text style={styles.practiceType}>Group{"\n"}Practice</Text>
                        </ImageBackground>
                    </TouchableScale>

                    <TouchableScale
                        onPress={customPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            resizeMode={"cover"}
                            imageStyle={{borderRadius: 9}}
                            source={require('../assets/images/customize_practice.jpg')}
                        >
                            <Text style={styles.practiceType}>Customize{"\n"}Practice</Text>
                        </ImageBackground>
                    </TouchableScale>
                </ScrollView>
                <Modalize
                    ref={(popupPracticeDialog) => {
                        this.popupPracticeDialog = popupPracticeDialog;
                   }}
                    modalHeight={windowHeight * 4 / 5}
                    handlePosition="outside"
                    childrenStyle={{backgroundColor: colors.bodyBg}}
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
                            <Text style={{fontSize: scale(24), color: colors.headerColor, fontFamily: "MontserratAlternates-SemiBold", fontWeight: "bold"}}>{helpModal.title}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.popupPracticeDialog.close();
                               }}
                            >
                                <SvgIconCross/>
                            </TouchableOpacity>
                        </View>
                   }
                >
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <BlockScreen pageId={helpModal.id}
                                     contentInsetTop={0}
                                     contentOffsetY={0}
                                     hideTitle={true}
                                     hideNavigationHeader={true}
                                     {...props}/>
                    </View>
                </Modalize>
                <Modalize
                    ref={(popupLoginDialog) => {
                        this.popupLoginDialog = popupLoginDialog;
                   }}
                    modalHeight={windowHeight * 5 / 6}
                    handlePosition="outside"
                    handlePosition="inside"
                    childrenStyle={{backgroundColor: colors.bodyBg}}
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
                            <Text style={{fontSize: scale(24), color: colors.headerColor, fontFamily: "MontserratAlternates-SemiBold", fontWeight: "bold"}}>{helpModal.title}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.popupLoginDialog.close();
                               }}
                            >
                                <SvgIconCross/>
                            </TouchableOpacity>
                        </View>
                   }
                >
                    <LoginScreen {...props} hideForgotPassword={true}/>
                </Modalize>
            </SafeAreaView>
        );
   } catch (err) {
        console.log(`${err}`);
   }

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
   },
    card: {
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))*16/45,
        borderRadius: 9,
        marginTop: scale(25),
        marginHorizontal: scale(15),
        alignItems: 'flex-start',
        justifyContent: 'center',
   },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
   },
    eventRow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
   },
    practiceType: {
        marginLeft: (windowWidth-scale(30))*2/7,
        color: '#8c79ea',
        fontFamily:"MontserratAlternates-SemiBold",
        fontWeight:"bold",
        fontSize: scale(28)
   }
});
PracticesContent.navigationOptions = ({navigation, screenProps}) => {
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
                    <NotificationTabBarIcon notificationID={'left_menu'} top={-5} right={-5} size={scale(10)}
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
                <View style={{justifyContent: "flex-end", flexDirection: "row", marginRight: 15}}>
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
};
export default PracticesContent;
