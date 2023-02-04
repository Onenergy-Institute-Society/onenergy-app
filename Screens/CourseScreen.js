import React, {useEffect} from 'react';
import {View} from 'react-native';
import CourseSingleScreen from "@src/containers/Custom/CourseSingleScreen";
import * as Analytics from "../Utils/Analytics";

const CourseScreen = (props) => {
    const {navigation} = props;
    const courseId = navigation.getParam('courseId');

    useEffect(()=>{
        Analytics.segmentClient.screen('Course', {id: courseId}).then();
    },[]);

    return (
        <View style={{flex: 1}}>
            <CourseSingleScreen id={courseId}/>
        </View>
    )
}

CourseScreen.navigationOptions = {header: null};

export default CourseScreen;