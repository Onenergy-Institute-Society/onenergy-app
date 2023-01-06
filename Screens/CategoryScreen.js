import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {connect, } from "react-redux";
import ImageCache from '../Components/ImageCache';
import PostList from "../Components/PostList";
import {windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import analytics from '@react-native-firebase/analytics';
import Svg, {Path} from "react-native-svg";

const CategoryScreen = props => {
    const { navigation, screenProps } = props;
    const { global } = screenProps;
    const [categoryData, setCategoryData] = useState([]);
    const [categoryBanner, setCategoryBanner] = useState('');
    const category = navigation.getParam('category')
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Category: '+ navigation.getParam("name"),
    });

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
            console.log(categoryData)
            if(categoryData["meta_box"]["image_advanced"]&&categoryData["meta_box"]["image_advanced"].length) {
                setCategoryBanner(categoryData["meta_box"]["image_advanced"][0]["full_url"]);
            }
        } catch (e) {
            console.error(e);
        }
    }, [categoryData]);
    return (
        <SafeAreaView style={global.container}>
            {categoryBanner?
            <ImageCache style={styles.image} source={{uri: categoryBanner}} />
            :null}
            <PostList postCategory={category} postPerPage={'10'} postOrder={'desc'} postOrderBy={'id'} useLoadMore={true} {...props} />
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
CategoryScreen.navigationOptions = ({ navigation, screenProps }) => {
    const {global, colors} = screenProps;
    return {
        headerTitle: navigation.getParam("name") ? navigation.getParam("name"):"Onenergy Institute",
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            >
                <Svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    style={{marginLeft:scale(10)}}
                >
                    <Path d="m15 18-6-6 6-6"
                          fill="none"
                          stroke={screenProps.colors.headerIconColor}
                          strokeWidth="2"
                    />
                </Svg>
            </TouchableOpacity>
    }
}
export default connect(mapStateToProps)(CategoryScreen);