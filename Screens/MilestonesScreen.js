import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {withNavigation} from "react-navigation";
import Milestones from "../Components/Milestones";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {s} from "../Utils/Scale";
import QiPointHeader from "../Components/QiPointHeader";
import AuthWrapper from "@src/components/AuthWrapper";
import {SvgIconBack} from "../Utils/svg";

const MilestonesLearn = (props) => {
    try {
        return (
            <Milestones type={'learn'} {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}

const MilestonesStartup = (props) => {
    try {
        return (
            <Milestones type={'startup'} {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}
const MilestonesStamina = (props) => {
    try {
        return (
            <Milestones type={'endurance'} {...props}/>
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
        Learn: {
            screen: MilestonesLearn,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_learn_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'milestone_learn'} top={-5} right={-5} size={10} showNumber={false}/>
                        </AuthWrapper>
                    </View>
                ),
           }
       },
        Startup: {
            screen: MilestonesStartup,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_startup_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'milestone_startup'} top={-5} right={-5} size={10} showNumber={false}/>
                        </AuthWrapper>
                    </View>
                ),
           }
       },
        Endurance: {
            screen: MilestonesStamina,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'milestone_stamina_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'milestone_endurance'} top={-5} right={-5} size={10} showNumber={false}/>
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
                height: s(40),
                backgroundColor: '#f2f0fd',
                marginTop: 0
           },
            indicatorStyle: {
                backgroundColor: '#EF713C',
           },
            activeTintColor: '#EF713C',
            inactiveTintColor: '#8c79ea',
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
const ScreenTitle = () => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text>{optionData.titles.find(el => el.id === 'milestone_title').title}</Text>
    )
}
MilestonesScreen.navigationOptions = ({navigation, screenProps}) => ({
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
export default withNavigation(MilestonesScreen);