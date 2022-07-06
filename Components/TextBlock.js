import React from "react";
import {
    StyleSheet, Image, Text, View, TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";
import {scale, verticalScale} from "../Utils/scale";
import {withNavigation, NavigationActions} from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import AuthWrapper from "@src/components/AuthWrapper"; //This line is a workaround while we figure out the cause of the error
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import {windowWidth} from "../Utils/Dimensions";
import HTML from "react-native-render-html";

const TextBlock =(props) => {
    const {block, navigation} = props;
    const user = useSelector((state) => state.user.userObject);
    const permission = block.data.data.permission?block.data.data.permission:'';
    let showBlock = false;
    switch(permission){
        case '':
            showBlock = true;
            break;
        case 'guest':
            showBlock=!user;
            break;
        case 'login':
            showBlock=!!user;
            break;
        case 'user':
            if(user&&!(user.membership&&user.membership.length)){
                showBlock=true;
            }
            break;
        case 'member':
            if(user&&user.membership&&user.membership.length){
                showBlock=true;
            }
            break;
    }
    const ImageComponent = () => {
        return (
            <View style={{flex:block.data.data.position==="left"||block.data.data.position==="right"?0.5:1, justifyContent: "center", alignItems: "center"}}>
                <Image source={{uri:block.data.data.image}} resizeMode={block.data.data.resize} style={[styles.image,{
                    width:block.data.data.width?parseInt(block.data.data.width):150,
                    height:block.data.data.height?parseInt(block.data.data.height):150,
                    alignSelf: "center",
                }]} />
            </View>
        )
    }
    const htmlStyle = {
        a: {
            fontSize: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize):scale(14),
        },
/*        ul:{
            width:"100%",
        },*/
        li: {
            lineHeight: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize*1.47):scale(14*1.47),
            fontSize: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize):scale(14),
            color: block.data.data.bodyColor?block.data.data.bodyColor:"#000",
            textAlign: block.data.data.bodyAlign?block.data.data.bodyAlign:"left",
        },
        p: {
            lineHeight: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize*1.47):scale(14*1.47),
            fontSize: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize):scale(14),
            color: block.data.data.bodyColor?block.data.data.bodyColor:"#000",
            textAlign: block.data.data.bodyAlign?block.data.data.bodyAlign:"left",
        },
        rawtext: {
            lineHeight: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize*1.47):scale(14*1.47),
            fontSize: block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize):scale(14),
            color: block.data.data.bodyColor?block.data.data.bodyColor:"#000",
            textAlign: block.data.data.bodyAlign?block.data.data.bodyAlign:"left",
        }
    };
    const TextComponent = () => {
        return (
            <View style={{flex:block.data.data.position==="left"||block.data.data.position==="right"?0.5:1, marginHorizontal: 0, justifyContent: "center", alignItems: block.data.data.titleAlign==='center'?"center":(block.data.data.titleAlign==='left'?"flex-start":"flex-end")}}>
            {block.data.data.title?
                <Text style={[styles.title, {
                    flex:1,
                    marginHorizontal: 0,
                    fontSize:block.data.data.titleFontSize?scale(block.data.data.titleFontSize):scale(22),
                    color:block.data.data.titleColor?block.data.data.titleColor:"#000",
                    textAlign:block.data.data.titleAlign?block.data.data.titleAlign:"left",
                }]}>{block.data.data.title}</Text>
                :null}
            {block.data.data.body?
                <HTML html={block.data.data.body}
                      tagsStyles={htmlStyle}
                      ignoredStyles={['height', 'width']}
                      style={{flex:1}}
                      onLinkPress={async (evt, href) => {
                          await props.attemptDeepLink(false)(null, href);
                      }}
                />
/*                <Text style={[styles.body, {
                    flex:1,
                    marginHorizontal: 0,
                    fontSize:block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize):scale(14),
                    lineHeight:block.data.data.bodyFontSize?scale(block.data.data.bodyFontSize*1.47):scale(14*1.47),
                    color:block.data.data.bodyColor?block.data.data.bodyColor:"#000",
                    textAlign:block.data.data.bodyAlign?block.data.data.bodyAlign:"left"
                }]}>{block.data.data.body}</Text>*/
                :null}
            </View>
        )
    }
    const OnPress = async () => {
        if(block.data.data.link)
        {
            switch(block.data.data.link)
            {
                case 'app':
                    navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "MyAppPageScreen",
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
                            routeName: "MyBlogScreen",
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
                            routeName: "MyCourseScreen",
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
        showBlock?
            <TouchableWithoutFeedback
                onPress={OnPress}
                >
                <View style={[block.data.data.shadow?styles.boxShadow:null, {margin:15, flex:1, width: windowWidth-scale(30)}]}>
                    <LinearGradient
                        style={[styles.container,{
                            flexDirection:block.data.data.position==="left"||block.data.data.position==="right"?"row":"column"
                        }]}
                        colors={[block.data.data.backgroundColor1?block.data.data.backgroundColor1:'#ffffff', block.data.data.backgroundColor2?block.data.data.backgroundColor2:'#ffffff']}>
                        {block.data.data.position==='left'||block.data.data.position==='top'?
                            block.data.data.image&&block.data.data.width&&block.data.data.height?
                                <ImageComponent />
                                :null
                        :null}
                        <TextComponent />
                        {block.data.data.position==='right'||block.data.data.position==='bottom'?
                            block.data.data.image&&block.data.data.width&&block.data.data.height?
                                <ImageComponent />
                                :null
                            :null}
                    </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
        :null
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width: windowWidth-scale(30),
        padding:15,
        justifyContent: "center",
        alignSelf:"center",
        borderRadius: 9,
    },
    title:{
        marginBottom:verticalScale(20),
        fontWeight: "500",
    },
    image:{
        borderRadius: 9,
    },
    body:{
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
export default withDeeplinkClickHandler(withNavigation(TextBlock));
