import React, {useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    ScrollView,
    ActivityIndicator,
    Animated
} from "react-native";
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import MemberTracksList from "../Components/MemberTracksList";
import { Modalize } from 'react-native-modalize';
import IconButton from "@src/components/IconButton";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {NavigationActions, withNavigation} from "react-navigation";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale, verticalScale} from "../Utils/scale";
import TrackPlayer from 'react-native-track-player';
import EventList from "../Components/EventList";

const PracticeMember = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const helpPageIndex = optionData.helps.findIndex(el => el.name === 'practice_guided_empty');
    const helpPageData = {title:optionData.helps[helpPageIndex].title?optionData.helps[helpPageIndex].title:'',id:optionData.helps[helpPageIndex].id};
    const emptyIndex = optionData.helps.findIndex(el => el.name === 'practice_customize_empty_member');
    const emptyData = {title:optionData.helps[emptyIndex].title?optionData.helps[emptyIndex].title:'',id:optionData.helps[emptyIndex].id};
    const [routinesLoading, setRoutinesLoading] = useState(true);
    const [helpModal, setHelpModal] = useState({title:'',id:0});
    const [messageBarDisplay, setMessageBarDisplay] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
        }).start();
    }, []);
    const fetchTracks = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/routine",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {

                dispatch({
                    type: "ONENERGY_ROUTINE_UPDATE",
                    payload: response.data
                });
                setRoutinesLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    const removeRoutine = async (item) => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/delRoutine",
                "post",
                {"routine":item},
                null,
                {},
                false
            ).then(
                setRoutinesLoading(false)
            );
        } catch (e) {
            console.error(e);
        }
    }
    const toggleHelpModal = () => {
        this.cpHelpModal.open();
    }
    const onAddPressed = async () => {
        await TrackPlayer.stop();
        await TrackPlayer.reset();

        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "EditRoutine",
                params: {
                    routine: null,
                }
            })
        );
    }
    const onEditRoutinePress = async (item, index) =>{
        await TrackPlayer.stop();
        await TrackPlayer.reset();

        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "EditRoutine",
                params: {
                    routine: item,
                    index: index,
                }
            })
        );
    }
    const onRemoveRoutine = async (item) => {
        await TrackPlayer.stop();
        await TrackPlayer.reset();


        let array = [...props.routines]; // make a separate copy of the array
        let index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            dispatch({
                type: "ONENERGY_ROUTINE_UPDATE",
                payload: array
            });
        }
        if(array.length===0){
            dispatch({
                type: 'UPDATE_USER_ROUTINE_STATUS',
                payload: false,
            });
        }
        setRoutinesLoading(true);
        removeRoutine(item).then();
    }
    useEffect(() => {
        if(!props.routines||!props.routines.length) {
            fetchTracks().then();
        }else{
            setRoutinesLoading(false);
        }
        let helpIndex;
        if(user&&user.membership.length > 0) {
            helpIndex = optionData.helps.findIndex(el => el.name === 'practice_customize_popup_member');
        }else{
            helpIndex = optionData.helps.findIndex(el => el.name === 'practice_customize_popup_nonmember');
        }
        setHelpModal({title:optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'',id:optionData.helps[helpIndex].id});
        let titleIndex = optionData.titles.findIndex(el => el.id === 'practices_member');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            toggleHelpModal: toggleHelpModal,
            onAddPressed: onAddPressed,
        });
    },[]);
    useEffect(()=>{
        if(messageBarDisplay)
        {
            setTimeout(function () {
                setMessageBarDisplay(false);
            }, 3000)
        }
    },[messageBarDisplay])
    return (
        <SafeAreaView style={styles.container}>
            {user.hasGuide>0?
                user.hasRoutine > 0 ?
                    routinesLoading ?
                        <ActivityIndicator size="large"/>
                        :
                        <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                            {(optionData.goals && optionData.goals.length) || (optionData.challenges && optionData.challenges.length) ?
                                <View style={{marginVertical:scale(5)}}>
                                    <EventList location={'practice_member'} eventsDate={optionData.goals}/>
                                    <EventList location={'practice_member'} eventsDate={optionData.challenges}/>
                                </View>
                                : null
                            }
                            <MemberTracksList onEditRoutinePress={onEditRoutinePress} onRemoveRoutine={onRemoveRoutine} setMessageBarDisplay={setMessageBarDisplay} />
                        </ScrollView>
                    :
                    <View style={{
                        flex: 1,
                        width: windowWidth
                    }}>
                        <BlockScreen pageId={emptyData.id}
                                     contentInsetTop={0}
                                     contentOffsetY={0}
                                     hideTitle={true}
                                     hideNavigationHeader={true}
                                     {...props} />
                    </View>
                :
                <View style={{
                    flex: 1,
                    width: windowWidth
                }}>
                    <BlockScreen pageId={helpPageData.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            }
            {user.hasGuide>0 && props.routines.length<5?
                <IconButton
                    pressHandler={() => {onAddPressed()}}
                    icon={require("@src/assets/img/add.png")}
                    style={{ height: 24, width: 24 }}
                    tintColor={'#FFFFFF'}
                    touchableStyle={{
                        position: "absolute",
                        backgroundColor: "#f4338f",
                        bottom:scale(80),
                        color:"white",
                        tintColor: "#FFFFFF",
                        alignItems: "center",
                        borderRadius: 100,
                        padding: 16,
                        shadowColor: "#000",
                        shadowOffset: {width: -2, height: 4},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 4,
                    }}
                />
                :null}
            <Modalize
                ref={(cpHelpModal) => { this.cpHelpModal = cpHelpModal; }}
                modalHeight = {windowHeight*4/5}
                childrenStyle = {{backgroundColor:"#f2f2f2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>{helpModal.title}</Text>
                        <IconButton
                        pressHandler={() => {this.cpHelpModal.close();}}
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
                <View style={{flex: 1, width:windowWidth}} >
                    <BlockScreen pageId={helpModal.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            </Modalize>
            {messageBarDisplay?
                <Animated.View style={[styles.messageBar, {opacity: fadeAnim}]}><Text style={styles.messageText}>Great! You just gather more qi. Keep it up!</Text></Animated.View>
                :null}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f8',
    },
    scroll_view: {
        flexGrow: 1,
    },
    messageText:{
        fontSize:scale(14),
        color: "white",
    },
    messageBar:{
        position: "absolute",
        top:10,
        backgroundColor:"#737373",
        borderColor:"#404040",
        borderRadius:9,
        paddingVertical:scale(5),
        paddingHorizontal:scale(10),
    }
});
PracticeMember.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return({
        headerTitle: navigation.getParam('title'),
        headerTitleStyle: {textAlign:'left'},
        headerLeft:
            <TouchableOpacity
                onPress={async () => {
                    await TrackPlayer.stop();
                    await TrackPlayer.reset();
                    navigation.goBack()
                }}
            >
                <IconButton
                    icon={require("@src/assets/img/arrow-back.png")}
                    tintColor={"#4942e1"}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16)
                    }}
                />
            </TouchableOpacity>,
        headerRight:
            <TouchableOpacity
                onPress={() =>  params.toggleHelpModal()}
            >
                <IconButton
                    icon={require("@src/assets/img/help.png")}
                    tintColor={"#4942e1"}
                    style={{marginRight:25,height: 20}}
                />
            </TouchableOpacity>
    })
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
    routines: state.routinesReducer.routines
});
export default connect(mapStateToProps)(withNavigation(PracticeMember));
