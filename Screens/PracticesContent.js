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
import PracticeTipsRow from "../Components/PracticeTipsRow";
import LoginScreen from "@src/containers/Custom/LoginScreen";
import analytics from '@react-native-firebase/analytics';
import AuthWrapper from "@src/components/AuthWrapper";
import Svg, {Path, Circle} from "react-native-svg";

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
                            <EventList location={'practice'} {...props} />
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
                >
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <BlockScreen pageId={helpModal.id}
                                     contentInsetTop={0}
                                     contentOffsetY={0}
                                     hideTitle={true}
                                     hideNavigationHeader={true}
                                     {...props} />
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
                <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{marginLeft:scale(10)}}
                >
                    <Path d="m9 18 6-6-6-6"
                          fill="none"
                          stroke={colors.headerIconColor}
                          strokeWidth="2"
                    />
                </Svg>
            </TouchableOpacity>
    } else {
        headerLeft =
            <TouchableScale
                onPress={() => {
                    navigation.openDrawer()
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
};
export default PracticesContent;
