import React, {useState, useRef} from 'react';
import {connect, useSelector} from "react-redux";
import {View, StyleSheet, FlatList, Animated, ImageBackground} from "react-native";
import { withNavigation } from 'react-navigation';
import OnBoardingItem from '../Components/OnBoardingItem'
import Paginator from "../Components/Paginator"
import NextButton from "../Components/NextButton"
const OnBoarding = props => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);

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
    return (
        <ImageBackground source={{uri:"https://app.onenergy.institute/wp-content/uploads/2021/11/4-scaled.jpg"}} resizeMode="cover" style={styles.container}>
            <View style={[{flex: 3},styles.border]}>
                <FlatList
                    data = {optionData.feature_slider}
                    renderItem={({item}) => <OnBoardingItem item={item}/>}
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
            </View>
            <View style={[styles.nextButton,styles.border]}>
                <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / optionData.feature_slider.length)} />
            </View>
            <View style={[{flex:1},styles.border]}>
            <Paginator
                data = {optionData.feature_slider}
                scrollX={scrollX}
            />
            </View>
        </ImageBackground>
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
    nextButton: {
        flex:1,
        marginVertical:10,
    }
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
OnBoarding.navigationOptions = () => ({
    header: 'null'
})
export default connect(mapStateToProps)(withNavigation(OnBoarding));