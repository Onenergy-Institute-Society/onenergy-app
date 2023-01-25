import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from "react-native";
import Svg, {Circle, G} from 'react-native-svg';
import IconButton from "@src/components/IconButton";
import {ms} from "../Utils/Scale";

const NextButton = ({percentage, scrollTo}) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        try {
            if (progressAnimation) {
                progressAnimation.addListener(
                    (value) => {
                        const strokeDashoffset = circumference - (circumference * value.value) / 100;
                        if (progressRef?.current) {
                            progressRef.current.setNativeProps({
                                strokeDashoffset,
                            });
                        }
                    }, [percentage]
                );
                return () => {
                    progressAnimation.removeAllListeners();
                };
            }
        } catch (e) {
            console.log(e)
        }
    }, []);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={center}>
                    <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth}
                    />
                    <Circle
                        ref={progressRef}
                        stroke="#F4338F"
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                    />
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} style={styles.button} activeOpacity={0.6}>
                <IconButton
                    pressHandler={scrollTo}
                    icon={percentage === 100 ? require("@src/assets/img/check-simple.png") : require("@src/assets/img/arrow-right-variant-2.png")}
                    style={{tintColor: "#fff", width: 24, height: 24}}
                />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        position: "absolute",
        backgroundColor: '#f4338f',
        borderRadius: 100,
        padding: ms(20),
    }
})
export default NextButton;