import React, {useEffect, useState} from "react";
import {Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getApi} from "@src/services";
import {connect, useDispatch, useSelector} from "react-redux";
import MemberTracksList from "../Components/MemberTracksList";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {NavigationActions, withNavigation} from "react-navigation";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import TrackPlayer from 'react-native-track-player';
import EventList from "../Components/EventList";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack, SvgAddIcon} from "../Utils/svg";

const PracticeMember = props => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const dispatch = useDispatch();
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyData = optionData.helps.find(el => el.name === 'practice_customize_empty_member');
    const practiceReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.practiceReducer : null);
    const [messageBarDisplay, setMessageBarDisplay] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Custom Routine Screen',
    });

    const removeRoutine = async (item) => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/delRoutine",
                "post",
                {"routine": item},
                null,
                {},
                false
            ).then();
        } catch (e) {
            console.error(e);
        }
    }
    const onAddPressed = async () => {
        await TrackPlayer.reset();

        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "EditRoutine",
                params: {
                    routineIndex: -1,
                }
            })
        );
    }
    const onEditRoutinePress = async (index) => {
        await TrackPlayer.reset();
        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "EditRoutine",
                params: {
                    routineIndex: index,
                }
            })
        );
    }
    const onRemoveRoutine = async (item, index) => {
        await TrackPlayer.reset();
        let array = practiceReducer.routines; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            dispatch({
                type: "ONENERGY_ROUTINE_UPDATE",
                payload: array
            });
        }
        removeRoutine(item).then();
    }
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'practices_member').title,
            showAdd: !!((practiceReducer && practiceReducer.routines && practiceReducer.routines.length < 5) || !practiceReducer.routines),
            onAddPressed: onAddPressed,
        });
    }, []);
    useEffect(() => {
        props.navigation.setParams({
            showAdd: !!((practiceReducer && practiceReducer.routines && practiceReducer.routines.length < 5) || !practiceReducer.routines),
        });
    }, [practiceReducer.routines.length]);
    useEffect(() => {
        if (messageBarDisplay) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 2000,
            }).start();
            setTimeout(function () {
                setMessageBarDisplay(false);
            }, 3000)
        }
    }, [messageBarDisplay])
    return (
        <SafeAreaView style={[global.container, {justifyContent: "center", alignItems: "center"}]}>
            {practiceReducer && practiceReducer.routines && practiceReducer.routines.length ?
                <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                    {optionData.goalCards && optionData.goalCards.length ?
                        <View>
                            <EventList location={'practice_member'} {...props}/>
                        </View>
                        : null
                    }
                    <MemberTracksList onEditRoutinePress={onEditRoutinePress} onRemoveRoutine={onRemoveRoutine}
                                      setMessageBarDisplay={setMessageBarDisplay} {...props}/>
                </ScrollView>
                :
                <View style={{
                    flex: 1,
                    width: windowWidth
                }}>
                    <BlockScreen pageId={emptyData.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props}/>
                </View>
            }
            {messageBarDisplay ?
                <Animated.View style={[styles.messageBar, {opacity: fadeAnim}]}><Text style={styles.messageText}>Great!
                    You earn more qi. Keep it up!</Text></Animated.View>
                : null}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f8',
    },
    scroll_view: {
        flexGrow: 1,
    },
    messageText: {
        fontSize: scale(18),
        color: "white",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    messageBar: {
        position: "absolute",
        top: scale(15),
        left: scale(15),
        right: scale(15),
        backgroundColor: "#737373",
        borderColor: "#404040",
        borderRadius: 9,
        paddingVertical: scale(10),
        paddingHorizontal: scale(15),
    }
});
PracticeMember.navigationOptions = ({navigation, screenProps}) => {
    const {params = {}} = navigation.state;
    console.log(params)
    const {colors, global} = screenProps;
    return ({
        headerTitle: params.title?params.title:navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={async () => {
                    await TrackPlayer.reset();
                    navigation.goBack();
                }}
            >
                <SvgIconBack color={colors.headerIconColor}/>
            </TouchableOpacity>,
        headerRight:
            params.showAdd?
                <TouchableOpacity
                    onPress={async () => {
                        await TrackPlayer.reset();
                        await params.onAddPressed();
                    }}
                >
                    <SvgAddIcon color={colors.headerIconColor} size={scale(24)} style={{marginRight:scale(15)}}/>
                </TouchableOpacity>
                :null
    })
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(withNavigation(PracticeMember));
