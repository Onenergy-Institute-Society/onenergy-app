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
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import SortList from "./SortList";
import {Modalize} from 'react-native-modalize';
import {scale} from "../Utils/scale";
import analytics from '@react-native-firebase/analytics';
import {SvgAddIcon, SvgIconBack, SvgIconCheck, SvgIconCross, SvgPlayIcon, SvgStopIcon} from "../Utils/svg";
import Video from 'react-native-video';

const EditRoutine = props => {
    const {navigation, screenProps} = props;
    const routineIndex = navigation.getParam('routineIndex');
    const {colors, global} = screenProps;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const backgroundImages = optionData.routine_image;
    const backgroundMusics = optionData.routine_bgm;
    const [playingSound, setPlayingSound] = useState(false);
    const [waitingGetID, setWaitingGetID] = useState(null);
    const [soundUrl, setSoundUrl] = useState('');
    const routinesReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.practiceReducer.routines : []);
    const [routineDetailState, setRoutineDetailState] = useState(routineIndex >= 0 ? routinesReducer[routineIndex] : {
        id: 0,
        title: '',
        image: optionData.routine_image[0],
        bgm: optionData.routine_bgm[0].name,
        tracks: [],
        routine: []
    });
    const [routines, setRoutines] = useState(routineIndex >= 0 ? routinesReducer[routineIndex].routine : []);
    const [refresh, setRefresh] = useState(0);
    const [selectBgm, setSelectBgm] = useState('');
    const practiceReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.practiceReducer : null);
    const [currentTrackState, setCurrentTrackState] = useState({index: -1, detail: {}});
    const [changedStatus, setChangedStatus] = useState(false);
    const [cancelContentTouches, setCancelContentTouches] = useState(true);
    const row = [];
    const [key, setKey] = useState('');
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Routine Edit Screen',
    });

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
                setWaitingGetID(false);
                setRoutineDetailState(prevState => ({...prevState, id: data}));
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        props.navigation.setParams({
            waitingGetID: waitingGetID,
        });
        if (routineIndex===-1&&!waitingGetID&&routineDetailState.title!=='') {
            dispatch({
                type: "ONENERGY_ROUTINE_SAVE",
                payload: routineDetailState
            })
            navigation.goBack();
        }
    }, [waitingGetID]);
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'home_title').title,
        });
    }, [])
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
            backgroundMusics.map(bgm => {
                if (bgm.name === routineDetailState.bgm) {
                    setSelectBgm(bgm.name);
                }
            });
        } else {
            setSelectBgm(backgroundMusics[0].name);
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
                navigation.goBack();
            } else {
                addTracks().then();
            }
        }
    }
    const createTracks = (routine) => {
        let tracks = [];
        let id = 1;
        const min1 = "https://cdn.onenergy.institute/audios/preparatory_practices/members/1min.mp3";
        if (routine.length > 0) {
            tracks.push({
                id: 1,
                title: 'Opening',
                url: 'https://cdn.onenergy.institute/audios/preparatory_practices/members/Opening_Member.mp3',
                artist: '',
                artwork: '',
                duration: 25,
            });
            routine.map(item => {
                item.parts.map(part => {
                    console.log(item.title, part)
                    if (part.start) {
                        id++;
                        tracks.push({
                            id: id,
                            title: item.title,
                            url: part.start,
                            artist: '',
                            artwork: '',
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
                                            artist: '',
                                            artwork: '',
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
                                        artist: '',
                                        artwork: '',
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
                        artist: '',
                        artwork: '',
                        duration: parseInt(item.endDuration),
                    });
                }

            })
            id++
            tracks.push({
                id: id,
                title: 'Closing',
                url: 'https://cdn.onenergy.institute/audios/preparatory_practices/members/Closing_Member.mp3',
                artist: '',
                artwork: '',
                duration: 13,
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
                return {...prevState, routine: newRoutines, tracks: tracks}
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
                tracks: tracks
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
                tracks: tracks
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
                removeItem(item.id)
            }}>
                <IconButton
                    icon={require("@src/assets/img/delete.png")}
                    tintColor={colors.headerIconColor}
                    style={{
                        alignSelf: "center",
                        height: 24,
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
                <View style={{width: windowWidth - scale(30), flexDirection: "row", justifyContent: "flex-start"}}>
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
        console.log(item)
        let index = routineDetailState.routine.findIndex(el => el.id === item.item.id);
        let track;
        track = item.item.parts[0].start;
        return (
            item.item.show ?
                <TouchableWithoutFeedback onPress={() => {
                    if (index === -1) {
                        addGuideToRoutine(item.item);
                        setChangedStatus(true);
                    }
                }}>
                    <View style={{
                        backgroundColor: colors.bodyBg,
                        paddingHorizontal: scale(25),
                        paddingVertical: scale(15),
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        borderTopRightRadius: 9,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                            {track ?
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
                                style={[global.text, {marginLeft: scale(5)}]}>
                                {item.item.title}
                            </Text>
                        </View>
                        {index >= 0 ? (
                            <SvgIconCheck size={24} color={colors.primaryColor}/>
                        ) : null}
                    </View>
                </TouchableWithoutFeedback>
                : null
        )
    }
    const renderCount = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: 9, borderTopRightRadius: 9, marginTop: 25};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case 29:
                cornerStyle = {borderBottomLeftRadius: 9, borderBottomRightRadius: 9, marginBottom: 25};
                break;
            default:
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                changeCount(item);
            }}>
                <View style={[cornerStyle, bottomStyle, {
                    width: windowWidth - 50,
                    marginHorizontal: 25,
                    paddingHorizontal: 25,
                    backgroundColor: colors.bodyBg,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}>
                    <Text
                        style={{
                            fontFamily: "Montserrat-Regular",
                            fontWeight: "normal",
                            fontSize: scale(18),
                            color: colors.textColor
                        }}>
                        {item.item} {currentTrackState.item.mode === "1" ? item.index > 0 ? " minutes" : " minute" : item.index > 0 ? " times" : " time"}
                    </Text>
                    {currentTrackState.index !== -1 && parseInt(currentTrackState.item.count, 10) === parseInt(item.item, 10) ? (
                        <SvgIconCheck size={24} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const renderBGM = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        let bgmTrack;
        if (item.item.name !== 'No Sound') {
            bgmTrack = optionData.routine_bgm.find(el => el.name === item.item.name).bgm;
        } else {
            bgmTrack = '';
        }
        console.log(soundUrl, playingSound)
        switch (item.index) {
            case 0:
                cornerStyle = {borderTopLeftRadius: 9, borderTopRightRadius: 9};
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
            case backgroundMusics.length - 1:
                cornerStyle = {borderBottomLeftRadius: 9, borderBottomRightRadius: 9};
                break;
            default:
                bottomStyle = {borderBottomWidth: 1, borderBottomColor: '#E6E6E8'};
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                setRoutineDetailState(prevState => ({...prevState, bgm: item.item.name}));
                setSelectBgm(item.item.name);
                setChangedStatus(true);
                setPlayingSound(false);
                this.bgmDialog.close();
            }}>
                <View style={[cornerStyle, bottomStyle, {
                    paddingHorizontal: 25,
                    backgroundColor: colors.bodyBg,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }]}>
                    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                        {bgmTrack ?
                            <TouchableOpacity
                                onPress={() => {
                                    if (playingSound && bgmTrack === soundUrl) {
                                        console.log('stop')
                                        setPlayingSound(false);
                                    } else {
                                        console.log('play')
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
                            style={[global.text, {marginLeft: scale(5)}]}>
                            {item.item.name}
                        </Text>
                    </View>
                    {routineDetailState.bgm === item.item.name ? (
                        <SvgIconCheck size={24} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const renderSectionHeader = (section) => {
        return (
            section.section.data.find((item) => item.show) ?
                <Text style={[global.settingsItemTitle, {
                    backgroundColor: '#e6e6e8',
                    borderTopRightRadius: 9,
                    borderTopLeftRadius: 9,
                    paddingVertical: 10,
                    fontSize: 24,
                    marginTop: scale(15),
                    textAlign: "center"
                }]}>{section.section.title.toUpperCase()}</Text>
                : null
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
                        value={routineDetailState ? routineDetailState.title : ''}
                    />
                </View>
                <View style={global.roundBox}>
                    <View style={{
                        width: windowWidth - scale(35),
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <Text style={global.settingsItemTitle}>Background Image</Text>
                    </View>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 5}}>
                            {renderColor()}
                        </View>
                    </View>
                </View>
                <View style={global.roundBox}>
                    <View style={{
                        width: windowWidth - scale(35),
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}>
                        <Text style={global.settingsItemTitle}>Background Music</Text>
                    </View>
                    <View>
                        <View style={styles.listContainer}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.bgmDialog.open();
                                }}>
                                <View style={styles.content}>
                                    {selectBgm ? (
                                        <Text style={[global.text, styles.trackTitle]}>
                                            {selectBgm}
                                        </Text>
                                    ) : null}
                                    <View>
                                        <Image style={{marginRight: 25, tintColor: colors.primaryColor}}
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
                        <Text style={[global.text, {fontSize: scale(10)}]}>(swipe to delete, drag to sort)</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.addGuideModal.open();
                            }}
                        >
                            <SvgAddIcon color={colors.primaryColor} size={scale(36)}/>
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
                ref={(countDialog) => {
                    this.countDialog = countDialog;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                modalHeight={windowHeight / 2}
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: scale(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        {currentTrackState.index !== -1 ? (
                            <Text style={{
                                fontSize: scale(24),
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
                childrenStyle={{padding: scale(25)}}
                adjustToContentHeight="true"
                withHandle="false"
                HeaderComponent={
                    <View style={{
                        padding: scale(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: scale(24),
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
                ref={(addGuideModal) => {
                    this.addGuideModal = addGuideModal;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                childrenStyle={{paddingHorizontal: scale(25), paddingBottom: scale(25)}}
                modalHeight={windowHeight * 2 / 3}
                handlePosition="outside"
                HeaderComponent={
                    <View style={{
                        padding: scale(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: scale(24),
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
                    sections: practiceReducer.guides,
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
        paddingHorizontal: scale(15),
    },
    list: {
        width: windowWidth - scale(30),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'scroll',
    },
    contentContainer: {
        width: windowWidth - scale(30),
    },
    index: {},
    listContainer: {
        width: windowWidth - scale(30),
        aspectRatio: 8,
        flexDirection: 'row',
        marginBottom: 5,
        borderRadius: 9,
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
        marginHorizontal: 10,
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
        fontSize: 24,
        fontWeight: "800",
        color: "black",
        marginTop: 10,
        marginBottom: 5,
    },
    footer: {
        paddingVertical: 32,
        flexDirection: "row",
        alignItems: "center",
    },
    inputName: {
        height: 50,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#8c79ea",
        backgroundColor: "#ffffff",
        paddingLeft: 15
    },
    trackTitle: {
        fontSize: scale(12),
        paddingLeft: 10,
        flex: 0.7,
    },
    trackCount: {
        flex: 0.3,
        width: scale(50),
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    trackCountText: {
        alignContent: "flex-end",
    },
    colorSelect: {
        width: 36,
        height: 36,
        borderRadius: 4,
        marginHorizontal: 5
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
            params.waitingGetID ?
                <View style={{marginLeft:scale(15)}}>
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
                        fontSize: scale(16),
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
                        marginRight: scale(15),
                        fontFamily: "Montserrat-Regular",
                        fontSize: scale(16),
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