import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import BlogScreen from "@src/containers/Custom/BlogSingleScreen";
import * as Progress from 'react-native-progress';
import {scale} from "../Utils/scale";

const MyBlogScreen = (props) => {
    const { navigation } = props;
    const blogId = navigation.getParam('blogId');
    let title = navigation.getParam('title').replace(/[‘’“”]+/g, '\'');
    if (! props.isFocused)
        return null;
    const loading = (
        <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Loading</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
    );
    return (
        <BlogScreen blogId={blogId} searchTerm={title} LoadingComponent={loading} />
    )

}

MyBlogScreen.navigationOptions = { header: null };

export default MyBlogScreen;