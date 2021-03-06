import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect } from "react-redux";
import IconButton from "@src/components/IconButton";
import ImageCache from '../Components/ImageCache';
import {windowWidth} from "../Utils/Dimensions";
import PostRow from "../Components/PostRow";
import {scale} from "../Utils/scale";

const SolarTermScreen = props => {
    const { navigation, screenProps } = props;
    const { global } = screenProps;
    const [postData, setPostData] = useState([]);
    const [currentTermBanner, setCurrentTermBanner] = useState('');
    const [nextTermBanner, setNextTermBanner] = useState('');
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
                <ImageCache style={styles.image} source={{uri: currentTermBanner?currentTermBanner:''}} />
                <ImageCache style={styles.image} source={{uri: nextTermBanner?nextTermBanner:''}} />
                <View style={styles.view_title}>
                    <Text style={styles.heading}>{postData.metadata.tagHealthName[0]}</Text>
                </View>
                <View style={styles.view}>
                    <PostRow termType={'tag'} postTerm={postData.metadata.tagHealthId[0]} postPerPage={'4'} postOrder={'desc'} postOrderBy={'date'} showAuthor={true}/>
                </View>
                <View style={styles.view_title}>
                    <Text style={styles.heading}>{postData.metadata.tagFoodName[0]}</Text>
                </View>
                <View style={styles.view}>
                    <PostRow termType={'tag'} postTerm={postData.metadata.tagFoodId[0]} postPerPage={'4'} postOrder={'desc'} postOrderBy={'date'} showAuthor={true}/>
                </View>
            </ScrollView>
            )}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    image: {
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 2.5,
        borderRadius: 9,
        overflow: 'hidden',
        margin:15,
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
SolarTermScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: "Solar Terms",
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
        >
            <IconButton
                icon={require("@src/assets/img/arrow-back.png")}
                tintColor={"#4942e1"}
                style={{
                    height: scale(16),
                    marginLeft: scale(16)
                }}
            />
        </TouchableOpacity>
})
export default connect(mapStateToProps)(SolarTermScreen);