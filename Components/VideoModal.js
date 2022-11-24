import React, {useState, useEffect, useRef} from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Image,
    PixelRatio,
} from 'react-native';
import { useSelector } from "react-redux";
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';
import InteractiveTranscripts from './InteractiveTranscripts';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import ChooseSubtitle from "./ChooseSubtitle";

export const VideoModal = props => {
    const language = useSelector((state) => state.languagesReducer.languages);
    const {
        textTracks
    } = props;
    const [screenState, setScreenState] = useState({
        fullScreen: false,
        Width_Layout: '',
        Height_Layout: '',
        portraitMode: true,
    });
    const [subTitle, setSubTitle] = useState({
        top: windowHeight/2+windowWidth*9/32+5,
        width: windowWidth,
    });
    const [modalStyle, setModalStyle] = useState(
        {
            width: '100%',
            backgroundColor: '#fff',
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderRadius: 0,
            opacity: 1,
        }
    )
    const [modalContainerStyle, setModalContainerStyle] = useState({
        justifyContent: 'center',
        height:'100%',
    })
    const [videoStyle, setVideoStyle] = useState({
        width:windowWidth,
        height:windowWidth * 9 /16,
    })
    const [selectedTextTrack, setSelectedTextTrack] = useState({type: "language", value: language.subtitle});
    const [selectedCCUrl, setSelectedCCUrl] = useState('');
    const [bottom, setBottom] = useState(0);
    const [fullScreenButtonClicked, setFullScreenButtonClicked] = useState(false);
    useEffect(() => {
        Orientation.unlockAllOrientations();
        if(language.subtitle){
            setSelectedCCUrl(textTracks.find(el => el.language === language.subtitle).uri);
        }
        return () => {
            Orientation.lockToPortrait();
        };
    }, []);

    useEffect(() => {
        detectOrientation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenState.Width_Layout]);

    useEffect(() => {
        let {fullScreen, portraitMode} = screenState;
        (!fullScreen && !portraitMode) ? Orientation.lockToPortrait():'';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenState.fullScreen]);

    const changeState = values => {
        setScreenState(prevState => {
            return {
                ...prevState,
                ...values,
            };
        });
    };
    const detectOrientation = () => {
        if (screenState.Width_Layout > screenState.Height_Layout) {
            // Write code here, which you want to execute on Landscape Mode.
            changeState({fullScreen: true, portraitMode: false});
        } else {
            // Write code here, which you want to execute on Portrait Mode.
            changeState({fullScreen: false, portraitMode: true});
        }
    };
    let player: any = useRef(null);
    let [duration, updateDuration] = useState(0);
    const progressCallback = (data: any) => {
        updateDuration(data.currentTime * 1000);
    };
    const onHideControls = () => {
        if(screenState.fullScreen){
            setSubTitle({...subTitle, bottom: 0})
        }
    }
    const onShowControls = () => {
        if(screenState.fullScreen){
            setSubTitle({...subTitle, bottom: 50})
        }
    }
    const modalScreenView = () => {
        return (
            <View style={[styles.ModalContainer, modalContainerStyle]}>
                <View style={[styles.ModalBox, modalStyle]}>
                    <View style={[styles.VideoPlayerContainer]}>
                        {videoPlayerView()}
                        {((screenState.fullScreen&&fullScreenButtonClicked)||!screenState.fullScreen)?
                        <TouchableWithoutFeedback
                            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                            onPress={()=>{
                                if(screenState.fullScreen) {
                                    Orientation.lockToPortrait();
                                    Orientation.unlockAllOrientations();
                                    setFullScreenButtonClicked(false)
                                }else{
                                    Orientation.lockToLandscape();
                                    setFullScreenButtonClicked(true)
                                }
                            }}
                        >
                            <View style={[styles.buttonView,{left:scale(10)}]}>
                                <Image
                                    tintColor={"#FFFFFF"}
                                    style={{
                                        width:24,
                                        height:24,
                                        tintColor:"#FFFFFF",
                                    }}
                                    source={require(screenState.fullScreen?'../assets/images/normal-screen_hires.png':'../assets/images/full-screen_hires.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        :null}
                        {(textTracks.length>0)?
                            <ChooseSubtitle textTracks={textTracks} setSelectedTextTrack={setSelectedTextTrack} setSelectedCCUrl={setSelectedCCUrl} />
                            :null}
                        <TouchableWithoutFeedback
                            onPress={()=>{props.toggleModal({
                                isVisible: false,
                                video: '',
                                thumbnail: '',
                                textTracks: null
                            })}}
                        >
                            <View style={[styles.buttonView,{right:scale(10)}]}>
                                <Image
                                    tintColor={"#FFFFFF"}
                                    style={{
                                        width:24,
                                        height:24,
                                        tintColor:"#FFFFFF",
                                    }}
                                    source={require("@src/assets/img/close.png")}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    };
    const videoPlayerView = () => {
        let {fullScreen} = screenState;
        return (
                <VideoPlayer
                    ref={(ref) => {
                        player = ref;
                    }}
                    video={{
                        uri: props.video,
                    }}
                    onBack={() =>
                        props.toggleModal({
                            isVisible: false,
                            video: '',
                            thumbnail: '',
                        })
                    }
                    onProgress={progressCallback}
                    onSeek={progressCallback}
                    autoplay = {true}
                    pauseOnPress = {true}
                    disableSeek = {true}
                    disableFullscreen = {true}
                    resizeMode="cover"
                    toggleResizeModeOnFullscreen={false}
                    thumbnail = {{
                        uri: props.videoThumbnail,
                    }}
                    videoHeight={videoStyle.height}
                    videoWidth={videoStyle.width}
                    onEnterFullscreen={() => {
                        changeState({fullScreen: !fullScreen});
                    }}
                    selectedTextTrack={selectedTextTrack}
                    textTracks={props.textTracks}
                    onHideControls={onHideControls}
                    onShowControls={onShowControls}
                    hideControlsOnStart={false}
                    customStyles={{
                        controls: {
                            height:25,
                            backgroundColor:'rgba(0,0,0,0.2)',
                            bottom:bottom
                        },
                        seekBarKnob: {
                            width: 12,
                            height:12,
                            color:"#ffffff"
                        },
                    }}
                />
        );
    };
    const toggleFullScreen = () => {
        if(screenState.fullScreen){
            changeState({fullScreen: false, portraitMode: true});
        } else {
            changeState({fullScreen: true, portraitMode: false});
        }
    }
    const pressBackButton = () => {
        props.toggleModal({
            isVisible: false,
            video: '',
            thumbnail: '',
        })
    }
    useEffect(() =>{
        if (screenState.fullScreen) {
            setSubTitle({bottom:0, width:windowHeight});
            setBottom(50);
            setModalStyle({
                paddingVertical: 0,
                paddingHorizontal: 0,
                borderRadius: 0,
            });
            setModalContainerStyle({
                justifyContent: 'flex-start',
                height:windowWidth,
            })
            setVideoStyle({
                width:windowHeight,
                height:windowWidth,
            })
        } else {
            setSubTitle({top:windowHeight/2+windowWidth*9/32+5,width:windowWidth});
            setBottom(0);
            setModalStyle({
                paddingVertical: 0,
                paddingHorizontal: 0,
                borderRadius: 0,
            });
            setModalContainerStyle({
                justifyContent: 'center',
                height:'100%',
            })
            setVideoStyle({
                width:windowWidth,
                height:windowWidth * 9 /16,
            })
        }
    },[screenState.fullScreen])
    return (
        <Modal
            onRequestClose={pressBackButton}
            animationType={'fade'}
            supportedOrientations={['portrait', 'landscape']}
            transparent={true}
            visible={props.isVisible}>
            <View
                style={[screenState.Width_Layout>screenState.Height_Layout? styles.topViewStyle : styles.ModalWrapper]}
                onLayout={event => {
                    const {layout} = event.nativeEvent;
                    changeState({
                        Width_Layout: layout.width,
                        Height_Layout: layout.height,
                    });
                }}>
                {modalScreenView()}
                {selectedCCUrl?(
                <View style={[styles.subTitle,subTitle]}>
                    <InteractiveTranscripts
                        key = {selectedCCUrl}
                        currentDuration={duration}
                        url={selectedCCUrl}
                        seekToTranscriptDuration={(time) => {
                            player.seek(time);
                        }}
                        contentContainerStyle={
                            {
                            }
                        }
                        textStyle={
                            {
                                fontSize:16,
                                textAlign:"center",
                                alignItems:"center",
                                textAlignVertical:"center",
                                height:50,
                                fontFamily: 'MontserratAlternates-Regular'
                            }
                        }
                        activeTranscriptColor={"white"}
                        inactiveTranscriptColor={"white"}
                    />
                </View>
                ):null}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    topViewStyle: {
        flex: 1,
        height: windowWidth,
        width: windowHeight,
        justifyContent:"flex-end"
    },
    fullscreenButtonImage:{
        width:32,
        height:32,
    },
    subTitle:{
        height:50,position:"absolute",backgroundColor: 'rgba(0,0,0,0.5)'
    },
    fullscreenButton: {
        position: 'absolute',
        width:40,
        height:40,
        top:windowHeight/2-(windowWidth*9/23)+50,
        left:20,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
    },
    ModalOutsideContainer: {
        flex: 1,
    },
    ModalContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    ModalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    ModalBox: {
        width: '100%',
        backgroundColor: '#fff',
        opacity: 1,
    },
    VideoPlayerContainer: {
        width: '100%',
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
        top:scale(10),
    }
});