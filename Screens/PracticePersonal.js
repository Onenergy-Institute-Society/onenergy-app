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
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import EventList from "../Components/EventList";
import QiPointHeader from "../Components/QiPointHeader";
import analytics from '@react-native-firebase/analytics';
import Svg, {Path} from "react-native-svg";

const PracticePersonal = props => {
    const {screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const helpPageData = optionData.helps.find(el => el.name === 'practice_guided_empty');
    const guideReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer.guides:null);
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const [messageBarDisplay, setMessageBarDisplay] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Personal Practice Screen',
    });

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.bounce
        }).start();
    }, []);
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'practices_basic').title,
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
        <SafeAreaView style={global.container}>
            {progressReducer.completedLessons.length?
                <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                    {(optionData.goals && optionData.goals.length) ?
                        <View>
                            <EventList location={'practice_guided'} {...props} />
                        </View>
                        : null
                    }
                    <TracksList tracks={guideReducer} setMessageBarDisplay={setMessageBarDisplay} {...props} />
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
        top:scale(15),
        left:scale(15),
        right:scale(15),
        backgroundColor:"#737373",
        borderColor:"#404040",
        borderRadius:9,
        paddingVertical:scale(10),
        paddingHorizontal:scale(15),
    }
});
PracticePersonal.navigationOptions = ({ navigation, screenProps }) => {
    const {colors, global} = screenProps;
    return ({
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
                    <Svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        style={{marginLeft:scale(10)}}
                    >
                        <Path d="m15 18-6-6 6-6"
                              fill="none"
                              stroke={screenProps.colors.headerIconColor}
                              strokeWidth="2"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>,
        headerRight:
            <QiPointHeader {...screenProps} />
    });
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(withNavigation(PracticePersonal));
