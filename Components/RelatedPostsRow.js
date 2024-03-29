import React, {useEffect, useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, View,} from "react-native";
import {useSelector} from "react-redux";
import {NavigationActions, withNavigation} from "react-navigation";
import ImageCache from './ImageCache';
import TouchableScale from './TouchableScale';
import {ms, s, windowWidth} from '../Utils/Scale';

const RelatedPostsRow = props => {
    const {posts, navigation} = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const postsReducer = useSelector((state) => state.postsReducer.posts.filter((post) => posts.includes(post.id)));
    const renderOverlayImage = (format) => {
        switch (format) {
            case 'video':
                return <View style={styles.overlay_button}><Image style={styles.play}
                                                                  source={require('../assets/images/arrow_right-1.png')}/></View>;
            case 'audio':
                return <View style={styles.overlay_button}><Image style={styles.play}
                                                                  source={require('../assets/images/arrow_right-1.png')}/></View>;
            default:
                return null;
        }
    }
    const renderItem = ({item}) => {
        return (
            <TouchableScale
                key={item.id + 'img'}
                onPress={() => {
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
                <View style={[styles.containerStyle, styles.boxShadow]} key={'post-' + item.id}>
                    <View style={styles.imageView}>
                        <ImageCache style={styles.image} source={{uri: item.image ? item.image : ''}}/>
                        {renderOverlayImage(item.format)}
                        <View style={styles.overlay}>
                            <Text style={styles.title}>{item.title.rendered}</Text>
                            <Text style={styles.author}>{item.author ? item.author : ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableScale>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {postsReducer.posts && postsReducer.posts.length ?
                <View style={styles.ScrollView}>
                    <View style={styles.view_blog_title}>
                        <Text style={styles.heading}>{optionData.titles.find(el => el.id === 'posts_title_related_posts').title}</Text>
                    </View>
                    <FlatList
                        data={postsReducer.posts}
                        renderItem={renderItem}
                        extraData={this.props}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
                </View>
                : null
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "white",
        marginVertical: 10,
        marginRight: 13,
        marginLeft: 2,
        borderRadius:s(9),
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: ms(15),
    },
    scrollView: {
        flex: 1,
        width: windowWidth - s(30),
        alignItems: "flex-start",
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 75,
        borderTopLeftRadius: s(9),
        borderTopRightRadius: s(9),
        overflow: 'hidden',
    },
    imageView: {
        width: 150,
        height: 150,
        borderRadius:s(9),
        overflow: 'hidden',
    },
    overlay: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
        position: 'absolute',
        top: 75,
        bottom: 0,
        left: 0,
        right: 0,
        width: 150,
        marginRight: 0,
        padding: ms(10),
    },
    title: {
        top: 0,
        fontSize: s(11),
        textAlign: 'left',
        color: 'black',
        fontFamily: 'MontserratAlternates-SemiBold',
    },
    author: {
        fontSize: s(9),
        textAlign: 'left',
        fontStyle: 'italic',
        color: 'black',
        fontFamily: 'MontserratAlternates-Regular',
    },
    overlay_button: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        top: 0,
        bottom: 75,
        left: 0,
        width: 150,
        opacity: 1,
        height: 75,
        borderTopLeftRadius: s(9),
        borderTopRightRadius: s(9),
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
    view_blog_title: {
        flexDirection: 'row',
        left: 0,
        right: 0,
        width: windowWidth - s(30),
        justifyContent: "flex-start",
        marginVertical: 10,
    },
    heading: {
        fontSize: s(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
});

RelatedPostsRow.navigationOptions = {header: null};
export default withNavigation(RelatedPostsRow);
