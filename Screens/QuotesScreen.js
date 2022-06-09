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
import HTML from "react-native-render-html";
import IconButton from "@src/components/IconButton";
import {scale} from "../Utils/scale";
import { BlurView } from "@react-native-community/blur";

const QuotesScreen = props => {
    const [ dataQuotesRead, setQuotesReadData ] = useState([]);
    const [ quotesLoading, setQuotesLoading ] = useState(true);
    const { global, screenProps } = props;
    const { colors } = screenProps;
    const [ page, setPage] = useState(1);
    const [ loading, setLoading ] = useState(false);
    const [ noMore, setNoMore ] = useState(false);

    const fetchQuote = async (page) => {
        const api = getApi(props.config);
        await api.customRequest(
            "wp-json/wp/v2/posts?_embed&categories=125&order=desc&orderby=id&per_page=1&page="+page,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
            "get",  // get, post, patch, delete etc.
            {},     // JSON, FormData or any other type of payload you want to send in a body of request
            null,   // validation function or null
            {},     // request headers object
            false   // true - if full url is given, false if you use the suffix for the url. False is default.
        ).then(response => {
            if(response.data.code&&response.data.code==="rest_post_invalid_page_number"){
                setNoMore(true);
            }else {
                setQuotesReadData((current) => [...current, ...response.data]);
            }
            setQuotesLoading(false);
            setLoading(false);
        });
    }

    useEffect(()=>{
        fetchQuote(page).then();
    }, []);

    const htmlStyle = {
        img: {width: windowWidth - 80 },
        a: {color: colors.linkColor},
        p: {
            lineHeight: (16 * 1.47),
            paddingLeft: 8,
            paddingRight: 8,
            fontSize: 16,
            color: colors.textColor,
            textAlign: 'left',
            marginBottom:25,
        },
    };
    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll_view}>
                <HTML html={item.content.rendered}
                      contentWidth={windowWidth - 80}
                      imagesMaxWidth={windowWidth}
                      tagsStyles={htmlStyle}
                      ignoredStyles={['height', 'width']}/>
            </ScrollView>
        </View>
    );
    const onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
    }
    return (
        <SafeAreaView style={styles.container}>
            {quotesLoading?(
                <View style={{flex:1,width:windowWidth, height:windowHeight,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator size={'large'} />
                </View>
            ):(
                <View style={styles.view}>
                    <FlatList
                        ref={ref => (this.flatList = ref)}
                        inverted
                        snapToInterval={windowWidth}
                        disableIntervalMomentum={true}
                        decelerationRate={"fast"}
                        snapToAlignment={'start'}
                        data={dataQuotesRead}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index + ""}
                        showsHorizontalScrollIndicator={false}
                        onContentSizeChange={() => {
                            if (this.flatList && this.flatList.scrollToIndex && dataQuotesRead && dataQuotesRead.length) {
                                this.flatList.scrollToIndex({  index: dataQuotesRead.length - 1 });
                            }
                        }}
                        onScrollToIndexFailed={() => {}}
                        horizontal
                    />
                    {!noMore?
                    <TouchableOpacity
                        onPress={async () => {setLoading(true);setPage(page+1); await fetchQuote(page);}}
                    >
                            <View style={{flexDirection: "row", justifyContent:"center",alignItems: "center", backgroundColor: colors.primaryButtonBg, paddingVertical:10, margin:15, borderRadius: 9,}}>
                                <IconButton
                                    icon={require("@src/assets/img/arrow-right-variant-2.png")}
                                    style={{tintColor:"#fff", width:24, height:24, transform: [{ rotate: '180deg'}]}}
                                />
                                <Text
                                    style={styles.title}>
                                    Load More Quote
                                </Text>
                            </View>
                    </TouchableOpacity>
                        :
                        <View style={{flexDirection: "row", justifyContent:"center",alignItems: "center", backgroundColor: "#ed57e1", paddingVertical:10, margin:15, borderRadius: 9,}}>
                            <Text
                                style={styles.title}>
                                Want more? come back tomorrow.
                            </Text>
                        </View>
                    }
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#f6f6f8',
    },
    view: {
        padding: 0,
        flex: 1,
        justifyContent:"flex-start",
    },
    image: {
        width: windowWidth-30,
        height: windowWidth-30,
        borderRadius: 9,
        overflow: 'hidden',
    },
    title: {
        top:0,
        fontSize: scale(18),
        textAlign: 'center',
        color: '#fff',
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
