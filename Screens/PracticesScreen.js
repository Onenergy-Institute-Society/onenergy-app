import * as React from 'react';
import {withNavigation} from "react-navigation";
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import PracticesContent from './PracticesContent';
import MyLoginScreen from "../Components/MyLoginScreen";
import MySignupScreen from "../Components/MySignupScreen";
import DrawerContentComponent from "../Components/DrawerContentComponent";
import {s, windowWidth} from "../Utils/Scale";

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
        edgeWidth: s(140),
        minSwipeDistance: s(3),
        contentOptions: {
            activeTintColor: '#4942e1',
       },
        drawerType: 'slide',
        drawerWidth: windowWidth * 4 / 5,
        contentComponent: props => <DrawerContentComponent {...props}/>,
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