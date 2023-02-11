import React, {useEffect} from 'react';
import {View} from 'react-native';
import CourseSingleScreen from "@src/containers/Custom/CourseSingleScreen";

const CourseScreen = (props) => {
    const {navigation} = props;
    const courseId = navigation.getParam('courseId');

    return (
        <View style={{flex: 1}}>
            <CourseSingleScreen id={courseId}/>
        </View>
    )
}

CourseScreen.navigationOptions = {header: null};

export default CourseScreen;