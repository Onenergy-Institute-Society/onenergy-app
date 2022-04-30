import React, {useState, useEffect, useRef} from "react";
import {
    StyleSheet
} from "react-native";
import Video from "react-native-video";
import ChooseLanguage from "./ChooseSubtitle";

const VimeoBlockIOS =(props) => {
    try{
        const {
            video, textTracks
        } = props;
        const [selectedTextTrack, setSelectedTextTrack] = useState({});
        const [selectedCCUrl, setSelectedCCUrl] = useState({});
        return (
            <>
            <Video style={styles.videoComponent}
                ref={ref => (this.player = ref)}
                source={{uri: video}}
                fullscreen={true}
                fullscreenOrientation={'landscape'}
                paused = {true}
                controls={true}
                selectedTextTrack={selectedTextTrack}
                textTracks={textTracks}
            />
            {textTracks.length>0?
                <ChooseLanguage textTracks={textTracks} setSelectedTextTrack={setSelectedTextTrack} setSelectedCCUrl={setSelectedCCUrl} />
            :null}
            </>
        )
    }catch (e) {
        console.log(e);
    }
}
const ASPECT_RATIO = 16 / 9;
const styles = StyleSheet.create({
    nativeVideoControls: {
        top: 0,
        height: '100%',
    },
    videoComponent: {
        height: "auto",
        width: "100%",
        aspectRatio: ASPECT_RATIO,
        backgroundColor: 'black',
        alignSelf: "center",
    },
    videoContainer: {
        height: 'auto',
    },
    videoPoster: {
        top: 0,
        width: '100%',
        minWidth: '100%',
        height: 'auto',
        aspectRatio: ASPECT_RATIO,
        position: 'absolute',
        backgroundColor: 'white',
    },
});
export default VimeoBlockIOS;
