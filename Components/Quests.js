import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import IconButton from "@src/components/IconButton";
import {
    View,
    Text,
    Platform,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    ImageBackground
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
                "wp-json/onenergy/v1/quests/?type="+type,
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
        let timeLeft;
        if(type==="daily"){
            timeLeft = hourLeft;
        }else{
            timeLeft = item.steps.length - item.completed_steps;
        }
        if(type==="weekly"){
            console.log(item)
        }
        return (
            <View style={[styles.achievementItemBox, styles.boxShadow]}>
                <View style={styles.achievementItemBoxImageWrap}>
                    {item.completed ? (
                            <ImageBackground source={{uri: "https://cdn.onenergy.institute/images/completed.png"}} style={styles.achievementItemBoxImageWrap} />
                        ) :
                        type === "daily" ? (
                            <ImageBackground source={{uri: "https://cdn.onenergy.institute/images/hoursleft.png"}} style={styles.achievementItemBoxImageWrap}>
                                <Text style={{fontSize:scale(32), color:"#0098d9", fontWeight:"700", marginLeft:scale(timeLeft>9?0:11)}}>{timeLeft}</Text>
                            </ImageBackground>
                            ) :
                            type === "weekly" ?
                                <ImageBackground source={{uri: "https://cdn.onenergy.institute/images/daysleft.png"}} style={styles.achievementItemBoxImageWrap}>
                                    <Text style={{fontSize:scale(32), color:"#0098d9", fontWeight:"700", marginLeft:scale(timeLeft>9?0:11)}}>{timeLeft}</Text>
                                </ImageBackground>
                                : type === "monthly" ?
                                    <ImageBackground source={{uri: "https://cdn.onenergy.institute/images/daysleft.png"}} style={styles.achievementItemBoxImageWrap}>
                                        <Text numberOfLines={1} style={{fontSize:scale(32), color:"#0098d9", fontWeight:"700"}}>{timeLeft}</Text>
                                    </ImageBackground>
                                    : null
                    }
                </View>
                <View style={styles.achievementItemBoxInfo}>
                    <View style={styles.textSticker}>
                        <IconButton
                            icon={require("@src/assets/img/add.png")}
                            style={{tintColor:"#00c7d9", width:16, height:16}}
                        /><Text style={styles.pointText}>{item.points} {item.points_type.singular_name}</Text>
                    </View>
                    <View style={styles.achievementItemBoxInfoTop}>
                        <Text style={styles.achievementItemBoxTitle}>
                            {item.name}
                        </Text>
                        {item.description?
                            <View style={styles.achievementItemBoxDescription}>
                                <Text style={styles.achievementItemBoxDescriptionText}>
                                    {item.description}
                                </Text>
                            </View>
                            :null}
                        <View style={styles.achievementItemBoxRequirements}>
                            <View style={styles.achievementItemBoxSubtitle}>
                                <Text style={styles.achievementItemBoxSubtitleText}>Requirements:</Text>
                            </View>
                            {item.display === 'calendar'?
                                <View style={{flex:1, flexDirection:"row", flexWrap: 'wrap', justifyContent:'space-around' }}>
                                    {item.steps.map((step, index) => {
                                        return (
                                            <View style={styles.calendarItems}>
                                                <IconButton
                                                    icon={step.completed?require("@src/assets/img/check2.png"):require("@src/assets/img/radio_unchecked_icon.png")}
                                                    style={{ height: 16, width: 16, tintColor:step.completed?"green":"gray" }}
                                                    />
                                                <Text
                                                    style={{
                                                    fontSize: scale(14),
                                                    marginLeft:5,
                                                    alignSelf:"center"
                                                }}>
                                                {step.description.replace("day ", "")}
                                                </Text>
                                            </View>
                                            )
                                        })
                                    }
                                </View>
                            :
                                item.steps.map((step, index) => {
                                    return (
                                        <View style={styles.checklistItems}>
                                            <IconButton
                                                icon={step.completed?require("@src/assets/img/radio_checked_icon.png"):require("@src/assets/img/radio_unchecked_icon.png")}
                                                style={{ height: 16, width: 16, tintColor:step.completed?"green":"gray" }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: scale(14),
                                                    marginLeft:5,
                                                    alignSelf:"center"
                                                }}>
                                                {step.description}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={styles.achievementItemBoxInfoBottom}>

                    </View>
                </View>
            </View>
        );
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
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
Quests.navigationOptions = {header: null};
export default connect(mapStateToProps)(Quests);