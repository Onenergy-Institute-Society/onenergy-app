import React, {useState, useEffect, useRef} from 'react';
import {
    FlatList,
    StyleProp,
    Text,
    View,
    ViewStyle,
    TouchableWithoutFeedback
} from 'react-native';
import WebVttParser from './VTTtoJsonParser.js';
import {scale} from "../Utils/scale";
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

const InteractiveTranscripts = ({  currentDuration = 0,
                                    url = '',
                                    seekToTranscriptDuration = () => {},
                                    textStyle = {},
                                    textContainerStyle = {margin: 5},
                                    contentContainerStyle = {},
                                    activeTranscriptColor = 'blue',
                                    inactiveTranscriptColor = 'black',
                               }: InteractiveTranscriptsProps) => {
    const [cueArray, setCueArray] = useState([]);
    const [selectedIndex, changeSelectedIndex] = useState(-1);
    let flatlistRef: any = useRef<FlatList>(null);

    useEffect(() => {
        try {
            cueArray.length === 0 &&
            fetch(url)
                .then((response) => response.text())
                .then((text) => {
                    changeSelectedIndex(0);
                    let output = WebVttParser(text);
                    if(output[0].startTime>0){
                        let tempArray = output.map((item, itemIndex) => {
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
                   }else{
                        setCueArray(output);
                   }
               });
            if (cueArray.length > 0) {
                let cueval = cueTextAndIndex(cueArray, currentDuration);
                changeSelectedIndex(cueval.cueindex);
                if (cueval.cueindex >= 0 && selectedIndex !== cueval.cueindex) {
                    flatlistRef.scrollToIndex({
                        animated: false,
                        index: cueval.cueindex,
                        viewPosition: 0.3,
                   });
               }
           }
       }catch(err){
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
            return {cuetext: '', cueindex: -1};
       }
        return {
            cuetext: array[low].endTime >= value ? array[low].text : '',
            cueindex: array[low].endTime >= value ? array[low].sequence : -1,
       };
   };
    const getItemLayout = (data, index) => (
        {length: scale(40), offset: scale(40) * index, index}
    );

    return (
        <>
            {cueArray !== null && (
                <FlatList
                    style={{flex:1}}
                    ref={(ref) => {
                        flatlistRef = ref;
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