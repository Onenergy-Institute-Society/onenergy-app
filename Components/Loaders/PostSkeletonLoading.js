import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import {windowWidth} from "../../Utils/Dimensions";
import {scale, verticalScale} from "../../Utils/scale";

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
            <View style={styles.contentView}>
                <View style={{flexDirection:"row", height:verticalScale(40), width: width-scale(50), marginVertical:10}}><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.1}]} /></View>
                <View style={{flexDirection:"row", height:verticalScale(15), width: width-scale(50), marginVertical:5}}><Placeholder style={[styles.placeholder_desc,{flex:0.2}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.3}]} /></View>
            </View>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentView: {
        backgroundColor: 'rgba(255,255,255)',
        width: width,
        height: height - (width * 19) / 27,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        overflow: 'hidden',
        paddingTop: 40,
        paddingHorizontal: 25,
    },
    overlay: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:0,
        width: width,
    },
    metaRow: {
        width: width - 200,
        flexDirection: 'row',
        justifyContent: "flex-start",
    },
    placeholder_title: {
        height: verticalScale(40),
        marginHorizontal: scale(5),
        backgroundColor: '#F1F1F1',
        borderRadius:4,
    },
    placeholder_desc: {
        height: verticalScale(15),
        marginHorizontal: scale(5),
        backgroundColor: '#E6E6E6',
        borderRadius:4,
    },
});

export default Skeleton;