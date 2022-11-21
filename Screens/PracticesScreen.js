import * as React from 'react';
import { withNavigation } from "react-navigation";
import {createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import PracticesContent from './PracticesContent';
import MyLoginScreen from "../Components/MyLoginScreen";
import MySignupScreen from "../Components/MySignupScreen";
import DrawerContentComponent from "../Components/DrawerContentComponent";

const Home = createStackNavigator(
    {
        Home: {screen:PracticesContent},
        MyLoginScreen: {screen: MyLoginScreen},
        MySignupScreen: {screen: MySignupScreen}
    }
)
const Drawer = createDrawerNavigator(
    {
        Home: Home,
    },
    {
        edgeWidth: 140,
        minSwipeDistance: 3,
        contentOptions: {
            activeTintColor: '#4942e1',
        },
        drawerType: 'slide',
        contentComponent: props => <DrawerContentComponent {...props} />,
        navigationOptions : {header:null},
    }
);

const PracticesScreen = createStackNavigator({
    Drawer: {
        screen: Drawer,
    },
})
PracticesScreen.navigationOptions = {header:null};
export default withNavigation(PracticesScreen);