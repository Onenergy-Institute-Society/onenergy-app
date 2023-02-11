import React, {useEffect, useState} from 'react';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Text} from 'react-native';
import Slider from 'react-native-slider';
import {ms, s, vs} from "../Utils/Scale";

const TrackSlider = (props) => {
    const {type, totalDuration, pastPosition, user} = props;
    const {position, duration} = useProgress()
    const [pastDuration, setPastDuration] = useState(0);
    const secondsToHHMMSS = (seconds) => {
        seconds = Number(seconds);
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor((seconds % 3600) % 60);

        const strHours = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
        const strMinutes = m > 0 ? (m < 10 ? `0${m}\'` : `${m}\'`) : '00\'';
        const strSeconds = s > 0 ? (s < 10 ? `0${s}\"` : `${s}\"`) : '00\"';
        return `${strHours}${strMinutes}${strSeconds}`;
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

    const {test_mode} = user;
    return (
        <>
            {type === 'routine' ?
                <Text style={{
                    fontFamily:"Montserrat-Regular", fontWeight:"normal",
                    marginLeft: ms(5),
                    fontSize: s(12),
                    color: "#262626"
                }}>{secondsToHHMMSS(Math.floor(type ? totalDuration - pastDuration - position : duration - position || 0))}</Text>
                :
                <><Text
                    style={{marginRight: ms(5), fontSize: s(12),color: "#262626"}}>{secondsToHHMMSS(Math.floor(position || 0))}</Text>
                    <Slider
                        style={{width: '70%', height: vs(40)}}
                        value={position}
                        thumbTintColor='black'
                        minimumValue={0}
                        thumbStyle={{width: s(10), height: vs(10)}}
                        animationType='timing'
                        maximumValue={duration}
                        minimumTrackTintColor={'#8c79ea'}
                        maximumTrackTintColor={'#d0c9f6'}
                        disabled={!test_mode}
                        onValueChange={() => {
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
                    <Text style={{fontFamily:"Montserrat-Regular", fontWeight:"normal", marginLeft: ms(5), fontSize: s(12), color: "#262626"}}>{secondsToHHMMSS(duration || 0)}</Text>
                </>
            }
        </>
    );
}
export default TrackSlider;