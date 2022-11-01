import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Animated,
    Easing
} from "react-native";
import {connect, useSelector} from "react-redux";
import TracksList from '../Components/TracksList';
import IconButton from "@src/components/IconButton";
import {withNavigation} from "react-navigation";
import TrackPlayer from 'react-native-track-player';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import EventList from "../Components/EventList";
import QiPointHeader from "../Components/QiPointHeader";
import analytics from '@react-native-firebase/analytics';

const PracticePersonal = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const helpData = optionData.helps.find(el => el.name === 'practice_guided_popup');
    const helpPageData = optionData.helps.find(el => el.name === 'practice_guided_empty');
    const guideReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer.guides:null);
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const [messageBarDisplay, setMessageBarDisplay] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.bounce
        }).start();
    }, []);
    const toggleHelpModal = () => {
        this.ppHelpModal.open();
    };
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'practices_basic').title,
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
            {progressReducer.completedLessons.length?
                <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                    {(optionData.goals && optionData.goals.length) ?
                        <View>
                            <EventList location={'practice_guided'} eventsDate={optionData.goals}/>
                        </View>
                        : null
                    }
                    <TracksList tracks={guideReducer} setMessageBarDisplay={setMessageBarDisplay} />
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
            <Animated.View style={[styles.messageBar, styles.boxShadow, {opacity: fadeAnim,}]}><Text style={styles.messageText}>Great! You earn more qi. Keep it up!</Text></Animated.View>
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
PracticePersonal.navigationOptions = ({ navigation }) => {
    return ({
        headerTitle: navigation.getParam('title'),
        headerLeft:
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity
                    onPress={() => {
                        TrackPlayer.reset();
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
                </TouchableOpacity>
            </View>,
        headerRight:
            <QiPointHeader />
    });
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(withNavigation(PracticePersonal));
