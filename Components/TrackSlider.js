import React from 'react';
import {useProgress} from 'react-native-track-player';
import { Text } from 'react-native';
import Slider from 'react-native-slider';
import {scale} from "../Utils/scale";
import TrackPlayer, {State, Event, useTrackPlayerEvents} from 'react-native-track-player';
const TrackSlider = () => {
    const { position, duration } = useProgress()
    const secondsToHHMMSS = (seconds: number | string) => {
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
        const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
        const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
        return `${hrs}${mins}${scnds}`;
    };
    return (
<>
            <Text style={{marginRight:5, fontSize: scale(12),}}>{secondsToHHMMSS(Math.floor(position || 0))}</Text>
            <Slider
                style={{ width: '70%', height: 40 }}
                value={position}
                thumbTintColor='black'
                minimumValue={0}
                thumbStyle={{ width: 10, height: 10 }}
                animationType='timing'
                maximumValue={duration}
                minimumTrackTintColor={'#4942E1'}
                maximumTrackTintColor={'#7DE7FA'}
                disabled={true}
                onValueChange={val => {
                    TrackPlayer.pause();
                    this.setState({ isSeeking: true, seek: val, position: val, });
                }}
/*                onSlidingComplete={val => {
                    try {
                        TrackPlayer.seekTo(val);
                        TrackPlayer.play();
                        this.setState({isSeeking: false, value: val});
                    }catch(e){
                        console.log(e);
                    }
                }}*/
            />
            <Text style={{marginLeft:5,fontSize: scale(12),}}>{secondsToHHMMSS(duration || 0)}</Text>
</>
    );
}
export default TrackSlider;