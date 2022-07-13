import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    ScrollView
} from "react-native";
import {useSelector} from "react-redux";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {NavigationActions, withNavigation} from "react-navigation";
import IconButton from "@src/components/IconButton";
import CoursesScreen from "@src/containers/Custom/CoursesScreen";
import TouchableScale from "../Components/TouchableScale";
import ImageCache from "../Components/ImageCache";
import { scale, verticalScale } from '../Utils/scale';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import EventList from "../Components/EventList";
const ProgramsScreen = props => {
    const { navigation, screenProps } = props;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [helpModal, setHelpModal] = useState({title:'',id:0});
    const { global, colors } = screenProps;
    const toggleHelpModal = () => {
        this.popupProgramDialog.open();
    }
    useEffect(() => {
        let helpIndex = optionData.helps.findIndex(el => el.name === 'program_popup');
        setHelpModal({title:optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'',id:optionData.helps[helpIndex].id});
        let titleIndex = optionData.titles.findIndex(el => el.id === 'programs_title');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            toggleHelpModal: toggleHelpModal,
        });
    },[]);
    return (
        <SafeAreaView style={global.container}>
            {!user || !user.firstCourseCompleted ?
                <View style={styles.row_intro}>
                    <TouchableScale
                        onPress={
                            () => {
                                navigation.dispatch(
                                    NavigationActions.navigate({
                                        routeName: "MyCourseScreen",
                                        params: {
                                            courseId: 29421
                                        }
                                    })
                                )
                            }
                        }>
                        <View style={[styles.view_intro, styles.boxShadow]}>
                            <ImageCache
                                source={{uri: optionData.intro.image}}
                                style={styles.image_intro}
                            />
                        </View>
                    </TouchableScale>
                </View>
                :
                <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                    <View style={{marginVertical:scale(5)}}>
                        <EventList location={'program'} eventsDate={optionData.goals} />
                        <EventList location={'program'} eventsDate={optionData.webinars} />
                    </View>
                    <CoursesScreen {...props} showSearch={false} hideFilters={true} screenTitle="My Courses"
                                   hideNavigationHeader={true} hideTitle={true} headerHeight={0}/>
                </ScrollView>
            }
            <Modalize
                ref={(popupProgramDialog) => { this.popupProgramDialog = popupProgramDialog; }}
                modalHeight = {windowHeight*4/5}
                childrenStyle = {{backgroundColor:"#f2f2f2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>{helpModal.title}</Text>
                        <IconButton
                            pressHandler={() => {this.popupProgramDialog.close();}}
                            icon={require("@src/assets/img/close.png")}
                            style={{ height: scale(16), width: scale(16) }}
                            touchableStyle={{
                                position:"absolute", top:10, right: 10,
                                height: scale(24),
                                width: scale(24),
                                backgroundColor: "#e6e6e8",
                                alignItems: "center",
                                borderRadius: 100,
                                padding: scale(5),
                            }}
                        /></View>
                }
            >
                <View style={{flex: 1, width:windowWidth, marginTop:Platform.OS === 'android'?verticalScale(-100):0}} >
                    <BlockScreen pageId={helpModal.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            </Modalize>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll_view: {
        flex:1,
    },
    eventRow: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: scale(18),
        fontStyle: "italic",
        fontWeight: "normal",
        alignSelf: "baseline",
    },
    block_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    block_half_left: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        marginRight: 20,
        marginVertical:scale(15),
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
    },
    row_intro: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    view_intro: {
        marginTop:scale(15),
        marginHorizontal:scale(15),
        width:windowWidth-scale(30),
        height:windowWidth-scale(30),
        borderRadius: 9,
    },
    image_intro: {
        width:windowWidth-scale(30),
        height:windowWidth-scale(30),
        borderRadius: 9,
    },
    image_half: {
        width: (windowWidth - scale(50)) / 2,
        height: (windowWidth - scale(30)) / 2,
        flex: 1,
        borderRadius: 9,
        overflow: 'hidden',
        resizeMode: "cover",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
ProgramsScreen.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    let headerLeft = null;
    let navRoutes = navigation.dangerouslyGetParent().state.routes;
    if(navRoutes.length >= 2){
        headerLeft =
            <TouchableOpacity
            onPress={() => {
                navigation.goBack()
            }}
            >
                <IconButton
                    icon={require("@src/assets/img/arrow-back.png")}
                    tintColor={"#4942e1"}
                    style={{
                        height: scale(16),
                        marginLeft: scale(16),
                    }}
                />
            </TouchableOpacity>
    }
    return {
        title: navigation.getParam('title'),
        headerLeft: headerLeft,
        headerRight:
            <View style={{flexDirection: "row", justifyContent:"flex-end"}}>
                <TouchableOpacity
                    onPress={() =>  params.toggleHelpModal()}
                >
                    <IconButton
                        icon={require("@src/assets/img/help.png")}
                        tintColor={"#4942e1"}
                        style={{marginRight:25,height: 20}}
                    />
                </TouchableOpacity>
            </View>
    }
}
export default withNavigation(ProgramsScreen);
