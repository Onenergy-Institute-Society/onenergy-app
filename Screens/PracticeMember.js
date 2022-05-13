import React, {useEffect, useState} from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform
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
import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player';
import * as Progress from 'react-native-progress';
import EventList from "../Components/EventList";

const PracticeMember = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userObject);

    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const helpPageIndex = optionData.helps.findIndex(el => el.name === 'practice_guided_empty');
    const helpPageData = {title:optionData.helps[helpPageIndex].title?optionData.helps[helpPageIndex].title:'',id:optionData.helps[helpPageIndex].id};
    const emptyIndex = optionData.helps.findIndex(el => el.name === 'practice_customize_empty_member');
    const emptyData = {title:optionData.helps[emptyIndex].title?optionData.helps[emptyIndex].title:'',id:optionData.helps[emptyIndex].id};
    const [routinesLoading, setRoutinesLoading] = useState(true);
    const [helpModal, setHelpModal] = useState({title:'',id:0});
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
    const onAddPressed = () => {
        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "EditRoutine",
                params: {
                    routine: null,
                }
            })
        );
    }
    const onEditRoutinePress = (item, index) =>{
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
    const onRemoveRoutine = (item) => {
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
        fetchTracks().then();
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginVertical:verticalScale(5)}}>
                <EventList location={'practice_member'} eventsData={optionData.goals} />
                <EventList location={'practice_member'} eventsData={optionData.challenges} />
            </View>
            {user.hasGuide>0?
                <>
                    {user.hasRoutine > 0 ?
                        routinesLoading ?
                            <View style={{
                                flex: 1,
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                            }}><Text style={{fontSize: scale(14), color: "#4942e1"}}>Loading</Text><Progress.Bar
                                indeterminate={true} progress={1} size={50} borderColor={"#4942e1"}
                                color={"#4942e1"}/></View>
                            :
                            <MemberTracksList onEditRoutinePress={onEditRoutinePress} onRemoveRoutine={onRemoveRoutine}/>
                        :
                        <View style={{
                            flex: 1,
                            width: windowWidth,
                            marginTop: Platform.OS === 'android' ? verticalScale(-100) : 0
                        }}>
                            <BlockScreen pageId={emptyData.id}
                                         contentInsetTop={0}
                                         contentOffsetY={0}
                                         hideTitle={true}
                                         hideNavigationHeader={true}
                                         {...props} />
                        </View>
                    }
                    {props.routines.length<5?
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
                </>
                :
                <View style={{
                    flex: 1,
                    width: windowWidth,
                    marginTop: Platform.OS === 'android' ? verticalScale(-100) : 0
                }}>
                    <BlockScreen pageId={helpPageData.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            }
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
                <View style={{flex: 1, width:windowWidth, marginTop:Platform.OS === 'android'?verticalScale(-100):0}} >
                    <BlockScreen pageId={helpModal.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            </Modalize>
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
});
PracticeMember.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return({
        headerTitle: navigation.getParam('title'),
        headerTitleStyle: {textAlign:'left'},
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    TrackPlayer.stop();
                    TrackPlayer.reset();
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
    routines: state.routinesReducer.data
});
export default connect(mapStateToProps)(withNavigation(PracticeMember));
