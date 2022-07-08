import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconButton from "@src/components/IconButton";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import Milestones from "../Components/Milestones";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {scale} from "../Utils/scale";

const MilestonesCompleted = () => {
    try {
        return (
            <Milestones completed={true} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const MilestonesUncompleted = () => {
    try {
        return (
            <Milestones completed={false} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    let titleIndex = optionData.titles.findIndex(el => el.id === name);
    return (
        <Text style={{ color: tintColor }}>{optionData.titles[titleIndex].title}</Text>
    )
}
const Tabs = createMaterialTopTabNavigator(
    {
        Uncompleted: {
            screen: MilestonesUncompleted,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_uncompleted_tab'} />
                        <NotificationTabBarIcon notificationID={'milestone_uncompleted'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                    </View>
                ),
            }
        },
        Completed: {
            screen: MilestonesCompleted,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_completed_tab'} />
                        <NotificationTabBarIcon notificationID={'milestone_completed'} top={-5} right={-5} size={scale(10)} showNumber={false} />
                    </View>
                ),
            }
        },
    },
    {
        initialRouteName: 'Uncompleted',
        swipeEnabled: true,
        lazy: true,
        optimizationsEnabled: true,
        tabBarOptions: {
            style: {
                height: 45,
                backgroundColor: '#fff',
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
const MyMilestonesScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            header:null,
        }
    }
});
MyMilestonesScreen.navigationOptions = ({navigation}) => ({
    title: 'My Milestones',
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
export default withNavigation(MyMilestonesScreen);