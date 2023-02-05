import React, {useState} from 'react';
import {
    Alert,
    FlatList,
    ImageBackground,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import {useSelector} from "react-redux";
import {mvs, s, vs, windowWidth} from '../Utils/Scale';
import AudioPlayerRoutine from './AudioPlayerRoutine';
import {Swipeable} from "react-native-gesture-handler";
import IconButton from "@src/components/IconButton";
import {SvgBell, SvgChevronsLeft, SvgClock, SvgMoreVertical, SvgWatch} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const MemberTracksList = (props) => {
    const {setMessageBarDisplay, screenProps} = props;
    const {global, colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const practiceReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.practiceReducer : null);
    const [selectedRoutine, setSelectedRoutine] = useState(null);

    // state vars
    const onTrackItemPress = (routine) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.spring
        );
        if (!selectedRoutine || parseInt(routine.id) !== parseInt(selectedRoutine.id)) {
            setSelectedRoutine(routine);
            Analytics.segmentClient.track('Start Routine Practice', {
                id: routine.id,
                title: routine.title
            }).then();
        }
    };

    const onRemoveRoutinePress = (item, index) => {
        Alert.alert(
            "Are your sure?",
            "Are you sure you want to delete this routine?",
            [
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        props.onRemoveRoutine(item, index);
                        row[key].close();
                    },
                },
            ]
        );
    }
    const row = [];
    const [key, setKey] = useState('');
    const handleWillOpen = (index: any) => () => (key !== '') && (key !== index) && row[key].close();
    const handleOpen = (index: any) => () => setKey(index);
    const renderItem = ({item, index}) => {
        let showPlayer = !!(selectedRoutine && selectedRoutine.id === item.id);
        let totalDuration = 0;
        item.audioTracks.forEach((item) => {
            totalDuration += parseInt(item.duration);
        })
        let itemRank = !item.level?0:practiceReducer.guides.find(level=>level.id===item.level).rank;
        console.log(item)
        return (
            itemRank<=user.rank?
            <Swipeable
                ref={ref => row[index] = ref}
                friction={2}
                leftThreshold={10}
                rightThreshold={10}
                renderRightActions={(_, dragX) => rightActions(dragX, item, index)}
                onSwipeableRightWillOpen={handleWillOpen(index)}
                onSwipeableLeftWillOpen={handleWillOpen(index)}
                onSwipeableOpen={handleOpen(index)}
            >
                <View style={[styles.trackItem, styles.boxShadow, {backgroundColor: colors.bodyBg}]}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            onTrackItemPress(item)
                        }}
                    >
                        <ImageBackground style={styles.itemStyle}
                                         source={{uri: item.image}}
                                         resizeMode={"cover"}
                                         imageStyle={{borderTopLeftRadius: s(9), borderTopRightRadius: s(9), borderBottomLeftRadius: showPlayer?0:s(9), borderBottomRightRadius: showPlayer?0:s(9)}}>
                            <View style={styles.titleBox}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                            <View style={{position:"absolute", right:s(10), top:s(10)}}>
                            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                <SvgClock color={'white'} size={s(14)} style={{marginRight:s(5)}}/><Text style={styles.duration}>{new Date(totalDuration * 1000).toISOString().substring(14, 16)}'{new Date(totalDuration * 1000).toISOString().substring(17, 19)}"</Text>
                            </View>
                            {item.reminder_enable?
                                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                    <SvgBell color={'white'} size={s(14)} style={{marginRight:s(5)}}/><Text style={styles.duration}>{item.reminder_time}</Text>
                                </View>
                                :
                                null
                            }
                            </View>
                            <View style={styles.subTitleBox}>
                                <Text style={styles.subTitle}>{item.level&&practiceReducer.guides.find(level=>level.id===item.level)?practiceReducer.guides.find(level=>level.id===item.level).title:'Preparatory Practices'}</Text>
                                <Text style={styles.subTitle}>Practices: {item.routine.length}</Text>
                                <Text style={styles.subTitle}>Background: {optionData.bgm.find(el => el.id === item.bgm_id)?optionData.bgm.find(el => el.id === item.bgm_id).name:''}</Text>
                            </View>
                            <SvgChevronsLeft size={s(24)} color={"#fff"} style={{position: "absolute", right: s(10), bottom: s(10)}}/>
                        </ImageBackground>
                    </TouchableOpacity>
                    {showPlayer ? (
                        <>
                            <AudioPlayerRoutine routine={selectedRoutine} setMessageBarDisplay={setMessageBarDisplay}
                                                totalDuration={totalDuration} {...props}/>
                        </>
                    ) : null}
                </View>
            </Swipeable>
            :
            <View style={[styles.trackItem, styles.boxShadow, {backgroundColor: colors.bodyBg}]}>
                <ImageBackground style={styles.itemStyle}
                                 source={{uri: "https://cdn.onenergy.institute/images/0.jpg"}}
                                 resizeMode={"cover"}
                                 imageStyle={{borderTopLeftRadius: s(9), borderTopRightRadius: s(9), borderBottomLeftRadius: showPlayer?0:s(9), borderBottomRightRadius: showPlayer?0:s(9)}}>
                    <View style={styles.titleBox}>
                        <Text style={[styles.title, {color:'grey'}]}>{item.title}</Text>
                        <Text
                            style={[styles.duration, {color:'grey'}]}>{new Date(totalDuration * 1000).toISOString().substring(14, 19)}</Text>
                    </View>
                    <View style={styles.subTitleBox}>
                        <Text style={[styles.subTitle, {color:'grey'}]}>{item.level&&practiceReducer.guides.find(level=>level.id===item.level)?practiceReducer.guides.find(level=>level.id===item.level).title:'Preparatory Practices'}</Text>
                        <Text style={[styles.subTitle, {color:'grey'}]}>Practices: {item.routine.length}</Text>
                        <Text style={[styles.subTitle, {color:'grey'}]}>Background: {optionData.bgm.find(el => el.id === item.bgm_id)?optionData.bgm.find(el => el.id === item.bgm_id).name:''}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const rightActions = (dragX, item, index) => {
        return (
            <View style={{justifyContent: "space-evenly", alignItems: "center", marginRight: 15}}>
                <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => {
                    onRemoveRoutinePress(item, index);
                }}>
                    <IconButton
                        icon={require("@src/assets/img/delete.png")}
                        tintColor={"red"}
                        style={{
                            alignSelf: "center",
                            height: s(24),
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => {
                    row[key].close();
                    setSelectedRoutine(null);
                    props.onEditRoutinePress(index);
                }}>
                    <IconButton
                        icon={require("@src/assets/img/edit_2.png")}
                        tintColor={"#4942e1"}
                        style={{
                            alignSelf: "center",
                            height: s(24),
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={global.container}>
            {practiceReducer && practiceReducer.routines && practiceReducer.routines.length ?
                <FlatList contentContainerStyle={{paddingBottom: s(20)}} style={styles.trackList}
                          data={practiceReducer.routines} renderItem={renderItem} keyExtractor={item => item.id}/>
                : null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    trackList: {
        paddingTop: s(5),
    },
    trackItem: {
        borderRadius:s(9),
        width: windowWidth - s(30),
        marginHorizontal: s(15),
        marginTop: mvs(15),
        marginBottom: mvs(10),
        justifyContent: "flex-start",
        flexGrow: 1,
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    itemStyle: {
        borderRadius:s(9),
        width: windowWidth - s(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        height: vs(90),
    },
    titleBox: {
        width: windowWidth - s(30),
        marginTop: mvs(5),
        paddingHorizontal: s(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    subTitleBox: {
        width: windowWidth - s(30),
        marginBottom: mvs(15),
        paddingHorizontal: s(15),
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: "MontserratAlternates-SemiBold",
        fontSize: s(16),
        fontWeight: 'bold',
        color: "#262626",
    },
    detail: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: 'wrap',
    },
    subTitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: s(14),
        color: "#262626",
    },
    duration: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: s(12),
        fontWeight: "bold",
        color: "#fff",
        textShadowColor: 'grey',
        textShadowRadius: 1,
        textShadowOffset: {
            width: -1,
            height: 1
        }
    },
    listBox: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingTop: s(10),
    },
    editButton: {
        flex: 1,
        marginRight: 15,
        marginVertical: 15,
        backgroundColor: "#4942e1",
        justifyContent: "center",
        alignItems: "center",
        height: s(30),
        padding: 15,
        borderRadius: 6
    },
    viewAddRoutine: {
        position: "absolute",
        bottom: 60,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    ModalOutsideContainer: {
        flex: 1,
    },
    ModalContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
export default MemberTracksList;