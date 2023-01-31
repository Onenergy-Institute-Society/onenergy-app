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
import {withNavigation} from "react-navigation";
import TrackPlayer from 'react-native-track-player';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {s, windowWidth} from "../Utils/Scale";
import EventList from "../Components/EventList";
import QiPointHeader from "../Components/QiPointHeader";
import {SvgIconBack} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

const PracticePersonal = props => {
    const {screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const helpPageData = optionData.helps.find(el => el.name === 'practice_guided_empty');
    const guideReducer = useSelector((state) => state.onenergyAppReducer?state.onenergyAppReducer.practiceReducer.guides:null);
    const progressReducer = useSelector((state) => state.onenergyAppReducer?state.onenergyAppReducer.progressReducer:null);
    const [messageBarDisplay, setMessageBarDisplay] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    Analytics.segmentClient.screen('Practices Guided').then();

    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'practices_basic').title,
       });
   }, []);
    useEffect(()=>{
        if(messageBarDisplay)
        {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.bounce
           }).start();
            setTimeout(function () {
                setMessageBarDisplay(false);
           }, 3000)
       }
   },[messageBarDisplay])
    return (
        <SafeAreaView style={global.container}>
            {progressReducer.completedLessons&&progressReducer.completedLessons.length?
                <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                    {(optionData.goalCards && optionData.goalCards.length) ?
                        <View>
                            <EventList location={'practice_guided'} {...props}/>
                        </View>
                        : null
                   }
                    <TracksList tracks={guideReducer} setMessageBarDisplay={setMessageBarDisplay} {...props}/>
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
                                 {...props}/>
                </View>
           }
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
      fontSize:s(18),
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
        top:s(15),
        left:s(15),
        right:s(15),
        backgroundColor:"#737373",
        borderColor:"#404040",
        borderRadius:s(9),
        paddingVertical:s(10),
        paddingHorizontal:s(15),
   }
});
PracticePersonal.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    return {
        headerTitle: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
       },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity
                    onPress={() => {
                        TrackPlayer.reset();
                        navigation.goBack();
                   }}
                >
                    <SvgIconBack color = {colors.headerIconColor}/>
                </TouchableOpacity>
            </View>,
        headerRight:
            <QiPointHeader {...screenProps}/>
   }
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(withNavigation(PracticePersonal));
