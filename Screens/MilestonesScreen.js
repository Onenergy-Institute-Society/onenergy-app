import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconButton from "@src/components/IconButton";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import Milestones from "../Components/Milestones";
import {connect, useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {scale} from "../Utils/scale";
import QiPointHeader from "../Components/QiPointHeader";
import AuthWrapper from "@src/components/AuthWrapper";

const MilestonesLearn = (props) => {
    try {
        return (
            <Milestones type={'learn'} {...props} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}

const MilestonesStartup = (props) => {
    try {
        return (
            <Milestones type={'startup'} {...props} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const MilestonesStamina = (props) => {
    try {
        return (
            <Milestones type={'endurance'} {...props} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text style={{ color: '#4A4D34', fontFamily:"Montserrat Alternates", fontSize: scale(16)  }}>{optionData.titles.find(el => el.id === name).title}</Text>
    )
}
const Tabs = createMaterialTopTabNavigator(
    {
        Learn: {
            screen: MilestonesLearn,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_learn_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'milestone_learn'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            }
        },
        Startup: {
            screen: MilestonesStartup,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_startup_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'milestone_startup'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            }
        },
        Endurance: {
            screen: MilestonesStamina,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_stamina_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'milestone_endurance'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            }
        },
    },
    {
        initialRouteName: 'Endurance',
        swipeEnabled: true,
        lazy: true,
        optimizationsEnabled: true,
        tabBarOptions: {
            style: {
                height: 45,
                backgroundColor: '#FFFFEF',
                marginTop: 0
            },
            indicatorStyle: {
                backgroundColor: '#4A4D34',
            },
            activeTintColor: '#4A4D34',
            inactiveTintColor: '#7B8057',
        }
    },
);
const MilestonesScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            header:null,
        }
    }
});
MilestonesScreen.navigationOptions = ({navigation, screenProps}) => ({
    title: 'My Milestones',
    headerStyle: {
        backgroundColor: screenProps.colors.headerBg,
    },
    headerTintColor: screenProps.colors.headerColor,
    headerTitleStyle: screenProps.global.appHeaderTitle,
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
        >
            <IconButton
                icon={require("@src/assets/img/arrow-back.png")}
                tintColor={screenProps.colors.headerIconColor}
                style={{
                    height: scale(16),
                    marginLeft: scale(16)
                }}
            />
        </TouchableOpacity>,
    headerRight:
        <QiPointHeader />
        ,
})
const mapStateToProps = (state) => ({
    achievementReducer: state.onenergyReducer.achievementReducer.achievements
});
export default connect(mapStateToProps)(withNavigation(MilestonesScreen));