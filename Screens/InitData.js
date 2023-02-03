import React, {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    SafeAreaView, Text, ImageBackground, BackHandler, ActivityIndicator
} from "react-native";
import {getApi} from "@src/services";
import * as Analytics from "../Utils/Analytics";

const InitData = (props) => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const practiceReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.practiceReducer : null);
    const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
    const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer : null);
    const postsReducer = useSelector((state) => state.postsReducer ? state.postsReducer : null);
    const dispatch = useDispatch();

    const fetchInitDate = async (loadGroup, loadGuide, loadRoutine, loadAchievement, loadProgress) => {
        try {
            const api = getApi(props.config);
            const data = await api.customRequest(
                "wp-json/onenergy/v1/initData/",
                "get",       // get, post, patch, delete etc.
                {
                    'loadGroup': loadGroup,
                    'loadGuide': loadGuide,
                    'loadRoutine': loadRoutine,
                    'loadAchievement': loadAchievement,
                    'loadProgress': loadProgress
                },               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            dispatch({
                type: "ONENERGY_INIT_DATA",
                payload:
                    {
                        'data': data,
                        'loadGroup': loadGroup,
                        'loadGuide': loadGuide,
                        'loadRoutine': loadRoutine,
                        'loadAchievement': loadAchievement,
                        'loadProgress': loadProgress
                    }
            });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if(user.id)
            Analytics.segmentClient.identify(user.id, {
                username: user.slug,
                name: user.name,
            }).then();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        let loadGroup = false, loadGuide = false, loadRoutine = false, loadAchievement = false, loadProgress = false;
        if (optionData.cache.guideCache && practiceReducer.guideUpdate && optionData.cache.guideCache > practiceReducer.guideUpdate || !practiceReducer.guideUpdate) {
            loadGuide = true;
        }
        if (optionData.cache.groupCache && practiceReducer.groupUpdate && optionData.cache.groupCache > practiceReducer.groupUpdate || !practiceReducer.groupUpdate) {
            loadGroup = true;
        }
        if (optionData.cache.routineCache && practiceReducer.routineUpdate && optionData.cache.routineCache > practiceReducer.routineUpdate || !practiceReducer.routineUpdate) {
            loadRoutine = true;
        }
        if (optionData.cache.achievementCache && achievementReducer.achievementUpdate && optionData.cache.achievementCache > achievementReducer.achievementUpdate || !achievementReducer.achievementUpdate) {
            loadAchievement = true;
        }
        if (optionData.cache.progressCache && progressReducer.progressUpdate && optionData.cache.progressCache > progressReducer.progressUpdate || !progressReducer.progressUpdate) {
            loadProgress = true;
        }
        console.log('loadGuide', loadGuide , 'loadGroup',  loadGroup , 'loadRoutine', loadRoutine ,'loadAchievement', loadAchievement , 'loadProgress', loadProgress);
        if (loadGuide || loadGroup || loadRoutine || loadAchievement || loadProgress) {
            fetchInitDate(loadGroup, loadGuide, loadRoutine, loadAchievement, loadProgress).then();
        }
        if (optionData.cache.postCache && postsReducer.postUpdate && optionData.cache.postCache > postsReducer.postUpdate || !postsReducer.postUpdate) {
            dispatch({
                type: 'ONENERGY_POSTS_RESET',
            });
        }
        return () => {
            backHandler.remove();
        }
    }, []);

    useEffect(() => {
        let loaded = true;
        console.log('achievementUpdate', achievementReducer.achievementUpdate, optionData.cache.achievementCache);
        if (achievementReducer.achievementUpdate < optionData.cache.achievementCache) {
            loaded = false;
        }
        console.log('progressUpdate', progressReducer.progressUpdate, optionData.cache.progressCache);
        if (progressReducer.progressUpdate < optionData.cache.progressCache) {
            loaded = false;
        }
        console.log('guideUpdate', practiceReducer.guideUpdate, optionData.cache.guideCache);
        if (practiceReducer.guideUpdate < optionData.cache.guideCache) {
            loaded = false;
        }
        console.log('groupUpdate', practiceReducer.groupUpdate, optionData.cache.groupCache);
        if (practiceReducer.groupUpdate < optionData.cache.groupCache) {
            loaded = false;
        }
        console.log('routineUpdate', practiceReducer.routineUpdate, optionData.cache.routineCache);
        if (practiceReducer.routineUpdate < optionData.cache.routineCache) {
            loaded = false;
        }
        if (loaded) {
            navigation.goBack();
        }
    }, [achievementReducer.achievementUpdate, progressReducer.progressUpdate, practiceReducer.routineUpdate, practiceReducer.groupUpdate, practiceReducer.guideUpdate])

    return (
        <SafeAreaView style={global.container}>
            <ImageBackground resizeMode="cover" style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                             source={require('../assets/images/5-1024x683.jpg')}>
                <Text style={[global.appHeaderTitle, {color: "white"}]}>Loading data...</Text><ActivityIndicator
                size="large"/>
            </ImageBackground>
        </SafeAreaView>
    );
};
InitData.navigationOptions = {header: null, initialRouteParams: {transition: 'fade'},};
const mapStateToProps = (state) => ({
    config: state.config ? state.config : null,
    accessToken: state.auth.token ? state.auth.token : null,
});
export default connect(mapStateToProps)(InitData);