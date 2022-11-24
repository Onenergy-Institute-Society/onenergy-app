import * as React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import {useSelector} from "react-redux";
import FastImage from 'react-native-fast-image';
import IconButton from "@src/components/IconButton";
import {scale} from "../Utils/scale";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import AuthWrapper from "@src/components/AuthWrapper";
import Svg, {Path, Circle, Rect} from "react-native-svg";

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
                                        source={{uri: user && user.avatar_urls['full'] ? user.avatar_urls['full'] : user.avatar_urls['96']}}
                                        style={{
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
                                {user.rank ? (
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
                                    }}>
                                        <FastImage source={{uri: optionData.ranks[parseInt(user.rank)].rankImage}}
                                                   style={{width: 24, height: 24, alignSelf: "center"}}/>
                                        <Text
                                            style={{
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
                                ) : null}
                                {progressReducer && progressReducer.points && progressReducer.points.length ? Object.entries(progressReducer.points).map(([key, value]) => (
                                    <View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            alignItems: "center"
                                        }}>
                                            <FastImage
                                                source={require('../assets/images/icon-ray.png')}
                                                style={{width: 16, height: 16}}/>
                                            <Text
                                                style={{
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
                                    <View style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColor,
                                        borderBottomRightRadius: 9,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                                      fill="none"
                                                      stroke={colors.secondaryButtonColor}
                                                      strokeWidth="2"
                                                />
                                                <Circle cx="12" cy="7" r="4"
                                                        fill="none"
                                                        stroke={colors.secondaryButtonColor}
                                                        strokeWidth="2"
                                                />
                                            </Svg>
                                            <Text
                                                style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.findIndex(el => el.id === 'left_menu_signup') ? optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_signup')].title : 'Create an Account'}
                                            </Text>
                                        </View>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("MyLoginScreen");
                                }}>
                                    <View style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColor,
                                        borderBottomRightRadius: 9,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <Rect width="18"
                                                      height="11"
                                                      x="3" y="11"
                                                      rx="2"
                                                      ry="2"
                                                      fill="none"
                                                      stroke={colors.secondaryButtonColor}
                                                      strokeWidth="2"
                                                />
                                                <Path
                                                    d="M7 11V7a5 5 0 0 1 9.9-1"
                                                    fill="none"
                                                    stroke={colors.secondaryButtonColor}
                                                    strokeWidth="2"
                                                />
                                            </Svg>
                                            <Text
                                                style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.findIndex(el => el.id === 'left_menu_login') ? optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_login')].title : 'Login My Account'}
                                            </Text>
                                        </View>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </>
                            :
                            <>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('StatsScreen');
                                }}>
                                    <View style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColor,
                                        borderTopRightRadius: 9,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <Path
                                                    d="M12 20V10M18 20V4M6 20v-4"
                                                    fill="none"
                                                    stroke={colors.secondaryButtonColor}
                                                    strokeWidth="2"
                                                />
                                            </Svg>
                                            <Text
                                                style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_progress').title}
                                            </Text>
                                        </View>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('QuestsScreen');
                                }}>
                                    <View style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColor,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 32 32"
                                            >
                                                <Path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1Zm0 28a13 13 0 1 1 13-13 13 13 0 0 1-13 13Z" fill={colors.secondaryButtonColor} />
                                                <Path d="M16 5a11 11 0 1 0 11 11A11 11 0 0 0 16 5Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" fill={colors.secondaryButtonColor} />
                                                <Path d="M22.9 14.26a2 2 0 0 0-1.9-1.39h-2.36l-.72-2.22a2 2 0 0 0-3.84 0l-.73 2.23H11a2 2 0 0 0-1.19 3.64l1.89 1.38-.7 2.21a2 2 0 0 0 .73 2.25 2 2 0 0 0 1.19.39 2 2 0 0 0 1.18-.39L16 21l1.89 1.37A2 2 0 0 0 21 20.11l-.72-2.23 1.89-1.37a2 2 0 0 0 .73-2.25Zm-3.79 2a2 2 0 0 0-.74 2.25l.7 2.23-1.89-1.37a2 2 0 0 0-2.36 0l-1.91 1.36.72-2.22a2 2 0 0 0-.74-2.25L11 14.87h2.33a2 2 0 0 0 1.92-1.39l.75-2.24.72 2.22a2 2 0 0 0 1.92 1.39h2.34Z" fill={colors.secondaryButtonColor} />
                                            </Svg>
                                            <Text
                                                style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_quests').title}
                                            </Text>
                                        </View>
                                        <AuthWrapper actionOnGuestLogin={'hide'}>
                                            <NotificationTabBarIcon notificationID={'quest'} top={5} right={5}
                                                                    size={scale(10)} showNumber={false}/>
                                        </AuthWrapper>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("MilestonesScreen");
                                }}>
                                    <View style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColor,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 32 32"
                                            >
                                                <Path d="m30.77 24.21-3.36-4a13 13 0 1 0-22.82 0l-3.36 4a1 1 0 0 0-.18 1 1 1 0 0 0 .72.66l3.86.92 1.58 3.61A1 1 0 0 0 8 31h.15a1 1 0 0 0 .76-.36l3.5-4.16a12.79 12.79 0 0 0 7.22 0l3.5 4.16a1 1 0 0 0 .76.36H24a1 1 0 0 0 .77-.59l1.58-3.65 3.86-.92a1 1 0 0 0 .72-.66 1 1 0 0 0-.16-.97ZM8.4 28.12 7.27 25.5a1 1 0 0 0-.69-.58l-2.77-.66L5.74 22a13.07 13.07 0 0 0 4.67 3.77ZM5 14a11 11 0 1 1 11 11A11 11 0 0 1 5 14Zm20.42 10.92a1 1 0 0 0-.69.58l-1.13 2.62-2-2.4A13.07 13.07 0 0 0 26.26 22l1.93 2.31Z" fill={colors.secondaryButtonColor} />
                                                <Path d="M23.89 12a2.15 2.15 0 0 0-2.07-1.51h-2.73a.17.17 0 0 1-.17-.12l-.84-2.57a2.19 2.19 0 0 0-4.16 0l-.84 2.59a.17.17 0 0 1-.17.12h-2.73a2.19 2.19 0 0 0-1.28 4l2.2 1.6a.16.16 0 0 1 .07.2l-.84 2.59a2.15 2.15 0 0 0 .79 2.44 2.18 2.18 0 0 0 2.57 0l2.2-1.6a.18.18 0 0 1 .22 0l2.2 1.6a2.18 2.18 0 0 0 2.57 0 2.15 2.15 0 0 0 .79-2.44l-.84-2.59a.17.17 0 0 1 .06-.2l2.21-1.6a2.14 2.14 0 0 0 .79-2.51Zm-2 .82-2.2 1.6a2.16 2.16 0 0 0-.79 2.44l.84 2.59a.16.16 0 0 1-.07.2.16.16 0 0 1-.21 0l-2.21-1.6a2.16 2.16 0 0 0-2.56 0l-2.21 1.6a.16.16 0 0 1-.21 0 .16.16 0 0 1-.07-.2l.84-2.59a2.16 2.16 0 0 0-.79-2.44l-2.2-1.6a.16.16 0 0 1-.07-.2.16.16 0 0 1 .17-.13h2.73A2.16 2.16 0 0 0 15 11l.85-2.59a.18.18 0 0 1 .34 0L17 11a2.16 2.16 0 0 0 2.07 1.5h2.73a.16.16 0 0 1 .17.13.16.16 0 0 1-.05.21Z" fill={colors.secondaryButtonColor} />
                                            </Svg>
                                            <Text
                                                style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_achievements').title}
                                            </Text>
                                        </View>
                                        <AuthWrapper actionOnGuestLogin={'hide'}>
                                            <NotificationTabBarIcon notificationID={'milestone'} top={5} right={5}
                                                                    size={scale(10)} showNumber={false}/>
                                        </AuthWrapper>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("VouchersScreen");
                                }}>
                                    <View style={{
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.borderColor,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <Path
                                                    d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                                                    fill="none"
                                                    stroke={colors.secondaryButtonColor}
                                                    strokeWidth="2"
                                                />
                                                <Circle
                                                    cx="7"
                                                    cy="7"
                                                    r="1"
                                                    fill={colors.secondaryButtonColor}
                                                />
                                            </Svg>
                                            <Text
                                                style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                                {optionData.titles.find(el => el.id === 'left_menu_vouchers').title}
                                            </Text>
                                        </View>
                                        <AuthWrapper actionOnGuestLogin={'hide'}>
                                            <NotificationTabBarIcon notificationID={'voucher'} top={5} right={5}
                                                                    size={scale(10)} showNumber={false}/>
                                        </AuthWrapper>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight: 10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </>
                        }
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("ForumsScreen");
                        }}>
                            <View style={{
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.borderColor,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <Circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            fill="none"
                                            stroke={colors.secondaryButtonColor}
                                            strokeWidth="2"
                                        />
                                        <Path
                                            d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
                                            fill="none"
                                            stroke={colors.secondaryButtonColor}
                                            strokeWidth="2"
                                        />
                                        <Circle
                                            cx="12"
                                            cy="17"
                                            r="1"
                                            fill={colors.secondaryButtonColor}
                                        />
                                    </Svg>
                                    <Text
                                        style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        {optionData.titles.find(el => el.id === 'left_menu_faq').title}
                                    </Text>
                                </View>
                                <IconButton
                                    icon={require("@src/assets/img/arrow-right.png")}
                                    style={{
                                        height: 32,
                                        marginRight: 10,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate("FeedbackScreen");
                        }}>
                            <View style={{
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.borderColor,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <Path
                                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                                            fill="none"
                                            stroke={colors.secondaryButtonColor}
                                            strokeWidth="2"
                                        />
                                    </Svg>
                                    <Text
                                        style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        {optionData.titles.find(el => el.id === 'left_menu_feedback').title}
                                    </Text>
                                </View>
                                <IconButton
                                    icon={require("@src/assets/img/arrow-right.png")}
                                    style={{
                                        height: 32,
                                        marginRight: 10,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() =>
                            navigation.navigate("SettingsScreen")}>
                            <View style={{
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                borderBottomRightRadius: 9,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View
                                    style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <Circle cx="12"
                                                cy="12"
                                                r="3"
                                                fill="none"
                                                stroke={colors.secondaryButtonColor}
                                                strokeWidth="2"
                                        />
                                        <Path
                                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                                            fill="none"
                                            stroke={colors.secondaryButtonColor}
                                            strokeWidth="2"
                                        />
                                    </Svg>
                                    <Text
                                        style={[global.settingsItemTitle, {marginLeft: scale(10)}]}>
                                        {optionData.titles.find(el => el.id === 'left_menu_settings').title}
                                    </Text>
                                </View>
                                <IconButton
                                    icon={require("@src/assets/img/arrow-right.png")}
                                    style={{
                                        height: 32,
                                        marginRight: 10,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    );
}
export default CustomDrawerContentComponent;