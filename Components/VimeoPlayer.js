import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    StatusBar,
    Text,
    PixelRatio,
    BackHandler, Platform
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import Video from "react-native-video";
import {activateKeepAwake, deactivateKeepAwake} from 'expo-keep-awake';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import ChooseSubtitle from "./ChooseSubtitle";
import * as Progress from 'react-native-progress';
import InteractiveTranscripts from "./InteractiveTranscripts";

const statusBarSize = 0;
const VimeoPlayer = (props) => {
    const {navigation} = props;
    const [selectedCCUrl, setSelectedCCUrl] = useState(navigation.getParam('selectedCCUrl'));
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [seekableDuration, setSeekableDuration] = useState(0);
    const video = navigation.getParam('video');
    const videoId = navigation.getParam('videoId');
    const textTracks = navigation.getParam('textTracks');
    const no_skip_forward = navigation.getParam('no_skip_forward');
    const lesson_video = navigation.getParam('lesson_video');
    const videoReducer = useSelector((state) => state.videoReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        activateKeepAwake();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            backHandler.remove();
            deactivateKeepAwake();
       };
   },[]);

    const completeVideo = () => {
        dispatch({
            type: 'ONENERGY_VIDEO_COMPLETED',
            payload: videoId,
       });
   }

    const exitVideo = () => {
        dispatch({
            type: 'ONENERGY_VIDEO_EXIT',
            payload: {'videoId': videoId, 'duration': currentTime},
       })
   }

    const onVideoEnd = () => {
        setCurrentTime(0);
        setPaused(true);

        deactivateKeepAwake();
        if(lesson_video) {
            completeVideo(videoId);
       }
        navigation.goBack();
   }

    const onVideoLoad = (e) => {

        if(videoReducer.videos.length) {
            const videoIndex = videoReducer.videos.findIndex(item => item.videoId === videoId);
            if (videoIndex >= 0 && videoReducer.videos[videoIndex].duration > 0) {
                this.vimeoPlayer.seek(videoReducer.videos[videoIndex].duration);
           }
       }
   }

    const onProgress = (e) => {
        setCurrentTime(e.currentTime);
        setSeekableDuration(e.seekableDuration);
   }

    const handleBackButtonClick = () => {
        if(lesson_video) {

            exitVideo(videoId, currentTime);
       }
        navigation.goBack();
        return true;
   }

    return (
        <View
            style={{flex: 1, backgroundColor: "black"}}>
            <StatusBar hidden={true}/>
            <View style={styles.topViewStyle}>
                <Video
                    ref={vimeoPlayer => this.vimeoPlayer = vimeoPlayer}
                    onEnd={onVideoEnd.bind(this)}
                    onLoad={onVideoLoad.bind(this)}
                    onProgress={onProgress.bind(this)}
                    audioOnly={false}
                    source={{uri: video}}   // Can be a URL or a local file.
                    paused={paused}
                    resizeMode={'contain'}
                    style={styles.videoStyle}/>
                <TouchableWithoutFeedback
                    onPress={() => setPaused(true)}
                >
                    <View style={[styles.overlayView, {backgroundColor:paused?'rgba(0,0,0,0.5)':'rgba(0,0,0,0)'}]}>
                        {paused?
                            <>
                            <View style={{width:"50%", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <TouchableWithoutFeedback
                                    onPress={() =>{
                                        if(currentTime >= 10){
                                            this.vimeoPlayer.seek(currentTime-10);
                                            setCurrentTime(currentTime-10);
                                       }else {
                                            this.vimeoPlayer.seek(0);
                                            setCurrentTime(0);
                                       }
                                   }}
                                >
                                    <View style={styles.skipButtonView}>
                                        <Image
                                            tintColor={'#FFFFFF'}
                                            style={{
                                                width:48,
                                                height:48,
                                                tintColor:'#FFFFFF',
                                                opacity: 0.5
                                           }}
                                            source={require('../assets/images/skipback10.png')}
                                      />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => setPaused(false)}
                                >
                                    <View style={styles.playButtonView}>
                                        <Image
                                            tintColor={'#FFFFFF'}
                                            style={{
                                                width:48,
                                                height:48,
                                                tintColor:'#FFFFFF',
                                                opacity: 0.5
                                           }}
                                            source={require('../assets/images/arrow_right-1.png')}
                                      />
                                    </View>
                                </TouchableWithoutFeedback>
                                {!no_skip_forward?
                                <TouchableWithoutFeedback
                                    onPress={() =>{
                                        if(currentTime <= seekableDuration) {
                                            this.vimeoPlayer.seek(currentTime + 10)
                                            setCurrentTime(currentTime+10);
                                       }else {
                                            this.vimeoPlayer.seek(seekableDuration)
                                            setCurrentTime(seekableDuration);
                                       }
                                   }}
                                    >
                                    <View style={styles.skipButtonView}>
                                        <Image
                                            tintColor={'#FFFFFF'}
                                            style={{
                                                width:48,
                                                height:48,
                                                tintColor:'#FFFFFF',
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
                                <Progress.Bar borderColor={"rgba(255,255,255,0.5)"} color={"rgba(255,255,255,0.5)"} progress={currentTime/seekableDuration} width={windowHeight/2} height={scale(10)}/>
                            </View>
                            </>
                        :null}
                        {seekableDuration?
                        <View style={styles.remainingView}><Text style={styles.remaining}>{new Date(Math.round(seekableDuration - currentTime) * 1000).toISOString().substring(14, 19)}</Text></View>
                            :null}
                        {(textTracks.length>0&&paused)?
                            <ChooseSubtitle textTracks={textTracks} setSelectedCCUrl={setSelectedCCUrl} {...props}/>
                            :null}
                        {selectedCCUrl?(
                            <View style={styles.subTitle}>
                                <InteractiveTranscripts
                                    key = {selectedCCUrl}
                                    currentDuration={currentTime * 1000}
                                    url={selectedCCUrl}
                                    seekToTranscriptDuration={(time) => {
                                        this.vimeoPlayer.seek(time);
                                   }}
                                    contentContainerStyle={
                                        {
                                            flexGrow: 1,
                                            justifyContent:"center",
                                            alignItems:"center",
                                            paddingTop: Platform.OS==="ios"?scale(10):0,
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
                                            fontFamily: 'Montserrat-Regular',
                                       }
                                   }
                                    activeTranscriptColor={"white"}
                                    inactiveTranscriptColor={"white"}
                              />
                            </View>
                        ):null}
                        {paused?
                            <TouchableWithoutFeedback
                                onPress={() => handleBackButtonClick()}
                            >
                                <View style={[styles.buttonView,{right:scale(30)}]}>
                                    <Image
                                        tintColor={'#FFFFFF'}
                                        style={{
                                            width:scale(36),
                                            height:scale(36),
                                            tintColor:'#FFFFFF',
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
const styles = StyleSheet.create({
    videoStyle: {
        height: windowWidth + statusBarSize,
        alignSelf: "stretch",
   },
    topViewStyle: {
        flex: 1,
        transform: [
            {rotateZ: '90deg'},
            {translateY: ((PixelRatio.getPixelSizeForLayoutSize(windowHeight)-
                        PixelRatio.getPixelSizeForLayoutSize(windowWidth))/
                    PixelRatio.get()) - statusBarSize},
        ],
        height: windowWidth,
        width: windowHeight,
   },
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
        fontFamily: "MontserratAlternates-SemiBold",
        fontWeight: "bold",
        fontSize: scale(12),
        textShadowColor: 'grey',
        textShadowRadius: 1,
        textShadowOffset: {
            width: -1,
            height: 1
        }
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
VimeoPlayer.navigationOptions = {header: null};
export default VimeoPlayer;