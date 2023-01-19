import React, {useEffect, useState} from "react";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {getApi} from "@src/services";
import {NavigationActions, StackActions, withNavigation} from "react-navigation";
import {connect, useDispatch, useSelector} from "react-redux";
import IconButton from "@src/components/IconButton";
import AwesomeAlert from "../Components/AwesomeAlert";
import ImageCache from "./ImageCache";
import {scale} from "../Utils/scale";

const LessonButton = (props) => {
    const {global, colors, lesson} = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.progressReducer : null);
    const videoComplete = useSelector((state) => state.videoReducer.videoComplete);
    const [completing, setCompleting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const [alertConfirmType, setAlertConfirmType] = useState('');
    const [alertConfirmText, setAlertConfirmText] = useState('');
    const [visualGuideForButton, setVisualGuideForButton] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(function () {
            setVisualGuideForButton(true);
        }, 5000);
    }, [])
    const completeLesson = async () => {
        try {
            dispatch({
                type: 'ONENERGY_LESSON_COMPLETED',
                payload: lesson,
            });
            if (lesson.settings.guide) {
                dispatch({
                    type: 'ONENERGY_GUIDE_UPDATE',
                    payload: lesson.settings.guide,
                });
                if (lesson.settings.no_popup) {
                    props.navigation.goBack();
                } else {
                    setAlertTitle(optionData.titles.find(el => el.id === 'alert_guide_activated_title').title);
                    setAlertBody(optionData.titles.find(el => el.id === 'alert_guide_activated_body').title + ' ' + lesson.title);
                    setAlertConfirmType(lesson.settings.open_screen ? lesson.settings.open_screen : lesson.settings.back_to);
                    setAlertConfirmText(optionData.titles.find(el => el.id === 'alert_guide_activated_button').title);
                    setShowAlert(true);
                }
            } else {
                if (lesson.settings.no_popup) {
                    if (lesson.settings.open_screen) {
                        switch (lesson.settings.open_screen) {
                            case "guided-practices":
                                props.navigation.dispatch(
                                    NavigationActions.navigate({
                                        routeName: "PracticesScreen",
                                    }));
                                break;
                            case "group-practices":
                                props.navigation.dispatch(
                                    NavigationActions.navigate({
                                        routeName: "PracticeGroup",
                                    }));
                                break;
                            case "programs":
                                props.navigation.dispatch(
                                    NavigationActions.navigate({
                                        routeName: "ProgramsScreen",
                                    }));
                                break
                        }
                    } else {
                        switch (lesson.settings.back_to) {
                            case "top":
                                props.navigation.dispatch(StackActions.popToTop());
                                break;
                            case "parent":
                                props.navigation.goBack();
                                break
                        }
                    }
                } else {
                    setAlertTitle(optionData.titles.find(el => el.id === 'alert_course_completed_title').title);
                    setAlertBody(optionData.titles.find(el => el.id === 'alert_course_completed_body').title + ' ' + lesson.title);
                    setAlertConfirmType(lesson.settings.open_screen ? lesson.settings.open_screen : lesson.settings.back_to);
                    setAlertConfirmText(optionData.titles.find(el => el.id === 'alert_course_completed_button').title);
                    setShowAlert(true);
                }
            }

            const apiRequest = getApi(props.config);
            apiRequest.customRequest(
                "wp-json/buddyboss-app/learndash/v1/lessons/" + lesson.id + "/complete",
                "post",
                {"course_id": lesson.parent.id},
                null,
                {},
                false
            );
            dispatch({
                type: 'ONENERGY_VIDEO_RESET',
            });
            setCompleting(false);
        } catch (e) {
            console.error(e);
        }
    }

    const alertConfirmPressed = async () => {
        await setShowAlert(false);
        switch (alertConfirmType) {
            case "guided-practices":
                props.navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticePersonal",
                    }));
                break;
            case "group-practices":
                props.navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "PracticeGroup",
                    }));
                break;
            case "programs":
                props.navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: "ProgramsScreen",
                    }));
                break
            case 'top':
                props.navigation.dispatch(StackActions.popToTop());
                break;
            case 'parent':
                props.navigation.goBack();
                break;
            default:
                break;
        }
    }

    return (
        <View style={[global.row, {paddingHorizontal: 20, paddingVertical: 15}]}>
            {progressReducer.completedLessons && progressReducer.completedLessons.includes(lesson.id) ?
                <View style={[
                    global.completeLessonButtonW,
                    {flex: 1, backgroundColor: colors.secondaryButtonBg}
                ]}>
                    <View style={global.row}>
                        <View style={global.linkWithArrow}>
                            <IconButton
                                icon={require("@src/assets/img/completed-course.png")}
                                style={{
                                    height: 24,
                                    width: 24,
                                }}
                            />
                            <Text
                                style={{color: "#000", fontWeight: "bold"}}
                            >
                                Completed
                            </Text>
                        </View>
                    </View>
                </View>
                :
                videoComplete || lesson.settings.no_video || user.test_mode ?
                    <TouchableOpacity
                        style={[
                            global.completeLessonButtonW,
                            {flex: 1, backgroundColor: colors.primaryButtonBg}
                        ]}
                        onPress={() => {
                            if (!completing) {
                                setCompleting(true);
                                setTimeout(function () {
                                    completeLesson().then();
                                }, 2000);
                            }
                        }}
                    >
                        <View style={global.row}>
                            <View style={global.linkWithArrow}>
                                <Text
                                    style={global.buttonPrimaryLabel}
                                >
                                    Mark Complete
                                </Text>
                                {completing ?
                                    <ActivityIndicator style={{marginLeft: 10}} color={"#FFF"} size={"small"}/>
                                    : null}
                            </View>
                        </View>
                        {visualGuideForButton ?
                            <ImageCache style={{
                                bottom: scale(-80),
                                alignSelf: "center",
                                position: "absolute",
                                transform: [{rotate: '180deg'}],
                                width: scale(200),
                                height: scale(240),
                                shadowColor: "#000",
                                shadowOffset: {width: 2, height: -4},
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                elevation: 4,
                            }} source={require('../assets/images/tapFinger.gif')}/>
                            : null
                        }
                    </TouchableOpacity>
                    :
                    <View style={[
                        global.completeLessonButtonW,
                        {flex: 1, backgroundColor: colors.secondaryButtonBg}
                    ]}>
                        <View style={global.row}>
                            <View style={global.buttonSecondary}>
                                <Text
                                    style={global.buttonSecondaryLabel}
                                >
                                    Watch the video first
                                </Text>
                            </View>
                        </View>
                    </View>
            }

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={alertTitle}
                message={alertBody}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText={alertConfirmText}
                confirmButtonColor="#4942E1"
                onConfirmPressed={() => {
                    setShowAlert(false);
                    setTimeout(function () {
                        alertConfirmPressed().then();
                    }, 500);
                }}
            />
        </View>
    )
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(withNavigation(LessonButton));