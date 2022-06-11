import React, {useEffect, useState, PureComponent} from "react";
import {
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    FlatList, TouchableWithoutFeedback
} from "react-native";
import {connect} from "react-redux";
import {getApi} from "@src/services";
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import {scale, verticalScale} from "../Utils/scale";
import { BlurView } from "@react-native-community/blur";
import ScalableImage from "../Components/ScalableImage";

const QuotesScreen = props => {
    const [ dataQuotesRead, setQuotesReadData ] = useState([]);
    const [ quotesLoading, setQuotesLoading ] = useState(true);
    const [ page, setPage] = useState(1);
    const { global, screenProps } = props;
    const { colors } = screenProps;
    const [loading, setLoading] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);

    const fetchQuote = async () => {
        const api = getApi(props.config);
        await api.customRequest(
            "wp-json/wp/v2/posts?_embed&categories=125&status=publish&order=desc&orderby=id&per_page=5&page="+page,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
            "get",  // get, post, patch, delete etc.
            {},     // JSON, FormData or any other type of payload you want to send in a body of request
            null,   // validation function or null
            {},     // request headers object
            false   // true - if full url is given, false if you use the suffix for the url. False is default.
        ).then(response => {
            setQuotesReadData((current) => [...current, ...response.data]);
            setQuotesLoading(false);
            setLoading(false);
        });
    }

    useEffect(()=>{
        setLoading(true);
        setTimeout(function () {
            setLoading(false);
        }, 1000);
        fetchQuote().then();
    }, [page]);

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <ScalableImage width={windowWidth} source={{uri: item._embedded['wp:featuredmedia'][0].source_url?item._embedded['wp:featuredmedia'][0].source_url:''}} />
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            {quotesLoading?(
                <View style={{flex:1,width:windowWidth, height:windowHeight,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator size={'large'} />
                </View>
            ):(
                <View style={styles.view}>
                    <FlatList
                        inverted
                        snapToInterval={windowWidth}
                        disableIntervalMomentum={true}
                        decelerationRate={"fast"}
                        snapToAlignment={'start'}
                        data={dataQuotesRead}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index + ""}
                        showsHorizontalScrollIndicator={false}
                        onEndReached={({distanceFromEnd}) => {
                            if(!onEndReachedCalledDuringMomentum) {
                                if (distanceFromEnd < 0) return;
                                setPage(page + 1);
                                setOnEndReachedCalledDuringMomentum(true);
                            }
                        }}
                        onEndReachedThreshold={0.5}
                        onMomentumScrollBegin={() => { setOnEndReachedCalledDuringMomentum(false) }}
                        horizontal
                    />
                    <Text
                        style={styles.title}>
                        Swipe for more quotes.
                    </Text>
                </View>
            )}
            {loading &&
            <BlurView style={styles.loading}
                      blurType="light"
                      blurAmount={5}
                      reducedTransparencyFallbackColor="white"
            >
                <View>
                    <ActivityIndicator size='large' />
                </View>
            </BlurView>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:windowWidth,
        height:windowHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6f6f8',
    },
    view: {
        padding: 0,
        flex: 1,
        justifyContent:"flex-start",
    },
    image: {
        width: windowWidth,
    },
    title: {
        marginBottom:verticalScale(25),
        fontSize: scale(14),
        textAlign: 'center',
        color: '#000',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
    roundButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: 24,
        backgroundColor: 'white',
        fontSize:30,

    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
QuotesScreen.navigationOptions = ({ navigation }) => ({
    title: 'Onenergy Quotes',
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
            >
            <IconButton
                icon={require("@src/assets/img/arrow-back.png")}
                tintColor={"#4942e1"}
                style={{
                    height: scale(16),
                    marginLeft: scale(16),
                }}
            />
        </TouchableOpacity>,
/*    headerRight:
        <TouchableOpacity
            onPress={() => {alert('hello')}}
        >
            <IconButton
                icon={require("@src/assets/img/download-large.png")}
                tintColor={"#4942e1"}
                style={{
                    height: 20,
                    marginRight: 25,
                }}
            />
        </TouchableOpacity>*/
})
export default connect(mapStateToProps)(QuotesScreen);
