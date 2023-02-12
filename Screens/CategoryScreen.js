import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {connect,} from "react-redux";
import ImageCache from '../Components/ImageCache';
import PostList from "../Components/PostList";
import {mvs, s, windowWidth} from "../Utils/Scale";
import {SvgIconBack} from "../Utils/svg";

const CategoryScreen = props => {
    const {navigation, screenProps} = props;
    const {global} = screenProps;
    const [categoryData, setCategoryData] = useState([]);
    const [categoryBanner, setCategoryBanner] = useState('');
    const category = navigation.getParam('category')

    const fetchCategoryData = async () => {
        try {
            const {customRequest} = getApi(props.config);
            await customRequest(
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
            <ImageCache style={styles.image} source={{uri: categoryBanner}}/>
            :null}
            <PostList postCategory={category} postPerPage={'10'} postOrder={'desc'} postOrderBy={'id'} useLoadMore={true} {...props}/>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    image: {
        width: windowWidth - s(30),
        height: (windowWidth - s(30)) / 2.5,
        borderRadius:s(9),
        overflow: 'hidden',
        marginHorizontal:15,
        marginTop:mvs(15),
   },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
CategoryScreen.navigationOptions = ({navigation, screenProps}) => {
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
                <SvgIconBack color = {colors.headerIconColor}/>
            </TouchableOpacity>
   }
}
export default connect(mapStateToProps)(CategoryScreen);