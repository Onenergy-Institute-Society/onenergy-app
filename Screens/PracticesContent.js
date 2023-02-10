import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {
    StyleSheet,
    View,
    SafeAreaView, Text, TouchableOpacity, ScrollView, ImageBackground
} from "react-native";
import {NavigationActions} from "react-navigation";
import TouchableScale from "../Components/TouchableScale";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {Modalize} from 'react-native-modalize';
import {ms, mvs, s, windowHeight, windowWidth} from "../Utils/Scale";
import EventList from "../Components/EventList";
import LoginScreen from "@src/containers/Custom/LoginScreen";
import AuthWrapper from "@src/components/AuthWrapper";
import {
    SvgIconCross,
    SvgIconMenu,
    SvgIconMilestone,
    SvgIconProgress,
    SvgIconQuest,
    SvgIconBack
} from "../Utils/svg";

const PracticesContent = props => {
    try {
        const {navigation, screenProps} = props;
        const {colors, global} = screenProps;
        const user = useSelector((state) => state.user.userObject);
        const [helpModal, setHelpModal] = useState({title: '', id: 0});
        const optionData = useSelector((state) => state.settings.settings.onenergy_option);
        const onFocusHandler = async () => {
            try {
                navigation.closeDrawer();
            } catch (e) {

            }
        }

        useEffect(() => {
            props.navigation.setParams({
                title: optionData.titles.find(el => el.id === 'practices_title').title,
            });
            navigation.addListener('willFocus', onFocusHandler)
            return () => {
                navigation.removeListener('willFocus', onFocusHandler)
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
                    {(optionData.goalCards && optionData.goalCards.length) ?
                        <View>
                            <EventList location={'practice'} {...props} extraStyle={{marginTop:mvs(20)}}/>
                        </View>
                        : null
                    }
                    <TouchableScale
                        activeOpacity={1}
                        onPress={personalPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            resizeMode={"cover"}
                            imageStyle={{borderRadius: s(9)}}
                            source={require('../assets/images/guided_practice.jpg')}
                        >
                            <Text style={styles.practiceType}>{optionData.titles.find(el => el.id === 'practices_title_guided_practice').title.replace('\\n', '\n')}</Text>

                            <AuthWrapper actionOnGuestLogin={'hide'}>
                                <NotificationTabBarIcon notificationID={'guide_personal'} top={10} right={10}
                                                        size={s(25)} fontSize={12} showNumber={true}/>
                            </AuthWrapper>

                        </ImageBackground>
                    </TouchableScale>

                    <TouchableScale
                        activeOpacity={1}
                        onPress={groupPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            resizeMode={"cover"}
                            imageStyle={{borderRadius: s(9)}}
                            source={require('../assets/images/group_practice.jpg')}
                        >
                            <Text style={styles.practiceType}>{optionData.titles.find(el => el.id === 'practices_title_group_practice').title.replace('\\n', '\n')}</Text>
                        </ImageBackground>
                    </TouchableScale>

                    <TouchableScale
                        activeOpacity={1}
                        onPress={customPracticePressed}>
                        <ImageBackground
                            style={[styles.card, styles.boxShadow]}
                            resizeMode={"cover"}
                            imageStyle={{borderRadius: s(9)}}
                            source={require('../assets/images/customize_practice.jpg')}
                        >
                            <Text style={styles.practiceType}>{optionData.titles.find(el => el.id === 'practices_title_customized_practice').title.replace('\\n', '\n')}</Text>
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
                            padding: ms(15),
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderTopLeftRadius: 9,
                            borderTopRightRadius: 9,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            backgroundColor: colors.bodyBg,
                            borderBottomColor: colors.borderColor
                        }}>
                            <Text style={{
                                fontSize: s(24),
                                color: colors.headerColor,
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontWeight: "bold"
                            }}>{helpModal.title}</Text>
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
                    childrenStyle={{backgroundColor: colors.bodyBg}}
                    HeaderComponent={
                        <View style={{
                            padding: ms(15),
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderTopLeftRadius: 9,
                            borderTopRightRadius: 9,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            backgroundColor: colors.bodyBg,
                            borderBottomColor: colors.borderColor
                        }}>
                            <Text style={{
                                fontSize: s(24),
                                color: colors.headerColor,
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontWeight: "bold"
                            }}>{helpModal.title}</Text>
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
        backgroundColor: 'white',
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) * 16 / 45,
        borderRadius: s(9),
        marginTop: mvs(20),
        marginBottom: mvs(5),
        marginHorizontal: s(15),
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
        marginLeft: s(15),
    },
    practiceType: {
        marginLeft: (windowWidth - s(30)) * 2 / 7,
        width: windowWidth - s(30),
        color: '#8c79ea',
        fontFamily: "MontserratAlternates-SemiBold",
        fontWeight: "bold",
        fontSize: s(28),
        flexWrap: "wrap"
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
                <View style={{justifyContent: "flex-end", flexDirection: "row", marginRight: 15}}>
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
};
const mapStateToProps = (state) => ({
    config: state.config ? state.config : null,
    accessToken: state.auth.token ? state.auth.token : null,
});
export default connect(mapStateToProps)(PracticesContent);
