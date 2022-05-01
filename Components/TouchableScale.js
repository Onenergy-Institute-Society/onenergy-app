import React, {PureComponent} from "react";
import {Animated, TouchableOpacity} from "react-native";

class TouchableScale extends PureComponent {
    constructor(props) {
        super(props);
        this.scaleValue = new Animated.Value(1);
        this.pressThreshold = 300;
    }

    onPressIn = () => {
        this.pressedIn = Date.now();
        Animated.timing(this.scaleValue, {
                toValue: 0.97,
                duration: 300,
            }
        ).start();
    }

    onPressOut = (event) => {
        Animated.timing(this.scaleValue, {
            toValue: 1,
            duration: 150,
        }).start()
    }

    render() {
        const { style, onPress, children } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}>
                <Animated.View style={[style, { transform: [{ scale: this.scaleValue }] }]}>
                    {children}
                </Animated.View>
            </TouchableOpacity>
        );
    }
}
export default TouchableScale;