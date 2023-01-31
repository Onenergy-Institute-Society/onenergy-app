import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import {ms, mvs, s, vs, windowWidth} from '../Utils/Scale';

const PostList = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [postsData, setPostsData] = useState([]);
    const postSelector = state => ({postsReducer: state.postsReducer})
    const {postsReducer} = useSelector(postSelector);
    const [loadMore, setLoadMore] = useState(false);
    const [page, setPage] = useState(1);
    const {navigation, postCategory, postPerPage, postOrder, postOrderBy, useLoadMore, screenProps} = props;
    const {global} = screenProps;
    const dispatch = useDispatch();
    const categoryIndex = postsReducer.lastView && postsReducer.lastView.length ? postsReducer.lastView.findIndex(lv => parseInt(lv.category) === parseInt(postCategory)) : null;

    const fetchPostsData = async () => {
        try {
            let notify = false;
            const api = getApi(props.config);
            const data = await api.customRequest(
                "wp-json/wp/v2/posts?_embed&categories=" + postCategory + "&order=" + postOrder + "&orderby=" + postOrderBy + "&per_page=" + postPerPage + "&page=" + page,
                "get",
                {},
                null,
                {},
                false
            ).then(response => response.data);
            let posts = [];
            /*            dispatch({
                            type: 'ONENERGY_BLOG_UPDATE',
                            payload: data,
                       });*/
            data.map((item) => {
                if (!postsReducer.posts.length || !postsReducer.posts.find(post => parseInt(post.id) === parseInt(item.id))) {
                    if (categoryIndex && categoryIndex >= 0) {
                        if (new Date(item.date) > new Date(postsReducer.lastView[categoryIndex].date)) {
                            notify = true;
                        }
                    }
                    if (item._embedded['wp:featuredmedia'])
                        posts.push({
                            id: item.id,
                            date: item.date,
                            title: item.title,
                            format: item.format,
                            excerpt: item.excerpt,
                            categories: item.categories,
                            author: item._embedded['author'][0].name,
                            avatar: item._embedded['author'][0].avatar_urls['24'],
                            image: item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : null,
                            meta_box: item.meta_box,
                            notify: notify
                        })
                }
            })
            if (posts && posts.length > 0) {
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
        if (categoryIndex && categoryIndex >= 0) {
            let postCount = postsReducer.posts.filter((post) => post.categories.includes(parseInt(postCategory))).length
            if (postCount < parseInt(postPerPage) * page) {
                loadPosts = true
            } else {
                setPostsData((current) => [...current, ...postsReducer.posts.filter((post) => post.categories.includes(parseInt(postCategory))).slice((page - 1) * postPerPage, page * postPerPage)]);
                if (new Date(postsReducer.lastView[categoryIndex].date) < new Date(optionData.last_post[postCategory])) {
                    loadPosts = true;
                }
            }
        } else {
            loadPosts = true;
        }
        if (loadPosts)
            fetchPostsData().then();
    }, [page]);
    useEffect(() => {
        setPostsData(postsReducer.posts.filter((post) => post.categories.includes(parseInt(postCategory))).slice(0, postPerPage * page));
    }, [postsReducer.posts])
    const handleLoadMore = () => {
        if (useLoadMore) {
            setPage(page + 1);
            setLoadMore(true);
            setTimeout(function () {
                setLoadMore(false);
            }, 2000);
        }
    };
    const regex = /(<([^>]+)>)/ig;

    const renderOverlayImage = (categories) => {
        if (categories.includes(103)) //Video
            return <View style={styles.overlay_button}><Image style={styles.play}
                                                              source={require('../assets/images/arrow_right-1.png')}/></View>;
        if (categories.includes(104)) //Audio
            return <View style={styles.overlay_button}><Image style={styles.play}
                                                              source={require('../assets/images/arrow_right-1.png')}/></View>;
        return null;
    }

    const renderItem = ({item}) => {
        return (
            <TouchableScale
                key={item.id + 'img'}
                onPress={() => {
                    try {
                        if (item.notify) {
                            dispatch({
                                type: 'ONENERGY_POSTS_REMOVE_NOTIFY',
                                payload: item.id,
                            });
                        }
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
                }
                }>
                <View style={[styles.containerStyle, styles.boxShadow]} key={'post-' + item.id}>
                    <View style={styles.rowStyle}>
                        <View style={styles.imageView}>
                            <ImageCache style={styles.image}
                                        source={{uri: item.image ? item.image : ''}}/>
                            {renderOverlayImage(item.categories)}
                            <View style={styles.metaRow}>
                                <ImageCache style={styles.avatar} source={{uri: item.avatar ? item.avatar : ''}}/>
                                <Text style={styles.author}>{item.author ? item.author : ''}</Text>
                            </View>
                        </View>
                        <View style={styles.overlay}>
                            <Text numberOfLines={2} style={styles.title}>{item.title.rendered}</Text>
                            {item.excerpt.rendered.length > 0 && (
                                <Text numberOfLines={3} style={styles.description}>
                                    {item.excerpt.rendered.replace(regex, '')}
                                </Text>
                            )}
                        </View>
                    </View>
                    {item.notify ?
                        <View
                            style={{
                                color: '#FFFFFF',
                                position: 'absolute',
                                top: s(3),
                                right: s(3),
                                minWidth: s(15),
                                height: s(15),
                                borderRadius: s(15),
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
                        : null}
                </View>
            </TouchableScale>
        );
    }
    return (
        <SafeAreaView style={global.container}>
            {postsData && postsData.length ? (
                <FlatList
                    contentContainerStyle={{paddingBottom: mvs(20)}}
                    style={styles.scrollView}
                    data={postsData}
                    onEndReached={(d) => {
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
            ) : (
                <ActivityIndicator style={styles.loading} size="large"/>
            )}
            {loadMore ? (
                <ActivityIndicator style={styles.loading} size="large"/>
            ) : null}
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
        backgroundColor: "#FFFFFF",
        borderRadius:s(9),
        marginHorizontal: s(15),
        marginTop: mvs(25),
        width: windowWidth - s(30),
        height: vs(120),
    },
    rowStyle: {
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    scrollView: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        paddingBottom: ms(60),
    },
    image: {
        marginTop: mvs(15),
        width: s(120),
        height: vs(60),
        borderRadius:s(9),
        overflow: 'hidden',
    },
    imageView: {
        width: s(150),
        height: vs(120),
        justifyContent: "space-between",
        alignItems: "center"
    },
    overlay: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: windowWidth - s(180),
        height: s(120),
        paddingVertical: mvs(15),
        paddingRight: ms(15),
        marginRight: ms(20),
    },
    title: {
        top: 0,
        fontSize: s(14),
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#4A4D34',
        fontFamily: 'Montserrat-SemiBold',
    },
    metaRow: {
        marginLeft: s(30),
        marginBottom: mvs(15),
        width: s(150),
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    avatar: {
        width: s(24),
        height: s(24),
        borderRadius: s(24),
        marginRight: 5,
    },
    author: {
        fontSize: s(10),
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'black',
        fontWeight: "normal",
        fontFamily: 'Montserrat-Regular',
    },
    description: {
        fontSize: s(12),
        color: '#3c3c3c',
        marginTop: mvs(5),
        marginBottom: mvs(15),
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Regular',
    },
    loading: {
        textAlign: 'center',
        height: s(70),
        marginBottom: mvs(35),
    },
    overlay_button: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        alignSelf: "center",
        width: s(120),
        opacity: 1,
        marginTop: mvs(15),
        height: s(60),
        borderRadius:s(9),
        alignItems: 'center',
        justifyContent: 'center',
    },
    play: {
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
    config: state.config ? state.config : null,
    accessToken: state.auth.token ? state.auth.token : null,
});
PostList.navigationOptions = {header: null};
export default connect(mapStateToProps)(withNavigation(PostList));
