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
import Share from "react-native-share";
import {connect, useSelector, useDispatch} from "react-redux";
import {getApi} from "@src/services";
import {s, windowWidth, windowHeight, mvs} from "../Utils/Scale";
import ScalableImage from "../Components/ScalableImage";
import RNFetchBlob from 'rn-fetch-blob';
import {SvgIconBack} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

const QuotesScreen = props => {
    const {screenProps} = props;
    const {global} = screenProps;
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const quoteReducer = useSelector((state) => state.quoteReducer.quotes);
    const dispatch = useDispatch();
    const [options, setOptions] = useState({});

    const fetchQuote = async () => {
        const api = getApi(props.config);
        const data = await api.customRequest(
            "wp-json/wp/v2/posts?_embed&categories=125&status=publish&order=desc&orderby=date&per_page=5&page=" + page,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
            "get",  // get, post, patch, delete etc.
            {},     // JSON, FormData or any other type of payload you want to send in a body of request
            null,   // validation function or null
            {},     // request headers object
            false   // true - if full url is given, false if you use the suffix for the url. False is default.
        ).then(response => response.data);
        let quotes = [];
        if (data && data.length) {
            data.forEach((item) => {
                if (!quoteReducer.length || quoteReducer.filter(quote => parseInt(quote.id) === parseInt(item.id)).length === 0) {
                    quotes.push({
                        id: item.id,
                        date: item.date,
                        title: item.title,
                        format: item.format,
                        excerpt: item.excerpt,
                        share_url: item.meta_box.share_url,
                        author: item._embedded['author'][0].name,
                        avatar: item._embedded['author'][0].avatar_urls['24'],
                        image: item._embedded['wp:featuredmedia'][0].source_url,
                    })
                }
            })
            if (quotes && quotes.length > 0) {
                dispatch({
                    type: 'ONENERGY_QUOTES_ADD',
                    payload: quotes,
                });
            }
            setLoading(false);
        }
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
                    downloadImage(image_URL);
                } else {
                    // If permission denied then show alert
                    Alert.alert('Image Download Notice', 'Storage Permission Not Granted');
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
        // config: To pass the downloading related options'
        // fs: Directory path where we want our image to download
        const {config, fs} = RNFetchBlob;
        let PictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                description: 'Image',
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    ext,
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                if (Platform.OS === "ios") {
                    RNFetchBlob.ios.openDocument(res.data);
                } else {
                    // Showing alert after successful downloading
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
        if (inViewPort)
            inViewPort.item.image ? checkPermission(inViewPort.item.image) : null;
    };
    useEffect(() => {
        Analytics.segmentClient.screen('Quotes').then();
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'quote_title').title,
            downloadCurrentQuote: downloadCurrentQuote,
        });
    }, []);
    useEffect(() => {
        let loadQuotes = false;
        let quoteCount = quoteReducer.length

        if (quoteCount < 5 * page) {
            loadQuotes = true
        }
        if (loadQuotes) {
            setLoading(true);
            fetchQuote().then();
        }
    }, [page]);

    const onViewableItemsChanged = React.useRef(({viewableItems, changed}) => {
        props.navigation.setParams({inViewPort: changed[0]});
    })
    const visibilityConfig = useRef({
        itemVisiblePercentThreshold: 80,
        waitForInteraction: false,
    })

    useEffect(async () => {
        await Share.open(options);
    }, [options])
    const renderItem = ({item}) => {
        return (
            <View style={styles.container}>
                <ScalableImage width={windowWidth} source={{uri: item.image ? item.image : ''}}/>
{/*                {item.share_url ?
                    <TouchableScale
                        onPress={() => {
                            setOptions({
                                title: "Onenergy Quote",
                                url: item.share_url,
                                message: "Please check this out."
                            })
                        }}
                    >
                        <View style={[styles.buttonShare, styles.boxShadow]}>
                            <Text
                                style={{fontSize: s(20), color: '#FFF'}}
                            >
                                SHARE
                            </Text>
                        </View>
                    </TouchableScale>
                    : null}*/}
            </View>
        );
    }
    return (
        <SafeAreaView style={global.container}>
            {quoteReducer && quoteReducer.length ? (
                <View style={styles.view}>
                    <FlatList
                        inverted
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        snapToInterval={windowWidth}
                        disableIntervalMomentum={true}
                        decelerationRate={"fast"}
                        snapToAlignment={'start'}
                        data={quoteReducer}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index + ""}
                        showsHorizontalScrollIndicator={false}
                        onEndReached={({distanceFromEnd}) => {

                            if (!onEndReachedCalledDuringMomentum) {
                                if (distanceFromEnd < 0) return;
                                setPage(page + 1);
                                setOnEndReachedCalledDuringMomentum(true);
                            }
                        }}
                        onViewableItemsChanged={onViewableItemsChanged.current}
                        viewabilityConfig={visibilityConfig.current}
                        onEndReachedThreshold={0.5}
                        onMomentumScrollBegin={() => {
                            setOnEndReachedCalledDuringMomentum(false)
                        }}
                        horizontal
                    />
                    {loading ?
                        <ActivityIndicator size={'large'}/>
                        : null}
                    <Text
                        style={styles.title}>
                        &#x2190; Swipe for more quotes &#x2192;
                    </Text>
                </View>
            ) : (
                <View style={{
                    flex: 1,
                    width: windowWidth,
                    height: windowHeight,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ActivityIndicator size={'large'}/>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6f6f8',
    },
    buttonShare: {
        marginVertical: 15,
        borderRadius: s(9),
        alignItems: 'center',
        justifyContent: 'center',
        width: s(200),
        height: s(50),
        backgroundColor: '#8c79ea',
    },
    view: {
        padding: 0,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    image: {
        width: windowWidth,
    },
    title: {
        marginBottom: mvs(20),
        fontSize: s(14),
        textAlign: 'center',
        color: '#000',
        fontFamily: 'MontserratAlternates-SemiBold',
    },
    roundButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        borderRadius: 24,
        backgroundColor: 'white',
        fontSize: 30,

    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
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
QuotesScreen.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    return {
        headerTitle: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <SvgIconBack color={colors.headerIconColor}/>
            </TouchableOpacity>,
    }
}
export default connect(mapStateToProps)(QuotesScreen);
