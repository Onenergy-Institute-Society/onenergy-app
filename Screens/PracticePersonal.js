import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    View,
    Text,
    Platform, ScrollView
} from "react-native";
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import TracksList from '../Components/TracksList';
import IconButton from "@src/components/IconButton";
import {withNavigation} from "react-navigation";
import TrackPlayer from 'react-native-track-player';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale, verticalScale} from "../Utils/scale";
import * as Progress from 'react-native-progress';
import EventList from "../Components/EventList";

const PracticePersonal = props => {
    const user = useSelector((state) => state.user.userObject);
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const helpIndex = optionData.helps.findIndex(el => el.name === 'practice_guided_popup');
    const helpData = {title:optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'',id:optionData.helps[helpIndex].id};
    const helpPageIndex = optionData.helps.findIndex(el => el.name === 'practice_guided_empty');
    const helpPageData = {title:optionData.helps[helpPageIndex].title?optionData.helps[helpPageIndex].title:'',id:optionData.helps[helpPageIndex].id};
    const [tracks, setTracks] = useState([]);
    const [tracksLoading, setTracksLoading] = useState(true);
    if (!props.isFocused)
        return null;
    const fetchTracks = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/audio",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                setTracks(response.data);
                setTracksLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    const toggleHelpModal = () => {
        this.ppHelpModal.open();
    };
    useEffect(() => {
        fetchTracks().then();
        let titleIndex = optionData.titles.findIndex(el => el.id === 'practices_basic');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            toggleHelpModal: toggleHelpModal,
        });
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            {user.hasGuide>0||tracks.length?
                tracksLoading ? (
                    <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Loading</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
                ) : (
                    <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                        <View style={{marginVertical:verticalScale(5)}}>
                            <EventList location={'practice_guided'} eventsData={optionData.goals} />
                            <EventList location={'practice_guided'} eventsData={optionData.challenges} />
                        </View>
                        <TracksList tracks={tracks}/>
                    </ScrollView>
                )
            :
                <View style={{
                    flex: 1,
                    width: windowWidth,
                    marginTop: Platform.OS === 'android' ? verticalScale(-100) : 0
                }}>
                    <BlockScreen pageId={helpPageData.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            }
            <Modalize
                ref={(ppHelpModal) => { this.ppHelpModal = ppHelpModal; }}
                modalHeight = {windowHeight*4/5}
                childrenStyle = {{backgroundColor:"#f2f2f2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>{helpData.title}</Text>
                        <IconButton
                            pressHandler={() => {this.ppHelpModal.close();}}
                            icon={require("@src/assets/img/close.png")}
                            style={{ height: scale(16), width: scale(16) }}
                            touchableStyle={{
                                position:"absolute", top:10, right: 10,
                                height: scale(24),
                                width: scale(24),
                                backgroundColor: "#e6e6e8",
                                alignItems: "center",
                                borderRadius: 100,
                                padding: scale(5),
                            }}
                        />
                    </View>
                }
            >
                <View style={{flex: 1, width:windowWidth, marginTop:Platform.OS === 'android'?verticalScale(-100):0}} >
                    <BlockScreen pageId={helpData.id}
                         contentInsetTop={0}
                         contentOffsetY={0}
                         hideTitle={true}
                         hideNavigationHeader={true}
                         {...props} />
                </View>
            </Modalize>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f8',
        paddingTop:30,
    },
    scroll_view: {
        flexGrow: 1,
    }
});
PracticePersonal.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return ({
        headerTitle: navigation.getParam('title'),
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    TrackPlayer.stop();
                    TrackPlayer.reset();
                    navigation.goBack()
                }}
            >
                <IconButton
                    icon={require("@src/assets/img/arrow-back.png")}
                    tintColor={"#4942e1"}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16)
                    }}
                />
            </TouchableOpacity>,
        headerRight:
            <TouchableOpacity
                onPress={() => params.toggleHelpModal()}
            >
                <IconButton
                    icon={require("@src/assets/img/help.png")}
                    tintColor={"#4942e1"}
                    style={{marginRight: 25, height: 20}}
                />
            </TouchableOpacity>
    });
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(withNavigation(PracticePersonal));
