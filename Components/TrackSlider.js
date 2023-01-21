import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Text} from 'react-native';
import Slider from 'react-native-slider';
import {scale} from "../Utils/scale";

const TrackSlider = (props) => {
    const {type, totalDuration, pastPosition} = props;
    const {position, duration} = useProgress()
    const [pastDuration, setPastDuration] = useState(0);
    const user = useSelector((state) => state.user.userObject);
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
    useEffect(() => {
        if (type)
            setPastDuration(pastDuration + pastPosition);
    }, [duration])
    useEffect(() => {
        if (type) {
            if (pastPosition === 0)
                setPastDuration(0);
        }
    }, [pastPosition])

    return (
        <>
            {type === 'routine' ?
                <Text style={{
                    fontFamily:"Montserrat-Regular", fontWeight:"normal",
                    marginLeft: 5,
                    fontSize: scale(12),
                }}>{secondsToHHMMSS(Math.floor(type ? totalDuration - pastDuration - position : duration - position || 0))}</Text>
                :
                <><Text
                    style={{marginRight: 5, fontSize: scale(12),}}>{secondsToHHMMSS(Math.floor(position || 0))}</Text>
                    <Slider
                        style={{width: '70%', height: 40}}
                        value={position}
                        thumbTintColor='black'
                        minimumValue={0}
                        thumbStyle={{width: 10, height: 10}}
                        animationType='timing'
                        maximumValue={duration}
                        minimumTrackTintColor={'#4942E1'}
                        maximumTrackTintColor={'#7DE7FA'}
                        disabled={!user.test_mode}
                        onValueChange={val => {
                            TrackPlayer.pause();
                        }}
                        onSlidingComplete={val => {
                            try {
                                TrackPlayer.seekTo(val);
                                TrackPlayer.play();
                            } catch (e) {
                                console.log(e);
                            }
                        }}
                    />
                    <Text style={{fontFamily:"Montserrat-Regular", fontWeight:"normal", marginLeft: 5, fontSize: scale(12),}}>{secondsToHHMMSS(duration || 0)}</Text>
                </>
            }
        </>
    );
}
export default TrackSlider;