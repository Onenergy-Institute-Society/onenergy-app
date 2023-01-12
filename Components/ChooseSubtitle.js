import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from "react-native";
import {windowHeight} from "../Utils/Dimensions";
import {Modalize} from 'react-native-modalize';
import {scale} from "../Utils/scale";
import Svg, {Path} from "react-native-svg";

const ChooseSubtitle =(props) => {
    const {textTracks, setSelectedCCUrl, screenProps} = props;
    const {colors} = screenProps;
    const language = useSelector((state) => state.languagesReducer.languages);
    const dispatch = useDispatch();
    const openCCDialog=()=>{
        this.ccDialog.open();
    }
    const renderCC = (item) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedCCUrl(item.item.uri);
                dispatch({
                    type: 'ONENERGY_CHANGE_SUBTITLE',
                    payload: item.item.language
                });
                this.ccDialog.close();
            }}>
                <View style={{paddingHorizontal:5, paddingVertical:5, borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text
                        style={{fontSize:scale(20)}}>
                        {item.item.title}
                    </Text>
                    {language.subtitle === item.item.language?(
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            style={{marginLeft:scale(10)}}
                        >
                            <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                  fill="none"
                                  stroke={colors.primaryColor}
                                  strokeWidth="2"
                            />
                            <Path d="M22 4 12 14.01l-3-3"
                                  fill="none"
                                  stroke={colors.primaryColor}
                                  strokeWidth="2"
                            />
                        </Svg>
                    ):null}
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <>
            <TouchableWithoutFeedback
                onPress={()=>{openCCDialog();}}
                hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            >
                <View style={styles.buttonView}>
                <Image
                    tintColor={'#FFFFFF'}
                    style={{
                        width:scale(36),
                        height:scale(36),
                        tintColor:'#FFFFFF',
                        opacity: 0.5
                    }}
                    source={require('../assets/images/closed-caption.png')}
                />
                </View>
            </TouchableWithoutFeedback>
            <Modalize
                ref={(ccDialog) => { this.ccDialog = ccDialog; }}
                modalStyle={{backgroundColor:colors.bodyFrontBg, width:windowHeight/3, justifyContent:"center", alignSelf:"center", zIndex:9999}}
                childrenStyle={{paddingHorizontal:10, paddingTop:10}}
                adjustToContentHeight={true}
                disableScrollIfPossible={true}
                closeOnOverlayTap={true}
                withHandle = {false}
                flatListProps = {{
                    data:textTracks,
                    renderItem:renderCC,
                    keyExtractor:(item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        width:scale(36),
        height:scale(36),
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:4,
        zIndex:999,
        position:"absolute",
        top:scale(20),
        left:scale(30),
    }
});
export default ChooseSubtitle;
