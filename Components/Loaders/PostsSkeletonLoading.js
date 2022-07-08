import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import {windowWidth} from "../../Utils/Dimensions";
import {scale} from "../../Utils/scale";

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
            <View style={[styles.rowStyle, styles.boxShadow]}>
                <View style={styles.imageView}>
                    <Placeholder style={styles.placeholder_image} />
                </View>
                <View style={styles.overlay}>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
                    <View style={styles.metaRow}>
                        <Placeholder style={styles.placeholder_avatar} /><Placeholder style={styles.placeholder_author} />
                    </View>
                </View>
            </View>
            <View style={[styles.rowStyle, styles.boxShadow]}>
                <View style={styles.imageView}>
                    <Placeholder style={styles.placeholder_image} />
                </View>
                <View style={styles.overlay}>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
                    <View style={styles.metaRow}>
                        <Placeholder style={styles.placeholder_avatar} /><Placeholder style={styles.placeholder_author} />
                    </View>
                </View>
            </View>
            <View style={[styles.rowStyle, styles.boxShadow]}>
                <View style={styles.imageView}>
                    <Placeholder style={styles.placeholder_image} />
                </View>
                <View style={styles.overlay}>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
                    <View style={styles.metaRow}>
                        <Placeholder style={styles.placeholder_avatar} /><Placeholder style={styles.placeholder_author} />
                    </View>
                </View>
            </View>
            <View style={[styles.rowStyle, styles.boxShadow]}>
                <View style={styles.imageView}>
                    <Placeholder style={styles.placeholder_image} />
                </View>
                <View style={styles.overlay}>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
                    <View style={styles.metaRow}>
                        <Placeholder style={styles.placeholder_avatar} /><Placeholder style={styles.placeholder_author} />
                    </View>
                </View>
            </View>
            <View style={[styles.rowStyle, styles.boxShadow]}>
                <View style={styles.imageView}>
                    <Placeholder style={styles.placeholder_image} />
                </View>
                <View style={styles.overlay}>
                    <View style={{flexDirection:"row", height:scale(16), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(16), width: "90%", marginVertical:5}}><Placeholder style={[styles.placeholder_title,{flex:0.4}]} /><Placeholder style={[styles.placeholder_title,{flex:0.6}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /></View>
                    <View style={{flexDirection:"row", height:scale(10), width: "90%", marginVertical:2}}><Placeholder style={[styles.placeholder_desc,{flex:0.4}]} /><Placeholder style={[styles.placeholder_desc,{flex:0.6}]} /></View>
                    <View style={styles.metaRow}>
                        <Placeholder style={styles.placeholder_avatar} /><Placeholder style={styles.placeholder_author} />
                    </View>
                </View>
            </View>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: scale(15),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    rowStyle: {
        backgroundColor:"white",
        borderRadius: 9,
        marginHorizontal: scale(15),
        marginBottom: scale(15),
        width: width - scale(30),
        height: scale(150),
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    overlay: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: width - scale(180),
        height: scale(150),
        paddingVertical:scale(15),
        marginRight:scale(20),
    },
    metaRow: {
        width: width - scale(200),
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems:"center",
    },
    imageView: {
        width: scale(150),
        height:scale(150),
        justifyContent:"center",
        alignItems:"center"
    },
    placeholder_image: {
        width: scale(120),
        height: scale(120),
        backgroundColor: '#E6E6E8',
        borderRadius: 9,
    },
    placeholder_title: {
        height: scale(16),
        marginHorizontal: scale(5),
        borderRadius:4,
        backgroundColor: '#E6E6E8',
    },
    placeholder_desc: {
        height: scale(10),
        marginHorizontal: scale(5),
        borderRadius:4,
        backgroundColor: '#E6E6E8',
    },
    placeholder_avatar: {
        width: scale(32),
        height: scale(32),
        borderRadius:scale(32),
        marginRight:5,
        backgroundColor: '#E6E6E8',
    },
    placeholder_author: {
        width: scale(80),
        height: scale(15),
        borderRadius:4,
        backgroundColor: '#E6E6E8',
    },
});

export default Skeleton;