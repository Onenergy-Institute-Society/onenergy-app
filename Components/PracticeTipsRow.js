import React, {useEffect, useState } from "react";
import {
    StyleSheet,
    Platform,
    View,
    Text,
    FlatList,
} from "react-native";
import {connect, useSelector, useDispatch} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import { scale } from '../Utils/scale';
import {windowWidth} from "../Utils/Dimensions";

const PracticeTipsRow = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const user = useSelector((state) => state.user.userObject);
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const postReducer = useSelector((state) => state.postReducer);
    const [ dataPosts, setPostsData ] = useState([]);
    const [ showTitle, setShowTitle ] = useState(false);
    const { navigation } = props;
    const dispatch = useDispatch();
    const categoryIndex = postReducer.lastView&&postReducer.lastView.length?postReducer.lastView.findIndex(lv => lv.category === 258):null;
    const fetchPostsData = async () => {
        try {
            let notify = false;
            const api = getApi(props.config);
            const data = await api.customRequest(
                "wp-json/wp/v2/posts?_embed&categories=258",
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => response.data);
            let posts = [];
            data.map((item) => {
                if (!postReducer.posts.length || postReducer.posts.filter(post => post.id === item.id).length === 0) {
                    if(categoryIndex&&categoryIndex>=0){
                        if(new Date(item.date) > new Date(postReducer.lastView[categoryIndex].date)){
                            notify = true;
                        }
                    }
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
            if (posts && posts.length > 0) {
                dispatch({
                    type: 'ONENERGY_POSTS_ADD',
                    payload: posts,
                    category: 258
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        let loadPosts = false;
        if (categoryIndex&&categoryIndex>=0) {
            let postCount = postReducer.posts.filter((post) => post.categories.includes(258)).length
            if (!postCount) {
                loadPosts = true
            } else {
                setPostsData(postReducer.posts.filter((post) => post.categories.includes(258)));
                if (new Date(postReducer.lastView[categoryIndex].date) < new Date(optionData.last_post[258])) {
                    loadPosts = true;
                }
            }
        } else {
            loadPosts = true;
        }
        if (loadPosts){
            fetchPostsData().then();
        }
    }, []);
    const renderItem = ({ item }) => {
        let show = false;
        if(item.meta_box.course)
        {
            item.meta_box.course.map((course_item, itemIndex) =>
            {
                if(progressReducer.completedCourses&&progressReducer.completedCourses.find(course => course.id === parseInt(course_item))){
                    setShowTitle(true);
                    show = true;
                }
            })
        }
        return (
            show?
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
                                    }
                                })
                            );
                        } catch (err) {
                            console.log(`${err}`);
                        }
                    }}>
                    <View style={[styles.containerStyle, styles.boxShadow]} key={'post-' + item.id}>
                        <View style={styles.imageView}>
                            <ImageCache style={styles.image} source={{uri: item.image?item.image:''}} />
                        </View>
                    </View>
                </TouchableScale>
                :null
        );
    }

    return (
        dataPosts&&dataPosts.length?
            <View style={styles.ScrollView}>
                {showTitle?
                    <View style={styles.view_blog_title}>
                        <Text style={styles.heading}>Practice Tips</Text>
                    </View>
                    :null
                }
                <FlatList
                    style = {styles.postsTips}
                    data={dataPosts}
                    renderItem={renderItem}
                    extraData={this.props}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            </View>
        :null
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor:"white",
        marginVertical: 10,
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
        flex:1,
        width:windowWidth-scale(30),
        alignItems:"flex-start",
        justifyContent:"center",
    },
    image: {
        width: 150,
        height: 150,
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
        fontFamily: 'Montserrat Alternates',
    },
    author: {
        fontSize: scale(9),
        textAlign: 'left',
        fontStyle: 'italic',
        color: 'black',
        fontFamily: 'Montserrat Alternates',
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
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - scale(30),
        justifyContent: "flex-start",
        marginVertical: 10,
        marginLeft:scale(15),
    },
    heading: {
        fontSize: scale(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
    postsTips:{
        paddingLeft:scale(15),
    }
});

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
PracticeTipsRow.navigationOptions = {header: null};
export default connect(mapStateToProps)(withNavigation(PracticeTipsRow));
