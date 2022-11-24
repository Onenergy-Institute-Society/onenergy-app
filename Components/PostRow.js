import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Platform,
    View,
    Text,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Image
} from "react-native";
import {connect, useSelector, useDispatch} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import { scale } from '../Utils/scale';

const PostRow = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [ postsData, setPostsData ] = useState([]);
    const { navigation, postType, postCategory, postPerPage, postOrder, postOrderBy, showAuthor, screenProps } = props;
    const {colors, global} = screenProps;
    const postReducer = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();
    const categoryIndex = postReducer.lastView&&postReducer.lastView.length?postReducer.lastView.findIndex(lv => lv.category === postCategory):null;
    const fetchPostsData = async () => {
        try {
            let notify = false;
            const api = getApi(props.config);
            const data = await api.customRequest(
                "wp-json/wp/v2/posts?_embed&"+postType+"="+postCategory+"&order="+postOrder+"&orderby="+postOrderBy+"&per_page=10",
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            let posts =[] ;
            data.map((item)=>{
                if(!postReducer.posts.find(post => post.id === item.id)) {
                    if(categoryIndex&&categoryIndex>=0) {
                        if (new Date(item.date) > new Date(postReducer.lastView[categoryIndex].date)) {
                            notify = true;
                        }
                    }
                    if(item._embedded['wp:featuredmedia'])
                    posts.push({
                        id: item.id,
                        date: item.date,
                        title: item.title,
                        format: item.format,
                        excerpt: item.excerpt,
                        categories: item.categories,
                        author: item._embedded['author'][0].name,
                        avatar: item._embedded['author'][0].avatar_urls['24'],
                        image: item._embedded['wp:featuredmedia'][0].source_url,
                        meta_box: item.meta_box,
                        notify: notify
                    })
                }
            })
            if(posts&&posts.length>0) {
                dispatch({
                    type: 'ONENERGY_POSTS_ADD',
                    payload: posts,
                    category: postCategory
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        let loadPosts = false;
        if(postReducer.postUpdate&&optionData.cache.post>postReducer.postUpdate||!postReducer.postUpdate)
        {
            loadPosts = true;
        }else{
            if(categoryIndex&&categoryIndex>=0)
            {
                let postCount = postReducer.posts.filter((post)=>post.categories.includes(parseInt(postCategory))).length;
                if(!postCount)
                {
                    loadPosts = true
                }else {
                    setPostsData(postReducer.posts.filter((post)=>post.categories.includes(parseInt(postCategory))).slice(0, postPerPage));
                    if (new Date(postReducer.lastView[categoryIndex].date) < new Date(optionData.last_post[postCategory])) {
                        loadPosts = true;
                    }
                }
            }else{
                loadPosts = true;
            }
        }
        if(loadPosts)
            fetchPostsData().then();
    }, []);
    useEffect(() => {
        if(postReducer.posts&&postReducer.posts.length)
        setPostsData(postReducer.posts.filter((post)=>post.categories.includes(parseInt(postCategory))).slice(0, postPerPage));
    },[postReducer.posts])
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
                onPress={() =>{
                    try {
                        navigation.dispatch(
                            NavigationActions.navigate({
                                routeName: "BlogScreen",
                                params: {
                                    blogId: item.id,
                                    title: item.title.rendered
                                },
                                key: 'BlogScreen-' + item.id
                            })
                        );
                    } catch (err) {
                        console.log(`${err}`);
                    }
                }}>
                <View style={[styles.containerStyle, styles.boxShadow, {backgroundColor: colors.bodyBg}]} key={'post-' + item.id}>
                    <View style={styles.imageView}>
                        <ImageCache style={styles.image} source={{uri: item.image?item.image:''}} />
                        {renderOverlayImage(item.format)}
                        <View style={styles.overlay}>
                            <Text style={styles.title}>{item.title.rendered}</Text>
                            {showAuthor && (
                                <Text style={styles.author}>{item.author?item.author:''}</Text>
                            )}
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
            </TouchableScale>
        )
    }

    return (
        <SafeAreaView style={global.container}>
            {postsData&&postsData.length?(
                <FlatList
                    style={styles.scrollView}
                    data={postsData}
                    renderItem={renderItem}
                    extraData={this.props}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            ):(
                <View style={{height:150, justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size="large"/>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: scale(15),
        marginBottom: scale(10),
        marginRight: 13,
        marginLeft: 2,
        borderRadius: 9,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        paddingLeft: scale(15),
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    image: {
        width: 150,
        height: 75,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        overflow: 'hidden',
    },
    imageView: {
        width: 150,
        height: 150,
        borderRadius: 9,
        overflow: 'hidden',
    },
    overlay: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
        position: 'absolute',
        top: 75,
        bottom: 0,
        left:0,
        right:0,
        width: 150,
        marginRight:0,
        padding:10,
    },
    title: {
        top:0,
        fontSize: scale(11),
        textAlign: 'left',
        color: 'black',
        fontWeight: "normal",
        fontFamily: 'MontserratAlternates-SemiBold',
    },
    author: {
        fontSize: scale(9),
        textAlign: 'left',
        fontStyle: 'italic',
        color: 'black',
        fontWeight: "normal",
        fontFamily: 'MontserratAlternates-Regular',
    },
    overlay_button:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        bottom: 75,
        left:0,
        width: 150,
        opacity: 1,
        height: 75,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
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
    config: state.config,
    accessToken: state.auth.token,
});
PostRow.navigationOptions = {header: null};
export default connect(mapStateToProps)(withNavigation(PostRow));
