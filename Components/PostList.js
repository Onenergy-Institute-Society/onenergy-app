import React, {useEffect, useState } from "react";
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Dimensions,
    SafeAreaView,
    FlatList,
    ActivityIndicator, Image
} from "react-native";
import {connect, useSelector, useDispatch} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
const {width} = Dimensions.get('window')
import Skeleton from './Loaders/PostsSkeletonLoading';
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import { scale, verticalScale } from '../Utils/scale';
import NotificationTabBarIcon from "./NotificationTabBarIcon";

const PostList = props => {
    const [ postsData, setPostsData ] = useState([]);
    const [ postsDataLoading, setPostsDataLoading] = useState(true);
    const [ loadMore, setLoadMore] = useState(false);
    const [ page, setPage] = useState(1);
    const { navigation, postCategory, postPerPage, postOrder, postOrderBy, useLoadMore } = props;
    const user = useSelector((state) => state.user.userObject);
    const notification = useSelector((state) => state.notifyReducer.notification);
    const dispatch = useDispatch();
    const fetchPostsData = async () => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/wp/v2/posts?_embed&categories="+postCategory+"&order="+postOrder+"&orderby="+postOrderBy+"&per_page="+postPerPage+"&page="+page,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => {
                setPostsData((current) => [...current, ...response.data]);
                setPostsDataLoading(false);
                if(user) {
                    dispatch({
                        type: 'NOTIFICATION_TIME'
                    });
                }
            });

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchPostsData().then();
    }, [page]);

    const handleLoadMore = () => {
        if(useLoadMore) {
            setPage(page + 1);
            setLoadMore(true);
            setTimeout(function () {
                setLoadMore(false);
            }, 2000);
        }
    };
    const regex = /(<([^>]+)>)/ig;

    const renderOverlayImage = (format) => {
        switch(format) {
            case 'video':
                return <View style = {styles.overlay_button}><Image style = {styles.play} source = {{uri: "https://assets.onenergy.institute/wp-content/uploads/2021/11/arrow_right-1.png"}} /></View>;
            case 'audio':
                return <View style = {styles.overlay_button}><Image style = {styles.play} source = {{uri: "https://assets.onenergy.institute/wp-content/uploads/2021/11/arrow_right-1.png"}} /></View>;
            default:
                return null;
        }
    }
    const onRefresh = () => {
        fetchPostsData().then();
    }
    const renderItem = ({ item }) => {
        let mode;
        if(notification.time) {
            switch (postCategory) {
                case '103':
                    mode = 'posts_watch';
                    break;
                case '105':
                    mode = 'posts_read';
                    break;
            }
            const dateTime= new Date(notification.time);
            const datePost = new Date(item.dateUTC);
            if ((datePost > dateTime) && user) {
                dispatch({
                    type: 'NOTIFICATION_POST_ADD',
                    payload: item.id,
                    mode: mode
                });
            }
        }
        return (
            <TouchableScale
                key={item.id + 'img'}
                onPress={() => {
                    try {
                        if(user) {
                            dispatch({
                                type: 'NOTIFICATION_POST_REMOVE',
                                payload: item.id,
                                mode: mode
                            });
                        }
                        navigation.dispatch(
                            NavigationActions.navigate({
                                routeName: "MyBlogScreen",
                                params: {
                                    blogId: item.id,
                                    title: item.title.rendered
                                },
                                key: 'MyBlogScreen-' + item.id
                            })
                        );
                    } catch (err) {
                        console.log(`${err}`);
                    }
                }
                }>
                <View style={[styles.containerStyle, styles.boxShadow]} key={'post-' + item.id}>
                    <View style={styles.rowStyle}>
                        <View style={styles.imageView}>
                            <ImageCache style={styles.image}
                                        source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url ? item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url : ''}}/>
                            {renderOverlayImage(item.format)}
                        </View>
                        <View style={styles.overlay}>
                            <Text style={styles.title}>{item.title.rendered}</Text>
                            {item.excerpt.rendered.length > 0 && (
                                <Text numberOfLines={2} style={styles.description}>
                                    {item.excerpt.rendered.replace(regex, '')}
                                </Text>
                            )}
                            <View style={styles.metaRow}>
                                <ImageCache style={styles.avatar} source={{uri: item._embedded['author'][0].avatar_urls['24'] ? item._embedded['author'][0].avatar_urls['24'] : ''}}/>
                                <Text style={styles.author}>{item._embedded['author'][0].name ? item._embedded['author'][0].name : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <NotificationTabBarIcon notificationID={mode} top={3} right={3} size={15} fontSize={scale(10)} showNumber={false} data={item.id} />
                </View>
            </TouchableScale>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {postsDataLoading ? (
                <Skeleton />
            ):(
                 <FlatList
                    style={styles.scrollView}
                    data={postsData}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.01}
                    renderItem={renderItem}
                    extraData={this.props}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    onRefresh={() => onRefresh()}
                    refreshing={postsDataLoading}
                />
            )}
            {loadMore ? (
                <ActivityIndicator style={styles.loading} size="large"/>
            ):null}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerStyle: {
        backgroundColor:"white",
        borderRadius: 9,
        marginHorizontal: scale(15),
        marginTop: scale(15),
        width: width - scale(30),
        height: scale(150),
    },
    rowStyle: {
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    scrollView: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingBottom: scale(60),
    },
    image: {
        width: scale(120),
        height: scale(120),
        borderRadius: 9,
        overflow: 'hidden',
    },
    imageView: {
        width: scale(150),
        height:scale(150),
        justifyContent:"center",
        alignItems:"center"
    },
    overlay: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: width - scale(180),
        height: scale(150),
        paddingVertical:scale(15),
        marginRight:scale(20),
    },
    title: {
        top:0,
        fontSize: scale(16),
        fontWeight: '700',
        textAlign: 'left',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
    metaRow: {
        width: width - scale(200),
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    avatar: {
        width: scale(32),
        height: scale(32),
        borderRadius:scale(32),
        marginRight:5,
    },
    author: {
        fontSize: scale(10),
        textAlign: 'left',
        textAlignVertical: 'center',
        fontStyle: 'italic',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Helvetica',
    },
    description: {
        fontSize: scale(12),
        color: '#3c3c3c',
        marginBottom: scale(15),
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Helvetica',
    },
    loading:{
        textAlign: 'center',
        height:scale(70),
        marginBottom:scale(35),
    },
    overlay_button:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        alignSelf:"center",
        width: scale(120),
        opacity: 1,
        height: scale(120),
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    play:{
        opacity: 0.6,
        width: 32,
        height: 32
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

const mapStateToProps = (state) => ({
    config: state.config?state.config:null,
    accessToken: state.auth.token?state.auth.token:null,
});
PostList.navigationOptions = {header: null};
export default connect(mapStateToProps)(withNavigation(PostList));
