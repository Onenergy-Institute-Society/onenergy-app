import React from 'react';
import {StyleSheet, View} from 'react-native';

export default (Indicator = ({
                                 itemCount,
                                 currentIndex,
                                 indicatorStyle,
                                 indicatorContainerStyle,
                                 indicatorActiveColor,
                                 indicatorInActiveColor,
                                 indicatorActiveWidth = 6,
                             }) => {
    return (
        <View style={[styles.container, indicatorContainerStyle]}>
            {renderIndicator(
                itemCount,
                currentIndex,
                indicatorStyle,
                indicatorActiveColor,
                indicatorInActiveColor,
                indicatorActiveWidth,
            )}
        </View>
    );
});

export const renderIndicator = (
    count,
    currentIndex,
    indicatorStyle,
    indicatorActiveColor,
    indicatorInActiveColor,
    indicatorActiveWidth,
) => {
    let indicators = [];
    for (let i = 0; i < count; i++) {
        indicators.push(
            <View
                key={i.toString()}
                style={[
                    styles.indicator,
                    indicatorStyle,
                    i === currentIndex
                        ? indicatorActiveColor
                            ? {
                                ...styles.active,
                                ...{
                                    backgroundColor: indicatorActiveColor,
                                    width: indicatorActiveWidth,
                                },
                            }
                            : styles.active
                        : {
                            ...styles.inactive,
                            ...{backgroundColor: indicatorInActiveColor},
                        },
                ]}
            />,
        );
    }
    return indicators;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 5,
    },
    active: {},
    inactive: {},
});