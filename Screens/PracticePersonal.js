import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    Platform,
    ScrollView,
    ActivityIndicator,
    Animated
} from "react-native";
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import TracksList from '../Components/TracksList';
import IconButton from "@src/components/IconButton";
import {withNavigation} from "react-navigation";
import TrackPlayer from 'react-native-track-player';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale, verticalScale} from "../Utils/scale";
import EventList from "../Components/EventList";

const PracticePersonal = props => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const helpIndex = optionData.helps.findIndex(el => el.name === 'practice_guided_popup');
    const helpData = {title:optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'',id:optionData.helps[helpIndex].id};
    const helpPageIndex = optionData.helps.findIndex(el => el.name === 'practice_guided_empty');
    const helpPageData = {title:optionData.helps[helpPageIndex].title?optionData.helps[helpPageIndex].title:'',id:optionData.helps[helpPageIndex].id};
    const [tracks, setTracks] = useState([]);
    const [tracksLoading, setTracksLoading] = useState(true);
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
                "wp-json/onenergy/v1/audio",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                dispatch({
                    type: "ONENERGY_GUIDE_UPDATE",
                    payload: response.data
                });
                setTracks(response.data);
                setTracksLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    const toggleHelpModal = () => {
        this.ppHelpModal.open();
    };
    useEffect(() => {
        if(!props.guides||!props.guides.length) {
            fetchTracks().then();
        }else{
            setTracks(props.guides);
            setTracksLoading(false);
        }
        let titleIndex = optionData.titles.findIndex(el => el.id === 'practices_basic');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            toggleHelpModal: toggleHelpModal,
        });
    }, []);
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
            {user&&user.hasGuide>0||tracks.length?
                tracksLoading ?
                    <ActivityIndicator size="large"/>
                :
                    <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                        {(optionData.goals && optionData.goals.length) || (optionData.challenges && optionData.challenges.length) ?
                            <View>
                                <EventList location={'practice_guided'} eventsDate={optionData.goals}/>
                                <EventList location={'practice_guided'} eventsDate={optionData.challenges}/>
                            </View>
                            : null
                        }
                        <TracksList tracks={tracks} setMessageBarDisplay={setMessageBarDisplay} />
                    </ScrollView>
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
            <Modalize
                ref={(ppHelpModal) => { this.ppHelpModal = ppHelpModal; }}
                modalHeight = {windowHeight*4/5}
                childrenStyle = {{backgroundColor:"#f2f2f2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>{helpData.title}</Text>
                        <IconButton
                            pressHandler={() => {this.ppHelpModal.close();}}
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
                        />
                    </View>
                }
            >
                <View style={{flex: 1, width:windowWidth}} >
                    <BlockScreen pageId={helpData.id}
                         contentInsetTop={0}
                         contentOffsetY={0}
                         hideTitle={true}
                         hideNavigationHeader={true}
                         {...props} />
                </View>
            </Modalize>
            {messageBarDisplay?
            <Animated.View style={[styles.messageBar, {opacity: fadeAnim,}]}><Text style={styles.messageText}>Great! You just gather more qi. Keep it up!</Text></Animated.View>
                :null}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
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
PracticePersonal.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return ({
        headerTitle: navigation.getParam('title'),
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
                onPress={() => params.toggleHelpModal()}
            >
                <IconButton
                    icon={require("@src/assets/img/help.png")}
                    tintColor={"#4942e1"}
                    style={{marginRight: 25, height: 20}}
                />
            </TouchableOpacity>
    });
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
    guides: state.routinesReducer.guides
});
export default connect(mapStateToProps)(withNavigation(PracticePersonal));
