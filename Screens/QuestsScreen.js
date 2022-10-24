import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconButton from "@src/components/IconButton";
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

const QuestsDaily = () => {
    try {
        return (
            <DailyQuests />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const QuestsWeekly = () => {
    try {
        return (
            <WeeklyQuests />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const QuestsMonthly = () => {
    try {
        return (
            <MonthlyQuests />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text style={{ color: tintColor, fontSize: scale(20) }}>{optionData.titles.find(el => el.id === name).title}</Text>
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
                        <NotificationTabBarIcon notificationID={'quest_daily'} top={-5} right={-5} size={scale(10)} showNumber={false} />
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
                        <NotificationTabBarIcon notificationID={'quest_weekly'} top={-5} right={-5} size={scale(10)} showNumber={false} />
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
                        <NotificationTabBarIcon notificationID={'quest_monthly'} top={-5} right={-5} size={scale(10)} showNumber={false} />
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
                height: 45,
                backgroundColor: '#f9f9f9',
                marginTop: 0
            },
            indicatorStyle: {
                backgroundColor: '#4942e1',
            },
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
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
QuestsScreen.navigationOptions = ({navigation}) => ({
    title: 'My Quests',
    headerTitleStyle: {textAlign:'left'},
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
        >
            <IconButton
                icon={require("@src/assets/img/arrow-back.png")}
                tintColor={"#4942e1"}
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
export default withNavigation(QuestsScreen);