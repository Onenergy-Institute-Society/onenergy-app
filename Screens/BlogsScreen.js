import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import PostList from "../Components/PostList";
import {useSelector} from "react-redux";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";

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
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    let titleIndex = optionData.titles.findIndex(el => el.id === name);
    return (
        <Text style={{ color: tintColor }}>{optionData.titles[titleIndex].title}</Text>
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
                        <NotificationTabBarIcon notificationID={'blog_watch'} top={-5} right={-5} size={10} showNumber={false} />
                    </View>
                ),
            }
        },
        Read: {
            screen: CategoryPageRead,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View>
                        <TabTitle tintColor={tintColor} name={'blog_read_tab'} />
                        <NotificationTabBarIcon notificationID={'blog_read'} top={-5} right={-5} size={10} showNumber={false} />
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
const BlogsScreen = createStackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
           header:null,
        }
    }
});
BlogsScreen.navigationOptions = () => {
    return ({
        title:'Wisdom of Life'
    })
}
export default withNavigation(BlogsScreen);