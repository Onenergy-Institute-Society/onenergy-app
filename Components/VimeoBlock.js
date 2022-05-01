import React, {useEffect, useState, createRef} from "react";
import {
    View, StyleSheet, Text, TouchableOpacity, Image, StatusBar, TouchableWithoutFeedback
} from "react-native";
import Orientation from "react-native-orientation";
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import {VideoModal} from './VideoModal';
import {scale, verticalScale} from "../Utils/scale";

const VimeoBlock =(props) => {
    try {
        const {
            block,
            navigation,
        } = props;
        const {
            video, thumbnail, textTracks, selectedTextTrack, openCCDialog
        } = props;
        const videoRef = createRef();
        const [state, setState] = useState({
            fullscreen: false,
            play: false,
            currentTime: 0,
            duration: 0,
            showControls: true,
            topViewStyle: {
                //flex: 1,
                position: "absolute",
                /*            transform: [
                                { rotateZ: '90deg'},
                                { translateY: ((PixelRatio.getPixelSizeForLayoutSize(windowHeight)-
                                            PixelRatio.getPixelSizeForLayoutSize(windowWidth))/
                                        PixelRatio.get()) - statusBarSize },
                            ],*/
                /*            height: windowWidth,
                            width: windowHeight,*/
                //zIndex:900,
                width: windowWidth,
                height: windowHeight,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
        });
        const [showModal, setShowModal] = useState({isVisible: false, video: video, thumbnail: thumbnail, textTracks: textTracks});
        const [fullScreenButton, setFullScreenButton] = useState("https://media.onenergy.institute/images/full-screen_hires.png")
        const toggleModal = state => {
            setShowModal({
                isVisible: state.isVisible,
                video: state.video,
                thumbnail: state.thumbnail,
                textTracks: state.textTracks,
            });
            StatusBar.setHidden(state.isVisible);
        };
        const onEnd = () => {
            setState({...state, play: false});
            videoRef.current.seek(0);
        }
        const onLoadEnd = (data = OnLoadData) => {
            setState(s => ({
                ...s,
                duration: data.duration,
                currentTime: data.currentTime,
            }));
        }
        const onProgress = (data = OnProgressData) => {
            setState(s => ({
                ...s,
                currentTime: data.currentTime,
            }));
        }
        const handlePlayPause = () => {
            // If playing, pause and show controls immediately.
            if (state.play) {
                setState({...state, play: false, showControls: true});
                return;
            }

            setState({...state, play: true});
            setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
        }
        const skipBackward = () => {
            videoRef.current.seek(state.currentTime - 15);
            setState({...state, currentTime: state.currentTime - 15});
        }

        const skipForward = () => {
            videoRef.current.seek(state.currentTime + 15);
            setState({...state, currentTime: state.currentTime + 15});
        }

        const onSeek = (data = OnSeekData) => {
            videoRef.current.seek(data.seekTime);
            setState({...state, currentTime: data.seekTime});
        }

        function handleFullscreen() {
            if (state.fullscreen) {
                Orientation.unlockAllOrientations();
                setState(s => ({...s, fullscreen: false}));
            } else {
                Orientation.lockToPortrait();
                setState(s => ({...s, fullscreen: true}));
            }
        }
        return (
            <View
                style={{flex: 1}}>
                <StatusBar/>
                {showModal.isVisible ? (
                <VideoModal
                    isVisible={showModal.isVisible}
                    toggleModal={toggleModal}
                    videoDetail={showModal.video}
                    videoThumbnail={showModal.thumbnail}
                    textTracks={showModal.textTracks}
                    {...props}
                />
                ) : null}
                <View style={state.fullscreen ? state.topViewStyle : styles.normalViewStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModal({
                                isVisible: true,
                                video: video,
                                thumbnail: thumbnail,
                                textTracks: textTracks,
                            });
                            StatusBar.setHidden(true);
                        }}>
                        <View style = {styles.overlay_button}><Image style={styles.play} source={{uri: "https://app.onenergy.institute/wp-content/uploads/2021/11/arrow_right-1.png"}} /></View>
                        <Image
                        style={styles.BackGroundImage}
                        source={{uri: thumbnail}}
                        resizeMode={'cover'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }catch (e) {
        console.log(e);
    }
}

const styles = StyleSheet.create({
    overlay_button:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left:0,
        right:0,
        zIndex: 1,
        width: windowWidth-30,
        height: (windowWidth-30) * (9 / 16),
        opacity: 1,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    play:{
        opacity: 0.6,
        width: 32,
        height: 32
    },
    BackGroundImage: {
        width: windowWidth-30,
        height: (windowWidth-30) * (9 / 16),
        justifyContent: 'center',
        borderRadius: 9,
    },
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
    },
    video: {
        position: 'relative',
        height: (windowWidth-30) * (9 / 16),
        width: windowWidth-30,
        backgroundColor: 'black',
        justifyContent:"center",
        alignItems: "center"
    },
    fullscreenVideo: {
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        height: windowWidth,
        width: windowHeight,
        backgroundColor: 'black',
    },
    text: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: 'justify',
    },
    normalViewStyle: {
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 9,
    },
    fullscreenButtonImage:{
      width:32,
      height:32,
    },
    fullscreenButton: {
        position: 'absolute',
        top:10,
        left:10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
});
export default VimeoBlock;
