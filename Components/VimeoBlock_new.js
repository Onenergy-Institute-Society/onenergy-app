import React from "react";
import {
    View, StyleSheet, TouchableOpacity, Image
} from "react-native";
import {NavigationActions, withNavigation} from "react-navigation";
import {windowWidth, windowHeight} from "../Utils/Dimensions";

const VimeoBlock = props => {
    const {
        navigation, video, thumbnail, textTracks, no_skip_forward, lesson_video, selectedCCUrl
    } = props;
    return (
        <View
            style={{flex: 1}}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "vimeoPlayer",
                            params: {
                                video: video,
                                textTracks: textTracks,
                                no_skip_forward: no_skip_forward,
                                lesson_video: lesson_video,
                                selectedCCUrl: selectedCCUrl
                            }
                        })
                    )
                }}>
                <View style = {styles.overlay_button}><Image style={styles.play} source={{uri: "https://app.onenergy.institute/wp-content/uploads/2021/11/arrow_right-1.png"}} /></View>
                <Image
                    style={styles.BackGroundImage}
                    source={{uri: thumbnail}}
                    resizeMode={'cover'}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    overlay_button:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left:0,
        right:0,
        zIndex: 1,
        width: windowWidth-30,
        height: (windowWidth-30) * (9 / 16),
        opacity: 1,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    play:{
        opacity: 0.6,
        width: 32,
        height: 32
    },
    BackGroundImage: {
        width: windowWidth-30,
        height: (windowWidth-30) * (9 / 16),
        justifyContent: 'center',
        borderRadius: 9,
    },
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
    },
    video: {
        position: 'relative',
        height: (windowWidth-30) * (9 / 16),
        width: windowWidth-30,
        backgroundColor: 'black',
        justifyContent:"center",
        alignItems: "center"
    },
    fullscreenVideo: {
        position: 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        height: windowWidth,
        width: windowHeight,
        backgroundColor: 'black',
    },
    text: {
        marginTop: 30,
        marginHorizontal: 20,
        fontSize: 15,
        textAlign: 'justify',
    },
    normalViewStyle: {
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 9,
    },
    fullscreenButtonImage:{
        width:32,
        height:32,
    },
    fullscreenButton: {
        position: 'absolute',
        top:10,
        left:10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
});
export default withNavigation(VimeoBlock);
