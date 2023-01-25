import React, {useEffect, useState} from "react";
import {Alert, BackHandler, PixelRatio, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Video from "react-native-video";
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import {ms, s, windowHeight, windowWidth} from "../Utils/Scale";
import WaitingGroupPractice from "./WaitingGroupPractice";
import analytics from '@react-native-firebase/analytics';

const PracticePlayer = (props) => {
    const [paused, setPaused] = useState(false);
    const {navigation} = props;
    const seek = navigation.getParam('seek');
    const groupPractice = navigation.getParam('group');
    const gp_time = navigation.getParam('gp_time');
    const user = useSelector((state) => state.user.userObject);
    const dispatch = useDispatch();
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Group Practice: ' + groupPractice.name,
    });

    useEffect(() => {
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
        try {
            dispatch({
                type: 'ONENERGY_PRACTICE_COMPLETED',
                payload: {
                    'mode': 'PG',
                    'data': groupPractice.id
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    const handleBackButtonClick = () => {
        Alert.alert(
            "Please Confirm",
            user.test_mode ? "Testing mode: Update progress and exit?" : "Stop before session ends will result not counting as one complete practice, are you sure you want to exit?",
            [
                {
                    text: "OK", onPress: () => {
                        user.test_mode ?
                            updateProgress().then() : null;
                        navigation.goBack();
                    }
                },
                {
                    text: "Cancel", onPress: () => {
                    }
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
            <StatusBar hidden={true}/>
            <View style={styles.topViewStyle}>
                <Video
                    ref={videoPlayer => this.videoPlayer = videoPlayer}
                    onEnd={onVideoEnd.bind(this)}
                    onLoad={onVideoLoad.bind(this)}
                    audioOnly={false}
                    source={{uri: groupPractice.url}}   // Can be a URL or a local file.
                    paused={paused}
                    resizeMode={"cover"}
                    style={styles.videoStyle}/>
                <WaitingGroupPractice gp_id={groupPractice.id} gp_time={gp_time} waitingStyle={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius:s(9),
                    paddingHorizontal: ms(10),
                    backgroundColor: "black",
                    position: "absolute",
                    top: 40,
                    left: 20
                }} waitingIconColor={"white"} waitingIconStyle={{width: 16, height: 16}}
                                      waitingTextStyle={{color: "white", fontSize: s(16), marginLeft: 5}}/>
                <TouchableOpacity
                    style={{borderRadius:s(9), backgroundColor: "red", position: "absolute", top: 40, right: 20}}
                    onPress={() => handleBackButtonClick()}
                >
                    <Text style={{paddingHorizontal: ms(10), color: "white", fontSize: s(16)}}>Exit</Text>
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
            {rotateZ: '90deg'},
            {
                translateY: ((PixelRatio.getPixelSizeForLayoutSize(windowHeight) -
                        PixelRatio.getPixelSizeForLayoutSize(windowWidth)) /
                    PixelRatio.get()) - 25
            },
        ],
        height: windowWidth,
        width: windowHeight,
    },
});
PracticePlayer.navigationOptions = {header: null};
export default PracticePlayer;