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
import {connect, useSelector} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import { scale, verticalScale } from '../Utils/scale';
import {windowWidth} from "../Utils/Dimensions";

const PracticeTipsRow = props => {
    const user = useSelector((state) => state.user.userObject);
    const [ dataPosts, setPostsData ] = useState([]);
    const [ postLoading, setPostLoading ] = useState(true);
    const [ showTitle, setShowTitle ] = useState(false);
    const { navigation } = props;

    const fetchPostsData = async () => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/wp/v2/posts?_embed&categories=258",
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
    const renderItem = ({ item }) => {
        let show = true;
        if(item.meta_box.course)
        {
            item.meta_box.course.map((item, itemIndex) =>
            {
                show = user.completed_courses.find(course => course.id === parseInt(item));
                if(show){
                    setShowTitle(show);
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
                                    routeName: "MyBlogScreen",
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
                            <ImageCache style={styles.image} source={{uri: item._embedded['wp:featuredmedia'][0].source_url?item._embedded['wp:featuredmedia'][0].source_url:''}} />
                        </View>
                    </View>
                </TouchableScale>
                :null
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {postLoading?(
                <View style={{height:150, justifyContent:"center", alignItems:"flex-start"}}>
                    <ActivityIndicator size="large"/>
                </View>
            ):(
                dataPosts?
                    <View style={styles.ScrollView}>
                        {showTitle?
                            <View style={styles.view_blog_title}>
                                <Text style={styles.heading}>Practice Tips</Text>
                            </View>
                            :null
                        }
                        <FlatList
                            data={dataPosts}
                            renderItem={renderItem}
                            extraData={this.props}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                        />
                    </View>
                :null
            )}
        </SafeAreaView>
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
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - scale(30),
        justifyContent: "flex-start",
        marginVertical: 10,
    },
    heading: {
        fontSize: scale(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
});

const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
PracticeTipsRow.navigationOptions = {header: null};
export default connect(mapStateToProps)(withNavigation(PracticeTipsRow));
