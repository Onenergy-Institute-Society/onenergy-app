import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {withNavigation} from "react-navigation";
import PostList from "../Components/PostList";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {s} from "../Utils/Scale";
import AuthWrapper from "@src/components/AuthWrapper";
import {SvgIconBack} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

const CategoryPageRead = (props) => {
    try {
        Analytics.segmentClient.screen('Blogs', {type: 'Read'}).then();
        return (
            <PostList postCategory={'105'} postPerPage={'10'} postOrder={'desc'} postOrderBy={'date'} useLoadMore={true} {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}
const CategoryPageWatch = (props) => {
    try {
        Analytics.segmentClient.screen('Blogs', {type: 'Watch'}).then();
        return (
            <PostList postCategory={'103'} postPerPage={'10'} postOrder={'desc'} postOrderBy={'date'} useLoadMore={true} {...props}/>
        )
   } catch (err) {
        console.log(`${err}`);
   }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text style={{color: tintColor, fontFamily:"MontserratAlternates-SemiBold", fontWeight:"bold", fontSize: s(16)}}>{optionData.titles.find(el => el.id === name).title}</Text>
    )
}
const Tabs = createMaterialTopTabNavigator(
    {
        Watch: {
            screen: CategoryPageWatch,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'blog_watch_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'blog_watch'} top={-10} right={-10} size={10} showNumber={false}/>
                        </AuthWrapper>
                    </View>
                ),
           },
       },
        Read: {
            screen: CategoryPageRead,
            navigationOptions: {
                tabBarLabel: ({tintColor}) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'blog_read_tab'}/>
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'blog_read'} top={-10} right={-10} size={10} showNumber={false}/>
                        </AuthWrapper>
                    </View>
                ),
           }
       }
   },
    {
        initialRouteName: 'Watch',
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
const BlogsScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
           header:null,
       }
   }
});
BlogsScreen.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    let headerLeft = null;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if(navRoutes.length >= 2){
        headerLeft =
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
               }}
            >
                <SvgIconBack color = {colors.headerIconColor}/>
            </TouchableOpacity>
   }
    return {
        title: 'Wisdom of Life',
        headerStyle: {
            backgroundColor: colors.headerBg,
       },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft: headerLeft,
   }
}
export default withNavigation(BlogsScreen);