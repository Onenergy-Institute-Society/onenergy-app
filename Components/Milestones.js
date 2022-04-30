import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import IconButton from "@src/components/IconButton";
import {View, Text, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Platform} from 'react-native';
import FastImage from "react-native-fast-image";
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import * as Progress from 'react-native-progress';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";

const Milestones = (props) => {
    const {completed} = props;
    const user = useSelector((state) => state.user.userObject);
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'achievement_milestone_empty');
    const emptyText = optionData.titles[emptyTextIndex].title
    const [questsData, setQuestsData] = useState({});
    const [questsLoading, setQuestsLoading] = useState(true);
    const fetchQuests = async () => {
        try {
            const apiQuotes = getApi(props.config);
            await apiQuotes.customRequest(
                "wp-json/onenergy/v1/milestones/?completed="+completed+"&user="+user.id,
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
            <View style={[styles.achievementItemBox, styles.boxShadow]}>
                <View style={[styles.achievementItemBoxImageWrap,{alignSelf:completed==='true'?'center':'flex-start', marginLeft:completed==='true'?null:20}]}>
                    {item.completed ?
                        <FastImage style={styles.achievementItemBoxImageWrap}
                                   source={{uri: "https://media.onenergy.institute/images/completed.png"}}
                                   style={{width: scale(150), height: scale(150)}}/>
                        :
                        <FastImage style={styles.achievementItemBoxImageWrap}
                                   source={{uri: "https://media.onenergy.institute/images/hourglass.png"}}
                                   style={{width: scale(80), height: scale(80)}}/>
                    }
                </View>
                <View style={styles.achievementItemBoxInfo}>
                    {completed==='false'?
                        <View style={[styles.textSticker,{width:"100%",justifyContent:"flex-end", marginRight:25}]}>
                            <IconButton
                                icon={require("@src/assets/img/add.png")}
                                style={{tintColor:"#00c7d9", width:16, height:16}}
                            /><Text style={styles.pointText}>{item.points} {item.points_type.singular_name}</Text>
                        </View>
                        :null}
                    <View style={styles.achievementItemBoxInfoTop}>
                        <Text style={styles.achievementItemBoxTitle}>
                            {item.name}
                        </Text>
                        {completed==='false'?
                            <View style={styles.achievementItemBoxRequirements}>
                                <View style={styles.achievementItemBoxSubtitle}>
                                    <Text style={styles.achievementItemBoxSubtitleText}>Requirements:</Text>
                                </View>
                                {item.steps.map((step, index) => {
                                    return (
                                        <View>
                                            <View style={styles.checklistItems}>
                                                <IconButton
                                                    tintColor={step.completed?"green":"grey"}
                                                    icon={step.completed?require("@src/assets/img/radio_checked_icon.png"):require("@src/assets/img/radio_unchecked_icon.png")}
                                                    style={{ height: 16, width: 16 }}
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
                                            {step.progress.total>0?
                                                <View style={{width:"100%", justifyContent:"space-between", alignItems:"center"}}>
                                                    <Progress.Bar progress={step.progress.current/step.progress.total} width={windowWidth-60} height={verticalScale(10)} />
                                                    <Text>{step.progress.current}/{step.progress.total}</Text>
                                                </View>
                                                :null}
                                        </View>
                                    )
                                })}
                            </View>
                            :null}
                    </View>
                    <View style={styles.achievementItemBoxInfoBottom}>
                        {completed==='true'?
                            <View style={[styles.textSticker,{justifyContent: "space-around", alignItems:"center"}]}>
                                <IconButton
                                    icon={require("@src/assets/img/add.png")}
                                    style={{tintColor:"#00c7d9", width:24, height:24}}
                                /><Text style={[styles.pointText,{fontSize: scale(18)}]}>{item.points} {item.points_type.singular_name}</Text>
                            </View>
                            :null}
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
                <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Loading</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
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
        width:windowWidth-30,
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
        paddingTop:verticalScale(32),
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
        top:verticalScale(-40),
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