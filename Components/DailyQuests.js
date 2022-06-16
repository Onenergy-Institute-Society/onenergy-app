import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Image
} from 'react-native';
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";

const Quests = (props) => {
    const {type} = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'achievement_quest_empty');
    const emptyText = optionData.titles[emptyTextIndex].title
    const [questsData, setQuestsData] = useState({});
    const [questsLoading, setQuestsLoading] = useState(true);
    let date = new Date();
    let hours = date.getHours();
    let hourLeft = 23 - hours;
    const fetchQuests = async () => {
        try {
            const apiQuotes = getApi(props.config);
            await apiQuotes.customRequest(
                "wp-json/onenergy/v1/quests/?type=daily",
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
    const renderItem = ({ item }) => {
        return (
            <View style={styles.row} >
                <Text style={styles.title}>{item.name}</Text>
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{marginRight:10}}>{item.points} {item.points_type.singular_name}</Text>
                    {
                        item.completed?
                            <Image source={require("@src/assets/img/check2.png")} />
                            :
                            <Image source={require("@src/assets/img/radio_unchecked_icon.png")} />
                    }
                </View>
            </View>
        )
    };
    return(
        <SafeAreaView style={styles.container}>
            {!questsLoading?
                questsData.length?
                    <FlatList data={questsData} renderItem={renderItem} keyExtractor={item => item.id} />
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
    row:{
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(10),
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth-30,
        flexDirection: 'row',
        backgroundColor: '#e6e6e8',
        marginTop: verticalScale(10),
    },
    achievementItemBox: {
        marginTop:verticalScale(50),
        marginBottom:verticalScale(20),
        width:windowWidth-30,
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
    title:{
        paddingLeft:10,
        paddingRight:10,
        fontSize: scale(14),
        fontWeight:'bold',
        color: "#5E5E5E",
    },
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
Quests.navigationOptions = {header: null};
export default connect(mapStateToProps)(Quests);