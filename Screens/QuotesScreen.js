import React, {useEffect, useState, useRef} from "react";
import {
    Alert,
    StyleSheet,
    Platform,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
    SafeAreaView,
    FlatList
} from "react-native";
import {connect, useSelector} from "react-redux";
import {getApi} from "@src/services";
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import {scale, verticalScale} from "../Utils/scale";
import { BlurView } from "@react-native-community/blur";
import ScalableImage from "../Components/ScalableImage";
import RNFetchBlob from 'rn-fetch-blob';

const QuotesScreen = props => {
    const [ dataQuotesRead, setQuotesReadData ] = useState([]);
    const [ quotesLoading, setQuotesLoading ] = useState(true);
    const [ page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);

    const fetchQuote = async () => {
        const api = getApi(props.config);
        await api.customRequest(
            "wp-json/wp/v2/posts?_embed&categories=125&status=publish&order=desc&orderby=date&per_page=5&page="+page,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
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
    const checkPermission = async (image_URL) => {
        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission
        if (Platform.OS === 'ios') {
            downloadImage(image_URL);
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage(image_URL);
                } else {
                    // If permission denied then show alert
                    Alert.alert('Image Download Notice','Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };
    const downloadImage = (image_URL) => {
        // Main function to download the image
        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                description: 'Image',
            },
            path:
                PictureDir +
                '/image_' +
                Math.floor(date.getTime() + date.getSeconds() / 2) +
                ext,
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                if (Platform.OS === "ios") {
                    RNFetchBlob.ios.openDocument(res.data);
                }else {
                    // Showing alert after successful downloading
                    console.log('res -> ', JSON.stringify(res));
                    Alert.alert('Thank you', 'Quote Image Downloaded Successfully.');
                }
            });
    };
    const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };
    const downloadCurrentQuote = (inViewPort) => {
        if(inViewPort)
        inViewPort.item._embedded['wp:featuredmedia'][0].source_url?checkPermission(inViewPort.item._embedded['wp:featuredmedia'][0].source_url):null;
    };
    useEffect(()=>{
        let titleIndex = optionData.titles.findIndex(el => el.id === 'quote_title');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            downloadCurrentQuote: downloadCurrentQuote,
        });
    },[]);
    useEffect(()=>{
        setLoading(true);
        setTimeout(function () {
            setLoading(false);
        }, 1000);
        fetchQuote().then();
    }, [page]);
    const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
        console.log(changed);
        props.navigation.setParams({inViewPort: changed[0]});
    })
    const visibilityConfig = useRef({
        itemVisiblePercentThreshold: 80,
        waitForInteraction: false,
    })
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
                        onViewableItemsChanged={onViewableItemsChanged.current}
                        viewabilityConfig={visibilityConfig.current}
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
QuotesScreen.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return ({
        headerTitle: navigation.getParam('title'),
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
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
        headerRight:
            <TouchableOpacity
                onPress={() => {console.log(params);params.downloadCurrentQuote(params.inViewPort)}}
            >
                <IconButton
                    icon={require("@src/assets/img/download-large.png")}
                    tintColor={"#4942e1"}
                    style={{height: 25, marginRight:0}}
                />
            </TouchableOpacity>
    })
}
export default connect(mapStateToProps)(QuotesScreen);
