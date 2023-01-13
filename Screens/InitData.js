import React, {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    StyleSheet,
    SafeAreaView, View, Text, Modal, ImageBackground, BackHandler, ActivityIndicator
} from "react-native";
import {getApi} from "@src/services";
import {scale} from '../Utils/scale';

const InitData = (props) => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const practiceReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer:null);
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer:null);
    const postReducer = useSelector((state) => state.postReducer?state.postReducer:null);
    const dispatch = useDispatch();

    const fetchInitDate = async (loadGroup, loadGuide, loadAchievement, loadProgress) => {
        try {
            const api = getApi(props.config);
            const data = await api.customRequest(
                "wp-json/onenergy/v1/initData/",
                "get",       // get, post, patch, delete etc.
                {'loadGroup':loadGroup, 'loadGuide': loadGuide, 'loadAchievement': loadAchievement, 'loadProgress': loadProgress},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            dispatch({
                type: "ONENERGY_INIT_DATA",
                payload:
                    {
                        'data':data,
                        'loadGroup':loadGroup,
                        'loadGuide': loadGuide,
                        'loadAchievement': loadAchievement,
                        'loadProgress': loadProgress
                   }
           });
       } catch (e) {
            console.error(e);
       }
   }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        let loadGroup = false, loadGuide = false, loadAchievement = false, loadProgress = false;
        if (optionData.cache.guide && practiceReducer.guideUpdate && optionData.cache.guide > practiceReducer.guideUpdate || !practiceReducer.guideUpdate) {
            loadGuide = true;
       }
        if (optionData.cache.group && practiceReducer.groupUpdate && optionData.cache.group > practiceReducer.groupUpdate || !practiceReducer.groupUpdate) {
            loadGroup = true;
       }
        if (optionData.cache.achievement && achievementReducer.achievementUpdate && optionData.cache.achievement > achievementReducer.achievementUpdate || !achievementReducer.achievementUpdate) {
            loadAchievement = true;
       }
        if (optionData.cache.progress && progressReducer.progressUpdate && optionData.cache.progress > progressReducer.progressUpdate || !progressReducer.progressUpdate) {
            loadProgress = true;
       }
        if (loadGuide || loadGroup || loadAchievement || loadProgress) {
            fetchInitDate(loadGroup, loadGuide, loadAchievement, loadProgress).then();
       }
        if (optionData.cache.post && postReducer.postUpdate && optionData.cache.post > postReducer.postUpdate || !postReducer.postUpdate) {
            dispatch({
                type: 'ONENERGY_POSTS_RESET',
           });
       }
        return () => {
            backHandler.remove();
       }
   }, []);

    useEffect(()=>
    {
        let loaded = true;
        console.log(achievementReducer.achievementUpdate, optionData.cache.achievement)
        if (achievementReducer.achievementUpdate < optionData.cache.achievement) {
            loaded = false;
       }
        console.log(achievementReducer.progressUpdate, optionData.cache.progress)
        if (progressReducer.progressUpdate < optionData.cache.progress) {
            loaded = false;
       }
        console.log(achievementReducer.guideUpdate, optionData.cache.guide)
        if (practiceReducer.guideUpdate < optionData.cache.guide) {
            loaded = false;
       }
        console.log(achievementReducer.groupUpdate, optionData.cache.group)
        if (practiceReducer.groupUpdate < optionData.cache.group) {
            loaded = false;
       }
        if (loaded) {
            navigation.goBack();
       }
   },[achievementReducer.achievementUpdate, progressReducer.progressUpdate, practiceReducer.groupUpdate, practiceReducer.guideUpdate])

    return (
        <SafeAreaView style={global.container}>
            <ImageBackground resizeMode="cover" style={{flex:1, justifyContent:"center", alignItems:"center"}} source={require('../assets/images/5-1024x683.jpg')}>
                <Text style={[global.appHeaderTitle, {color:"white"}]}>Loading data...</Text><ActivityIndicator size="large"/>
            </ImageBackground>
        </SafeAreaView>
    );
};
InitData.navigationOptions = {header: null,initialRouteParams: {transition: 'fade'},};
const mapStateToProps = (state) => ({
    config: state.config?state.config:null,
    accessToken: state.auth.token?state.auth.token:null,
});
export default connect(mapStateToProps)(InitData);