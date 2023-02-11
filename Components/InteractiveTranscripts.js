// @ts-ignore
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleProp, Text, ViewStyle} from 'react-native';
import WebVttParser from './VTTtoJsonParser.js';
import {s} from "../Utils/Scale";

interface InteractiveTranscriptsProps {
    currentDuration: number;
    url: string;
    seekToTranscriptDuration: (p: number) => void;
    textStyle?: StyleProp<ViewStyle>;
    textContainerStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    activeTranscriptColor?: string;
    inactiveTranscriptColor?: string;
}

const InteractiveTranscripts = ({
                                    currentDuration = 0,
                                    url = '',
                                    textStyle = {},
                                    contentContainerStyle = {},
                                    activeTranscriptColor = 'blue',
                                    inactiveTranscriptColor = 'black',
                                }: InteractiveTranscriptsProps) => {
    const [cueArray, setCueArray] = useState([]);
    const [selectedIndex, changeSelectedIndex] = useState(-1);
    let flatListRef: any = useRef<FlatList>(null);

    useEffect(() => {
        try {
            cueArray.length === 0 &&
            fetch(url)
                .then((response) => response.text())
                .then((text) => {
                    changeSelectedIndex(0);
                    let output = WebVttParser(text);
                    if (output[0].startTime > 0) {
                        let tempArray = output.map((item) => {
                            item.sequence = item.sequence + 1;
                            return item;
                        })
                        let newOutput = [{
                            "sequence": 0,
                            "startTime": 0,
                            "endTime": output[0].startTime,
                            "text": ""
                        }, ...tempArray];
                        setCueArray(newOutput);
                    } else {
                        setCueArray(output);
                    }
                });
            if (cueArray.length > 0) {
                let cueVal = cueTextAndIndex(cueArray, currentDuration);
                changeSelectedIndex(cueVal.cueIndex);
                if (cueVal.cueIndex >= 0 && selectedIndex !== cueVal.cueIndex) {
                    flatListRef.scrollToIndex({
                        animated: false,
                        index: cueVal.cueIndex,
                        viewPosition: 0.3,
                    });
                }
            }
        } catch (err) {
            console.log(`${err}`);
        }
    }, [url, currentDuration, cueArray, selectedIndex]);

    /**
     * To find the CC current text to display
     */
    const cueTextAndIndex = (array: any, value: number) => {
        let low = 0,
            high = array.length;
        while (low < high) {
            let mid = (low + high) >>> 1;
            if (array[mid].startTime <= value) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        low = low - 1;
        if (low < 0) {
            return {cueText: '', cueIndex: -1};
        }
        return {
            cueText: array[low].endTime >= value ? array[low].text : '',
            cueIndex: array[low].endTime >= value ? array[low].sequence : -1,
        };
    };
    const getItemLayout = (data, index) => (
        {length: s(40), offset: s(40) * index, index}
    );

    return (
        <>
            {cueArray !== null && (
                <FlatList
                    style={{flex: 1}}
                    ref={(ref) => {
                        flatListRef = ref;
                    }}
                    getItemLayout={getItemLayout}
                    scrollEnabled={false}
                    contentContainerStyle={contentContainerStyle}
                    data={cueArray}
                    keyExtractor={(item) => `${item.startTime}`}
                    renderItem={({item, index}) => {
                        return (
                            /*
                                                        <TouchableWithoutFeedback
                                                            style={[textContainerStyle]}
                                                            onPress={() => {
                                                                if(user.test_mode)
                                                                    seekToTranscriptDuration(item.startTime / 1000);
                                                           }}
                                                        >
                            */
                            selectedIndex === index ? (
                                <Text style={[{color: activeTranscriptColor}, textStyle]}>
                                    {item.text}
                                </Text>
                            ) : (
                                <Text style={[{color: inactiveTranscriptColor}, textStyle]}>
                                    {item.text}
                                </Text>
                            )
                            /*
                                                        </TouchableWithoutFeedback>
                            */
                        );
                    }}
                />
            )}
        </>
    );
};

export default InteractiveTranscripts;