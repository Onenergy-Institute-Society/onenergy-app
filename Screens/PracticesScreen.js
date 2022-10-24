import * as React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import { withNavigation } from "react-navigation";
import {
    createDrawerNavigator
} from 'react-navigation-drawer';
import { useSelector } from "react-redux";
import FastImage from 'react-native-fast-image';
import { createStackNavigator } from 'react-navigation-stack';
import PracticesContent from './PracticesContent';
import IconButton from "@src/components/IconButton";
import {scale} from "../Utils/scale";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";


const CustomDrawerContentComponent = (props) => {
    const {navigation, screenProps} = props;
    const {colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);

    return (
        <SafeAreaView style={{flex:1, backgroundColor: colors.bodyBg}}>
            <ImageBackground
                source={require('../assets/images/1-1024x683.jpg')}
                style={{height:scale(140), justifyContent:"center", alignItems:"center"}}>
                {user?
                    <>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                            <View style={{justifyContent:"center", alignItems:"center"}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProfileScreen")}
                                >
                                    <FastImage
                                        source={{uri: user&&user.avatar_urls['full']?user.avatar_urls['full']:user.avatar_urls['96']}}
                                        style={{height: scale(80), width: scale(80), borderRadius: 100, margin: scale(10)}}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingTop:20,}}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: scale(18),
                                        textAlign:"right",
                                        marginBottom:10,
                                        textShadowColor: 'grey',
                                        textShadowRadius: 1,
                                        textShadowOffset: {
                                            width: -1,
                                            height: 1
                                        }
                                    }}>
                                    {user.name}
                                </Text>
                                {user.rank?(
                                    <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                                        <FastImage source={{uri:optionData.ranks[user.rank].rankImage}} style={{width:24, height:24, alignSelf:"center"}} />
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontSize: scale(14),
                                                marginLeft:5,
                                                alignSelf:"center",
                                                textShadowColor: 'grey',
                                                textShadowRadius: 1,
                                                textShadowOffset: {
                                                    width: -1,
                                                    height: 1
                                                }
                                            }}>
                                            {optionData.ranks[user.rank].rankName}
                                        </Text>
                                    </View>
                                ):null}
                                {progressReducer.points&&progressReducer.points.length?Object.entries(progressReducer.points).map(([key, value])=>(
                                    <View>
                                        <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                                            <FastImage source={{uri:'https://assets.onenergy.institute/wp-content/uploads/2020/07/gamipress-icon-ray-material-54x54.png'}} style={{width:16, height:16}} />
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    textAlign:"left",
                                                    marginLeft:5,
                                                    textShadowColor: 'grey',
                                                    textShadowRadius: 1,
                                                    textShadowOffset: {
                                                        width: -1,
                                                        height: 1
                                                    }
                                                }}>
                                                {key} {value}
                                            </Text>
                                        </View>
                                    </View>
                                )):null}
                            </View>
                        </View>
                        {user.membership.length > 0 ?
                            <Text style={{color:"#fff"}}>{user.membership[0].plan.name}</Text>
                            : null}
                    </>
                    :null}
            </ImageBackground>
            <View style={{flex:1, justifyContent: "space-between"}}>
                {(optionData && Object.keys(optionData).length > 0)?(
                    <View style={{backgroundColor: colors.bodyFrontBg, margin:10, paddingLeft:10, borderRadius:9}}>
                        {user?
                            <>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('StatsScreen');
                                }}>
                                    <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', borderTopRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text
                                            style={{fontSize:scale(18)}}>
                                            {optionData.titles.find(el => el.id === 'left_menu_progress').title}
                                        </Text>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight:10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate('QuestsScreen');}}>
                                    <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text
                                            style={{fontSize:scale(18)}}>
                                            {optionData.titles.find(el => el.id === 'left_menu_quests').title}
                                        </Text>
                                        <NotificationTabBarIcon notificationID={'quest'}  top={0} right={0} size={scale(10)} showNumber={false} />
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight:10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("MilestonesScreen");}}>
                                    <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text
                                            style={{fontSize:scale(18)}}>
                                            {optionData.titles.find(el => el.id === 'left_menu_achievements').title}
                                        </Text>
                                        <NotificationTabBarIcon notificationID={'achievement'}  top={0} right={0} size={scale(10)} showNumber={false} />
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight:10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    navigation.navigate("VouchersScreen");}}>
                                    <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text
                                            style={{fontSize:scale(18)}}>
                                            {optionData.titles.find(el => el.id === 'left_menu_vouchers').title}
                                        </Text>
                                        <NotificationTabBarIcon notificationID={'voucher'}  top={0} right={0} size={scale(10)} showNumber={false} />
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight:10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </>
                            :
                            <>
                                <TouchableWithoutFeedback onPress={() => {navigation.navigate("SignupScreen")}}>
                                    <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text
                                            style={{fontSize:scale(18)}}>
                                            {optionData.titles.find(el => el.id === 'left_menu_signup').title}
                                        </Text>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight:10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {navigation.navigate("LoginScreen")}}>
                                    <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text
                                            style={{fontSize:scale(18)}}>
                                            {optionData.titles.find(el => el.id === 'left_menu_login').title}
                                        </Text>
                                        <IconButton
                                            icon={require("@src/assets/img/arrow-right.png")}
                                            style={{
                                                height: 32,
                                                marginRight:10,
                                            }}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </>
                        }
                    </View>
                ):null}
                <View style={{justifyContent:"flex-end", marginBottom:scale(30),padding: 15, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                    {user?
                        <TouchableOpacity
                            onPress={() => navigation.navigate("FeedbackScreen")}
                            style={{marginBottom: 5}}
                        >
                            <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems: 'center'}}>
                                <IconButton
                                    icon={require("@src/assets/img/feed-settings.png")}
                                    tintColor={"#000"}
                                    style={{
                                        width:24,
                                        height:24,
                                    }}
                                />
                                <Text style={{fontSize:scale(14)}}>{optionData.titles.find(el => el.id === 'left_menu_feedback').title}</Text>
                            </View>
                        </TouchableOpacity>
                        :null}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AppPageScreen", {pageId: 30271, title: 'Q & A'})}
                        style={{marginBottom: 5}}
                    >
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems: 'center'}}>
                            <IconButton
                                icon={require("@src/assets/img/help.png")}
                                tintColor={"#000"}
                                style={{
                                    width:24,
                                    height:24,
                                }}
                            />
                            <Text style={{fontSize:scale(14)}}>{optionData.titles.find(el => el.id === 'left_menu_faq').title}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SettingsScreen")}
                        style={{marginBottom: 5}}
                    >
                        <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems: 'center'}}>
                            <IconButton
                                icon={require("@src/assets/img/ios-settings.png")}
                                tintColor={"#000"}
                                style={{
                                    width:24,
                                    height:24,
                                }}
                            />
                            <Text style={{fontSize:scale(14)}}>{optionData.titles.find(el => el.id === 'left_menu_settings').title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
const Home = createStackNavigator(
    {
        Home: {screen:PracticesContent},
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
        contentComponent: props => <CustomDrawerContentComponent {...props} />,
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