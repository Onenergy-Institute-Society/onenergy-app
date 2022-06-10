import * as React from 'react';
import {
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {
    createDrawerNavigator,
} from 'react-navigation-drawer';
import { useSelector, useDispatch } from "react-redux";
import FastImage from 'react-native-fast-image';
import { createStackNavigator } from 'react-navigation-stack';
import HomeContent from './HomeContent';
import IconButton from "@src/components/IconButton";
import {scale, verticalScale} from "../Utils/scale";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";

const CustomDrawerContentComponent = (props) => {
    const {navigation, screenProps} = props;
    const dispatch = useDispatch();
    const {colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    return (
        <SafeAreaView style={{flex:1, backgroundColor: colors.bodyBg}}>
            <ImageBackground
                source={{uri: 'https://app.onenergy.institute/wp-content/uploads/2021/11/1-scaled.jpg'}}
                style={{height:verticalScale(140), justifyContent:"center", alignItems:"center"}}>
                {user?
                    <>
                        <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                            <View style={{justifyContent:"center", alignItems:"center"}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ProfileScreen")}
                                >
                                    <FastImage
                                        source={{uri: user.avatar_urls['full']?user.avatar_urls['full']:user.avatar_urls['96']}}
                                        style={{height: scale(80), width: scale(80), borderRadius: 100, margin: verticalScale(10)}}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingTop:20,}}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: scale(18),
                                        textAlign:"right",
                                        marginBottom:10
                                    }}>
                                    {user.name}
                                </Text>
                                {user.user_ranks?(
                                    <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                                        <FastImage source={{uri:user.user_ranks[0].rank.thumbnail_url}} style={{width:24, height:24, alignSelf:"center"}} />
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontSize: scale(14),
                                                marginLeft:5,
                                                alignSelf:"center"
                                            }}>
                                            {user.user_ranks[0].rank.title}
                                        </Text>
                                    </View>
                                ):null}
                                {user.user_points?(
                                <View>
                                    {user.user_points.map((point) => {
                                        return (
                                            <View style={{flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                                                <FastImage source={{uri:point.image}} style={{width:16, height:16}} />
                                                <Text
                                                    style={{
                                                        color: '#fff',
                                                        textAlign:"left",
                                                        marginLeft:5
                                                    }}>
                                                    {point.point} {point.label}
                                                </Text>
                                            </View>
                                        )}
                                    )}
                                </View>
                                ):null}
                            </View>
                        </View>
                    {user.membership.length > 0 ?
                        <Text style={{color:"#fff"}}>{user.membership[0].plan.name}</Text>
                        : null}
                    </>
                    :null}
            </ImageBackground>
            {(optionData && Object.keys(optionData).length > 0)?(
                <View style={{flex: 1, backgroundColor: colors.bodyFrontBg, margin:10, paddingLeft:10, borderRadius:9}}>
                    {user?
                        <>
                            <TouchableWithoutFeedback onPress={() => {
                                dispatch({
                                    type: 'NOTIFICATION_CLEAR',
                                    payload: 'progress'
                                });
                                navigation.navigate('MyProgressScreen');
                                }}>
                                <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', borderTopRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{fontSize:scale(18)}}>
                                        {optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_progress')].title}
                                    </Text>
                                    <NotificationTabBarIcon notificationID={'progress'}  top={0} right={0} size={10} showNumber={false} />
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
                                dispatch({
                                    type: 'NOTIFICATION_CLEAR',
                                    payload: 'quest'
                                });
                                navigation.navigate('MyQuestsScreen');}}>
                                <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{fontSize:scale(18)}}>
                                        {optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_quests')].title}
                                    </Text>
                                    <NotificationTabBarIcon notificationID={'quest'}  top={0} right={0} size={10} showNumber={false} />
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
                                dispatch({
                                    type: 'NOTIFICATION_CLEAR',
                                    payload: 'achievement'
                                });
                                navigation.navigate("MyMilestonesScreen");}}>
                                <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{fontSize:scale(18)}}>
                                        {optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_achievements')].title}
                                    </Text>
                                    <NotificationTabBarIcon notificationID={'achievement'}  top={0} right={0} size={10} showNumber={false} />
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
                                dispatch({
                                    type: 'NOTIFICATION_CLEAR',
                                    payload: 'voucher'
                                });
                                navigation.navigate("MyVouchersScreen");}}>
                                <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{fontSize:scale(18)}}>
                                        {optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_vouchers')].title}
                                    </Text>
                                    <NotificationTabBarIcon notificationID={'voucher'}  top={0} right={0} size={10} showNumber={false} />
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
                            <TouchableWithoutFeedback onPress={() => {navigation.navigate("SignupScreen");}}>
                                <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{fontSize:scale(18)}}>
                                        {optionData.titles.findIndex(el => el.id === 'left_menu_signup')?optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_signup')].title:'Create an Account'}
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
                            <TouchableWithoutFeedback onPress={() => {navigation.navigate("LoginScreen");}}>
                                <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{fontSize:scale(18)}}>
                                        {optionData.titles.findIndex(el => el.id === 'left_menu_login')?optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_login')].title:'Login My Account'}
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
            <View style={{flex:1,justifyContent:"flex-end", marginBottom:verticalScale(30),padding: 15, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                {user?
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MyFeedbackScreen")}
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
                            <Text style={{fontSize:scale(14)}}>{optionData.titles.findIndex(el => el.id === 'left_menu_feedback')?optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_feedback')].title:'Feedback'}</Text>
                        </View>
                    </TouchableOpacity>
                    :null}
                <TouchableOpacity
                    onPress={() => navigation.navigate("MyAppPageScreen", {pageId: 30271, title: 'Q & A'})}
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
                        <Text style={{fontSize:scale(14)}}>{optionData.titles.findIndex(el => el.id === 'left_menu_faq')?optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_faq')].title:'Q & A'}</Text>
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
                        <Text style={{fontSize:scale(14)}}>{optionData.titles.findIndex(el => el.id === 'left_menu_settings')?optionData.titles[optionData.titles.findIndex(el => el.id === 'left_menu_settings')].title:'Settings'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const Home = createStackNavigator(
    {
        Home: {screen:HomeContent},
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
        navigationOptions : {header:null}
    }
);

const HomeScreen = createStackNavigator({
    Drawer: {
        screen: Drawer
    },
})

HomeScreen.navigationOptions = {header:null};
export default withNavigation(HomeScreen);