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
import { scale } from '../Utils/scale';

const PostList = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [ postsData, setPostsData ] = useState([]);
    const postSelector = state => ({postsReducer: state.postsReducer})
    const {postsReducer} = useSelector(postSelector);
    const [ loadMore, setLoadMore] = useState(false);
    const [ page, setPage] = useState(1);
    const { navigation, postCategory, postPerPage, postOrder, postOrderBy, useLoadMore } = props;
    const dispatch = useDispatch();
    const fetchPostsData = async () => {
        try {
            let notify = false;
            const api = getApi(props.config);
            const data = await api.customRequest(
                "wp-json/wp/v2/posts?_embed&categories="+postCategory+"&order="+postOrder+"&orderby="+postOrderBy+"&per_page="+postPerPage+"&page="+page,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            if(data&&data.length>0) {
                let posts = [];
                data.map((item) => {
                    if(new Date(item.date) > new Date(postsReducer.lastView)){
                        notify = true;
                    }
                    if (!postsReducer.posts.length || postsReducer.posts.filter(post => post.id === item.id).length === 0) {
                        posts.push({
                            id: item.id,
                            date: item.date,
                            title: item.title,
                            format: item.format,
                            excerpt: item.excerpt,
                            categories: item.categories,
                            author: item._embedded['author'][0].name,
                            avatar: item._embedded['author'][0].avatar_urls['24'],
                            image: item._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url,
                            notify: notify
                        })
                    }
                })
                if (posts && posts.length > 0) {
                    dispatch({
                        type: 'POSTS_ADD',
                        payload: posts,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        let loadPosts = false;
        if(postsReducer.lastView)
        {
            let postCount = postsReducer.posts.filter((post)=>post.categories.includes(parseInt(postCategory))).length
            if(postCount < parseInt(postPerPage)*page)
            {
                loadPosts = true
            }else {
                setPostsData((current) => [...current, ...postsReducer.posts.filter((post)=>post.categories.includes(parseInt(postCategory))).slice((page-1)*postPerPage, page*postPerPage)]);
                console.log(new Date(postsReducer.lastView) , new Date(optionData.last_post))
                if (new Date(postsReducer.lastView) < new Date(optionData.last_post)) {
                    loadPosts = true;
                }
            }
        }else{
            loadPosts = true;
        }
        if(loadPosts)
            fetchPostsData().then();
    }, [page]);
    useEffect(() => {
        setPostsData(postsReducer.posts.filter((post)=>post.categories.includes(parseInt(postCategory))).slice(0, postPerPage*page));
    },[postsReducer.posts])
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
                return <View style = {styles.overlay_button}><Image style = {styles.play} source = {require('../assets/images/arrow_right-1.png')} /></View>;
            case 'audio':
                return <View style = {styles.overlay_button}><Image style = {styles.play} source = {require('../assets/images/arrow_right-1.png')} /></View>;
            default:
                return null;
        }
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableScale
                key={item.id + 'img'}
                onPress={() => {
                    try {
                        if(item.notify) {
                            dispatch({
                                type: 'POSTS_REMOVE_NOTIFY',
                                payload: item.id,
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
                                        source={{uri: item.image?item.image:''}}/>
                            {renderOverlayImage(item.format)}
                        </View>
                        <View style={styles.overlay}>
                            <Text numberOfLines={2} style={styles.title}>{item.title.rendered}</Text>
                            {item.excerpt.rendered.length > 0 && (
                                <Text numberOfLines={2} style={styles.description}>
                                    {item.excerpt.rendered.replace(regex, '')}
                                </Text>
                            )}
                            <View style={styles.metaRow}>
                                <ImageCache style={styles.avatar} source={{uri: item.avatar?item.avatar:''}}/>
                                <Text style={styles.author}>{item.author?item.author:''}</Text>
                            </View>
                        </View>
                    </View>
                    {item.notify?
                        <View
                            style={{
                                color: '#FFFFFF',
                                position: 'absolute',
                                top: 3,
                                right: 3,
                                minWidth: 15,
                                height: 15,
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: "white",
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#FF0000',
                                textAlign: "center",
                                zIndex: 999
                            }}
                        >
                        </View>
                        :null}
                </View>
            </TouchableScale>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {postsData&&postsData.length?(
                <FlatList
                    style={styles.scrollView}
                    data={postsData}
                    onEndReached={(d) =>{
                        if (d.distanceFromEnd > 0) {
                            handleLoadMore();
                        }
                    }}
                    onEndReachedThreshold={0.7}
                    renderItem={renderItem}
                    extraData={this.props}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                />
            ):(
                <Skeleton />
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
