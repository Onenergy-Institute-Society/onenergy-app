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
import {scale} from '../Utils/scale';
import AudioPlayerRoutine from './AudioPlayerRoutine';
import {windowWidth} from "../Utils/Dimensions";
import {Swipeable} from "react-native-gesture-handler";
import IconButton from "@src/components/IconButton";
import {SvgMoreVertical} from "../Utils/svg";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const MemberTracksList = (props) => {
    const {setMessageBarDisplay, screenProps} = props;
    const {global, colors} = screenProps;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const practiceReducer = useSelector((state) => state.onenergyReducer ? state.onenergyReducer.practiceReducer : null);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
console.log(practiceReducer)
    // state vars
    const onTrackItemPress = (routine) => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.spring
        );
        if (!selectedRoutine || routine.uid !== selectedRoutine.uid) {

            if (routine.bgm !== 'No Sound') {
                routine.bgm_url = optionData.routine_bgm.find(el => el.name === routine.bgm).bgm;
            } else {
                routine.bgm_url = '';
            }
            setSelectedRoutine(routine);
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
                        row[key].close();
                        props.onRemoveRoutine(item, index);
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
        console.log(item)
        let showPlayer = !!(selectedRoutine && selectedRoutine.uid === item.uid);
        let totalDuration = 0;
        item.tracks.map((item) => {
            totalDuration += item.duration;
        })
        return (
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
                                         imageStyle={{borderTopLeftRadius: 9, borderTopRightRadius: 9, borderBottomLeftRadius: showPlayer?0:9, borderBottomRightRadius: showPlayer?0:9}}>
                            <View style={styles.titleBox}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text
                                    style={[styles.duration, {color: colors.primaryButtonBg}]}>{new Date(totalDuration * 1000).toISOString().substring(14, 19)}</Text>
                            </View>
                            <View style={styles.subTitleBox}><Text
                                style={styles.subTitle}>Practices: {item.routine.length}</Text><Text
                                style={styles.subTitle}>Background: {item.bgm}</Text></View>
                            <SvgMoreVertical color={"#fff"}
                                             style={{position: "absolute", right: scale(10), bottom: scale(10)}}/>
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
        );
    };

    const rightActions = (dragX, item, index) => {
        console.log(index)
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
                            height: 24,
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
                            height: 24,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={global.container}>
            {practiceReducer && practiceReducer.routines && practiceReducer.routines.length ?
                <FlatList contentContainerStyle={{paddingBottom: scale(20)}} style={styles.trackList}
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
        paddingTop: scale(5),
    },
    trackItem: {
        borderRadius: 9,
        width: windowWidth - scale(30),
        marginHorizontal: scale(15),
        marginTop: scale(15),
        marginBottom: scale(10),
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
        borderRadius: 9,
        width: windowWidth - scale(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        height: scale(80),
    },
    titleBox: {
        width: windowWidth - scale(30),
        marginTop: scale(5),
        paddingHorizontal: scale(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    subTitleBox: {
        width: windowWidth - scale(30),
        marginBottom: scale(5),
        paddingHorizontal: scale(15),
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: "MontserratAlternates-SemiBold",
        fontSize: scale(16),
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
        fontSize: scale(14),
        color: "#262626",
    },
    duration: {
        fontFamily: "MontserratAlternates-Regular",
        fontSize: scale(12),
        color: "#fff",
    },
    listBox: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingTop: scale(10),
    },
    editButton: {
        flex: 1,
        marginRight: 15,
        marginVertical: 15,
        backgroundColor: "#4942e1",
        justifyContent: "center",
        alignItems: "center",
        height: scale(30),
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