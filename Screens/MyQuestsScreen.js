import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconButton from "@src/components/IconButton";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import Quests from "../Components/Quests";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {scale} from "../Utils/scale";

const QuestsDaily = () => {
    try {
        return (
            <Quests type="daily" />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const QuestsWeekly = () => {
    try {
        return (
            <Quests type="weekly" />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const QuestsMonthly = () => {
    try {
        return (
            <Quests type="monthly" />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const TabTitle = ({tintColor, name}) => {
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    let titleIndex = optionData.titles.findIndex(el => el.id === name);
    return (
        <Text style={{ color: tintColor }}>{optionData.titles[titleIndex].title}</Text>
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
                        <NotificationTabBarIcon notificationID={'quest_daily'} top={-5} right={-5} size={10} showNumber={false} />
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
                        <NotificationTabBarIcon notificationID={'quest_weekly'} top={-5} right={-5} size={10} showNumber={false} />
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
                        <NotificationTabBarIcon notificationID={'quest_monthly'} top={-5} right={-5} size={10} showNumber={false} />
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
const MyQuestsScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
           header:null,
        }
    }
});
MyQuestsScreen.navigationOptions = ({navigation}) => ({
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
})
export default withNavigation(MyQuestsScreen);