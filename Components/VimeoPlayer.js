import React, { Component } from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    StatusBar,
    Platform,
    Text,
    PixelRatio,
    Alert,
    BackHandler
} from "react-native";
import {connect} from "react-redux";
import Video from "react-native-video";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import ChooseSubtitle from "./ChooseSubtitle";
import * as Progress from 'react-native-progress';
import InteractiveTranscripts from "./InteractiveTranscripts";

const statusBarSize = 0;
class VimeoPlayer extends Component {
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
            resizeMode: "contain",
            showControls: this.props.navigation.getParam('showControls')? this.props.navigation.getParam('showControls'):false,
            video : this.props.navigation.getParam('video'),
            seek : this.props.navigation.getParam('seek'),
            textTracks : this.props.navigation.getParam('textTracks'),
            selectedCCUrl: this.props.navigation.getParam('selectedCCUrl'),
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
        if(this.props.navigation.getParam('lesson_video')) {
            this.props.completeVideo();
        }
        this.props.navigation.goBack();
    }

    onVideoLoad(e) {
    }

    onProgress(e) {
        this.setState({ currentTime: e.currentTime, seekableDuration: e.seekableDuration });
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    setSelectedCCUrl=(selectedCCUrl)=> {
        this.setState({ selectedCCUrl: selectedCCUrl});
    }

    // navigation options
    static navigationOptions = { header: null }

    render() {
        const { onClosePressed, volume, navigation } = this.props;
        const { currentTime, duration, paused } = this.state;

        //const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100;

        return (
            <View
                style={{flex: 1, backgroundColor: "black"}}>
                <StatusBar hidden={true} />
                <View style={this.state.topViewStyle}>
                    <Video
                        ref={vimeoPlayer => this.vimeoPlayer = vimeoPlayer}
                        onEnd={this.onVideoEnd.bind(this)}
                        onLoad={this.onVideoLoad.bind(this)}
                        onProgress={this.onProgress.bind(this)}
                        audioOnly={false}
                        source={{uri: this.state.video}}   // Can be a URL or a local file.
                        paused={this.state.paused}
/*                        volume={Math.max(Math.min(1, volume), 0)}*/
                        resizeMode={this.state.resizeMode}
                        style={this.state.videoStyle} />
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({
                            paused: true
                        })}
                    >
                        <View style={[styles.overlayView, {backgroundColor:this.state.paused?'rgba(0,0,0,0.5)':'rgba(0,0,0,0)'}]}>
                            {this.state.paused?
                                <>
                                <View style={{width:"50%", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                    <TouchableWithoutFeedback
                                        onPress={() =>{
                                            if(this.state.currentTime >= 10){
                                                this.vimeoPlayer.seek(this.state.currentTime-10);
                                                this.setState({
                                                    currentTime: this.state.currentTime-10
                                                })
                                            }else {
                                                this.vimeoPlayer.seek(0);
                                                this.setState({
                                                    currentTime: 0
                                                })
                                            }
                                        }}
                                    >
                                        <View style={styles.skipButtonView}>
                                            <Image
                                                tintColor={"#FFFFFF"}
                                                style={{
                                                    width:48,
                                                    height:48,
                                                    tintColor:"#FFFFFF",
                                                    opacity: 0.5
                                                }}
                                                source={require('../assets/images/skipback10.png')}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.setState({
                                            paused: false
                                        })}
                                    >
                                        <View style={styles.playButtonView}>
                                            <Image
                                                tintColor={"#FFFFFF"}
                                                style={{
                                                    width:48,
                                                    height:48,
                                                    tintColor:"#FFFFFF",
                                                    opacity: 0.5
                                                }}
                                                source={require('../assets/images/arrow_right-1.png')}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {!this.props.navigation.getParam('no_skip_forward')?
                                    <TouchableWithoutFeedback
                                        onPress={() =>{
                                            if(this.state.currentTime <= this.state.seekableDuration) {
                                                this.vimeoPlayer.seek(this.state.currentTime + 10)
                                                this.setState({
                                                    currentTime: this.state.currentTime + 10
                                                })
                                            }else {
                                                this.vimeoPlayer.seek(this.state.seekableDuration)
                                                this.setState({
                                                    currentTime: this.state.seekableDuration
                                                })
                                            }
                                        }}
                                        >
                                        <View style={styles.skipButtonView}>
                                            <Image
                                                tintColor={"#FFFFFF"}
                                                style={{
                                                    width:48,
                                                    height:48,
                                                    tintColor:"#FFFFFF",
                                                    opacity: 0.5
                                                }}
                                                source={require('../assets/images/skip10.png')}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    :
                                        <View style={{width: 72, height: 72}}/>
                                    }
                                </View>
                                <View style={styles.progressView}>
                                    <Progress.Bar borderColor={"rgba(255,255,255,0.5)"} color={"rgba(255,255,255,0.5)"} progress={this.state.currentTime/this.state.seekableDuration} width={windowHeight/2} height={scale(10)} />
                                </View>
                                </>
                            :null}
                            {this.state.seekableDuration?
                            <View style={styles.remainingView}><Text style={styles.remaining}>{new Date(Math.round(this.state.seekableDuration - this.state.currentTime) * 1000).toISOString().substring(14, 19)}</Text></View>
                                :null}
                            {(this.state.textTracks.length>0&&this.state.paused)?
                                <ChooseSubtitle textTracks={this.state.textTracks} setSelectedCCUrl={this.setSelectedCCUrl} />
                                :null}
                            {this.state.selectedCCUrl?(
                                <View style={styles.subTitle}>
                                    <InteractiveTranscripts
                                        key = {this.state.selectedCCUrl}
                                        currentDuration={this.state.currentTime * 1000}
                                        url={this.state.selectedCCUrl}
                                        seekToTranscriptDuration={(time) => {
                                            this.vimeoPlayer.seek(time);
                                        }}
                                        contentContainerStyle={
                                            {
                                                flexGrow: 1,
                                                justifyContent:"center"
                                            }
                                        }
                                        textStyle={
                                            {
                                                fontSize:scale(16),
                                                textAlign:"center",
                                                alignItems:"center",
                                                justifyContent:"center",
                                                textAlignVertical:"center",
                                                height:scale(40),
                                                fontFamily: 'Montserratlternates-Regular'
                                            }
                                        }
                                        activeTranscriptColor={"white"}
                                        inactiveTranscriptColor={"white"}
                                    />
                                </View>
                            ):null}
                            {this.state.paused?
                                <TouchableWithoutFeedback
                                    onPress={() => this.handleBackButtonClick()}
                                >
                                    <View style={[styles.buttonView,{right:scale(20)}]}>
                                        <Image
                                            tintColor={"#FFFFFF"}
                                            style={{
                                                width:24,
                                                height:24,
                                                tintColor:"#FFFFFF",
                                                opacity: 0.5
                                            }}
                                            source={require("@src/assets/img/close.png")}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                :null}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    overlayView:{
        width:windowHeight,
        height:windowWidth,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    subTitle:{
        height:scale(40),
        width:windowHeight,
        justifyContent: "center",
        alignItems: "center",
        position:"absolute",
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: windowWidth-scale(40),
    },
    remainingView:{
        position:"absolute",
        top: scale(10),
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    remaining:{
        color: "white",
    },
    progressView: {
        marginTop:20,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        zIndex:999,
    },
    skipButtonView: {
        width:72,
        height:72,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:72,
        zIndex:999,
    },
    playButtonView: {
        width:96,
        height:96,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:96,
        zIndex:999,
    },
    buttonView: {
        width:36,
        height:36,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,0.5)',
        borderRadius:4,
        zIndex:999,
        position:"absolute",
        top:scale(20),
    }
});
function mapDispatchToProps(dispatch) {
    return {
        completeVideo: () => dispatch({
            type: 'ONENERGY_VIDEO_COMPLETED'
        })
    }
}
function mapStateToProps(state) {
    const {config} = state.config
    const {accessToken} = state.auth.token
    const {user} = state.user
    return {config, accessToken, user}
}
export default connect(mapStateToProps, mapDispatchToProps)(VimeoPlayer)