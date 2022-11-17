import React, {useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
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
import {scale} from "../Utils/scale";
import TrackPlayer from 'react-native-track-player';
import EventList from "../Components/EventList";
import analytics from '@react-native-firebase/analytics';

const PracticeMember = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyData = optionData.helps.find(el => el.name === 'practice_customize_empty_member');
    const practiceReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer:null);
    const [helpModal, setHelpModal] = useState({title:'',id:0});
    const [messageBarDisplay, setMessageBarDisplay] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Custom Routine Screen',
    });

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
        }).start();
    }, []);
    const fetchTracks = async () => {
        try {
            const apiRoutines = getApi(props.config);
            const data = await apiRoutines.customRequest(
                "wp-json/onenergy/v1/routine",
                "get",
                {},
                null,
                {},
                false
            ).then(response => response.data);
            dispatch({
                type: "ONENERGY_ROUTINE_UPDATE",
                payload: data
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
            ).then();
        } catch (e) {
            console.error(e);
        }
    }
    const toggleHelpModal = () => {
        this.cpHelpModal.open();
    }
    const onAddPressed = async () => {
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
        await TrackPlayer.reset();

        let array = practiceReducer.routines; // make a separate copy of the array
        let index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            dispatch({
                type: "ONENERGY_ROUTINE_UPDATE",
                payload: array
            });
        }
        removeRoutine(item).then();
    }
    useEffect(() => {
        if(!practiceReducer||!practiceReducer.routines||!practiceReducer.routines.length)
            fetchTracks().then();
        if(user&&user.membership.length > 0) {
            setHelpModal(optionData.helps.find(el => el.name === 'practice_customize_popup_member'));
        }else{
            setHelpModal(optionData.helps.find(el => el.name === 'practice_customize_popup_nonmember'));
        }
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'practices_member').title,
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
            {practiceReducer&&practiceReducer.guides&&practiceReducer.guides.length?
                practiceReducer&&practiceReducer.routines&&practiceReducer.routines.length?
                    <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                        {optionData.goals && optionData.goals.length?
                            <View>
                                <EventList location={'practice_member'} />
                            </View>
                            : null
                        }
                        <MemberTracksList onEditRoutinePress={onEditRoutinePress} onRemoveRoutine={onRemoveRoutine} setMessageBarDisplay={setMessageBarDisplay} />
                    </ScrollView>
                    :
                    <ActivityIndicator size="large"/>
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
            }
            {(practiceReducer && practiceReducer.routines && practiceReducer.routines.length<5) || !practiceReducer.routines?
                <IconButton
                    pressHandler={() => {onAddPressed().then()}}
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
                childrenStyle = {{backgroundColor:"#F8F0E2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, backgroundColor:'#FFFFEF', borderBottomColor:'#4A4D34'}}>
                        <Text style={{fontSize:24, color: '#4A4D34'}}>{helpModal.title}</Text>
                        <IconButton
                        pressHandler={() => {this.cpHelpModal.close();}}
                        icon={require("@src/assets/img/close.png")}
                        tintColor={'#FFFFFF'}
                        style={{ height: scale(16), width: scale(16) }}
                        touchableStyle={{
                            position:"absolute", top:10, right: 10,
                            height: scale(24),
                            width: scale(24),
                            backgroundColor: "#4A4D34",
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
                <Animated.View style={[styles.messageBar, {opacity: fadeAnim}]}><Text style={styles.messageText}>Great! You earn more qi. Keep it up!</Text></Animated.View>
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
        fontSize:scale(18),
        color: "white",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    messageBar:{
        position: "absolute",
        top:15,
        backgroundColor:"#737373",
        borderColor:"#404040",
        borderRadius:9,
        paddingVertical:scale(10),
        paddingHorizontal:scale(15),
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
                    await TrackPlayer.reset();
                    navigation.goBack();
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
});
export default connect(mapStateToProps)(withNavigation(PracticeMember));
