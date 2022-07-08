import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import {windowWidth} from "../../Utils/Dimensions";
import {scale} from "../../Utils/scale";

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
            <View style={[styles.slideRow,styles.boxShadow]}>
                <Placeholder style={styles.placeholder_title} />
                <Placeholder style={styles.placeholder_desc} />
                <Placeholder style={styles.placeholder_desc} />
                <Placeholder style={styles.placeholder_desc} />
            </View>
            <View style={[styles.quoteRow,styles.boxShadow]}>
                <Placeholder style={styles.placeholder_desc} />
                <Placeholder style={styles.placeholder_desc} />
                <Placeholder style={styles.placeholder_desc} />
            </View>
            <View style={styles.eventRow}>
                <View style={[styles.eventRowLeft,styles.boxShadow]}>
                    <Placeholder style={styles.placeholder_title} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                </View>
                <View style={[styles.eventRowRight,styles.boxShadow]}>
                    <Placeholder style={styles.placeholder_title} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                </View>
            </View>
            <View style={styles.eventRow}>
                <View style={[styles.halfRowLeft,styles.boxShadow]}>
                    <Placeholder style={styles.placeholder_title} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                </View>
                <View style={[styles.halfRowRight,styles.boxShadow]}>
                    <Placeholder style={styles.placeholder_title} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                </View>
            </View>
            <Placeholder style={[styles.placeholder_title, styles.heading]} />
            <View style={styles.eventRow}>
                <View style={[styles.halfRowLeft,styles.boxShadow]}>
                    <Placeholder style={styles.placeholder_title} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                </View>
                <View style={[styles.halfRowRight,styles.boxShadow]}>
                    <Placeholder style={styles.placeholder_title} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                    <Placeholder style={styles.placeholder_desc} />
                </View>
            </View>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    view: {
        width:windowWidth-scale(30),
        marginBottom:30,
        minHeight:100,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    slideRow: {
        backgroundColor: 'rgba(255,255,255,1)',
        width:windowWidth-scale(30),
        height:(windowWidth - scale(30)) / 2.5,
        borderRadius: 9,
        marginBottom:15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quoteRow: {
        backgroundColor: 'rgba(255,255,255,1)',
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))/3.75+10,
        borderRadius: 9,
        marginBottom:15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventRow: {
        width:windowWidth-scale(30),
        borderRadius: 9,
        marginBottom:20,
        minHeight:100,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    eventRowLeft:{
        backgroundColor: 'rgba(255,255,255,1)',
        width: (windowWidth-50)/3*2,
        height: (windowWidth-scale(30))/2,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:20,
    },
    eventRowRight:{
        backgroundColor: 'rgba(255,255,255,1)',
        width: (windowWidth-50)/3,
        height: (windowWidth-scale(30))/2,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    halfRowLeft:{
        backgroundColor: 'rgba(255,255,255,1)',
        width: (windowWidth-50)/2,
        height: (windowWidth-scale(30))/2,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:20,
    },
    halfRowRight:{
        backgroundColor: 'rgba(255,255,255,1)',
        width: (windowWidth-50)/2,
        height: (windowWidth-scale(30))/2,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        backgroundColor: '#E6E6E6',
        borderRadius: 9,
    },
    heading: {
        fontSize: 18,
        fontWeight: "normal",
        marginBottom: 20,
    },
    placeholder_title: {
        width: "60%",
        height: 30,
        backgroundColor: '#E6E6E8',
        marginBottom:10,
        borderRadius:4,
    },
    placeholder_desc: {
        width: "80%",
        height: 10,
        borderRadius:4,
        marginBottom:5,
        backgroundColor: '#E6E6E8',
    },
});

export default Skeleton;