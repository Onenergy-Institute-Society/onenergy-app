import * as React from 'react';
import {withNavigation} from "react-navigation";
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import ProgramsContent from './ProgramsContent';
import MyLoginScreen from "../Components/MyLoginScreen";
import MySignupScreen from "../Components/MySignupScreen";
import DrawerContentComponent from "../Components/DrawerContentComponent";
import {s, windowWidth} from "../Utils/Scale";

const Home = createStackNavigator(
    {
        Home: {screen:ProgramsContent},
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

const ProgramsScreen = createStackNavigator({
    Drawer: {
        screen: Drawer,
   },

})

ProgramsScreen.navigationOptions = {header:null};
export default withNavigation(ProgramsScreen);