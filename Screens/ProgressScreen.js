import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import Timeline from "../Components/Timeline";
import analytics from '@react-native-firebase/analytics';
import Svg, {Path} from "react-native-svg";

const ProgressScreen = (props) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.titles.find(el => el.id === 'achievement_progress_empty').title

    const [timelineData, setTimelineData] = useState([]);
    const [timelineLoading, setTimelineLoading] = useState(true);
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Progress Screen',
    });
    const fetchTimelineData = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/timeline",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                setTimelineData(response.data);
                setTimelineLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(()=>{
        fetchTimelineData().then();
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'progress_title').title,
        });
    },[])
    return(
        <SafeAreaView style={styles.container}>
            {timelineLoading?
                <ActivityIndicator size="large"/>
                :
                timelineData.length?
                    <Timeline
                        columnFormat={"single-column-left"}
                        circleSize={20}
                        circleColor='rgb(45,156,219)'
                        lineColor='rgb(45,156,219)'
                        timeContainerStyle={{minWidth:52, marginTop: -5}}
                        timeStyle={{width:100,textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                        descriptionStyle={{color:'gray'}}
                        options={{
                            style:{paddingTop:5},
                        }}
                        isUsingFlatlist={true}
                        style={styles.list}
                        data={timelineData}
                    />
                    :
                    <View style={{
                        flex: 1,
                        width: windowWidth
                    }}>
                        <View style={[styles.boxShadow, {padding:15,justifyContent: "center",alignSelf:"center",borderRadius: 9,backgroundColor:"#fff", margin:15}]}>
                            <View style={{marginHorizontal: 0, justifyContent: "center", alignItems: "center"}}>
                                <Text style={[styles.body, {
                                    marginHorizontal: 0,
                                    fontSize:scale(14),
                                    lineHeight:scale(14*1.47),
                                    textAlign:"left"
                                }]}>{emptyText}</Text>
                            </View>
                        </View>
                    </View>
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:15,
    },
    list: {
        width:windowWidth,
        flex: 1,
        marginTop:20,
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
ProgressScreen.navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.getParam('title'),
    headerTitleStyle: {textAlign:'left'},
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
        </TouchableOpacity>,
})
export default connect(mapStateToProps)(ProgressScreen);