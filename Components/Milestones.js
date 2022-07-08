import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import MilestonesAccordian from "./MilestonesAccordian";

const Milestones = (props) => {
    const {type} = props;
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'achievement_milestone_empty');
    const emptyText = optionData.titles[emptyTextIndex].title
    const [questsData, setQuestsData] = useState({});
    const [questsLoading, setQuestsLoading] = useState(true);
    const fetchQuests = async () => {
        try {
            const apiQuotes = getApi(props.config);
            await apiQuotes.customRequest(
                "wp-json/onenergy/v1/milestones/?category="+type,
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
            <MilestonesAccordian item={item} />
        );
    };
    return(
        <SafeAreaView style={styles.container}>
            {!questsLoading?
                questsData.length?
                    <FlatList showsVerticalScrollIndicator={false} data={questsData} renderItem={renderItem} keyExtractor={item => item.id} />
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
                <ActivityIndicator size="large"/>
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    achievementItemBox: {
        marginTop:scale(50),
        marginBottom:scale(20),
        width:windowWidth-scale(30),
        borderRadius: 12,
        backgroundColor: "#fff",
        marginHorizontal: 15,
    },
    textSticker: {
        flexDirection: "row",
    },
    pointText: {
        fontSize:scale(14),
    },
    achievementItemBoxInfo: {
        paddingTop:scale(32),
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between",
    } ,
    achievementItemBoxInfoTop: {
        paddingHorizontal:scale(20),
        paddingBottom:scale(20),
    },
    achievementItemBoxInfoBottom: {
        justifyContent:"center",
        alignItems:"center",
        paddingBottom:scale(20),
    },
    achievementItemBoxImageWrap: {
        position:"absolute",
        top:scale(-40),
        justifyContent:"center",
        alignItems:"center",
        width: scale(86),
        height: scale(86),
        borderRadius:scale(43),
        backgroundColor: "#fff",
        shadowColor: "#5e5c9a",
        shadowOffset: {width: 3, height: 5},
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 3,
    },
    achievementItemBoxImage: {
        width:scale(46),
        flex: 1,
    },
    achievementItemBoxTitle: {
        marginTop:scale(20),
        fontSize:scale(18),
        fontWeight:'700',
        textAlign:"center"
    },
    achievementItemBoxText: {
        marginVertical:scale(10),
        fontSize:scale(14),
        fontWeight:'500',
        lineHeight:scale(24),
        textAlign:"center"
    },
    achievementItemBoxRequirements: {
        marginTop:scale(10),
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
        marginTop:scale(12),
        paddingRight:scale(12),
        maxHeight:scale(80),
        flexDirection:"row",
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
Milestones.navigationOptions = {header: null};
export default connect(mapStateToProps)(Milestones);