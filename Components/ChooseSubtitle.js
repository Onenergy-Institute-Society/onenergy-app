import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from "react-native";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import {Modalize} from 'react-native-modalize';
import {scale} from "../Utils/scale";

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
                <View style={{paddingHorizontal:5, paddingVertical:2, borderBottomWidth:1, borderBottomColor:'#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text
                        style={{fontSize:scale(16)}}>
                        {item.item.title}
                    </Text>
                    {language.subtitle === item.item.language?(
                        <IconButton
                            icon={require("@src/assets/img/check-simple.png")}
                            tintColor={colors.headerIconColor}
                            style={{ height: 14, width: 14, opacity: 0.5 }}
                        />
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
                    tintColor={"#FFFFFF"}
                    style={{
                        width:24,
                        height:24,
                        tintColor:"#FFFFFF",
                        opacity: 0.5
                    }}
                    source={require('../assets/images/closed-caption.png')}
                />
                </View>
            </TouchableWithoutFeedback>
            <Modalize
                ref={(ccDialog) => { this.ccDialog = ccDialog; }}
                modalStyle={{backgroundColor:colors.bodyBg, width:windowHeight/2, justifyContent:"center", alignSelf:"center", zIndex:9999}}
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
        width:36,
        height:36,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'rgba(0,0,0,0.4)',
        borderRadius:4,
        zIndex:999,
        position:"absolute",
        top:scale(20),
        left:scale(20),
    }
});
export default ChooseSubtitle;
