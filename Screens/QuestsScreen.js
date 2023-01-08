import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {scale} from "../Utils/scale";
import DailyQuests from "../Components/QuestsDaily";
import WeeklyQuests from "../Components/QuestsWeekly";
import MonthlyQuests from "../Components/QuestsMonthly";
import QiPointHeader from "../Components/QiPointHeader";
import AuthWrapper from "@src/components/AuthWrapper";
import Svg, {Path} from "react-native-svg";

const QuestsDaily = (props) => {
    try {
        return (
            <DailyQuests {...props} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const QuestsWeekly = (props) => {
    try {
        return (
            <WeeklyQuests {...props} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const QuestsMonthly = (props) => {
    try {
        return (
            <MonthlyQuests {...props} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text style={{ color: tintColor, fontFamily:"MontserratAlternates-SemiBold", fontWeight:"bold", fontSize: scale(14)  }}>{optionData.titles.find(el => el.id === name).title}</Text>
    )
}
const Tabs = createMaterialTopTabNavigator(
    {
        Daily: {
            screen: QuestsDaily,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'quest_daily_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'quest_daily'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            }
        },
        Weekly: {
            screen: QuestsWeekly,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'quest_weekly_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'quest_weekly'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            }
        },
        Monthly: {
            screen: QuestsMonthly,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'quest_monthly_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'quest_monthly'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            }
        }
    },
    {
        initialRouteName: 'Daily',
        swipeEnabled: true,
        lazy: true,
        optimizationsEnabled: true,
        tabBarOptions: {
            style: {
                height: scale(45),
                backgroundColor: '#f2f0fd',
                marginTop: 0
            },
            indicatorStyle: {
                backgroundColor: '#EF713C',
            },
            activeTintColor: '#EF713C',
            inactiveTintColor: '#8c79ea',
            shifting: true
        }
    },
);
const QuestsScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
           header:null,
        }
    }
});
QuestsScreen.navigationOptions = ({navigation, screenProps}) => ({
    title: 'Quests',
    headerStyle: {
        backgroundColor: screenProps.colors.headerBg,
    },
    headerTintColor: screenProps.colors.headerColor,
    headerTitleStyle: screenProps.global.appHeaderTitle,
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
        >
            <Svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                style={{marginLeft:scale(10)}}
            >
                <Path d="m15 18-6-6 6-6"
                      fill="none"
                      stroke={screenProps.colors.headerIconColor}
                      strokeWidth="2"
                />
            </Svg>
        </TouchableOpacity>,
    headerRight:
        <QiPointHeader {...screenProps} />
    ,
})
export default withNavigation(QuestsScreen);