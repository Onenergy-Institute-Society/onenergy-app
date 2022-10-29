import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import MyBlogScreen from "@src/containers/Custom/BlogSingleScreen";
import analytics from '@react-native-firebase/analytics';

const BlogScreen = (props) => {
    const { navigation } = props;
    const blogId = navigation.getParam('blogId');
    let title = navigation.getParam('title').replace(/[‘’“”]+/g, '\'');
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Blog: '+ title,
    });
    if (!props.isFocused)
        return null;
    const loading = (
        <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><ActivityIndicator size="large" /></View>
    );
    return (
        <MyBlogScreen blogId={blogId} searchTerm={title} LoadingComponent={loading} />
    )
}

BlogScreen.navigationOptions = { header: null };

export default BlogScreen;