import React, {useEffect, useState } from "react";
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
import {connect} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import { scale, verticalScale } from '../Utils/scale';

const PostRow = props => {
    const [ dataPosts, setPostsData ] = useState([]);
    const [ postLoading, setPostLoading ] = useState(true);
    const { navigation, postType, postCategory, postPerPage, postOrder, postOrderBy, showAuthor } = props;

    const fetchPostsData = async () => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/wp/v2/posts?_embed&"+postType+"="+postCategory+"&order="+postOrder+"&orderby="+postOrderBy+"&per_page="+postPerPage,
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => {
                setPostsData((current) => [...current, ...response.data]);
                setPostLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchPostsData().then();
    }, []);
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
    const renderItem = ({ item }) => (
        <TouchableScale
            key={item.id + 'img'}
            onPress={() =>{
                try {
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
            }}>
            <View style={[styles.containerStyle, styles.boxShadow]} key={'post-' + item.id}>
                <View style={styles.imageView}>
                    <ImageCache style={styles.image} source={{uri: item._embedded['wp:featuredmedia'][0].source_url?item._embedded['wp:featuredmedia'][0].source_url:''}} />
                    {renderOverlayImage(item.format)}
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.title.rendered}</Text>
                        {showAuthor && (
                            <Text style={styles.author}>{item._embedded['author'][0].name?item._embedded['author'][0].name:''}</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableScale>
    );

    return (
        <SafeAreaView style={styles.container}>
            {postLoading?(
                <View style={{height:150, justifyContent:"center", alignItems:"center"}}>
                    <ActivityIndicator size="large"/>
                </View>
            ):(
                 <FlatList
                    style={styles.scrollView}
                    data={dataPosts}
                    renderItem={renderItem}
                    extraData={this.props}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor:"white",
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
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
    author: {
        fontSize: scale(9),
        textAlign: 'left',
        fontStyle: 'italic',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Helvetica',
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
