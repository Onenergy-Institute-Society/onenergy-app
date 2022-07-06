import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Image, ScrollView
} from 'react-native';
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";

const QuestsMonthly = (props) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'achievement_quest_empty');
    const emptyText = optionData.titles[emptyTextIndex].title
    const [questsData, setQuestsData] = useState({});
    const [questsLoading, setQuestsLoading] = useState(true);
    const fetchQuests = async () => {
        try {
            const apiQuotes = getApi(props.config);
            await apiQuotes.customRequest(
                "wp-json/onenergy/v1/quests/?type=monthly",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                setQuestsData(response.data);
                setQuestsLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchQuests().then();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            {!questsLoading?
                <ScrollView style={styles.containerStyle}>
                    <Text style={styles.titleText}>Practice consecutively for 30 days to unlock this reward. Miss one day will reset the progress. Completion reward: +100 Qi</Text>
                    <View style={styles.daysContainer}>
                    {Array(30).fill().map((_, idx) => 1 + idx).map((day,index)=>{
                        return (
                            <View style={styles.row} >
                                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                    {
                                        questsData.days[index]?
                                            <Image source={require("@src/assets/img/check2.png")} />
                                            :
                                            <Image source={require("@src/assets/img/radio_unchecked_icon.png")} />
                                    }
                                </View>
                                <Text>{questsData.days[index]?questsData.days[index].substring(5, 10):"Day "+day}</Text>
                            </View>
                        )
                    })}
                    </View>
                </ScrollView>
            :
                <ActivityIndicator size="large" />
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    daysContainer:{
        marginHorizontal: scale(15),
        flexDirection:'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    row:{
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(10),
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        width: (windowWidth-46)/5,
        backgroundColor: '#e6e6e8',
        marginTop: verticalScale(2),
    },
    achievementItemBox: {
        marginTop:verticalScale(50),
        marginBottom:verticalScale(20),
        width:windowWidth-scale(30),
        borderRadius: 12,
        backgroundColor: "#fff",
        marginHorizontal: 15,
    },
    textSticker: {
        width:"100%",
        flexDirection: "row",
        justifyContent:"flex-end",
        marginRight:25,
    },
    pointText: {
        fontSize:scale(14),
    },
    achievementItemBoxInfo: {
        paddingTop:verticalScale(32),
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between",
    } ,
    achievementItemBoxInfoTop: {
        paddingHorizontal:scale(40),
        paddingBottom:scale(40),
    },
    achievementItemBoxInfoBottom: {

    },
    achievementItemBoxImageWrap: {
        position:"absolute",
        left: 10,
        top:verticalScale(-30),
        justifyContent:"center",
        paddingLeft:scale(16),
        paddingBottom:scale(17),
        alignItems:"flex-start",
        width: scale(150),
        height: scale(150),
        borderRadius:scale(43),
    },
    achievementItemBoxTitle: {
        marginTop:verticalScale(20),
        fontSize:scale(18),
        fontWeight:'700',
        textAlign:"center"
    },
    achievementItemBoxText: {
        marginVertical:verticalScale(10),
        fontSize:scale(14),
        fontWeight:'500',
        lineHeight:scale(24),
        textAlign:"center"
    },
    achievementItemBoxDescription: {
        flexDirection: "row",
        justifyContent:"flex-start",
    },
    achievementItemBoxDescriptionText: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: scale(12),
    },
    achievementItemBoxRequirements: {
        marginTop:verticalScale(10),
    },
    achievementItemBoxSubtitle: {
        flexDirection: "row",
        justifyContent:"flex-start",
    },
    achievementItemBoxSubtitleText: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: scale(12),
    },
    checklistItems: {
        marginTop:verticalScale(12),
        paddingRight:scale(12),
        maxHeight:verticalScale(80),
        flexDirection:"row",
    },
    calendarItems:{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "blue",
        marginBottom: 5,
        height:scale(45),
        width:scale(45),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    titleText:{
        width: windowWidth-scale(60),
        marginHorizontal:scale(15),
        marginVertical:scale(10),
        fontSize: scale(14),
        fontWeight:'bold',
        color: "#5E5E5E",
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
QuestsMonthly.navigationOptions = {header: null};
export default connect(mapStateToProps)(QuestsMonthly);