import React from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, ImageBackground, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import {windowWidth} from "../../Utils/Dimensions";
import {scale} from "../../Utils/scale";

const {height, width} = Dimensions.get('window');

const Gradient = () => {
    return (
        <LinearGradient
            colors={['#E6E6E6', '#C6C6C6', '#E6E6E6']}
            start={{x: 1.0, y: 0.0}}
            end={{x: 0.0, y: 0.0}}
            style={{
                flex: 1,
                width: 120,
           }}
      />
    );
};
const Skeleton = () => {
    return (
        <PlaceholderContainer
            style={styles.container}
            animatedComponent={<Gradient/>}
            duration={1000}
            replace={true}
        >
            <View style={[styles.trackItem, styles.boxShadow ]}>
                <View style={[styles.trackItemInner, styles.itemStyle]}>
                    <View style={styles.trackImgBox}>
                        <Placeholder style={styles.placeholder_subtitle}/>
                        <Placeholder style={styles.placeholder_subtitle}/>
                        <Placeholder style={styles.placeholder_subtitle}/>
                        <Placeholder style={styles.placeholder_subtitle}/>
                    </View>
                    <View style={styles.trackDescBox}>
                        <Placeholder style={styles.placeholder_title}/>
                        <Placeholder style={styles.placeholder_subtitle}/>
                        <Placeholder style={styles.placeholder_subtitle}/>
                        <Placeholder style={styles.placeholder_subtitle}/>
                    </View>
                </View>
            </View>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
   },
    view: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: width - 30,
        marginLeft: 15,
        marginRight: 15,
        height: 150,
        marginBottom: 15,
        borderRadius: 9,
        overflow: 'hidden',
   },
    trackItem: {
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 20,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        marginHorizontal: 15,
        marginVertical: scale(10),
        overflow: "hidden",
        height: scale(150),
        justifyContent: "flex-start",
   },
    trackItemInner: {
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth - scale(30),
        overflow: "hidden",
   },
    itemStyle: {
        paddingHorizontal: scale(8),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        height: scale(80),
        borderBottomColor: '#333',
        borderWidth: 0,
   },
    trackImgBox: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
   },
    trackDescBox: {
        flex: 3,
        padding: scale(20),
        justifyContent:"space-between",
        display: 'flex',
   },
    titleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'flex-start',
        marginTop: scale(5),
   },
    subTitleBox: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems:"center",
   },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
   },
    placeholder_image: {
        width:scale(70),
        height:scale(70),
        marginLeft: scale(10),
        backgroundColor: '#E6E6E8',
        borderRadius: 9,
   },
    placeholder_title: {
        width: "80%",
        height: scale(18),
        backgroundColor: '#E6E6E8',
   },
    placeholder_subtitle: {
        width: "80%",
        height: scale(13),
        backgroundColor: '#E6E6E8',
   },
    placeholder_duration: {
        width: scale(35),
        height: scale(12),
        backgroundColor: '#E6E6E8',
   },
});

export default Skeleton;