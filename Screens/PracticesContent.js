import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {
    StyleSheet,
    View,
    SafeAreaView, Text, TouchableOpacity, ScrollView
} from "react-native";
import {NavigationActions} from "react-navigation";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import ScalableImage from "../Components/ScalableImage";
import TouchableScale from "../Components/TouchableScale";
import IconButton from "@src/components/IconButton";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import {scale} from "../Utils/scale";
import EventList from "../Components/EventList";
import PracticeTipsRow from "../Components/PracticeTipsRow";
import LoginScreen from "@src/containers/Custom/LoginScreen";

const PracticesContent = props => {
    try {
        const {navigation} = props;
        const user = useSelector((state) => state.user.userObject);
        const [helpModal, setHelpModal] = useState({title:'',id:0});
        const optionData = useSelector((state) => state.settings.settings.onenergy_option);
        const onFocusHandler=() =>{
            try
            {
                navigation.closeDrawer();

            }catch (e) {

            }
        }
        useEffect(()=>{
            props.navigation.setParams({
                title: optionData.titles.find(el => el.id === 'practices_title').title,
            });
            navigation.addListener('willFocus', onFocusHandler)
            return () => {
                navigation.removeListener('willFocus', onFocusHandler)
            }
        },[])

        const personalPracticePressed = () => {
            if(user)
            {
                navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticePersonal",
                    })
                )
            }else{
                setHelpModal(optionData.helps.find(el => el.name === 'all_login_required_popup_guest'));
                this.popupLoginDialog.open();
            }
        }

        const groupPracticePressed = () => {
            if(user)
            {
                navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticeGroup",
                    })
                )
            }else{
                setHelpModal(optionData.helps.find(el => el.name === 'all_login_required_popup_guest'));
                this.popupLoginDialog.open();
            }
        }

        const customPracticePressed = () => {
            if(user) {
                if (user.membership.length > 0) {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "PracticeMember",
                        })
                    )
                } else {
                    setHelpModal(optionData.helps.find(el => el.name === 'practice_customize_popup_nonmember'));
                    this.popupPracticeDialog.open();
                }
            }else{
                setHelpModal(optionData.helps.find(el => el.name === 'all_login_required_popup_guest'));
                this.popupLoginDialog.open();
            }
        }

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                    {(optionData.goals && optionData.goals.length) || (optionData.challenges && optionData.challenges.length) ?
                        <View>
                            <EventList location={'practice'} eventsDate={optionData.goals}/>
                            <EventList location={'practice'} eventsDate={optionData.challenges}/>
                        </View>
                        : null
                    }
                    {
                        user ?
                            <PracticeTipsRow />
                            : null
                    }
                    <TouchableScale
                        onPress={personalPracticePressed}>
                        <View style={[styles.card, styles.boxShadow]}>
                            <ScalableImage
                                width={windowWidth - scale(30)}
                                source={require('../assets/images/guided-practice-banner.png')}
                                style={styles.image}
                                background={true}
                            />
                            <NotificationTabBarIcon notificationID={'guide_personal'} top={3} right={3} size={scale(15)} fontSize={10} showNumber={true} />
                        </View>
                    </TouchableScale>

                    <TouchableScale
                        onPress={groupPracticePressed}>
                        <View style={[styles.card, styles.boxShadow]}>
                            <ScalableImage
                                width={windowWidth - scale(30)}
                                source={require('../assets/images/group-practice-banner.png')}
                                style={styles.image}
                                background={true}
                            />
                        </View>
                    </TouchableScale>

                    <TouchableScale
                        onPress={customPracticePressed}>
                        <View style={[styles.card, styles.boxShadow, {marginBottom:scale(15)}]}>
                            <ScalableImage
                                width={windowWidth - scale(30)}
                                source={require('../assets/images/member-practice-banner.png')}
                                style={styles.image}
                                background={true}
                            />
                        </View>
                    </TouchableScale>
                </ScrollView>
                <Modalize
                    ref={(popupPracticeDialog) => { this.popupPracticeDialog = popupPracticeDialog; }}
                    modalHeight = {windowHeight*4/5}
                    handlePosition = "outside"
                    childrenStyle = {{backgroundColor:"#f2f2f2"}}
                    HeaderComponent={
                        <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                            <Text style={{fontSize:24}}>{helpModal.title}</Text>
                            <IconButton
                                pressHandler={() => {this.popupPracticeDialog.close();}}
                                icon={require("@src/assets/img/close.png")}
                                style={{ height: scale(16), width: scale(16) }}
                                touchableStyle={{
                                    position:"absolute", top:10, right: 10,
                                    height: scale(24),
                                    width: scale(24),
                                    backgroundColor: "#e6e6e8",
                                    alignItems: "center",
                                    borderRadius: 100,
                                    padding: scale(5),
                                }}
                            /></View>
                    }
                >
                    <View style={{flex: 1, backgroundColor:'#fff'}} >
                        <BlockScreen pageId={helpModal.id}
                                     contentInsetTop={0}
                                     contentOffsetY={0}
                                     hideTitle={true}
                                     hideNavigationHeader={true}
                                     {...props} />
                    </View>
                </Modalize>
                <Modalize
                    ref={(popupLoginDialog) => { this.popupLoginDialog = popupLoginDialog; }}
                    modalHeight = {windowHeight*2/3}
                    handlePosition = "outside"
                    childrenStyle = {{backgroundColor:"#f2f2f2"}}
                    HeaderComponent={
                        <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                            <Text style={{fontSize:24}}>{helpModal.title}</Text>
                            <IconButton
                                pressHandler={() => {this.popupLoginDialog.close();}}
                                icon={require("@src/assets/img/close.png")}
                                style={{ height: scale(16), width: scale(16) }}
                                touchableStyle={{
                                    position:"absolute", top:10, right: 10,
                                    height: scale(24),
                                    width: scale(24),
                                    backgroundColor: "#e6e6e8",
                                    alignItems: "center",
                                    borderRadius: 100,
                                    padding: scale(5),
                                }}
                            /></View>
                    }
                >
                    <LoginScreen {...props} hideForgotPassword={true} />
                </Modalize>
            </SafeAreaView>
        );
    }catch (err) {
        console.log(`${err}`);
    }

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        borderRadius: 9,
        marginLeft: 0,
        marginTop: 0,
        overflow: 'hidden',
        resizeMode: "contain",
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: scale(15),
        marginHorizontal: scale(15),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    eventRow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
    },
});
PracticesContent.navigationOptions  = ({ navigation }) => {
    let headerLeft;
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
                    tintColor={"#4942e1"}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16),
                    }}
                />
            </TouchableOpacity>
    }else{
        headerLeft=
            <TouchableScale
                onPress={() => {navigation.openDrawer()
                }}
            >
                <IconButton
                    icon={require("@src/assets/img/menu.png")}
                    tintColor={"#4942e1"}
                    style={{
                        height: 20,
                        marginLeft: 20,
                    }}
                />
                <NotificationTabBarIcon notificationID={'left_menu'}  top={0} right={0} size={scale(10)} showNumber={false} />
            </TouchableScale>
    }
    return {
        title: navigation.getParam('title'),
        headerLeft: headerLeft,
        headerRight:
            <View style={{justifyContent:"flex-end", flexDirection:"row", marginRight:15}}>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("MilestonesScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/certificate.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 5,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'milestone'}  top={0} right={0} size={scale(10)} showNumber={false} />
                </TouchableScale>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("QuestsScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/achievement-action-icon.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 5,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'quest'}  top={0} right={0} size={scale(10)} showNumber={false} />
                </TouchableScale>
            </View>
    }
};
export default PracticesContent;
