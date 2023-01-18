import React, {useEffect, useState} from "react";
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import {
    Alert,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback, TextInput, Image, ScrollView
} from "react-native";
import IconButton from "@src/components/IconButton";
import {Swipeable, GestureHandlerRootView} from "react-native-gesture-handler";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import SortList from "./SortList";
import {Modalize} from 'react-native-modalize';
import {scale} from "../Utils/scale";
import {BlurView} from "@react-native-community/blur";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack, SvgIconCheck, SvgIconCross} from "../Utils/svg";

const EditRoutine = props => {
    const {navigation, screenProps} = props;
    const {colors, global} = screenProps;
    const dispatch = useDispatch();
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const backgroundImages = optionData.routine_image;
    const backgroundMusics = optionData.routine_bgm;
    const [loading, setLoading] = useState(false);
    const [routineDetail, setRoutineDetail] = useState(navigation.getParam('routine') ? navigation.getParam('routine') : {
        id: 0,
        title: '',
        image: optionData.routine_image[0],
        bgm: optionData.routine_bgm[0].name,
        tracks: [],
        routine: []
   });
    const [selectBgm, setSelectBgm] = useState('');
    const practiceReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.practiceReducer : null);
    const [routineSettings, setRoutineSettings] = useState(routineDetail.routine);
    const [currentTrack, setCurrentTrack] = useState({index: -1, detail: {}});
    const [changedStatus, setChangedStatus] = useState(false);
    const [cancelContentTouches, setCancelContentTouches] = useState(true);

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
                {"routine": routineDetail},
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
            const apiRoutine = getApi(props.config);
            await apiRoutine.customRequest(
                "wp-json/onenergy/v1/addRoutine",
                "post",
                {"routine": routineDetail},
                null,
                {},
                false
            ).then();
       } catch (e) {
            console.error(e);
       }
   }
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'home_title').title,
       });
   }, [])
    useEffect(() => {
        if (routineDetail) {
            props.navigation.setParams({
                title: routineDetail.title,
                onBackPressed: onBackPressed,
                changeStatus: changedStatus,
                backButtonTitle: changedStatus ? 'Save' : '',
           });
            backgroundMusics.map(bgm => {
                if (bgm.name === routineDetail.bgm) {
                    setSelectBgm(bgm.name);
               }
           });
       } else {
            setSelectBgm(backgroundMusics[0].name);
       }
   }, [routineDetail])
    const removeItem = (id) => {
        let array = routineSettings; // make a separate copy of the array
        if (id !== -1) {
            let index = array.findIndex(el => el.id === id);
            array.splice(index, 1);
            setRoutineSettings(array);
            setRoutineDetail(prevState => {
                return {...prevState, routine: array}
           });
            setChangedStatus(true);
       }
   }

    const updateItem = (items) => {
        setRoutineSettings(items);
        setRoutineDetail(prevState => {
            return {...prevState, routine: items}
       });
        setChangedStatus(true);
   }

    const onBackPressed = () => {
        if (changedStatus) {
            if (!routineSettings.length) {
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
            if (!routineDetail.title.trim()) {
                alert('Please choose a routine name.');
                return false;
           }
            setLoading(true);
            dispatch({
                type: "ONENERGY_ROUTINE_SAVE",
                payload: routineDetail
           })
            setChangedStatus(false);
            if (navigation.getParam('routine')) {
                updateTracks().then();
           } else {
                addTracks().then();
           }
       }
        navigation.goBack();
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
                let tmpGuide;
                practiceReducer.guides.map(section => {
                    section.data.map(guide => {
                        if (guide.id === item.id) {
                            tmpGuide = guide;
                       }
                   })
               })
                if (tmpGuide) {
                    tmpGuide.parts.map(part => {
                        if (part.start) {
                            id++;
                            tracks.push({
                                id: id,
                                title: tmpGuide.title,
                                url: part.start,
                                artist: '',
                                artwork: '',
                                duration: parseInt(tmpGuide.start_duration),
                           });
                            switch (tmpGuide.mode) {
                                case '0':
                                    if (part.repeat) {
                                        for (let i = 1; i < parseInt(routine.count); i++) {
                                            id++;
                                            tracks.push({
                                                id: id,
                                                title: tmpGuide.title,
                                                url: part.repeat,
                                                artist: '',
                                                artwork: '',
                                                duration: parseInt(tmpGuide.repeat_duration),
                                           });
                                       }
                                   }
                                    break;
                                case '1':
                                    for (let i = 0; i < parseInt(routine.count); i++) {
                                        id++;
                                        tracks.push({
                                            id: id,
                                            title: tmpGuide.title,
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
                    if (tmpGuide.end) {
                        id++;
                        tracks.push({
                            id: id,
                            title: tmpGuide.title,
                            url: tmpGuide.end,
                            artist: '',
                            artwork: '',
                            duration: parseInt(tmpGuide.end_duration),
                       });
                   }
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
    const addGuideToRoutine = (item) => {
        item.count = 1;
        setRoutineSettings((current) => [...current, item]);
        setRoutineDetail(prevState => {
            return {
                ...prevState,
                routine: [
                    ...prevState.routine,
                    item
                ],
           }
       });
        this.addGuideModal.close();
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
    const row = [];
    const [key, setKey] = useState('');
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
                <View key={itemData.id} style={styles.listContainer}>
                    <View style={styles.content}>
                        <Text style={[global.text, styles.trackTitle]}>
                            {itemData.title}
                        </Text>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setCurrentTrack({index: id, item: itemData});
                                this.countDialog.open();
                           }}>
                            <View style={styles.trackCount}>
                                <Text
                                    style={[global.textAlt, styles.trackCountText]}>{itemData.parts > 1 ? itemData.parts + 'x' : ''}{itemData.count}{itemData.mode === "0" ? "" : "m"}</Text>
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
            </Swipeable>
        );
   };

    const renderGuides = (item) => {
        let index = routineDetail.routine.findIndex(el => el.id === item.item.id);
        return (
            item.item.show ?
                <TouchableWithoutFeedback onPress={() => {
                    addGuideToRoutine(item.item);
                    setChangedStatus(true)
               }}>
                    <View style={{
                        paddingHorizontal: scale(25),
                        paddingVertical: scale(10),
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        borderTopRightRadius: 9,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                   }}>
                        <Text
                            style={global.text}>
                            {item.item.title}
                        </Text>
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
                console.log(routineSettings)

                let tempSettings = routineSettings;
                tempSettings[currentTrack.index] = {...tempSettings[currentTrack.index], count: item.item};
                setRoutineSettings(tempSettings);
                setRoutineDetail(prevState => ({...prevState, routine: tempSettings}));
                setChangedStatus(true);
                this.countDialog.close();
           }
           }>
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
                        style={{fontSize: 18}}>
                        {item.item} {currentTrack.item.mode === "1" ? item.index > 0 ? " minutes" : " minute" : item.index > 0 ? " times" : " time"}
                    </Text>
                    {currentTrack.index !== -1 && parseInt(currentTrack.item.count, 10) === parseInt(item.item, 10) ? (
                        <SvgIconCheck size={24} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        )
   }
    const renderBGM = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
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
                setRoutineDetail(prevState => ({...prevState, bgm: item.item.name}));
                setSelectBgm(item.item.name);
                setChangedStatus(true);
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
                    <Text
                        style={global.text}>
                        {item.item.name}
                    </Text>
                    {routineDetail.bgm === item.item.name ? (
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
                    paddingVertical: 10,
                    fontSize: 24,
                    marginTop: 15,
                    textAlign: "center"
               }]}>{section.section.title.toUpperCase()}</Text>
                : null
        );
   }
    const renderColor = () => {
        return backgroundImages.map((image) => {
            let imageSelected;
            if (image === routineDetail.image) {
                imageSelected = {borderWidth: 5, borderColor: '#4942e1'};
           } else {
                imageSelected = {borderWidth: 0}
           }
            return (
                <TouchableOpacity
                    key={image}
                    onPress={() => {
                        setRoutineDetail(prevState => ({...prevState, image: image}));
                        setChangedStatus(true)
                   }}
                >
                    <Image source={{uri: image}} style={[styles.colorSelect, imageSelected]} resizeMode={"cover"}/>
                </TouchableOpacity>
            )
       })
   }
    return (
        <SafeAreaView style={[global.settingsFormContainer]}>
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
                            setRoutineDetail(prevState => ({...prevState, title: text}));
                       }}
                        value={routineDetail ? routineDetail.title : ''}
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
                        <IconButton
                            pressHandler={() => {
                                this.addGuideModal.open();
                           }}
                            icon={require("@src/assets/img/add.png")}
                            tintColor={colors.primaryColor}
                            style={{height: 20, width: 20}}
                      />
                    </View>
                    <GestureHandlerRootView style={{height: "100%"}}>
                        {routineSettings.length === 0 ? (
                            <View><Text style={global.text}>No practice selected, please tap "Plus Sign" to add.</Text></View>
                        ) : (
                            <SortList
                                horizontal={false}                          // The orientation of the list
                                data={routineSettings}                                // The list of items to render
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
                          />
                        )}
                    </GestureHandlerRootView>
                </View>
            </ScrollView>
            {loading &&
                <BlurView style={styles.loading}
                          blurType="light"
                          blurAmount={5}
                          reducedTransparencyFallbackColor="white"
                >
                    <View>
                        <ActivityIndicator size='large'/>
                    </View>
                </BlurView>
           }
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
                        {currentTrack.index !== -1 ? (
                            <Text style={{
                                fontSize: scale(24),
                                color: colors.headerColor,
                                fontFamily: "MontserratAlternates-SemiBold",
                                fontWeight: "bold"
                           }}>{currentTrack.item.mode === "1" ? "Choose duration" : "Choose repeating times"}</Text>
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
                childrenStyle={{padding: 25}}
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
                modalStyle={{backgroundColor:colors.bodyFrontBg}}
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
        paddingHorizontal: 15,
   },
    list: {
        width: windowWidth - scale(60),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'scroll',
   },
    contentContainer: {
        width: windowWidth - scale(35),
   },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
   },
    index: {},
    listContainer: {
        width: windowWidth - scale(60),
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
        borderWidth:1,
        borderColor: "#8c79ea",
        backgroundColor: "#ffffff",
        paddingLeft: 15
   },
    trackTitle: {
        paddingLeft: 10,
        flex: 0.8,
   },
    trackCount: {
        flex: 0.2,
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
            <TouchableOpacity
                onPress={() => {
                    params.onBackPressed();
               }}
            >
                <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                    <SvgIconBack color = {colors.headerIconColor}/>
                    <Text style={{
                        fontSize: scale(16),
                        color: screenProps.colors.headerIconColor
                   }}>{params.backButtonTitle}</Text>
                </View>
            </TouchableOpacity>,
   }
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(EditRoutine);