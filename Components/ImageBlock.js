import React from "react";
import {Image, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {useSelector} from "react-redux";
import {s, windowWidth} from "../Utils/Scale";
import {NavigationActions, withNavigation} from "react-navigation";
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import ScalableImage from "./ScalableImage";

const ImageBlock = (props) => {
    const {block, navigation} = props;

    const user = useSelector((state) => state.user.userObject);
    const permission = block.data.data.permission ? block.data.data.permission : '';
    let showBlock = false;
    switch (permission) {
        case '':
            showBlock = true;
            break;
        case 'guest':
            showBlock = !user;
            break;
        case 'login':
            showBlock = !!user;
            break;
        case 'user':
            if (user && !(user.membership && user.membership.length)) {
                showBlock = true;
            }
            break;
        case 'member':
            if (user && user.membership && user.membership.length) {
                showBlock = true;
            }
            break;
    }
    const OnPress = async () => {
        if (block.data.data.link) {
            switch (block.data.data.link) {
                case 'app':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "AppPageScreen",
                            params: {
                                pageId: block.data.data.param,
                                title: ''
                            }
                        })
                    )
                    break;
                case 'blog':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "BlogScreen",
                            params: {
                                blogId: block.data.data.param,
                                title: ''
                            }
                        })
                    )
                    break;
                case 'course':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "CourseScreen",
                            params: {
                                courseId: block.data.data.param,
                            }
                        })
                    )
                    break;
                case 'link':
                    await props.attemptDeepLink(false)(null, block.data.data.param);
                    break;
                case 'screen':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: block.data.data.param
                        })
                    )
                    break;
                default:
                    break;
            }
        }
    }
    return (
        block.data.data.image && showBlock ?
            <TouchableWithoutFeedback
                onPress={OnPress}
            >
                <View style={[styles.container, block.data.data.shadow ? styles.boxShadow : null]}>
                    {block.data.data.size === 'fixed' && block.data.data.width && block.data.data.height ?
                        <Image
                            source={{uri: block.data.data.image}}
                            resizeMode={block.data.data.resize}
                            style={[styles.image, {
                                width: parseInt(block.data.data.width),
                                height: parseInt(block.data.data.height),
                            }]}/>
                        :
                        <ScalableImage
                            width={windowWidth - s(30)}
                            source={{uri: block.data.data.image}}
                            resizeMode={block.data.data.resize}
                            style={styles.image}/>
                    }
                </View>
            </TouchableWithoutFeedback>
            : null
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: s(15),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius:s(9),
        backgroundColor: "#fff",
    },
    image: {
        borderRadius:s(9),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
export default withDeeplinkClickHandler(withNavigation(ImageBlock));
