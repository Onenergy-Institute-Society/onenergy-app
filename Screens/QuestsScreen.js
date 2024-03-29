import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {withNavigation} from "react-navigation";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {s} from "../Utils/Scale";
import DailyQuests from "../Components/QuestsDaily";
import WeeklyQuests from "../Components/QuestsWeekly";
import MonthlyQuests from "../Components/QuestsMonthly";
import QiPointHeader from "../Components/QiPointHeader";
import AuthWrapper from "@src/components/AuthWrapper";
import {SvgIconBack} from "../Utils/svg";

const QuestsDaily = (props) => {
    try {
        return (
            <DailyQuests {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}
const QuestsWeekly = (props) => {
    try {
        return (
            <WeeklyQuests {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}
const QuestsMonthly = (props) => {
    try {
        return (
            <MonthlyQuests {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text style={{color: tintColor, fontFamily:"MontserratAlternates-SemiBold", fontWeight:"bold", fontSize: s(14) }}>{optionData.titles.find(el => el.id === name).title}</Text>
    )
}
const Tabs = createMaterialTopTabNavigator(
    {
        Daily: {
            screen: QuestsDaily,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'quest_daily_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'quest_daily'} top={-5} right={-5} size={10} showNumber={false}/>
                        </AuthWrapper>
                    </View>
                ),
           }
       },
        Weekly: {
            screen: QuestsWeekly,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'quest_weekly_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'quest_weekly'} top={-5} right={-5} size={10} showNumber={false}/>
                        </AuthWrapper>
                    </View>
                ),
           }
       },
        Monthly: {
            screen: QuestsMonthly,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'quest_monthly_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'quest_monthly'} top={-5} right={-5} size={10} showNumber={false}/>
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
                height: s(45),
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
const ScreenTitle = () => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text>{optionData.titles.find(el => el.id === 'quest_title').title}</Text>
    )
}
QuestsScreen.navigationOptions = ({navigation, screenProps}) => ({
    title: <ScreenTitle />,
    headerStyle: {
        backgroundColor: screenProps.colors.headerBg,
   },
    headerTintColor: screenProps.colors.headerColor,
    headerTitleStyle: screenProps.global.appHeaderTitle,
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
        >
            <SvgIconBack color = {screenProps.colors.headerIconColor}/>
        </TouchableOpacity>,
    headerRight:
        <QiPointHeader {...screenProps}/>
    ,
})
export default withNavigation(QuestsScreen);