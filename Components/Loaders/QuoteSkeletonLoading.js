import React from 'react';
import {ImageBackground, StyleSheet, Dimensions, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import {windowWidth} from "../../Utils/Dimensions";
import {verticalScale, scale} from "../../Utils/scale";

const { height, width } = Dimensions.get('window');

const Gradient = () => {
    return (
        <LinearGradient
            colors={['#E6E6E6', '#C6C6C6', '#E6E6E6']}
            start={{ x: 1.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.0 }}
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
            animatedComponent={<Gradient />}
            duration={1000}
            replace={true}
        >
            <ImageBackground source={{uri: 'https://assets.onenergy.institute/wp-content/uploads/2022/01/design-6.png'}} style={[styles.quoteRow, styles.boxShadow]}>
                <View style={{flexDirection:"row", height:verticalScale(6), width: "70%", marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(6), width: "70%", marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(6), width: "70%", marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.7}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(6), width: "70%", marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
            </ImageBackground>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth-30,
        height: (windowWidth-30)/3.75,
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    quoteRow: {
        backgroundColor: 'rgba(255,255,255,1)',
        width: windowWidth-30,
        height: (windowWidth-30)/3.75,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder_desc: {
        height: verticalScale(6),
        marginHorizontal: scale(5),
        borderRadius:4,
        backgroundColor: '#E6E6E8',
    },
});

export default Skeleton;