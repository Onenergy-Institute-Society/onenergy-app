import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,
    Text,
    PixelRatio,
    Alert,
    BackHandler
} from "react-native";
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import Video from "react-native-video";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import WaitingGroupPractice from "./WaitingGroupPractice";
import moment from 'moment';

const VideoPlayer = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const achievementReducer = useSelector((state) => state.onenergyReducer.achievementReducer.achievements);
    const practiceReducer = useSelector((state) => state.onenergyReducer.practiceReducer);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const [paused, setPaused] = useState(false);
    const {navigation} = props;
    const seek = navigation.getParam('seek');
    const groupPractice = navigation.getParam('group');
    const gp_time = navigation.getParam('gp_time');
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const dispatch = useDispatch();

    useEffect(()=>{
        activateKeepAwake();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            backHandler.remove();
            deactivateKeepAwake();
        }
    }, []);

    const onVideoEnd = () => {
        setPaused(true);
        deactivateKeepAwake();
        updateProgress().then();
        navigation.goBack();
    }

    const onVideoLoad = (e) => {
        if (seek) {
            this.videoPlayer.seek(seek);
        }
    }

    const updateProgress = async () => {
        try
        {
            let achievements = [];

            let completedAchievements;

            groupPractice.meta_box.guides.map(guideId =>{
                let sectionId;
                let tempGuide;

                practiceReducer.guides.map((section) => {
                    tempGuide = section.data.find(item => item.id === guideId);
                    if (tempGuide)
                        sectionId = section.id
                });

                    let tmpMilestone = achievementReducer.filter(milestone =>
                        (milestone.trigger === 'practice' &&
                            ((milestone.triggerPracticeOption === 'single' && (parseInt(milestone.triggerSinglePractice) === guideId || !milestone.triggerSinglePractice)) ||
                                (milestone.triggerPracticeOption === 'section' && (parseInt(milestone.triggerSectionPractice) === sectionId || !milestone.triggerSectionPractice))) &&
                            !milestone.complete_date)
                    );
                    tmpMilestone.map((item) => {
                        let complete = false;
                        if (parseInt(item.total) <= parseInt(item.step) + 1) {
                            complete = true;
                            achievements.push({
                                [item.id]: {
                                    "type": "milestone",
                                    "complete_date": Math.floor(new Date().getTime() / 1000)
                                }
                            });
                        }
                        dispatch({
                            type: 'ONENERGY_ACHIEVEMENT_COMPLETE_PRACTICE',
                            payload: {
                                "milestone": item.id,
                                "step": item.step + 1,
                                "complete": complete
                            }
                        });
                    })

                let tmpQuest = achievementReducer.daily.filter(quest => {
                    if ((quest.trigger === 'practice' &&
                        ((quest.triggerPracticeOption === 'single' && (parseInt(quest.triggerSinglePractice) === guideId || !quest.triggerSinglePractice)) ||
                            (quest.triggerPracticeOption === 'section' && (parseInt(quest.triggerSectionPractice) === sectionId || !quest.triggerSectionPractice)))))
                        if (!quest.complete_date) {
                            return true
                        } else {
                            let complete_date = new moment.unix(quest.complete_date).format('YYYY-MM-DD');
                            let today = new moment().format('YYYY-MM-DD');
                            return complete_date !== today;
                        }
                });

                tmpQuest.map((item) => {
                    let complete = false;
                    if (parseInt(item.total) <= parseInt(item.step) + 1) {
                        complete = true;
                        achievements.push({
                            [item.id]: {
                                "type": "quest",
                                "complete_date": Math.floor(new Date().getTime() / 1000)
                            }
                        });
                    }
                    dispatch({
                        type: 'ONENERGY_ACHIEVEMENT_COMPLETE_PRACTICE',
                        payload: {
                            "quest": item.id,
                            "step": parseInt(item.step) + 1,
                            "complete": complete
                        }
                    });
                })

                dispatch({
                    type: 'ONENERGY_PROGRESS_UPDATE',
                    payload: {
                        "mode": 'PP',
                        "item": sectionId,
                        "count": 1,
                        "duration": tempGuide.duration
                    }
                });

                const apiRequest = getApi(props.config);
                apiRequest.customRequest(
                    "wp-json/onenergy/v1/statsUpdate",
                    "post",
                    {
                        "mode": "PP",
                        "data": guideId,
                        "stats": progressReducer,
                        "achievements": achievements
                    },
                    null,
                    {},
                    false
                );
            })

        } catch (e) {
            console.error(e);
        }
    }

    const handleBackButtonClick = () => {
        Alert.alert(
            "Please Confirm",
            optionData.testing_mode?"Testing mode: Update progress and exit?":"Stop before session ends will result not counting as one complete practice, are you sure you want to exit?",
            [
                {
                    text: "OK", onPress: () => {
/*                        optionData.testing_mode?
                            updateProgress().then():null;*/
                        navigation.goBack();
                    }
                },
                {
                    text: "Cancel", onPress: () => {}
                }
            ],
            {
                cancelable: false,
            }
        )
        return true;
    }

    return (
        <View
            style={{flex: 1, backgroundColor: "black"}}>
            <StatusBar hidden={true} />
            <View style={styles.topViewStyle}>
                <Video
                    ref={videoPlayer => this.videoPlayer = videoPlayer}
                    onEnd={onVideoEnd.bind(this)}
                    onLoad={onVideoLoad.bind(this)}
                    audioOnly={false}
                    source={{uri: groupPractice.meta_box.url}}   // Can be a URL or a local file.
                    paused={paused}
                    resizeMode={"cover"}
                    style={styles.videoStyle} />
                <WaitingGroupPractice gp_id={groupPractice.id} gp_time={gp_time} waitingStyle={{flexDirection: "row", justifyContent: "flex-start", alignItems:"center",borderRadius:9, paddingHorizontal:10, backgroundColor:"black", position:"absolute", top:40, left: 20}} waitingIconColor={"white"} waitingIconStyle={{width:16, height:16}} waitingTextStyle={{color:"white", fontSize:scale(16), marginLeft:5}} />
                <TouchableOpacity
                    style={{borderRadius:9, backgroundColor:"red", position:"absolute", top:40, right: 20}}
                    onPress={() => handleBackButtonClick()}
                    >
                    <Text style={{paddingHorizontal:10, color:"white", fontSize:scale(16)}}>Exit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    videoStyle: {
        height: windowWidth + 25,
        alignSelf: "stretch",
    },
    topViewStyle: {
        flex: 1,
        transform: [
            { rotateZ: '90deg'},
            { translateY: ((PixelRatio.getPixelSizeForLayoutSize(windowHeight)-
                        PixelRatio.getPixelSizeForLayoutSize(windowWidth))/
                    PixelRatio.get()) - 25 },
        ],
        height: windowWidth,
        width: windowHeight,
    },
});
VideoPlayer.navigationOptions = { header: null };
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(VideoPlayer)