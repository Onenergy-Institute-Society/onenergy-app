import React, {useEffect, useState} from "react";
import {getApi} from "@src/services";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import IconButton from "@src/components/IconButton";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import SortList from "./SortList";
import {Modalize} from 'react-native-modalize';
import {ms, mvs, s, vs, windowHeight, windowWidth} from "../Utils/Scale";
import {SvgAddIcon, SvgIconBack, SvgIconCheck, SvgIconCross, SvgPlayIcon, SvgStopIcon} from "../Utils/svg";
import Video from 'react-native-video';
import Slider from 'react-native-slider';
import * as Analytics from "../Utils/Analytics";

const EditRoutine = props => {
    const {navigation, screenProps} = props;
    const routineIndex = navigation.getParam('routineIndex');
    const {colors, global} = screenProps;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const backgroundImages = optionData.routine_image;
    const backgroundMusics = optionData.bgm;
    const [playingSound, setPlayingSound] = useState(false);
    const [waitingGetID, setWaitingGetID] = useState(null);
    const [saving, setSaving] = useState(false);
    const [soundUrl, setSoundUrl] = useState('');
    const routinesReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.practiceReducer.routines : []);
    const [routineDetailState, setRoutineDetailState] = useState(routineIndex >= 0 ? routinesReducer[routineIndex] : {
        id: 0,
        title: '',
        image: optionData.routine_image[0],
        bgm_id: 0,
        bgm_volume: 100,
        level: 0,
        audioTracks: [],
        routine: []
    });
    const [routines, setRoutines] = useState(routineIndex >= 0 ? routinesReducer[routineIndex].routine : []);
    const [refresh, setRefresh] = useState(0);
    const [selectBgm, setSelectBgm] = useState([]);
    const [selectBgmVolume, setSelectBgmVolume] = useState(routineIndex >= 0 ? routinesReducer[routineIndex].bgm_volume: 100);
    const [selectLevel, setSelectLevel] = useState('');
    const practiceReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.practiceReducer : null);
    const [sections, setSections] = useState([]);
    const [currentTrackState, setCurrentTrackState] = useState({index: -1, detail: {}});
    const [changedStatus, setChangedStatus] = useState(false);
    const [cancelContentTouches, setCancelContentTouches] = useState(true);
    const row = [];
    const [key, setKey] = useState('');

    const updateTracks = async () => {
        try {
            const apiRoutine = getApi(props.config);
            await apiRoutine.customRequest(
                "wp-json/onenergy/v1/editRoutine/",
                "post",
                {"routine": routineDetailState},
                null,
                {},
                false
            ).then();
        } catch (e) {
            console.error(e);
        }
    }
    const addTracks = async () => {
        try {
            setWaitingGetID(true);
            setSaving(true);
            const apiRoutine = getApi(props.config);
            const data = await apiRoutine.customRequest(
                "wp-json/onenergy/v1/addRoutine",
                "post",
                {"routine": routineDetailState},
                null,
                {},
                false
            ).then(response => response.data);
            if (data) {
                Analytics.segmentClient.track('Create Routine', {
                    id: data
                }).then();
                setWaitingGetID(false);
                setRoutineDetailState(prevState => ({...prevState, id: data}));
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        if(!waitingGetID && routineDetailState.id > 0) {
            if (routineIndex === -1 && !waitingGetID && routineDetailState.title !== '') {
                dispatch({
                    type: "ONENERGY_ROUTINE_SAVE",
                    payload: routineDetailState
                })
                navigation.goBack();
            }
        }
    }, [waitingGetID, routineDetailState]);

    useEffect(() => {
        props.navigation.setParams({
            saving: saving,
        });
    }, [saving])
    useEffect(() => {
        if (routinesReducer && routinesReducer.length && routineIndex >= 0) {
            setRoutineDetailState(routinesReducer[routineIndex])
        }
    }, [routinesReducer])
    useEffect(() => {
        if (routineDetailState) {
            props.navigation.setParams({
                title: routineDetailState.title ? routineDetailState.title : "New Routine",
                onBackPressed: onBackPressed,
                changeStatus: changedStatus,
                backButtonTitle: changedStatus ? 'Save' : '',
            });
            if(routineDetailState.bgm_id) {
                backgroundMusics.forEach(bgm => {
                    if (bgm.id === routineDetailState.bgm_id) {
                        setSelectBgm(bgm);
                    }
                })
            }else{
                setSelectBgm(backgroundMusics[0]);
            }
            if(routineDetailState.bgm_volume) {
                setSelectBgmVolume(routineDetailState.bgm_volume);
            }else{
                setSelectBgmVolume(100);
            }
            if(routineDetailState.level) {
                setSelectLevel(practiceReducer.guides.find(level => level.id === routineDetailState.level).title);
                setSections(practiceReducer.guides.find(level => level.id === routineDetailState.level).sections);
            }else {
                setSelectLevel(practiceReducer.guides.find(level => level.rank === 0).title);
                setSections(practiceReducer.guides.find(level => level.rank === 0).sections);
            }
        }
    }, [routineDetailState])
    const onBackPressed = () => {
        if (changedStatus) {
            if (!routineDetailState.routine.length) {
                Alert.alert(
                    "Notice",
                    "Please add at least one practice to this routine.",
                    [
                        {
                            text: "Ok",
                        },
                    ]
                );
                return false;
            }
            if (!routineDetailState.title.trim()) {
                alert('Please choose a routine name.');
                return false;
            }
            setChangedStatus(false);
            if (routineIndex >= 0) {
                updateTracks().then()
                dispatch({
                    type: "ONENERGY_ROUTINE_SAVE",
                    payload: routineDetailState
                })
                Analytics.segmentClient.track('Edit Routing', {
                    id: routineDetailState.id
                }).then();
                navigation.goBack();
            } else {
                addTracks().then();
            }
        }else{
            navigation.goBack();
        }
    }
    const createTracks = (routine) => {
        let tracks = [];
        let id = 1;

        const opening = practiceReducer.guides.find(level => parseInt(level.id) === parseInt(routineDetailState.level)).opening;
        const closing = practiceReducer.guides.find(level => parseInt(level.id) === parseInt(routineDetailState.level)).closing;
        const opening_duration = practiceReducer.guides.find(level => parseInt(level.id) === parseInt(routineDetailState.level)).opening_duration;
        const closing_duration = practiceReducer.guides.find(level => parseInt(level.id) === parseInt(routineDetailState.level)).closing_duration;

        const min1 = "https://cdn.onenergy.institute/audios/preparatory_practices/members/1min.mp3";
        const artist = 'Onenergy Institute';
        const artwork = 'https://cdn.onenergy.institute/images/logo.png';
        if (routine.length > 0) {
            tracks.push({
                id: 1,
                title: 'Opening',
                url: opening,
                artist: artist,
                artwork: artwork,
                duration: opening_duration,
            });
            routine.forEach(item => {
                item.parts.forEach(part => {
                    if (part.start) {
                        id++;
                        tracks.push({
                            id: id,
                            title: item.title,
                            url: part.start,
                            artist: artist,
                            artwork: artwork,
                            duration: parseInt(part.start_duration),
                        });
                        switch (item.mode) {
                            case '0':
                                if (part.repeat) {
                                    for (let i = 1; i <= parseInt(item.count); i++) {
                                        id++;
                                        tracks.push({
                                            id: id,
                                            title: item.title,
                                            url: part.repeat,
                                            artist: artist,
                                            artwork: artwork,
                                            duration: parseInt(part.repeat_duration),
                                        });
                                    }
                                }
                                break;
                            case '1':
                                for (let i = 0; i < parseInt(item.count); i++) {
                                    id++;
                                    tracks.push({
                                        id: id,
                                        title: item.title,
                                        url: min1,
                                        artist: artist,
                                        artwork: artwork,
                                        duration: 60,
                                    });
                                }
                                break
                        }
                    }
                })
                if (item.ending) {
                    id++;
                    tracks.push({
                        id: id,
                        title: item.title,
                        url: item.ending,
                        artist: artist,
                        artwork: artwork,
                        duration: parseInt(item.endDuration),
                    });
                }

            })
            id++
            tracks.push({
                id: id,
                title: 'Closing',
                url: closing,
                artist: artist,
                artwork: artwork,
                duration: closing_duration,
            });
        }
        return tracks;
    }
    const removeItem = (id) => {
        let newRoutines = routines; // make a separate copy of the array
        if (id !== -1) {
            let index = newRoutines.findIndex(el => el.id === id);
            newRoutines.splice(index, 1);
            setRoutines(newRoutines);
            let tracks = createTracks(newRoutines);
            setRoutineDetailState(prevState => {
                return {...prevState, routine: newRoutines, audioTracks: tracks}
            });
            setChangedStatus(true);
            setRefresh(refresh + 1);
            setPlayingSound(false);
        }
    }

    const updateItem = (items) => {
        let tracks = createTracks(items);
        setRoutines(items);
        setRoutineDetailState(prevState => {
            return {...prevState, routine: items, tracks: tracks}
        });
        setChangedStatus(true);
        setRefresh(refresh + 1);
        setPlayingSound(false);
    }
    const addGuideToRoutine = (item) => {
        item.count = 1;
        let newRoutines = routines;
        newRoutines.push(item);
        let tracks = createTracks(newRoutines);
        setRoutines(newRoutines);
        setRoutineDetailState(prevState => {
            return {
                ...prevState,
                routine: newRoutines,
                audioTracks: tracks
            }
        });
        setChangedStatus(true);
        setRefresh(refresh + 1);
        setPlayingSound(false);
        this.addGuideModal.close();
    }
    const changeCount = (item) => {
        let newRoutines = routines;
        newRoutines[currentTrackState.index].count = item.item;
        let tracks = createTracks(newRoutines)
        setRoutines(newRoutines);
        setRoutineDetailState(prevState => {
            return {
                ...prevState,
                routine: newRoutines,
                audioTracks: tracks
            }
        });
        setChangedStatus(true);
        setRefresh(refresh + 1);
        setPlayingSound(false);
        this.countDialog.close();
    }
    const rightActions = (dragX, item) => {
        return (
            <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => {
                Analytics.segmentClient.track('Tap Button', {
                    type: 'Delete Routine',
                    id: item.id
                }).then();
                removeItem(item.id)
            }}>
                <IconButton
                    icon={require("@src/assets/img/delete.png")}
                    tintColor={colors.headerIconColor}
                    style={{
                        alignSelf: "center",
                        height: s(24),
                    }}
                />
            </TouchableOpacity>
        )
    }

    const handleWillOpen = (index: any) => () => {
        if ((key !== '') && (key !== index)) {
            if (row[key]) {
                row[key].close();
            }
        }
    }
    const handleOpen = (index: any) => () => {
        setKey(index);
    }
    const renderTracks = (handler, id, itemData) => {
        return (
            <Swipeable
                ref={ref => row[id] = ref}
                friction={2}
                leftThreshold={10}
                rightThreshold={10}
                renderRightActions={(_, dragX) => rightActions(dragX, itemData, id)}
                onSwipeableRightWillOpen={handleWillOpen(id)}
                onSwipeableLeftWillOpen={handleWillOpen(id)}
                onSwipeableOpen={handleOpen(id)}
            >
                <View style={{width: windowWidth - s(30), flexDirection: "row", justifyContent: "flex-start"}}>
                    <View key={itemData.id} style={styles.listContainer}>
                        <View style={styles.content}>
                            <Text style={[global.text, styles.trackTitle]}>
                                {itemData.title}
                            </Text>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setCurrentTrackState({index: id, item: itemData});
                                    this.countDialog.open();
                                }}>
                                <View style={styles.trackCount}>
                                    <Text
                                        style={[global.textAlt, styles.trackCountText]}>{parseInt(itemData.repeatCount) > 1 ? parseInt(itemData.repeatCount) + 'x' : ''}{itemData.count}{itemData.mode === "0" ? "" : "m"}</Text>
                                    <Image style={{marginLeft: 5, tintColor: colors.headerIconColor}}
                                           source={require("@src/assets/img/arrow-down.png")}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.orderButton} {...handler}>
                            <IconButton
                                icon={require("@src/assets/img/handle.png")}
                                style={{
                                    height: 32,
                                    marginRight: 10,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Swipeable>
        );
    };

    const renderGuides = (item) => {
        let index = routineDetailState.routine.findIndex(el => parseInt(el.id) === parseInt(item.item.id));
        let track;
        track = item.item.parts.length?item.item.parts[0].start:'';
        return (
            item.item.parts.length?
                <TouchableWithoutFeedback onPress={() => {
                    if(item.item.show && item.item.parts.length) {
                        if (index === -1) {
                            addGuideToRoutine(item.item);
                            setChangedStatus(true);
                        }
                    }
                }}>
                    <View style={{
                        backgroundColor: item.item.show && item.item.parts.length?colors.bodyBg:colors.secondaryButtonBg,
                        paddingHorizontal: ms(5),
                        paddingVertical: mvs(10),
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                            {item.item.show && item.item.parts.length && track ?
                                <TouchableOpacity
                                    onPress={() => {
                                        if (playingSound && track === soundUrl) {
                                            setPlayingSound(false);
                                        } else {
                                            setSoundUrl(track);
                                            setPlayingSound(true);
                                        }
                                    }}
                                >
                                    {playingSound && track === soundUrl ?
                                        <SvgStopIcon color={colors.headerIconColor}/> :
                                        <SvgPlayIcon color={colors.headerIconColor}/>}
                                </TouchableOpacity>
                                : null}
                            <Text
                                style={[global.text, {fontSize:s(15),marginLeft: s(5)}]}>
                                {item.item.title}
                            </Text>
                        </View>
                        {!(item.item.show && item.item.parts.length) ?
                            <Text style={[global.text, {fontSize:s(15),color:colors.secondaryButtonColor}]}>LOCKED</Text>
                            :null}
                        {index >= 0 ? (
                            <SvgIconCheck size={s(24)} color={colors.primaryColor}/>
                        ) : null}
                    </View>
                </TouchableWithoutFeedback>
                :null
        )
    }
    const renderCount = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: s(9), borderTopRightRadius: s(9), marginTop: mvs(25)};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case 29:
                cornerStyle = {borderBottomLeftRadius: s(9), borderBottomRightRadius: s(9), marginBottom: mvs(25)};
                break;
            default:
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                if(parseInt(currentTrackState.item.count, 10) !== parseInt(item.item, 10)) {
                    changeCount(item);
                }
            }}>
                <View style={[cornerStyle, bottomStyle, {
                    width: windowWidth - 50,
                    marginHorizontal: 25,
                    paddingHorizontal: ms(25),
                    backgroundColor: colors.bodyBg,
                    paddingVertical: mvs(15),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}>
                    <Text
                        style={{
                            fontFamily: "Montserrat-Regular",
                            fontWeight: "normal",
                            fontSize: s(15),
                            color: colors.textColor
                        }}>
                        {item.item} {currentTrackState.item.mode === "1" ? item.index > 0 ? " minutes" : " minute" : item.index > 0 ? " times" : " time"}
                    </Text>
                    {currentTrackState.index !== -1 && parseInt(currentTrackState.item.count, 10) === parseInt(item.item, 10) ? (
                        <SvgIconCheck size={s(24)} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const renderBGM = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        let bgmTrack;
        if (item.item.id !== 0) {
            bgmTrack = optionData.bgm.find(el => el.id === item.item.id).url;
        } else {
            bgmTrack = '';
        }
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: s(9), borderTopRightRadius: s(9)};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case backgroundMusics.length - 1:
                cornerStyle = {borderBottomLeftRadius: s(9), borderBottomRightRadius: s(9)};
                break;
            default:
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                if(user.rank>=item.item.rank) {
                    if (routineDetailState.bgm_id !== item.item.id) {
                        setRoutineDetailState(prevState => {
                            return {...prevState, bgm_id: item.item.id}
                        });
                        setSelectBgm(item.item);
                        setChangedStatus(true);
                        setPlayingSound(false);
                        this.bgmDialog.close();
                    }
                }
            }}>
                <View style={[cornerStyle, bottomStyle, {
                    paddingHorizontal: ms(5),
                    backgroundColor: user.rank>=item.item.rank?colors.bodyBg:colors.secondaryButtonBg,
                    paddingVertical: mvs(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                        {user.rank>=item.item.rank&&bgmTrack ?
                            <TouchableOpacity
                                onPress={() => {
                                    if (playingSound && bgmTrack === soundUrl) {
                                        setPlayingSound(false);
                                    } else {
                                        setSoundUrl(bgmTrack);
                                        setPlayingSound(true);
                                    }
                                }}
                            >
                                {playingSound && bgmTrack === soundUrl ? <SvgStopIcon color={colors.headerIconColor}/> :
                                    <SvgPlayIcon color={colors.headerIconColor}/>}
                            </TouchableOpacity>
                            : null}
                        <Text
                            style={[global.text, {fontSize:s(15),marginLeft: s(5)}]}>
                            {item.item.name}
                        </Text>
                    </View>
                    {user.rank<item.item.rank?
                        <Text style={[global.text, {fontSize:s(15),color:colors.secondaryButtonColor}]}>LOCKED</Text>
                        :null}
                    {routineDetailState.bgm_id === item.item.id ? (
                        <SvgIconCheck size={s(24)} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const renderLevel = (item) => {

        let cornerStyle = {};
        let bottomStyle = {};
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: s(9), borderTopRightRadius: s(9)};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case practiceReducer.guides.length - 1:
                cornerStyle = {borderBottomLeftRadius: s(9), borderBottomRightRadius: s(9)};
                break;
            default:
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                if(user.rank>=practiceReducer.guides.find(level=>parseInt(level.id)===parseInt(item.item.id)).rank&&parseInt(routineDetailState.level) !== parseInt(item.item.id)) {
                    Alert.alert('Change Level', 'Practices will be cleared, are you sure you want to change?',
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            {
                                text: "OK", onPress: () => {
                                    setSelectLevel(item.item.title);
                                    setRoutineDetailState(prevState => {
                                        return {...prevState, routine: [], audioTracks: [], level: item.item.id}
                                    });
                                    setRoutines([]);
                                    setChangedStatus(true);
                                    this.levelDialog.close();
                                }
                            }
                        ]
                    )

                }
            }}>
                <View style={[cornerStyle, bottomStyle, {
                    paddingHorizontal: ms(5),
                    backgroundColor: user.rank>=practiceReducer.guides.find(level=>parseInt(level.id)===parseInt(item.item.id)).rank?colors.bodyBg:colors.secondaryButtonBg,
                    paddingVertical: mvs(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                        <Text
                            style={[global.text, {fontSize:s(15),marginLeft: s(5), color:user.rank>=practiceReducer.guides.find(level=>parseInt(level.id)===parseInt(item.item.id)).rank?colors.textColor:colors.descLightTextColor}]}>
                            {item.item.title}
                        </Text>
                    </View>
                    {user.rank<practiceReducer.guides.find(level=>parseInt(level.id)===parseInt(item.item.id)).rank?
                        <Text style={[global.text, {fontSize:s(15),color:colors.secondaryButtonColor}]}>LOCKED</Text>
                        :null}
                    {routineDetailState.level === item.item.id ? (
                        <SvgIconCheck size={s(24)} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const renderSectionHeader = (section) => {
        return (
            <Text style={[global.settingsItemTitle, {
                backgroundColor: '#e6e6e8',
                borderTopRightRadius: s(9),
                borderTopLeftRadius: s(9),
                paddingVertical: mvs(10),
                fontSize: s(20),
                marginTop: mvs(15),
                textAlign: "center"
            }]}>{section.section.title.toUpperCase()}</Text>
        );
    }
    const renderColor = () => {
        return backgroundImages.map((image) => {
            let imageSelected;
            if (image === routineDetailState.image) {
                imageSelected = {borderWidth: 5, borderColor: '#4942e1'};
            } else {
                imageSelected = {borderWidth: 0}
            }
            return (
                <TouchableOpacity
                    key={image}
                    onPress={() => {
                        setRoutineDetailState(prevState => ({...prevState, image: image}));
                        setChangedStatus(true)
                    }}
                >
                    <Image source={{uri: image}} style={[styles.colorSelect, imageSelected]} resizeMode={"cover"}/>
                </TouchableOpacity>
            )
        })
    }
    return (
        <SafeAreaView style={global.container}>
            <ScrollView nestedScrollEnabled={true} style={styles.ScrollContainer}
                        canCancelContentTouches={cancelContentTouches}
            >
                <View style={global.roundBox}>
                    <Text style={global.settingsItemTitle}>Routine Name</Text>
                    <TextInput
                        style={[global.text, styles.inputName]}
                        placeholder={"Routine Name?"}
                        onChangeText={text => {
                            setChangedStatus(true);
                            setRoutineDetailState(prevState => ({...prevState, title: text}));
                        }}
                        value={routineDetailState.title ? routineDetailState.title : ''}
                    />
                </View>
                <View style={global.roundBox}>
                    <View style={{
                        width: windowWidth - s(35),
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <Text style={global.settingsItemTitle}>Background Image</Text>
                    </View>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: mvs(5)}}>
                            {renderColor()}
                        </View>
                    </View>
                </View>
                <View style={global.roundBox}>
                    <View style={{
                        width: windowWidth - s(35),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Text style={global.settingsItemTitle}>Background Music</Text>
                        <Text style={[global.settingsItemTitle, {fontSize: s(14)}]}>Volume</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={[styles.listContainer, {width: "75%"}]}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.bgmDialog.open();
                                }}>
                                <View style={styles.content}>
                                    {selectBgm ? (
                                        <Text style={[global.text, styles.trackTitle]}>
                                            {selectBgm.name}
                                        </Text>
                                    ) : null}
                                    <View>
                                        <Image style={{marginRight: 10, tintColor: colors.primaryColor}}
                                               source={require("@src/assets/img/arrow-down.png")}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.listContainer, {width: "20%"}]}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.bgmVolumeDialog.open();
                                }}>
                                <View style={styles.content}>
                                    {selectBgmVolume ? (
                                        <Text style={[global.text, styles.trackTitle]}>
                                            {selectBgmVolume}
                                        </Text>
                                    ) : null}
                                    <View>
                                        <Image style={{marginRight: 10, tintColor: colors.primaryColor}}
                                               source={require("@src/assets/img/arrow-down.png")}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={global.roundBox}>
                    <View style={{
                        width: windowWidth - s(35),
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <Text style={global.settingsItemTitle}>Practice Level</Text>
                    </View>
                    <View>
                        <View style={styles.listContainer}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.levelDialog.open();
                                }}>
                                <View style={styles.content}>
                                    <Text style={[global.text, styles.trackTitle]}>
                                        {selectLevel}
                                    </Text>
                                    <View>
                                        <Image style={{marginRight: 10, tintColor: colors.primaryColor}}
                                               source={require("@src/assets/img/arrow-down.png")}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={global.roundBox}>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Text style={global.settingsItemTitle}>Practices</Text>
                        <Text style={[global.text, {fontSize: s(10)}]}>(swipe to delete, drag to sort)</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.addGuideModal.open();
                            }}
                        >
                            <SvgAddIcon color={colors.primaryColor} size={s(36)}/>
                        </TouchableOpacity>
                    </View>

                    <GestureHandlerRootView style={{height: "100%"}}>
                        {routineDetailState.routine.length === 0 ? (
                            <View><Text style={global.text}>No practice selected, please tap "Plus Sign" to add.</Text></View>
                        ) : (
                            <SortList
                                horizontal={false}                          // The orientation of the list
                                data={routines}                                // The list of items to render
                                renderItem={renderTracks}                     // The function to render each item
                                save={(items) => {
                                    updateItem(items)
                                }}                             // The function called when an event happens in the list
                                edgingDelay={350}                           // Delay to wait before scrolling the list when an item is on an edge
                                edgeZonePercent={10}                        // The size of the edge zone (to scroll the list up or down)
                                edgeColor={"rgba(0,140,230,0.3)"}           // The color of the edge zone (can be transparent if needed)
                                style={styles.list}
                                contentContainerStyle={styles.contentContainer}
                                setCancelContentTouches={setCancelContentTouches}
                                refresh={refresh}
                            />
                        )}
                    </GestureHandlerRootView>
                </View>
                {soundUrl && playingSound ?
                    <Video
                        ref={videoPlayer => this.videoPlayer = videoPlayer}
                        audioOnly={true}
                        onEnd={() => setPlayingSound(false)}
                        playInBackground={false}
                        playWhenInactive={false}
                        ignoreSilentSwitch={"ignore"}
                        repeat={false}
                        paused={!playingSound}
                        source={{uri: soundUrl}}
                    />
                    : null}
            </ScrollView>
            <Modalize
                ref={(bgmVolumeDialog) => {
                    this.bgmVolumeDialog = bgmVolumeDialog;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                childrenStyle={{padding: s(25)}}
                modalHeight={windowHeight / 4}
                withHandle="false"
                withReactModal={true}
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: s(9),
                        borderTopRightRadius: s(9),
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: s(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>Choose volume</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.bgmVolumeDialog.close();
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
            >
                <View style={[global.container, {justifyContent:"center", alignItems:"center"}]}>
                    <Text style={global.text}>{selectBgmVolume}</Text>
                    <Slider
                        style={{width: '100%', height: vs(60)}}
                        value={selectBgmVolume}
                        thumbTintColor={colors.headerIconColor}
                        step={10}
                        minimumValue={10}
                        thumbStyle={{width: s(15), height: s(15)}}
                        maximumValue={100}
                        minimumTrackTintColor={'#692be0'}
                        maximumTrackTintColor={'#d6c5f7'}
                        disabled={false}
                        onValueChange={val =>{setSelectBgmVolume(val)}}
                        onSlidingComplete={val=> {
                            this.bgmVolumeDialog.close();
                        }}
                    />
                </View>
            </Modalize>
            <Modalize
                ref={(countDialog) => {
                    this.countDialog = countDialog;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                modalHeight={windowHeight / 2}
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: s(9),
                        borderTopRightRadius: s(9),
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        {currentTrackState.index !== -1 ? (
                            <Text style={{
                                fontSize: s(24),
                                color: colors.headerColor,
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontWeight: "bold"
                            }}>{currentTrackState.item.mode === "1" ? "Choose duration" : "Choose times"}</Text>
                        ) : null}
                        <TouchableOpacity
                            onPress={() => {
                                this.countDialog.close();
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
                flatListProps={{
                    data: Array.from({length: 30}, (_, i) => i + 1),
                    renderItem: renderCount,
                    keyExtractor: (item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false,
                }}
            />
            <Modalize
                ref={(bgmDialog) => {
                    this.bgmDialog = bgmDialog;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                childrenStyle={{padding: s(25)}}
                adjustToContentHeight="true"
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: s(9),
                        borderTopRightRadius: s(9),
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: s(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>Background Music</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.bgmDialog.close();
                                setPlayingSound(false);
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
                FooterComponent={
                    <View style={{height: 25}}/>
                }
                flatListProps={{
                    data: backgroundMusics,
                    renderItem: renderBGM,
                    keyExtractor: (item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false,
                }}
            />
            <Modalize
                ref={(levelDialog) => {
                    this.levelDialog = levelDialog;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                childrenStyle={{padding: s(25)}}
                adjustToContentHeight="true"
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: s(9),
                        borderTopRightRadius: s(9),
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: s(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>Practice Level</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.levelDialog.close();
                                setPlayingSound(false);
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
                FooterComponent={
                    <View style={{height: 25}}/>
                }
                flatListProps={{
                    data: practiceReducer.guides,
                    renderItem: renderLevel,
                    keyExtractor: (item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false,
                }}
            />
            <Modalize
                ref={(addGuideModal) => {
                    this.addGuideModal = addGuideModal;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                childrenStyle={{paddingHorizontal: s(25), paddingBottom: s(25)}}
                modalHeight={windowHeight * 2 / 3}
                handlePosition="outside"
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: s(9),
                        borderTopRightRadius: s(9),
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: s(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>Practices</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.addGuideModal.close();
                                setPlayingSound(false);
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
                sectionListProps={{
                    stickySectionHeadersEnabled: false,
                    sections: sections,
                    renderItem: renderGuides,
                    renderSectionHeader: renderSectionHeader,
                    keyExtractor: (item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false,
                }}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ScrollContainer: {
        height: "100%",
        flexGrow: 1,
        paddingHorizontal: s(15),
    },
    list: {
        width: windowWidth - s(30),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'scroll',
    },
    contentContainer: {
        width: windowWidth - s(30),
    },
    index: {},
    listContainer: {
        width: windowWidth - s(30),
        height: vs(35),
        flexDirection: 'row',
        marginBottom: mvs(5),
        borderRadius:s(9),
        borderWidth: 1,
        borderColor: "#8c79ea",
        backgroundColor: "#fffdff",
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    orderButton: {
        flex: 0.2,
        height: "100%",
        aspectRatio: 0.5,
        marginHorizontal: vs(10),
        justifyContent: 'center',
        alignItems: 'flex-end',
        overflow: 'hidden',
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: s(24),
        fontWeight: "800",
        color: "black",
        marginTop: mvs(10),
        marginBottom: mvs(5),
    },
    footer: {
        paddingVertical: 32,
        flexDirection: "row",
        alignItems: "center",
    },
    inputName: {
        height: vs(40),
        borderRadius:s(9),
        borderWidth: 1,
        borderColor: "#8c79ea",
        backgroundColor: "#ffffff",
        paddingLeft: 15
    },
    trackTitle: {
        fontSize: s(14),
        paddingLeft: 10,
        flex: 0.8,
    },
    trackCount: {
        flex: 0.2,
        width: s(50),
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    trackCountText: {
        alignContent: "flex-end",
    },
    colorSelect: {
        width: s(36),
        height: vs(36),
        borderRadius: s(4),
        marginHorizontal: ms(5)
    },
})
EditRoutine.navigationOptions = ({navigation, screenProps}) => {
    const {params = {}} = navigation.state;
    const {colors, global} = screenProps;
    return {
        headerTitle: params.title ? params.title : navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            params.saving ?
                <View style={{marginLeft:s(15)}}>
                    <ActivityIndicator size={"small"} color={screenProps.colors.headerIconColor}/>
                </View>
                :
                <TouchableOpacity
                    onPress={() => {
                        params.onBackPressed();
                    }}
                >
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                    <SvgIconBack color={colors.headerIconColor}/>
                    <Text style={{
                        fontFamily: "Montserrat-Regular",
                        fontSize: s(16),
                        color: screenProps.colors.headerIconColor
                    }}>{params.backButtonTitle}</Text>
                    </View>
                </TouchableOpacity>,
        headerRight:
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text style={{
                        marginRight: s(15),
                        fontFamily: "Montserrat-Regular",
                        fontSize: s(16),
                        color: screenProps.colors.headerIconColor
                    }}>Cancel</Text>
                </TouchableOpacity>
    }
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(EditRoutine);