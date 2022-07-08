import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {connect, } from "react-redux";
import IconButton from "@src/components/IconButton";
import ImageCache from '../Components/ImageCache';
import PostList from "../Components/PostList";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";

const CategoryScreen = props => {
    const { navigation, screenProps } = props;
    const { global } = screenProps;
    const [categoryData, setCategoryData] = useState([]);
    const [categoryBanner, setCategoryBanner] = useState('');
    const category = navigation.getParam('category')
    const fetchCategoryData = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/wp/v2/categories/"+category,
                "get",
                {},
                null,
                {},
                false
            ).then(response => setCategoryData(response.data));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(()=>{
        fetchCategoryData().then();
    }, []);
    useEffect(()=>{
        try {
            setCategoryBanner(categoryData["meta_box"]["image_advanced"][0]["full_url"]);
        } catch (e) {
            console.error(e);
        }
    }, [categoryData]);
    return (
        <SafeAreaView style={global.container}>
            {categoryBanner.length > 0 && (
            <ImageCache style={styles.image} source={{uri: categoryBanner?categoryBanner:''}} />
            )}
            <PostList postCategory={category} postPerPage={'10'} postOrder={'desc'} postOrderBy={'id'} useLoadMore={true} />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    image: {
        width: windowWidth - scale(30),
        height: (windowWidth - scale(30)) / 2.5,
        borderRadius: 9,
        overflow: 'hidden',
        marginHorizontal:15,
        marginTop:15,
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
CategoryScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("name") ? navigation.getParam("name"):"Onenergy Institute",
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
export default connect(mapStateToProps)(CategoryScreen);