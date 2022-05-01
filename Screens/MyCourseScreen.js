import React from 'react';
import {View} from 'react-native';
import CourseSingleScreen from "@src/containers/Custom/CourseSingleScreen";

const MyCourseScreen = (props) => {
    const { navigation } = props;
    const courseId = navigation.getParam('courseId');
    return (
        <View style={{flex: 1}}>
            <CourseSingleScreen id={courseId} />
        </View>
    )
}

MyCourseScreen.navigationOptions = { header: null };

export default MyCourseScreen;