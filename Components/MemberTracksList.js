import React, {useState} from 'react';
import {
    Alert,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from 'react-native';
import { useSelector } from "react-redux";
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';
import {scale, verticalScale} from '../Utils/scale';
import AudioPlayerRoutine from './AudioPlayerRoutine';
import {windowWidth} from "../Utils/Dimensions";
import {Swipeable} from "react-native-gesture-handler";
import IconButton from "@src/components/IconButton";
import TouchableScale from "./TouchableScale";

const MemberTracksList = (props) => {
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const routines = useSelector((state) => state.routinesReducer.data);
    const [selectedRoutine, setSelectedRoutine] = useState(null);

    // state vars
    const onTrackItemPress = async (routine) => {
        if(!selectedRoutine || routine.id !== selectedRoutine.id) {
            if(routine.bgm !== 'No Sound') {
                let index = optionData.routine_bgm.findIndex(el => el.name === routine.bgm);
                routine.bgm_url = optionData.routine_bgm[index].bgm;
            }else{
                routine.bgm_url = '';
            }
            setSelectedRoutine(routine);
        }else{
            const state = await TrackPlayer.getState();

            if (state === State.Playing) {
                await TrackPlayer.pause();
            }

            if (state === State.Paused) {
                await TrackPlayer.play();
            }
        }
    };

    const onRemoveRoutinePress = (item) =>{
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
                        props.onRemoveRoutine(item);
                    },
                },
            ]
        );
    }
    const row = [];
    const [key, setKey] = useState('');
    const handleWillOpen = (index : any) => () => (key !== '') && (key !== index) && row[key].close();
    const handleOpen = (index : any) => () => setKey(index);
    const renderItem = ({ item, index }) => {
        let showPlayer = !!(selectedRoutine && selectedRoutine.id === item.id);
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
                    <View style={[styles.trackItem, styles.boxShadow, { height: showPlayer?verticalScale(120):verticalScale(80)}]}>
                        <TouchableScale
                            onPress={() => {
                                onTrackItemPress(item).then();
                            }}
                        >
                        <ImageBackground style={[styles.trackItemInner, styles.itemStyle]} source={{uri: item.image}}>
                            <View style={styles.trackDescBox}>
                                <View style={styles.titleBox}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <View style={styles.detail}>
                                    {
                                        item.routine.map((item)=>{
                                            return <Text style={styles.subTitle}>{item.title}</Text>
                                        })
                                    }
                                    </View>
                                </View>
                                <View style={{flexDirection:"row", justifyContent: "flex-end"}}><View><Text style={{fontStyle:"italic",color:"white", fontSize:scale(10)}}>Swipe to edit</Text></View></View>
                            </View>
                        </ImageBackground>
                        </TouchableScale>
                        {showPlayer? (
                            <AudioPlayerRoutine routine={selectedRoutine} />
                        ):null}
                    </View>
                </Swipeable>
        );
    };

    const rightActions = (dragX, item, index) => {
        return (
            <View style={{justifyContent:"space-evenly", alignItems:"center", marginRight:15}}>
                <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={() => {onRemoveRoutinePress(item);}}>
                    <IconButton
                        icon={require("@src/assets/img/delete.png")}
                        tintColor={"red"}
                        style={{
                            alignSelf: "center",
                            height: 24,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}} onPress={() => {props.onEditRoutinePress(item, index);row[key].close()}}>
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
        <SafeAreaView style={styles.container}>
            <FlatList data={routines} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
    },
    trackItem: {
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        marginHorizontal: scale(15),
        marginBottom: verticalScale(15),
        justifyContent: "flex-start",
    },
    trackItemInner: {
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        overflow: "hidden",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    itemStyle: {
        paddingHorizontal: scale(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: verticalScale(80),
        borderBottomColor: '#333',
        borderWidth: 0,
    },
    trackImgBox: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    trackDescBox: {
        flex: 4,
        paddingLeft: scale(10),
        marginLeft: scale(10),
        borderRadius: 9,
        display: 'flex',
    },
    trackImg: {
        width:scale(70),
        height:verticalScale(70),
        marginLeft: scale(10),
        borderRadius:9,
    },
    titleBox: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        marginTop: verticalScale(5),
    },
    subTitleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems:"center",
    },
    album: {
        fontSize: scale(15),
        fontWeight: 'normal',
    },
    title: {
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    detail:{
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: 'wrap',
    },
    subTitle: {
        fontSize: scale(10),
        color:"white",
        backgroundColor:'rgba(0,0,0,0.2)',
        borderRadius:9,
        paddingHorizontal:4,
        marginRight:2,
        marginBottom:2,
    },
    duration: {
        fontSize: scale(12),
    },
    listBox: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingTop: verticalScale(10),
    },
    editButton:{
        flex:1,
        marginRight:15,
        marginVertical:15,
        backgroundColor: "#4942e1",
        justifyContent: "center",
        alignItems: "center",
        height: verticalScale(30),
        padding:15,
        borderRadius:6
    },
    viewAddRoutine: {
        position:"absolute",
        bottom:60,
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