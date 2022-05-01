import React, { Component } from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    Text,
} from "react-native";
import Orientation from "react-native-orientation";
import Video from "react-native-video"
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class VideoPlayer extends Component {
    constructor(props, context, ...args) {
        super(props, context, ...args);
        this.state = { paused: false };
    }

    componentDidMount() {
        Orientation.lockToLandscapeLeft();
        activateKeepAwake();
    }

    componentWillUnmount() {
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
        deactivateKeepAwake();
    }

    componentWillMount() {
        StatusBar.setHidden(true);
        Orientation.lockToLandscapeLeft();
        activateKeepAwake();
    }

    onVideoEnd() {
        this.videoPlayer.seek(0);
        this.setState({ key: new Date(), currentTime: 0, paused: true });
    }

    onVideoLoad(e) {
        let min = new Date().getMinutes();
        if (min > 30) min=min-30;
        let second=min*60;
        this.videoPlayer.seek(second);
        this.setState({ currentTime: e.currentTime, duration: e.duration });
    }

    onProgress(e) {
        this.setState({ currentTime: e.currentTime });
    }

    playOrPauseVideo(paused) {
        this.setState({ paused: !paused });
    }

    getCurrentTimePercentage(currentTime, duration) {
        if (currentTime > 0) {
            return parseFloat(currentTime) / parseFloat(duration);
        } else {
            return 0;
        }
    }

    onProgressChanged(newPercent, paused) {
        let { duration } = this.state;
        let newTime = newPercent * duration / 100;
        this.setState({ currentTime: newTime, paused: paused });
        this.videoPlayer.seek(newTime);

    }

    onLayout(e) {
        const { width, height } = Dimensions.get('window')
    }

    goBack = () => {
        this.props.navigation.goBack();
        Orientation.lockToPortrait();
    }

    // navigation options
    static navigationOptions = { header: null }

    render() {
        const { onClosePressed, volume, navigation } = this.props;
        const { currentTime, duration, paused } = this.state;
        const video = (navigation.getParam('video'));

        //const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100;

        return (
            <View onLayout={this.onLayout.bind(this)} style={styles.fullScreen} key={this.state.key}>
                <View style={styles.backButtonWrapper}>
                    <TouchableOpacity onPress={() => this.goBack()}>
                        <Text>{video}</Text>
                    </TouchableOpacity>
                </View>
                <Video
                    ref={videoPlayer => this.videoPlayer = videoPlayer}
                    onEnd={this.onVideoEnd.bind(this)}
                    onLoad={this.onVideoLoad.bind(this)}
                    onProgress={this.onProgress.bind(this)}
                    audioOnly={false}
                    source={{uri: "https://media.onenergy.institute/videos/preparatory_practices/Preperatory_Quide_Group.mp4"}}   // Can be a URL or a local file.
                    paused={paused}
/*                    volume={Math.max(Math.min(1, volume), 0)}*/
                    resizeMode="contain"
                    style={Platform.OS === "android" ? styles.videoContainerAndroid : styles.videoContainerIOS} />
            </View>
        );
    }
}
// styles
const styles = StyleSheet.create({

    fullScreen: {
        flex: 1,
        backgroundColor: "black"
    },
    videoView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    videoContainerAndroid: {
        top: 0,
        left : 0 ,
        bottom: 0,
        right: 0,
        width: height,
        height: width,
        minWidth: height,
        minHeight: width,
    },
    videoContainerIOS: {
        width: height,
        height: width,
        minWidth: height,
        minHeight: width,
        transform: [{ rotate: '90deg' }],
    },
    videoIcon: {
        width: 50,
        height: 50
    },
    pauseImageWrapper: {
        alignItems: 'center',
        alignSelf: 'center',
        position: "absolute",
        color: "white",
        backgroundColor: "red",
    },
    backButtonWrapper: {
        backgroundColor: 'red',
        position: 'absolute',
        zIndex: 1,
        alignSelf: "flex-start"
    }

});