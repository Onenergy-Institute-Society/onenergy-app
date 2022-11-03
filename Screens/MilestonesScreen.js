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
import QiPointHeader from "../Components/QiPointHeader";
import AuthWrapper from "@src/components/AuthWrapper";

const MilestonesLearn = () => {
    try {
        return (
            <Milestones type={'learn'} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}

const MilestonesStartup = () => {
    try {
        return (
            <Milestones type={'startup'} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const MilestonesStamina = () => {
    try {
        return (
            <Milestones type={'endurance'} />
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
const MilestonesScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            header:null,
        }
    }
});
MilestonesScreen.navigationOptions = ({navigation}) => ({
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
    headerRight:
        <QiPointHeader />
        ,
})
export default withNavigation(MilestonesScreen);