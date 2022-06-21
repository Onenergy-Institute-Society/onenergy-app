import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Alert,
    StyleSheet,
    View,
    SafeAreaView, Text, TouchableOpacity, Platform, ScrollView
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
import {scale, verticalScale} from "../Utils/scale";
import EventList from "../Components/EventList";
import PracticeTipsRow from "../Components/PracticeTipsRow";
import LoginScreen from "@src/containers/Custom/LoginScreen";

const PracticesScreen = props => {
    try {
        const dispatch = useDispatch();
        const {navigation} = props;
        const user = useSelector((state) => state.user.userObject);
        const [helpModal, setHelpModal] = useState({title:'',id:0});
        const optionData = useSelector((state) => state.settings.settings.onenergy_option);

        useEffect(()=>{
            let titleIndex = optionData.titles.findIndex(el => el.id === 'practices_title');
            props.navigation.setParams({
                title: optionData.titles[titleIndex].title,
            });
        },[])

        const personalPracticePressed = () => {
            if(user)
            {
                dispatch({
                    type: 'NOTIFICATION_CLEAR',
                    payload: 'guide_personal'
                });
                navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticePersonal",
                    })
                )
            }else{
                let helpIndex = optionData.helps.findIndex(el => el.name === 'all_login_required_popup_guest');
                setHelpModal({title: optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'', id: optionData.helps[helpIndex].id});
                this.popupPracticeDialog.open();
            }
        }

        const groupPracticePressed = () => {
            if(user)
            {
                if(user.firstCourseCompleted) {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "PracticeGroup",
                        })
                    )
                }else{
                    Alert.alert(
                        "Notice",
                        "Please finish introduction course first.",
                        [
                            {
                                text: "Ok",
                            },
                        ]
                    );
                }
            }else{
                let helpIndex = optionData.helps.findIndex(el => el.name === 'all_login_required_popup_guest');
                setHelpModal({title: optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'', id: optionData.helps[helpIndex].id});
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
                    let helpIndex = optionData.helps.findIndex(el => el.name === 'practice_customize_popup_nonmember');
                    setHelpModal({title: optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'', id: optionData.helps[helpIndex].id});
                    this.popupPracticeDialog.open();
                }
            }else{
                let helpIndex = optionData.helps.findIndex(el => el.name === 'all_login_required_popup_guest');
                setHelpModal({title: optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'', id: optionData.helps[helpIndex].id});
                this.popupLoginDialog.open();
            }
        }

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {user?
                        (optionData.goals&&optionData.goals.length)||(optionData.challenges&&optionData.challenges.length)?
                            <View style={{marginVertical:verticalScale(5)}}>
                                <EventList location={'practice'} eventsDate={optionData.goals} />
                                <EventList location={'practice'} eventsDate={optionData.challenges} />
                            </View>
                        :null
                    :null}
                    <TouchableScale
                        onPress={personalPracticePressed}>
                        <View style={[styles.card, styles.boxShadow]}>
                            <ScalableImage
                                width={windowWidth - scale(30)}
                                source={{uri: optionData.personal_practice ? optionData.personal_practice : null}}
                                style={styles.image}
                            />
                            <NotificationTabBarIcon notificationID={'guide_personal'} top={3} right={3} size={15} fontSize={10} showNumber={true} />
                        </View>
                    </TouchableScale>

                    <TouchableScale
                        onPress={groupPracticePressed}>
                        <View style={[styles.card, styles.boxShadow]}>
                            <ScalableImage
                                width={windowWidth - scale(30)}
                                source={{uri: optionData.group_practice ? optionData.group_practice : null}}
                                style={styles.image}
                            />
                        </View>
                    </TouchableScale>

                    <TouchableScale
                        onPress={customPracticePressed}>
                        <View style={[styles.card, styles.boxShadow]}>
                            <ScalableImage
                                width={windowWidth - scale(30)}
                                source={{uri: optionData.member_practice ? optionData.member_practice : null}}
                                style={styles.image}
                            />
                        </View>
                    </TouchableScale>
                    {user?
                        <View style={styles.eventRow}>
                            <PracticeTipsRow />
                        </View>
                    :null
                    }
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
                    <View style={{flex: 1, backgroundColor:'#fff', width:windowWidth, marginTop:Platform.OS === 'android'?verticalScale(-100):0}} >
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
                    modalHeight = {windowHeight*4/5}
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
                    <LoginScreen {...props} />
                </Modalize>
            </SafeAreaView>
        );
    }catch (e) {
        console.log(e)
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
        marginBottom: verticalScale(15),
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
    },
});
PracticesScreen.navigationOptions  = ({ navigation }) => {
    const {params = {}} = navigation.state;
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
                    tintColor={"#4942e1"}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16),
                    }}
                />
            </TouchableOpacity>
    }
    return {
        title: navigation.getParam('title'),
        headerLeft: headerLeft,
    }
};
export default PracticesScreen;
