import * as React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback, SafeAreaView, StyleSheet
} from 'react-native';
import {useSelector} from "react-redux";
import FastImage from 'react-native-fast-image';
import {scale} from "../Utils/scale";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import AuthWrapper from "@src/components/AuthWrapper";
import {
    SvgIconLogin,
    SvgIconMilestone,
    SvgIconProgress,
    SvgIconQuest, SvgIconQuestion,
    SvgIconRightArrow, SvgIconSetting,
    SvgIconSignup, SvgIconSupport, SvgIconVoucher
} from "../Utils/svg";

const CustomDrawerContentComponent = (props) => {
    const {navigation, screenProps} = props;
    const {colors, global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.bodyFrontBg}}>
            <ImageBackground
                source={require('../assets/images/1-1024x683.jpg')}
                style={{height: scale(140), justifyContent: "center", alignItems: "center"}}>
                {user ?
                    <>
                        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProfileScreen")}
                                >
                                    <FastImage
                                        source={{uri: user && user.avatar_urls['full'] ? user.avatar_urls['full'] : user.avatar_urls['96']}} style={{
                                            height: scale(80),
                                            width: scale(80),
                                            borderRadius: 100,
                                            margin: scale(10)
                                       }}
                                  />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingTop: 20,}}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: scale(18),
                                        textAlign: "right",
                                        marginBottom: 10,
                                        textShadowColor: 'grey',
                                        textShadowRadius: 1,
                                        textShadowOffset: {
                                            width: -1,
                                            height: 1
                                       }
                                   }}>
                                    {user.name}
                                </Text>
                                {progressReducer && progressReducer.points && Object.keys(progressReducer.points).length ? Object.entries(progressReducer.points).map(([key, value]) => (
                                    <View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            alignItems: "center"
                                       }}>
                                            <FastImage
                                                source={require('../assets/images/icon-ray.png')} style={{width: 16, height: 16}}/>
                                            <Text style={{
                                                    color: '#fff',
                                                    textAlign: "left",
                                                    marginLeft: 5,
                                                    textShadowColor: 'grey',
                                                    textShadowRadius: 1,
                                                    textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                   }
                                               }}>
                                                {value} {optionData.points.find(pt => pt.pointName === key).pointTitle}
                                            </Text>
                                        </View>
                                    </View>
                                )) : null}
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    alignItems: "center"
                                }}>
                                    <FastImage source={{uri: optionData.ranks[parseInt(user.rank)].rankImage}}
                                               style={{width: 24, height: 24, alignSelf: "center"}}/>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: scale(14),
                                        marginLeft: 5,
                                        textShadowColor: 'grey',
                                        textShadowRadius: 1,
                                        textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }
                                    }}>
                                        {optionData.ranks[parseInt(user.rank)].rankName}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {user.membership.length > 0 ?
                            <Text style={{color: "#fff"}}>{user.membership[0].plan.name}</Text>
                            : null}
                    </>
                    : null}
            </ImageBackground>
            <View style={{flex: 1, justifyContent: "space-between"}}>
                {(optionData && Object.keys(optionData).length > 0) ? (
                    <View style={{backgroundColor: colors.bodyBg, margin: 10, paddingLeft: 10, borderRadius: 9}}>
                        {!user ?
                            <>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("MySignupScreen");
                               }}>
                                    <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <SvgIconSignup color={colors.secondaryButtonColor}/>
                                            <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.findIndex(el => el.id === 'left_menu_signup') >= 0 ? optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_signup')].title : 'Create an Account'}
                                            </Text>
                                        </View>
                                        <SvgIconRightArrow color={colors.descLightTextColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("MyLoginScreen");
                               }}>
                                    <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <SvgIconLogin color={colors.secondaryButtonColor}/>
                                            <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.findIndex(el => el.id === 'left_menu_login') >= 0 ? optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_login')].title : 'Login My Account'}
                                            </Text>
                                        </View>
                                        <SvgIconRightArrow color={colors.descLightTextColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </>
                            :
                            <>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('StatsScreen');
                               }}>
                                    <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <SvgIconProgress color={colors.secondaryButtonColor}/>
                                            <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_progress').title}
                                            </Text>
                                        </View>
                                        <SvgIconRightArrow color={colors.descLightTextColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('QuestsScreen');
                               }}>
                                    <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <SvgIconQuest color={colors.secondaryButtonColor}/>
                                            <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_quests').title}
                                            </Text>
                                        </View>
                                        <AuthWrapper actionOnGuestLogin={'hide'}>
                                            <NotificationTabBarIcon notificationID={'quest'} top={5} right={5}
                                                                    size={scale(10)} showNumber={false}/>
                                        </AuthWrapper>
                                        <SvgIconRightArrow color={colors.descLightTextColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("MilestonesScreen");
                               }}>
                                    <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <SvgIconMilestone color={colors.secondaryButtonColor}/>
                                            <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_achievements').title}
                                            </Text>
                                        </View>
                                        <AuthWrapper actionOnGuestLogin={'hide'}>
                                            <NotificationTabBarIcon notificationID={'milestone'} top={5} right={5}
                                                                    size={scale(10)} showNumber={false}/>
                                        </AuthWrapper>
                                        <SvgIconRightArrow color={colors.descLightTextColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("VouchersScreen");
                               }}>
                                    <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <SvgIconVoucher color={colors.secondaryButtonColor}/>
                                            <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_vouchers').title}
                                            </Text>
                                        </View>
                                        <AuthWrapper actionOnGuestLogin={'hide'}>
                                            <NotificationTabBarIcon notificationID={'voucher'} top={5} right={5}
                                                                    size={scale(10)} showNumber={false}/>
                                        </AuthWrapper>
                                        <SvgIconRightArrow color={colors.descLightTextColor}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </>
                       }
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("ForumsScreen");
                       }}>
                            <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <SvgIconQuestion color={colors.secondaryButtonColor}/>
                                    <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        {optionData.titles.find(el => el.id === 'left_menu_faq').title}
                                    </Text>
                                </View>
                                <SvgIconRightArrow color={colors.descLightTextColor}/>
                            </View>
                        </TouchableWithoutFeedback>
                        {user?
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("FeedbackScreen");
                       }}>
                            <View style={[styles.menuItem, {borderBottomWidth: 1, borderBottomColor: colors.borderColor}]}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <SvgIconSupport color={colors.secondaryButtonColor}/>
                                    <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        {optionData.titles.find(el => el.id === 'left_menu_feedback').title}
                                    </Text>
                                </View>
                                <SvgIconRightArrow color={colors.descLightTextColor}/>
                            </View>
                        </TouchableWithoutFeedback>
                            :null}
                        <TouchableWithoutFeedback onPress={() =>
                            navigation.navigate("SettingsScreen")}>
                            <View style={[styles.menuItem, {borderBottomRightRadius: 9}]}>
                                <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                                    <SvgIconSetting color={colors.secondaryButtonColor}/>
                                    <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        {optionData.titles.find(el => el.id === 'left_menu_settings').title}
                                    </Text>
                                </View>
                                <SvgIconRightArrow color={colors.descLightTextColor}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() =>
                            navigation.navigate("InitData")}>
                            <View style={[styles.menuItem, {borderBottomRightRadius: 9}]}>
                                <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                                    <SvgIconSetting color={colors.secondaryButtonColor}/>
                                    <Text style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        Init
                                    </Text>
                                </View>
                                <SvgIconRightArrow color={colors.descLightTextColor}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    menuItem : {
        paddingHorizontal: 5,
        paddingVertical: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
   }
});
export default CustomDrawerContentComponent;