import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from 'axios';
import {ActivityIndicator, ImageBackground, StyleSheet, View} from "react-native";
import VimeoBlock from "./VimeoBlock";
import {s, windowWidth} from "../Utils/Scale";

const VimeoBlockLoader = (props) => {
    const {block} = props;
    const language = useSelector((state) => state.settingReducer.languages);
    const no_skip_forward = block.data.no_skip_forward;
    const lesson_video = block.data.lesson_video;
    const duration = block.data.duration;
    const [vimeoConfig, setVimeoConfig] = useState([]);
    const [video, setVideo] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [textTracks, setTextTracks] = useState({title: "No Subtitle", language: "", uri: "", type: ""});
    const [videoLoading, setVideoLoading] = useState(true);
    const [selectedCCUrl, setSelectedCCUrl] = useState('');
    const fetchVimeoConfig = async () => {
        try {
            const result = await axios({
                method: 'get',
                url: "https://player.vimeo.com/video/" + block.result + "/config",
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                    'Referer': 'https://app.onenergy.institute/',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                }
            });
            setVimeoConfig(result.data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchVimeoConfig().then();
    }, [])
    useEffect(() => {
        if (vimeoConfig) {
            try {
                vimeoConfig["request"]["files"]["progressive"][0]["url"] ? setVideo(vimeoConfig["request"]["files"]["progressive"][0]["url"]) : '';
                vimeoConfig["video"]["thumbs"]["base"] ? setThumbnail(vimeoConfig["video"]["thumbs"]["base"]) : '';
                if (vimeoConfig["request"]["text_tracks"]) {
                    setTextTracks(vimeoConfig["request"]["text_tracks"].map((item) => {
                        if (item.lang === language.subtitle) {
                            setSelectedCCUrl("https://vimeo.com" + item.url);
                        }
                        return {
                            title: item.label,
                            language: item.lang,
                            uri: "https://vimeo.com" + item.url,
                            type: 'text/vtt'
                        }
                    }));
                    setTextTracks((previousState) => [
                        ...previousState,
                        {title: "No Subtitle", language: "", uri: "", type: ""}
                    ]);
                }
                setVideoLoading(false);
            } catch (e) {
                console.error(e);
            }
        }
    }, [vimeoConfig])
    return (
        videoLoading ?
            <View style={styles.video}>
                <ActivityIndicator size="large"/>
            </View>
            :
            <View style={styles.container}>
                <VimeoBlock videoId={block.result} video={video} duration={duration} thumbnail={thumbnail}
                            textTracks={textTracks} lesson_video={lesson_video} no_skip_forward={no_skip_forward}
                            selectedCCUrl={selectedCCUrl}/>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) * 9 / 16,
        alignSelf: "center"
    },
    video: {
        position: 'relative',
        height: (windowWidth - s(30)) * (9 / 16),
        width: windowWidth - s(30),
        backgroundColor: 'black',
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
});
export default VimeoBlockLoader;
