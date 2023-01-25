import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import ImageCache from '../Components/ImageCache';
import PostRow from "../Components/PostRow";
import {s, windowWidth} from "../Utils/Scale";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack} from "../Utils/svg";

const SolarTermScreen = props => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const [postData, setPostData] = useState([]);
    const [currentTermBanner, setCurrentTermBanner] = useState('');
    const [nextTermBanner, setNextTermBanner] = useState('');
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Solar Term Screen',
   });
    const fetchPostData = async () => {
        try {
            const apiPage = getApi(props.config);
            await apiPage.customRequest(
                "wp-json/wp/v2/posts/29378?_embed",
                "get",
                {},
                null,
                {},
                false
            ).then(response => setPostData(response.data));
       } catch (e) {
            console.error(e);
       }
   }
    useEffect(()=>{
        fetchPostData().then();
   }, []);
    useEffect(()=>{
        try {
            setCurrentTermBanner(postData.metadata.currentTermBanner[0]);
            setNextTermBanner(postData.metadata.nextTermBanner[0]);
       } catch (e) {
            console.error(e);
       }
   }, [postData]);
    return (
        <SafeAreaView style={global.container}>
            {currentTermBanner.length>0 && (
            <ScrollView>
                <ImageCache style={styles.image} source={{uri: currentTermBanner?currentTermBanner:''}}/>
                <ImageCache style={styles.image} source={{uri: nextTermBanner?nextTermBanner:''}}/>
                <View style={styles.view_title}>
                    <Text style={styles.heading}>{postData.metadata.tagHealthName[0]}</Text>
                </View>
                <View style={styles.view}>
                    <PostRow termType={'tag'} postTerm={postData.metadata.tagHealthId[0]} postPerPage={'4'} postOrder={'desc'} postOrderBy={'date'} showAuthor={true} {...props}/>
                </View>
                <View style={styles.view_title}>
                    <Text style={styles.heading}>{postData.metadata.tagFoodName[0]}</Text>
                </View>
                <View style={styles.view}>
                    <PostRow termType={'tag'} postTerm={postData.metadata.tagFoodId[0]} postPerPage={'4'} postOrder={'desc'} postOrderBy={'date'} showAuthor={true} {...props}/>
                </View>
            </ScrollView>
            )}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    image: {
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) / 2.5,
        borderRadius:s(9),
        overflow: 'hidden',
        margin:15,
   },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
SolarTermScreen.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    return {
        headerTitle: "Solar Terms",
        headerStyle: {
            backgroundColor: colors.headerBg,
       },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            >
                <SvgIconBack color = {colors.headerIconColor}/>
            </TouchableOpacity>
       }
}
export default connect(mapStateToProps)(SolarTermScreen);