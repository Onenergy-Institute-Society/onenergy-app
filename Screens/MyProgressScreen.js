import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import IconButton from "@src/components/IconButton";
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    Platform
} from 'react-native';
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import Timeline from "../Components/Timeline";
import * as Progress from 'react-native-progress';

const MyProgressScreen = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'achievement_progress_empty');
    const emptyText = optionData.titles[emptyTextIndex].title

    const [timelineData, setTimelineData] = useState([]);
    const [timelineLoading, setTimelineLoading] = useState(true);

    const fetchTimelineData = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/timeline?user="+user.id,
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
        let titleIndex = optionData.titles.findIndex(el => el.id === 'progress_title');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
        });
    },[])
    return(
        <SafeAreaView style={styles.container}>
            {timelineLoading?
                <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Loading</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
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
MyProgressScreen.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title'),
    headerTitleStyle: {textAlign:'left'},
    headerLeft:
        <TouchableOpacity
            onPress={() => {navigation.goBack()}}
        >
            <IconButton
                icon={require("@src/assets/img/arrow-back.png")}
                tintColor={"#4942e1"}
                style={{
                    height: scale(16),
                    marginLeft: scale(16)
                }}
            />
        </TouchableOpacity>,
})
export default connect(mapStateToProps)(MyProgressScreen);