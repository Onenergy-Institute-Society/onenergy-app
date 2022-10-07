import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    StatusBar,
    Text,
    PixelRatio,
    Alert,
    BackHandler
} from "react-native";
import {getApi} from "@src/services";
import {connect} from "react-redux";
import Video from "react-native-video";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import WaitingGroupPractice from "./WaitingGroupPractice";
import { execDispatch } from '../Utils/actions'

const statusBarSize = 25;
class VideoPlayer extends Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = {
            videoStyle: {
                height: windowWidth + statusBarSize,
                alignSelf: "stretch",
            },
            topViewStyle: {
                flex: 1,
                transform: [
                    { rotateZ: '90deg'},
                    { translateY: ((PixelRatio.getPixelSizeForLayoutSize(windowHeight)-
                                PixelRatio.getPixelSizeForLayoutSize(windowWidth))/
                            PixelRatio.get()) - statusBarSize },
                ],
                height: windowWidth,
                width: windowHeight,
            },
            paused: false,
            muted: false,
            sourceFile: this.props.src,
            resizeMode: "cover",
            showControls: this.props.navigation.getParam('showControls')? this.props.navigation.getParam('showControls'):false,
            video : this.props.navigation.getParam('video'),
            seek : this.props.navigation.getParam('seek'),
            config: this.props.navigation.getParam('config'),
            optionData: this.props.navigation.getParam('optionData'),
            startMinute: parseInt(this.props.navigation.getParam('gp_minute')),
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillUnmount() {
        deactivateKeepAwake();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillMount() {
        activateKeepAwake();
    }

    onVideoEnd() {
        this.setState({ key: new Date(), currentTime: 0, paused: true });
        deactivateKeepAwake();
        this.updateProgress().then();
        this.props.navigation.goBack();
    }

    onVideoLoad(e) {
        if (this.state.seek) {
            this.videoPlayer.seek(this.state.seek);
        } else {
            let min = new Date().getMinutes();
            let sec = new Date().getSeconds();
            let startMinutes = this.state.startMinute;

            if (min < startMinutes){
                min = 30 - startMinutes + min;
            }else{
                min = min - startMinutes - 30;
            }
            let second = min * 60 + sec;
            this.videoPlayer.seek(second);
            this.setState({currentTime: e.currentTime, duration: e.duration});
        }
    }

    onProgress(e) {
        this.setState({ currentTime: e.currentTime });
    }

    updateProgress = async () => {
        const apiRequest = getApi(this.state.config);
        await apiRequest.customRequest(
            "wp-json/onenergy/v1/progress",
            "post",
            {"id":this.props.navigation.getParam('gp_id'), "type":"Group_Practice_End"},
            null,
            {},
            false
        ).then(response => {
            if(response.data.updated.quest) {
                this.props.execDispatch('NOTIFICATION_INCREMENT', 'quest');
            }
            if(response.data.updated.milestone) {
                this.props.execDispatch('NOTIFICATION_INCREMENT', 'achievement');
            }
            if(response.data.achievements)
            {
                this.props.execDispatch('UPDATE_USER_COMPLETED_ACHIEVEMENTS', response.data.achievements);
            }
        });
    }

    handleBackButtonClick() {
        Alert.alert(
            "Please Confirm",
            this.state.optionData.testing_mode?"Testing mode: Update progress and exit?":"Stop before session ends will result not counting as one complete practice, are you sure you want to exit?",
            [
                {
                    text: "OK", onPress: () => {
                        this.state.optionData.testing_mode?
                            this.updateProgress().then():null;
                        this.props.navigation.goBack();
                    }
                },
                {
                    text: "Cancel", onPress: () => {}
                }
            ],
            {
                cancelable: false,
            }
        )
        return true;
    }

    // navigation options
    static navigationOptions = { header: null }

    render() {
        const { navigation } = this.props;
        const { paused } = this.state;

        //const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100;

        return (
            <View
                style={{flex: 1, backgroundColor: "black"}}>
                <StatusBar hidden={true} />
                <View style={this.state.topViewStyle}>
                    <Video
                        ref={videoPlayer => this.videoPlayer = videoPlayer}
                        onEnd={this.onVideoEnd.bind(this)}
                        onLoad={this.onVideoLoad.bind(this)}
                        onProgress={this.onProgress.bind(this)}
                        audioOnly={false}
                        source={{uri: this.state.video}}   // Can be a URL or a local file.
                        paused={paused}
                        resizeMode={this.state.resizeMode}
                        style={this.state.videoStyle} />
                    <WaitingGroupPractice gp_id={navigation.getParam('gp_id')} gp_time={navigation.getParam('gp_time')} waitingStyle={{flexDirection: "row", justifyContent: "flex-start", alignItems:"center",borderRadius:9, paddingHorizontal:10, backgroundColor:"black", position:"absolute", top:40, left: 20}} waitingIconColor={"white"} waitingIconStyle={{width:16, height:16}} waitingTextStyle={{color:"white", fontSize:scale(16), marginLeft:5}} />
                    <TouchableOpacity
                        style={{borderRadius:9, backgroundColor:"red", position:"absolute", top:40, right: 20}}
                        onPress={() => this.handleBackButtonClick()}
                        >
                        <Text style={{paddingHorizontal:10, color:"white", fontSize:scale(16)}}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapDispatchToProps = {
    execDispatch,
}

function mapStateToProps(state) {
    const {config} = state.config
    const {accessToken} = state.auth.token
    const {user} = state.user
    return {config, accessToken, user}
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer)