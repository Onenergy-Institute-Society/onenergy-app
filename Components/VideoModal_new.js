import React, {useState, useEffect, useRef} from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    PixelRatio,
    FlatList,
    Platform,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';
import PopupDialog from 'react-native-popup-dialog';
import IconButton from "@src/components/IconButton";
import InteractiveTranscripts from './InteractiveTranscripts';
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale, verticalScale} from "../Utils/scale";

export const VideoModal_new = props => {
    const [screenState, setScreenState] = useState({
        fullScreen: false,
        Width_Layout: '',
        Height_Layout: '',
        portraitMode: true,
    });
    const [ccButton, setCCButton] = useState({
        top: verticalScale(75),
    });
    const [fsButton, setFSButton] = useState({
        top: verticalScale(50),
        image: 'https://media.onenergy.institute/images/full-screen_hires.png',
    });
    const [csButton, setCSButton] = useState({
        top: verticalScale(50),
    });
    const [subTitle, setSubTitle] = useState({
        top: windowHeight/2+windowWidth*9/32+5,
        width: windowWidth,
    });
    const [modalContainerStyle, setModalContainerStyle] = useState({
        justifyContent: 'center',
        height:'100%',
    })
    const [videoStyle, setVideoStyle] = useState({
        width:windowWidth,
        height:windowWidth * 9 /16,
    })
    const [selectedTrack, setSelectedTrack] = useState({type: "language", value: "en"});
    const [selectedCCUrl, setSelectedCCUrl] = useState('');
    const [controlStyle, setControlStyle] = useState({bottom:0, height:20});
    useEffect(() => {
        Orientation.unlockAllOrientations();
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
            <TouchableOpacity
                style={styles.ModalOutsideContainer}
                onPress={() =>
                    props.toggleModal({
                        isVisible: false,
                        video: '',
                        thumbnail: '',
                        textTracks: null
                    })
                }>
                <View style={[styles.ModalContainer, modalContainerStyle]}>
                    <View style={styles.VideoPlayerContainer}>
                        {videoPlayerView()}
                        <TouchableOpacity
                            style={styles.fullscreenButton}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => {}}
                        >
                            <IconButton
                                icon={{uri:"https://media.onenergy.institute/images/full-screen_hires.png"}}
                                tintColor={"#FFFFFF"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                            onPress={() => props.toggleModal({
                                isVisible: false,
                                video: '',
                                thumbnail: '',
                                textTracks: null
                            })}
                        >
                            <IconButton
                                icon={require("@src/assets/img/close.png")}
                                tintColor={"#FFFFFF"}
                            />
                        </TouchableOpacity>
                        {props.textTracks.length>0?(
                            <TouchableOpacity
                                style={styles.closeCaptionButton}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                onPress={() => {this.popupDialog.show();}}
                            >
                                <IconButton
                                    icon={{uri:"https://media.onenergy.institute/images/subtitles_hires.png"}}
                                    tintColor={"#FFFFFF"}
                                />
                            </TouchableOpacity>
                        ):null}
                    </View>
                </View>
            </TouchableOpacity>
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
                        uri: props.videoDetail,
                    }}
                    onBack={() =>
                        props.toggleModal({
                            isVisible: false,
                            video: '',
                            thumbnail: '',
                        })
                    }
                    disableFullscreen={true}
                    automaticallyWaitsToMinimizeStalling={false}
                    onProgress={progressCallback}
                    onSeek={progressCallback}
                    autoplay = {true}
                    pauseOnPress = {true}
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
                    selectedTextTrack={selectedTrack}
                    textTracks={props.textTracks}
                    onHideControls={onHideControls}
                    onShowControls={onShowControls}
                    customStyles={{
                        controls:controlStyle
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
            setFSButton({top:20, image:'https://media.onenergy.institute/images/normal-screen_hires.png'});
            setCCButton({top:45});
            setCSButton({top:20});
            setSubTitle({bottom:0, width:windowHeight});
            setControlStyle({bottom:50});
            setModalContainerStyle({
                justifyContent: 'flex-start',
                height:windowWidth,
            })
            setVideoStyle({
                width:windowHeight,
                height:windowWidth,
            })
        } else {
            setFSButton({top:windowHeight/2-(windowWidth*9/23)+50, image:'https://media.onenergy.institute/images/full-screen_hires.png'});
            setCCButton({top:windowHeight/2-(windowWidth*9/23)+75});
            setCSButton({top:windowHeight/2-(windowWidth*9/23)+50});
            setSubTitle({top:windowHeight/2+windowWidth*9/32+5,width:windowWidth});
            setControlStyle({bottom:0});
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
                style={screenState.Width_Layout>screenState.Height_Layout? styles.topViewStyle2 : styles.ModalWrapper}
                onLayout={event => {
                    const {layout} = event.nativeEvent;
                    changeState({
                        Width_Layout: layout.width,
                        Height_Layout: layout.height,
                    });
                }}>
                {modalScreenView()}
                {selectedCCUrl!==''?(
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
                            }
                        }
                        activeTranscriptColor={"white"}
                        inactiveTranscriptColor={"white"}
                    />
                </View>
                ):null}
            </View>
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                style = {
                    {
                        width:windowWidth /2
                    }
                }
            >
                {Platform.OS==='android'?
                <View>
                    <FlatList
                    data={props.textTracks}
                    renderItem={({item}) => (
                        <TouchableWithoutFeedback onPress={() => {
                            if(item.uri===''){
                                setCCButton({...ccButton, opacity:0.5})
                            }else{
                                setCCButton({...ccButton, opacity:1})
                            }
                            setSelectedCCUrl(item.uri);setSelectedTrack({type:"language",value:item.language});this.popupDialog.dismiss();
                        }}>
                            <View style={{paddingHorizontal:5, paddingVertical:10, borderBottomWidth:1, borderBottomColor:'#ccc', borderTopRightRadius:9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text
                                    style={{fontSize:18}}>
                                    {item.title}
                                </Text>
                                <IconButton
                                    icon={require("@src/assets/img/arrow-right.png")}
                                    style={{
                                        height: 32,
                                        marginRight:10,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        )}
                    />
                </View> :null}
            </PopupDialog>
        </Modal>
    );
};

const styles = StyleSheet.create({
    topViewStyle: {
        flex: 1,
        transform: [
            { rotateZ: '90deg'},
            { translateY: ((PixelRatio.getPixelSizeForLayoutSize(windowHeight)-
                        PixelRatio.getPixelSizeForLayoutSize(windowWidth))/
                    PixelRatio.get()) },
        ],
        height: windowWidth,
        width: windowHeight,
    },
    ccItem:{

    },
    topViewStyle2: {
        flex: 1,
        height: windowWidth,
        width: windowHeight,
    },
    subTitle:{
        height:50,position:"absolute",backgroundColor: 'rgba(0,0,0,0.5)'
    },
    closeCaptionButton: {
        position: 'absolute',
        top: verticalScale(10),
        left:scale(10),
        opacity: 0.8,
        width:24,
        height:24,
    },
    fullscreenButton: {
        position: 'absolute',
        top: verticalScale(5),
        left:scale(10),
        opacity: 0.8,
        width:24,
        height:24,
    },
    closeButton: {
        position: 'absolute',
        top: verticalScale(5),
        right:scale(10),
        opacity: 0.8,
        width:24,
        height:24,
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
        backgroundColor: 'transparent',
    },
    ModalBox: {
        width: '100%',
        backgroundColor: '#fff',
        opacity: 1,
    },
    VideoPlayerContainer: {
        height: windowWidth*9/16,
        width: windowWidth,
   },
});