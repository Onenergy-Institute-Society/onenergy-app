import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {ActivityIndicator, BackHandler, ImageBackground, SafeAreaView, Text} from "react-native";
import {getApi} from "@src/services";
import messaging from '@react-native-firebase/messaging';
import {languages} from "../Utils/Settings";

const InitData = (props) => {
    const {screenProps} = props;
    const {global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const defaultLanguage = useSelector((state) => state.settingReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const cacheData = useSelector((state) => state.settings.settings.onenergy_cache);
    const practiceReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.practiceReducer : null);
    const progressReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.progressReducer : null);
    const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer : null);
    const postsReducer = useSelector((state) => state.postsReducer ? state.postsReducer : null);
    const dispatch = useDispatch();

    const fetchInitDate = async (loadGroup, loadGuide, loadRoutine, loadAchievement, loadProgress) => {
        try {
            const {customRequest} = getApi(props.config);
            const data = await customRequest(
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
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('messaging', remoteMessage)
            const data = remoteMessage.data;
            if (data.notification_type && data.notification_type === 'pn_functions') {
                switch (data.function_type) {
                    case "survey_vip":
                        dispatch({
                            type: 'USER_VIP_SURVEY_COMPLETED',
                        });
                        if(!(user.membership && user.membership.length)){
                            dispatch({
                                type: 'SETTINGS_ADD_VOUCHER_NOTIFICATION',
                                payload: data.extra_data
                            });
                        }
                        break;
                    case "profile_updated":
                        dispatch({
                            type: 'USER_PROFILE_UPDATED',
                        });
                        break;
                }
            }
        });
        if(user.id) {
            if(user.language!==defaultLanguage.abbr){
                let newLang = languages.find(lang=>lang.abbr===user.language)
                if(newLang){
                    dispatch({
                        type: 'ONENERGY_DEFAULT_LANGUAGE',
                        payload: newLang
                    });
                }
            }
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        let loadGroup = false, loadGuide = false, loadRoutine = false, loadAchievement = false, loadProgress = false;
        if (cacheData.guideCache && practiceReducer.guideUpdate && cacheData.guideCache > practiceReducer.guideUpdate || !practiceReducer.guideUpdate) {
            loadGuide = true;
        }
        if (cacheData.groupCache && practiceReducer.groupUpdate && cacheData.groupCache > practiceReducer.groupUpdate || !practiceReducer.groupUpdate) {
            loadGroup = true;
        }
        if (cacheData.routineCache && practiceReducer.routineUpdate && cacheData.routineCache > practiceReducer.routineUpdate || !practiceReducer.routineUpdate) {
            loadRoutine = true;
        }
        if (cacheData.achievementCache && achievementReducer.achievementUpdate && cacheData.achievementCache > achievementReducer.achievementUpdate || !achievementReducer.achievementUpdate) {
            loadAchievement = true;
        }
        if (cacheData.progressCache && progressReducer.progressUpdate && cacheData.progressCache > progressReducer.progressUpdate || !progressReducer.progressUpdate) {
            loadProgress = true;
        }
        console.log('loadGuide', loadGuide , 'loadGroup',  loadGroup , 'loadRoutine', loadRoutine ,'loadAchievement', loadAchievement , 'loadProgress', loadProgress);
        if (loadGuide || loadGroup || loadRoutine || loadAchievement || loadProgress) {
            fetchInitDate(loadGroup, loadGuide, loadRoutine, loadAchievement, loadProgress).then();
        }else{
            props.navigation.navigate("Main");
        }
        if (cacheData.postCache && postsReducer.postUpdate && cacheData.postCache > postsReducer.postUpdate || !postsReducer.postUpdate) {
            dispatch({
                type: 'ONENERGY_POSTS_RESET',
            });
        }
        return () => {
            backHandler.remove();
            unsubscribe.remove();
        }
    }, []);

    useEffect(() => {
        let loaded = true;
        console.log('achievementUpdate', achievementReducer.achievementUpdate, cacheData.achievementCache);
        if (achievementReducer.achievementUpdate < cacheData.achievementCache) {
            loaded = false;
        }
        console.log('progressUpdate', progressReducer.progressUpdate, cacheData.progressCache);
        if (progressReducer.progressUpdate < cacheData.progressCache) {
            loaded = false;
        }
        console.log('guideUpdate', practiceReducer.guideUpdate, cacheData.guideCache);
        if (practiceReducer.guideUpdate < cacheData.guideCache) {
            loaded = false;
        }
        console.log('groupUpdate', practiceReducer.groupUpdate, cacheData.groupCache);
        if (practiceReducer.groupUpdate < cacheData.groupCache) {
            loaded = false;
        }
        console.log('routineUpdate', practiceReducer.routineUpdate, cacheData.routineCache);
        if (practiceReducer.routineUpdate < cacheData.routineCache) {
            loaded = false;
        }
        if (loaded) {
            console.log('home')
            props.navigation.navigate("Main");
        }
    }, [achievementReducer.achievementUpdate, progressReducer.progressUpdate, practiceReducer.routineUpdate, practiceReducer.groupUpdate, practiceReducer.guideUpdate])

    return (
        <SafeAreaView style={global.container}>
            <ImageBackground resizeMode="cover" style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                             source={require('../assets/images/5-1024x683.jpg')}>
                <Text style={[global.appHeaderTitle, {color: "white"}]}>{optionData.titles.find(el => el.id === 'init_data_loading').title}</Text><ActivityIndicator
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