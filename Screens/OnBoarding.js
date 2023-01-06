import React, {useState, useRef} from 'react';
import {connect, useSelector} from "react-redux";
import {View, StyleSheet, FlatList, Animated, Text, SafeAreaView, TouchableOpacity,} from "react-native";
import FastImage from 'react-native-fast-image';
import { withNavigation } from 'react-navigation';
import {FontWeights} from "@src/styles/global";

import {scale, windowWidth, windowHeight} from "../Utils/scale";
const OnBoarding = props => {
    const {screenProps} = props;
    const {colors, global} = screenProps;
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
console.log(colors)
    const viewableItemsChanged = useRef(({viewableItems}) => {
        try {
            setCurrentIndex(viewableItems[0].index);
        }catch (e){
            console.log(e)
        }
    }).current;
    const viewConfig = {viewAreaCoveragePercentThreshold: 50}

    const scrollTo = () => {
        if (currentIndex < optionData.feature_slider.length - 1){
            slidesRef.current.scrollToIndex({index: currentIndex + 1});
        } else {
            try {
                props.navigation.navigate("Main");
            }catch (e){
                console.log(e)
            }
        }
    }
    const images = {
        0: require('../assets/images/slider_1.jpg'),
        1: require('../assets/images/slider_2.jpg'),
        2: require('../assets/images/slider_3.jpg'),
        3: require('../assets/images/slider_4.jpg'),
        4: require('../assets/images/slider_5.jpg'),
    };

    return (
        <SafeAreaView style={global.container}>
            <FastImage style={styles.topImage} resizeMode="cover" source={images[currentIndex]} />
            <View style={styles.bottomSlides}>
                <FastImage style={styles.imageLeaves} source={require('../assets/images/leaves_yellow.png')} resizeMode="contain" />
                <View style={[styles.topPagerView, {backgroundColor: colors.primaryButtonBg}]}>
                    <Text style={[global.textAlt, {color: colors.bodyFrontBg}]}>{currentIndex + 1} of {optionData.feature_slider.length}</Text>
                </View>
                <FlatList
                    data = {optionData.feature_slider}
                    renderItem={({item}) => {
                        return (
                            <View style={{width:windowWidth-30, justifyContent:"space-evenly", alignItems:"flex-start"}}>
                                <Text multiline={true}
                                      numberOfLines={4}
                                      style={styles.title}>{item.title}</Text>
                                <Text multiline={true}
                                      numberOfLines={4}
                                      style={styles.subtitle}>{item.subtitle}</Text>
                            </View>
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.title}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
                <TouchableOpacity
                    onPress={scrollTo}
                >
                    <View style={{width:windowWidth-30, backgroundColor: colors.primaryButtonBg, justifyContent:"center", alignItems:"center", borderRadius:15, padding:20}}>
                        <Text style={{color: '#ffffff', fontFamily: 'MontserratAlternates-SemiBold', fontSize:scale(16), fontWeight:'bold'}}>{currentIndex===0?'Get Started':'Continue'}</Text>
                    </View>
                </TouchableOpacity>
                {currentIndex === 0 ?
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("SignupScreen")}
                    >
                        <View style={{
                            width: windowWidth - 30,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 20
                        }}>
                            <Text style={{color: colors.secondaryButtonColor, fontFamily: 'MontserratAlternates-Regular', fontSize: scale(16)}}>Create
                                an account</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Main")}
                    >
                        <View style={{
                            width: windowWidth - 30,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 20
                        }}>
                            <Text style={{color: colors.secondaryButtonColor, fontFamily: 'MontserratAlternates-Regular', fontSize: scale(16)}}>Skip for now</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        borderColor: "black",
        borderWidth: 0,
        borderStyle: "solid",
    },
    imageLeaves: {
        opacity: 0.3,
        position: "absolute",
        top: 0,
        right:0,
        width: windowWidth/2,
        height: windowHeight/4,
    },
    topImage: {
        height: windowHeight/2,
    },
    bottomSlides: {
        position: "absolute",
        backgroundColor: '#ffffff',
        width: windowWidth,
        height: windowHeight/2 + 25,
        top: windowHeight/2 - 25,
        bottom:0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: scale(15),
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: 'space-evenly',
    },
    topPagerView: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: scale(25),
        paddingVertical: scale(5),
        borderRadius: 18,
    },
    title:{
        fontFamily: 'MontserratAlternates-SemiBold',
        fontSize: scale(45),
        color: "#262626",
        fontWeight: 'bold',
    },
    subtitle:{
        fontFamily: 'MontserratAlternates-Regular',
        width: windowWidth-scale(60),
        lineHeight: scale(20),
        fontSize: scale(20),
        color: "#262626"
    }
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
OnBoarding.navigationOptions = {header: null};
export default connect(mapStateToProps)(withNavigation(OnBoarding));