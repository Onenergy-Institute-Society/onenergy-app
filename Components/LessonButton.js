import React, {useState} from "react";
import {Text, View, TouchableOpacity, ActivityIndicator} from "react-native";
import {getApi} from "@src/services";
import {StackActions, withNavigation} from "react-navigation";
import {connect, useSelector, useDispatch} from "react-redux";
import IconButton from "@src/components/IconButton";
import AwesomeAlert from "../Components/AwesomeAlert";

const LessonButton = (props) => {
    const { global, colors, lesson } = props;
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const videoComplete = useSelector((state) => state.videoReducer.videoComplete);
    const [completing, setCompleting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const [alertConfirmType, setAlertConfirmType] = useState('');
    const [alertCancelText, setAlertCancelText] = useState('');
    const [alertConfirmText, setAlertConfirmText] = useState('');
    const [alertShowConfirm, setAlertShowConfirm] = useState(false);
    const dispatch = useDispatch();

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
                if(lesson.settings.guide)
                {
                    dispatch({
                        type: 'NOTIFICATION_INCREMENT',
                        payload: 'guide_personal'
                    });
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
                    if(!lesson.settings.no_video) {
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
                    }else{
                        props.navigation.goBack();
                    }
                }else{
                    dispatch({
                        type: 'UPDATE_USER_COMPLETED_LESSONS',
                        payload: {"id": lesson.id, "date": new Date().getTime() / 1000}
                    });
                    if(response.data.next_lesson===0){
                        dispatch({
                            type: 'UPDATE_USER_COMPLETED_COURSES',
                            payload: {"id": lesson.parent.id, "date": new Date().getTime() / 1000}
                        });
                        if(response.data.course===29421){
                            dispatch({ type: "COMPLETE_FIRST_COURSE" });
                        }
                    }
                    if(!lesson.settings.no_video||!lesson.settings.no_popup) {
                        let index = optionData.titles.findIndex(el => el.id === 'alert_course_completed_title');
                        setAlertTitle(optionData.titles[index].title);
                        index = optionData.titles.findIndex(el => el.id === 'alert_course_completed_body');
                        setAlertBody(optionData.titles[index].title + ' ' + lesson.title);
                        setAlertCancelText('');
                        setAlertConfirmType(lesson.settings.back_to);
                        index = optionData.titles.findIndex(el => el.id === 'alert_course_completed_button');
                        setAlertConfirmText(optionData.titles[index].title);
                        setAlertShowConfirm(true);
                        setShowAlert(true);
                    }else{
                        switch(lesson.settings.back_to){
                            case "top":
                                props.navigation.dispatch(StackActions.popToTop());
                                break;
                            case "parent":
                                props.navigation.goBack();
                                break
                        }
                    }
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
    const alertConfirmPressed = () => {
        switch(alertConfirmType){
            case 'top':
                props.navigation.dispatch(StackActions.popToTop());
                break;
            case 'parent':
                props.navigation.goBack();
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
                videoComplete || lesson.settings.no_video==="1"?
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
                                    <ActivityIndicator style={{marginLeft:10}} color={"#FFF"} size={"large"} />
                                    :null}
                            </View>
                        </View>
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