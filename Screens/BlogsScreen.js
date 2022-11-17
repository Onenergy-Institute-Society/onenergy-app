import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import PostList from "../Components/PostList";
import {useSelector} from "react-redux";
import IconButton from "@src/components/IconButton";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import {scale} from "../Utils/scale";
import AuthWrapper from "@src/components/AuthWrapper";

const CategoryPageRead = () => {
    try {
        return (
            <PostList postCategory={'105'} postPerPage={'10'} postOrder={'desc'} postOrderBy={'date'} useLoadMore={true} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const CategoryPageWatch = () => {
    try {
        return (
            <PostList postCategory={'103'} postPerPage={'10'} postOrder={'desc'} postOrderBy={'date'} useLoadMore={true} />
        )
    } catch (err) {
        console.log(`${err}`);
    }
}
const TabTitle = ({tintColor, name}) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <Text style={{ color: '#4A4D34', fontFamily:"Montserrat Alternates", fontSize: scale(16) }}>{optionData.titles.find(el => el.id === name).title}</Text>
    )
}
const Tabs = createMaterialTopTabNavigator(
    {
        Watch: {
            screen: CategoryPageWatch,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'blog_watch_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'blog_watch'} top={-10} right={-10} size={scale(10)} showNumber={false} />
                        </AuthWrapper>
                    </View>
                ),
            },
        },
        Read: {
            screen: CategoryPageRead,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'blog_read_tab'} />
                        <AuthWrapper actionOnGuestLogin={'hide'}>
                            <NotificationTabBarIcon notificationID={'blog_read'} top={-10} right={-10} size={scale(10)} showNumber={false} />
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
const BlogsScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
           header:null,
        }
    }
});
BlogsScreen.navigationOptions = ({ navigation, screenProps }) => {
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
                <IconButton
                    icon={require("@src/assets/img/arrow-back.png")}
                    tintColor={colors.headerIconColor}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16),
                    }}
                />
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