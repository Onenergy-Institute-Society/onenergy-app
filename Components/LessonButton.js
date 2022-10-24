import React, {useState, useEffect} from "react";
import {Text, View, TouchableOpacity, ActivityIndicator} from "react-native";
import {getApi} from "@src/services";
import {StackActions, NavigationActions, withNavigation} from "react-navigation";
import {connect, useSelector, useDispatch, batch} from "react-redux";
import IconButton from "@src/components/IconButton";
import AwesomeAlert from "../Components/AwesomeAlert";
import ImageCache from "./ImageCache";
import {scale} from "../Utils/scale";

const LessonButton = (props) => {
    const { global, colors, lesson } = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const achievementReducer = useSelector((state) => state.onenergyReducer.achievementReducer);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
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

    useEffect(()=>{
        setTimeout(function () {
            setVisualGuideForButton(true);
        }, 5000);
    },[])
    const completeLesson = async () => {
        try {
            batch(async () => {
                let achievements = [];
                let points;
                let updatedList = [];

                optionData.points.map(point => {
                    points = {...points, [point.pointName]: 0};
                });
                updatedList.push({
                    "mode": 'LC',
                    "data": {
                        'id': lesson.id
                    },
                })
                let course_completed = false;
                if (!lesson.next_lesson) {
                    achievementReducer.filter(milestone =>
                        (milestone.trigger === 'course' &&
                            (parseInt(milestone.triggerCourse) === lesson.parent.id || !milestone.triggerCourse) &&
                            !milestone.complete_date)
                    ).map((item) => {
                        let complete_date = Math.floor(new Date().getTime() / 1000);
                        item.awards.map(award => {
                            points[award.name] += parseInt(award.point);
                        })
                        achievements.push({
                            "id": item.id,
                            "title": item.title,
                            "type": "milestone",
                            "step": 1,
                            "complete_date": complete_date
                        });
                    })
                    updatedList.push({
                        "mode": 'CC',
                        "data": {
                            'id': lesson.parent.id
                        },
                    })
                    course_completed = true;
                }
                dispatch({
                    type: 'ONENERGY_ACHIEVEMENT_COMPLETE_LESSON',
                    payload: {"lesson": lesson.id, "course": lesson.parent.id, "course_completed":course_completed}
                });
                dispatch({
                    type: 'ONENERGY_PROGRESS_UPDATE',
                    payload: updatedList,
                });
                apiRequest.customRequest(
                    "wp-json/onenergy/v1/statsUpdate",
                    "post",
                    {
                        "mode": "LC",
                        "data": lesson,
                        "points": points,
                        "stats": progressReducer,
                        "achievements": achievements
                    },
                    null,
                    {},
                    false
                );
                if (lesson.settings.guide) {
                    dispatch({
                        type: 'ONENERGY_GUIDE_UPDATE',
                        payload: lesson.settings.guide,
                    });
                    if (lesson.settings.no_video) {
                        props.navigation.goBack();
                    } else {
                        setAlertTitle(optionData.titles.find(el => el.id === 'alert_guide_activated_title').title);
                        setAlertBody(optionData.titles.find(el => el.id === 'alert_guide_activated_body').title + ' ' + lesson.title);
                        setAlertCancelText('');
                        setAlertConfirmType(lesson.settings.open_screen ? lesson.settings.open_screen : lesson.settings.back_to);
                        setAlertConfirmText(optionData.titles.find(el => el.id === 'alert_guide_activated_button').title);
                        setAlertShowConfirm(true);
                        setShowAlert(true);
                    }
                } else {
                    if (lesson.settings.no_video || lesson.settings.no_popup) {
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
                        setAlertCancelText('');
                        setAlertConfirmType(lesson.settings.open_screen ? lesson.settings.open_screen : lesson.settings.back_to);
                        setAlertConfirmText(optionData.titles.find(el => el.id === 'alert_course_completed_button').title);
                        setAlertShowConfirm(true);
                        setShowAlert(true);
                    }
                }
                apiRequest.customRequest(
                    "wp-json/buddyboss-app/learndash/v1/lessons/" + lesson.id + "/complete",
                    "post",
                    {"course_id": lesson.parent.id},
                    null,
                    {},
                    false
                );
                dispatch({
                    type: "ONENERGY_UPDATE_USER_POINTS",
                    payload: points
                });

                dispatch({
                    type: 'ONENERGY_VIDEO_RESET',
                });
                setCompleting(false);
            })
        } catch (e) {
            console.error(e);
        }
    }
    const alertConfirmPressed = () => {
        switch(alertConfirmType){
            case "guided-practices":
                props.navigation.dispatch(
                    NavigationActions.navigate( {
                        routeName: "PracticePersonal",
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