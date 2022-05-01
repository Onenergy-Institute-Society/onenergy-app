import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    PlaceholderContainer,
    Placeholder,
} from 'react-native-loading-placeholder';
import {windowWidth} from "../../Utils/Dimensions";
import {verticalScale} from "../../Utils/scale";

const Gradient = () => {
    return (
        <LinearGradient
            colors={['#C6C6C6', '#E6E6E6', '#C6C6C6']}
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
            <Placeholder style={[styles.trackItem, styles.boxShadow]}>
            </Placeholder>
            <Placeholder style={[styles.trackItem, styles.boxShadow]}>
            </Placeholder>
            <Placeholder style={[styles.trackItem, styles.boxShadow]}>
            </Placeholder>
        </PlaceholderContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    trackItem: {
        backgroundColor: '#C6C6C6',
        height:verticalScale(80),
        borderRadius: 9,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: windowWidth - 30,
        marginHorizontal: 15,
        marginVertical: verticalScale(10),
        overflow: "hidden",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

export default Skeleton;