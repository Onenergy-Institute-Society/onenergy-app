import React, {useState, useEffect} from "react";
import {Text, View, TouchableOpacity, ActivityIndicator} from "react-native";
import {getApi} from "@src/services";
import {StackActions, NavigationActions, withNavigation} from "react-navigation";
import {connect, useSelector, useDispatch} from "react-redux";
import IconButton from "@src/components/IconButton";
import AwesomeAlert from "../Components/AwesomeAlert";
import ImageCache from "./ImageCache";
import {scale} from "../Utils/scale";

const LessonButton = (props) => {
    const { global, colors, lesson } = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const videoComplete = useSelector((state) => state.videoReducer.videoComplete);
    const [completing, setCompleting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const [alertConfirmType, setAlertConfirmType] = useState('');
    const [alertCancelText, setAlertCancelText] = useState('');
    const [alertConfirmText, setAlertConfirmText] = useState('');
    const [alertShowConfirm, setAlertShowConfirm] = useState(false);
    const [visualGuideForButton, setVisualGuideForButton] = useState(false);
    const dispatch = useDispatch();
    const getUserPoints = async () => {
        const apiRequest = getApi(props.config);
        await apiRequest.customRequest(
            "wp-json/onenergy/v1/points",
            "get",
            {},
            null,
            {},
            false
        ).then(response => {
            dispatch({
                type:"UPDATE_POINTS",
                payload:response.data
            });
            dispatch({
                type:"UPDATE_USER_POINTS",
                payload:response.data
            });
        })
    }
    useEffect(()=>{
        setTimeout(function () {
            setVisualGuideForButton(true);
        }, 5000);
    },[])
    const completeLesson = async () => {
        try {
            const apiRequest = getApi(props.config);
            await apiRequest.customRequest(
                "wp-json/buddyboss-app/learndash/v1/lessons/"+lesson.id+"/complete",
                "post",
                {"course_id":lesson.parent.id},
                null,
                {},
                false
            ).then(response => {
                dispatch({
                    type: 'VIDEO_RESET',
                });
                setCompleting(false);
                dispatch({
                    type: 'UPDATE_USER_COMPLETED_LESSONS',
                    payload: {"id": lesson.id, "date": new Date().getTime() / 1000}
                });
                if(response.data.next_lesson===0){
                    dispatch({
                        type: 'UPDATE_USER_COMPLETED_COURSES',
                        payload: {"id": lesson.parent.id, "date": new Date().getTime() / 1000}
                    });
                }
                if(lesson.settings.guide)
                {
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'guide_personal'
                    });
                    lesson.settings.guide.map((item) => {
                        dispatch({
                            type: 'NOTIFICATION_PRACTICE_ADD',
                            payload: item,
                        });
                    });
                    dispatch({
                        type: 'ONENERGY_GUIDE_REFRESH'
                    });
                    if(lesson.settings.no_video||optionData.testing_mode) {
                        props.navigation.goBack();
                    }else{
                        let index = optionData.titles.findIndex(el => el.id === 'alert_guide_activated_title');
                        setAlertTitle(optionData.titles[index].title);
                        index = optionData.titles.findIndex(el => el.id === 'alert_guide_activated_body');
                        setAlertBody(optionData.titles[index].title + ' ' + lesson.title);
                        setAlertCancelText('');
                        setAlertConfirmType('top');
                        index = optionData.titles.findIndex(el => el.id === 'alert_guide_activated_button');
                        setAlertConfirmText(optionData.titles[index].title);
                        setAlertShowConfirm(true);
                        setShowAlert(true);
                    }
                }else{
                    if(lesson.settings.no_video||lesson.settings.no_popup/*||optionData.testing_mode*/) {
                        if(lesson.settings.open_screen) {
                            switch (lesson.settings.open_screen) {
                                case "guided-practices":
                                    props.navigation.dispatch(
                                        NavigationActions.navigate( {
                                            routeName: "PracticesScreen",
                                        }));
                                    break;
                                case "group-practices":
                                    props.navigation.dispatch(
                                        NavigationActions.navigate( {
                                            routeName: "PracticeGroup",
                                        }));
                                    break;
                                case "programs":
                                    props.navigation.dispatch(
                                        NavigationActions.navigate( {
                                            routeName: "ProgramsScreen",
                                        }));
                                    break
                            }
                        }else {
                            switch (lesson.settings.back_to) {
                                case "top":
                                    props.navigation.dispatch(StackActions.popToTop());
                                    break;
                                case "parent":
                                    props.navigation.goBack();
                                    break
                            }
                        }
                    }else{
                        let index = optionData.titles.findIndex(el => el.id === 'alert_course_completed_title');
                        setAlertTitle(optionData.titles[index].title);
                        index = optionData.titles.findIndex(el => el.id === 'alert_course_completed_body');
                        setAlertBody(optionData.titles[index].title + ' ' + lesson.title);
                        setAlertCancelText('');
                        setAlertConfirmType(lesson.settings.open_screen?lesson.settings.open_screen:lesson.settings.back_to);
                        index = optionData.titles.findIndex(el => el.id === 'alert_course_completed_button');
                        setAlertConfirmText(optionData.titles[index].title);
                        setAlertShowConfirm(true);
                        setShowAlert(true);
                    }
                }
                getUserPoints();
            });
        } catch (e) {
            console.error(e);
        }
    }
    const alertConfirmPressed = () => {
        switch(alertConfirmType){
            case "guided-practices":
                props.navigation.dispatch(
                    NavigationActions.navigate( {
                        routeName: "PracticesScreen",
                    }));
                break;
            case "group-practices":
                props.navigation.dispatch(
                    NavigationActions.navigate( {
                        routeName: "PracticeGroup",
                    }));
                break;
            case "programs":
                props.navigation.dispatch(
                    NavigationActions.navigate( {
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
                return;
        }
    }

    return (
        <View style={[global.row, {paddingHorizontal: 20, paddingVertical: 15}]}>
            {lesson.completed?
                <View style={[
                    global.completeLessonButtonW,
                    { flex: 1, backgroundColor: colors.secondaryButtonBg }
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
                videoComplete || lesson.settings.no_video || optionData.testing_mode?
                    <TouchableOpacity
                        style={[
                            global.completeLessonButtonW,
                            { flex: 1, backgroundColor: colors.primaryButtonBg }
                        ]}
                        onPress={() => {
                            setCompleting(true);
                            completeLesson().then();
                        }}
                    >
                        <View style={global.row}>
                            <View style={global.linkWithArrow}>
                                <Text
                                    style={{color: "#fff", fontWeight: "bold"}}
                                >
                                    Mark Complete
                                </Text>
                                {completing?
                                    <ActivityIndicator style={{marginLeft:10}} color={"#FFF"} size={"small"} />
                                    :null}
                            </View>
                        </View>
                        {visualGuideForButton?
                            <ImageCache style={{
                                bottom:scale(-80),
                                alignSelf:"center",
                                position: "absolute",
                                transform: [{ rotate: '180deg' }],
                                width:scale(200),
                                height:scale(240),
                                shadowColor: "#000",
                                shadowOffset: {width: 2, height: -4},
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                elevation: 4,
                            }} source={require('../assets/images/tapFinger.gif')} />
                            :null
                        }
                    </TouchableOpacity>
                :
                    <View style={[
                        global.completeLessonButtonW,
                        { flex: 1, backgroundColor: colors.secondaryButtonBg }
                    ]}>
                        <View style={global.row}>
                            <View style={global.linkWithArrow}>
                                <Text
                                    style={{color: "#000", fontWeight: "bold"}}
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
                showConfirmButton={alertShowConfirm}
                cancelText={alertCancelText}
                confirmText={alertConfirmText}
                confirmButtonColor="#4942E1"
                onConfirmPressed={() => {
                    setShowAlert(false);
                    alertConfirmPressed();
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