import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Modalize} from 'react-native-modalize';
import {s, windowHeight} from "../Utils/Scale";
import {SvgIconCheck} from "../Utils/svg";

const ChooseSubtitle = (props) => {
    const {textTracks, setSelectedCCUrl, screenProps} = props;
    const {global, colors} = screenProps;
    const language = useSelector((state) => state.settingReducer.languages);
    const dispatch = useDispatch();
    const openCCDialog = () => {
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
                <View style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text
                        style={[global.itemTitle, {fontSize: s(20)}]}>
                        {item.item.title}
                    </Text>
                    {language.subtitle === item.item.language ? (
                        <SvgIconCheck size={24} color={colors.primaryColor}/>
                    ) : null}
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <>
            <TouchableWithoutFeedback
                onPress={() => {
                    openCCDialog();
                }}
                hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            >
                <View style={styles.buttonView}>
                    <Image
                        tintColor={'#FFFFFF'}
                        style={{
                            width: s(36),
                            height: s(36),
                            tintColor: '#FFFFFF',
                            opacity: 0.5
                        }}
                        source={require('../assets/images/closed-caption.png')}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Modalize
                ref={(ccDialog) => {
                    this.ccDialog = ccDialog;
                }}
                modalStyle={{
                    backgroundColor: colors.bodyFrontBg,
                    width: windowHeight / 3,
                    justifyContent: "center",
                    alignSelf: "center",
                    zIndex: 9999
                }}
                childrenStyle={{paddingHorizontal: 10, paddingTop: 10}}
                adjustToContentHeight={true}
                disableScrollIfPossible={true}
                closeOnOverlayTap={true}
                withHandle={false}
                flatListProps={{
                    data: textTracks,
                    renderItem: renderCC,
                    keyExtractor: (item, index) => `${item.title}-${index}`,
                    showsVerticalScrollIndicator: false,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        width: s(36),
        height: s(36),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 4,
        zIndex: 999,
        position: "absolute",
        top: s(20),
        left: s(30),
    }
});
export default ChooseSubtitle;
