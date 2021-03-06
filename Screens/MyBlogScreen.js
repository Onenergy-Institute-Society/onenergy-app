import React from 'react';
import {View, Text, ActivityIndicator, Platform} from 'react-native';
import BlogScreen from "@src/containers/Custom/BlogSingleScreen";

const MyBlogScreen = (props) => {
    const { navigation } = props;
    const blogId = navigation.getParam('blogId');
    let title = navigation.getParam('title').replace(/[‘’“”]+/g, '\'');
    if (! props.isFocused)
        return null;
    const loading = (
        <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><ActivityIndicator size="large" /></View>
    );
    return (
        <BlogScreen blogId={blogId} searchTerm={title} LoadingComponent={loading} />
    )
}

MyBlogScreen.navigationOptions = { header: null };

export default MyBlogScreen;