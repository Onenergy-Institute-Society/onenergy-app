import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from "react-native";
import {useSelector} from "react-redux";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {withNavigation} from "react-navigation";
import IconButton from "@src/components/IconButton";
import CoursesScreen from "@src/containers/Custom/CoursesScreen";
import TouchableScale from "../Components/TouchableScale";
import { scale } from '../Utils/scale';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import EventList from "../Components/EventList";
import NotificationTabBarIcon from "../Components/NotificationTabBarIcon";
const ProgramsContent = props => {
    const { navigation, screenProps } = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [helpModal, setHelpModal] = useState({title:'',id:0});
    const { global } = screenProps;
    const toggleHelpModal = () => {
        this.popupProgramDialog.open();
    }
    const onFocusHandler=() =>{
        try
        {
            navigation.closeDrawer();

        }catch (e) {

        }
    }
    useEffect(() => {
        setHelpModal(optionData.helps.find(el => el.name === 'program_popup'));
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'programs_title').title,
            toggleHelpModal: toggleHelpModal,
        });
        navigation.addListener('willFocus', onFocusHandler)
        return () => {
            navigation.removeListener('willFocus', onFocusHandler)
        }
    },[]);
    return (
        <SafeAreaView style={global.container}>
            <ScrollView style={styles.scroll_view} showsVerticalScrollIndicator={false}>
                <View style={{marginVertical: scale(5)}}>
                    <EventList location={'program'} eventsDate={optionData.goals}/>
                </View>
                <View style={styles.heading_title}>
                    <Text style={styles.heading}>Preparatory Courses</Text>
                </View>
                <CoursesScreen {...props} showSearch={false} hideFilters={true} screenTitle="My Courses"
                               hideNavigationHeader={true} hideTitle={true} headerHeight={0}/>
            </ScrollView>
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
                <View style={{flex: 1, width:windowWidth}} >
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
    heading_title: {
        flexDirection: 'row',
        left: scale(15),
        right: 0,
        width: windowWidth - scale(30),
        justifyContent: "space-between",
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
ProgramsContent.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    let headerLeft;
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
    }else{
        headerLeft=
            <TouchableScale
                onPress={() => {navigation.openDrawer()
                }}
            >
                <IconButton
                    icon={require("@src/assets/img/menu.png")}
                    tintColor={"#4942e1"}
                    style={{
                        height: 20,
                        marginLeft: 20,
                    }}
                />
                <NotificationTabBarIcon notificationID={'left_menu'}  top={0} right={0} size={scale(10)} showNumber={false} />
            </TouchableScale>
    }
    return {
        title: navigation.getParam('title'),
        headerLeft: headerLeft,
        headerRight:
            <View style={{flexDirection: "row", justifyContent:"flex-end"}}>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("MilestonesScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/certificate.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 5,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'milestone'}  top={0} right={0} size={scale(10)} showNumber={false} />
                </TouchableScale>
                <TouchableScale
                    onPress={() => {
                        navigation.navigate("QuestsScreen")
                    }}
                >
                    <IconButton
                        icon={require("@src/assets/img/achievement-action-icon.png")}
                        tintColor={"#4942e1"}
                        style={{
                            height: 20,
                            marginRight: 5,
                        }}
                    />
                    <NotificationTabBarIcon notificationID={'quest'}  top={0} right={0} size={scale(10)} showNumber={false} />
                </TouchableScale>
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
export default withNavigation(ProgramsContent);
