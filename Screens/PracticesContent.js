import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    StyleSheet,
    View,
    SafeAreaView, Text, TouchableOpacity, ScrollView, ImageBackground
} from "react-native";
import {NavigationActions} from "react-navigation";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import ScalableImage from "../Components/ScalableImage";
import TouchableScale from "../Components/TouchableScale";
import IconButton from "@src/components/IconButton";
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
                            <EventList location={'practice'}/>
                        </View>
                        : null
                    }
                    {
                        user ?
                            <PracticeTipsRow/>
                            : null
                    }
                    <TouchableScale
                        onPress={personalPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            imageStyle={{ borderRadius: 9}}
                            resizeMode={"cover"}
                            width={windowWidth - scale(30)}
                            source={require('../assets/images/guided_practice_blank.png')}
                            background={true}
                        >
                            <Text style={styles.practiceType}>Guided{"\n"}Practice</Text>
                        </ImageBackground>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'guide_personal'} top={3} right={3}
                                                    size={scale(15)} fontSize={10} showNumber={true}/>
                        </AuthWrapper>
                    </TouchableScale>

                    <TouchableScale
                        onPress={groupPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            imageStyle={{ borderRadius: 9}}
                            resizeMode={"cover"}
                            width={windowWidth - scale(30)}
                            source={require('../assets/images/group_practice_blank.png')}
                            background={true}
                        >
                            <Text style={styles.practiceType}>Group{"\n"}Practice</Text>
                        </ImageBackground>
                    </TouchableScale>

                    <TouchableScale
                        onPress={customPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow, {marginBottom: scale(15)}]}
                            imageStyle={{ borderRadius: 9}}
                            resizeMode={"cover"}
                            width={windowWidth - scale(30)}
                            source={require('../assets/images/customize_practice_blank.png')}
                            background={true}
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
                    childrenStyle={{backgroundColor: "#F8F0E2"}}
                    HeaderComponent={
                        <View style={{
                            padding: 25,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            backgroundColor: '#FFFFEF',
                            borderBottomColor: '#4A4D34'
                        }}>
                            <Text style={{fontSize: 24, color: '#4A4D34'}}>{helpModal.title}</Text>
                            <IconButton
                                pressHandler={() => {
                                    this.popupPracticeDialog.close();
                                }}
                                icon={require("@src/assets/img/close.png")}
                                style={{height: scale(16), width: scale(16)}}
                                touchableStyle={{
                                    position: "absolute", top: 10, right: 10,
                                    height: scale(24),
                                    width: scale(24),
                                    backgroundColor: "#4A4D34",
                                    alignItems: "center",
                                    borderRadius: 100,
                                    padding: scale(5),
                                }}
                            /></View>
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
                    modalHeight={windowHeight * 4 / 5}
                    handlePosition="outside"
                    childrenStyle={{backgroundColor: "#F8F0E2"}}
                    HeaderComponent={
                        <View style={{
                            padding: 25,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderTopLeftRadius: 9,
                            borderTopRightRadius: 9,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            backgroundColor: '#FFFFEF',
                            borderBottomColor: '#4A4D34'
                        }}>
                            <Text style={{fontSize: 24, color: '#4A4D34'}}>{helpModal.title}</Text>
                            <IconButton
                                pressHandler={() => {
                                    this.popupLoginDialog.close();
                                }}
                                icon={require("@src/assets/img/close.png")}
                                tintColor={'#FFFFFF'}
                                style={{height: scale(16), width: scale(16)}}
                                touchableStyle={{
                                    position: "absolute", top: 10, right: 10,
                                    height: scale(24),
                                    width: scale(24),
                                    backgroundColor: "#4A4D34",
                                    alignItems: "center",
                                    borderRadius: 100,
                                    padding: scale(5),
                                }}
                            /></View>
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
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: scale(15),
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
        color: '#4A4D34',
        marginLeft:scale(110),
        fontFamily:"Montserrat Alternates",
        fontWeight:"600",
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
                <IconButton
                    icon={require("@src/assets/img/arrow-back.png")}
                    tintColor={colors.headerIconColor}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16),
                    }}
                />
            </TouchableOpacity>
    } else {
        headerLeft =
            <TouchableScale
                onPress={() => {
                    navigation.openDrawer()
                }}
            >
                <IconButton
                    icon={require("@src/assets/img/menu.png")}
                    tintColor={colors.headerIconColor}
                    style={{
                        height: 20,
                        marginLeft: 20,
                    }}
                />
                <AuthWrapper actionOnGuestLogin={'hide'}>
                    <NotificationTabBarIcon notificationID={'left_menu'} top={0} right={0} size={scale(10)}
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
                            navigation.navigate("MilestonesScreen")
                        }}
                    >
                        <IconButton
                            icon={require("@src/assets/img/certificate.png")}
                            tintColor={colors.headerIconColor}
                            style={{
                                height: 20,
                                marginRight: 5,
                            }}
                        />
                        <NotificationTabBarIcon notificationID={'milestone'} top={0} right={0} size={scale(10)}
                                                showNumber={false}/>
                    </TouchableScale>
                    <TouchableScale
                        onPress={() => {
                            navigation.navigate("QuestsScreen")
                        }}
                    >
                        <IconButton
                            icon={require("@src/assets/img/achievement-action-icon.png")}
                            tintColor={colors.headerIconColor}
                            style={{
                                height: 20,
                                marginRight: 0,
                            }}
                        />
                        <NotificationTabBarIcon notificationID={'quest'} top={0} right={0} size={scale(10)}
                                                showNumber={false}/>
                    </TouchableScale>
                </View>
            </AuthWrapper>
    }
};
export default PracticesContent;
