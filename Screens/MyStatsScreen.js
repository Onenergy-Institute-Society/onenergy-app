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
    ActivityIndicator,
    Image, TouchableOpacity, ScrollView
} from 'react-native';
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import LinearGradient from 'react-native-linear-gradient';

const MyStatsScreen = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [statsData, setStatsData] = useState({});
    const [statsLoading, setStatsLoading] = useState(true);
    const fetchStats = async () => {
        try {
            const apiQuotes = getApi(props.config);
            await apiQuotes.customRequest(
                "wp-json/onenergy/v1/stats",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                setStatsData(response.data);
                setStatsLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchStats().then();
        let titleIndex = optionData.titles.findIndex(el => el.id === 'progress_title');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
        });
    }, []);
    return(
        <SafeAreaView style={styles.container}>
            {!statsLoading?
                <ScrollView style={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header, {backgroundColor: "#d6d3d1"}]}>
                            <Text style={styles.headerText}>
                                Account
                            </Text>
                        </View>
                        <View>
                            <LinearGradient
                                style={[styles.container,{
                                    flexDirection:"column",
                                    borderBottomRightRadius: 9,
                                    borderBottomLeftRadius:9,
                                }]}
                                colors={['#e7e5e4', '#f5f5f4']}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Registered:</Text>
                                    <Text style={styles.text}> {user.registered_date}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#fafaf9"}]}/>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Rank:</Text>
                                    <Text style={styles.text}> {user.user_ranks[0].rank.title}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#fafaf9"}]}/>
                                <View style={[styles.row, styles.lastRow]}>
                                    <Text style={styles.title}>Qi Points:</Text>
                                    <Text style={styles.text}> {user.points.point}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header, {backgroundColor: "#67e8f9"}]}>
                            <Text style={styles.headerText}>
                                Overview
                            </Text>
                        </View>
                        <View>
                            <LinearGradient
                                style={[styles.container,{
                                    flexDirection:"column",
                                    borderBottomRightRadius: 9,
                                    borderBottomLeftRadius:9,
                                }]}
                                colors={['#a5f3fc', '#cffafe']}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Course Enrolled:</Text>
                                    <Text style={styles.text}> {user.enrolled_courses.length}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Course Completed:</Text>
                                    <Text style={styles.text}> {user.completed_courses.length}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Lesson Completed:</Text>
                                    <Text style={styles.text}> {user.completed_lessons.length}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                                <View style={styles.row}>
                                    <Text style={styles.title}>Today Practice Time:</Text>
                                    <Text style={styles.text}> {Math.round(statsData.today_duration / 60 )>60?Math.round(statsData.today_duration / 60 /60)+' hrs':Math.round(statsData.today_duration / 60) + ' min'}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                                <View style={[styles.row, styles.lastRow]}>
                                    <Text style={styles.title}>Total Practice Time:</Text>
                                    <Text style={styles.text}> {Math.round(statsData.total_duration / 60 )>60?Math.round(statsData.total_duration / 60 /60)+' hrs':Math.round(statsData.total_duration / 60) + ' min'}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    {user.membership && user.membership.length?
                    <>
                        <View style={[styles.boxShadow, styles.card]}>
                            <View style={[styles.header, {backgroundColor: "#fdba74"}]}>
                                <Text style={styles.headerText}>
                                    Membership
                                </Text>
                            </View>
                            <View>
                                <LinearGradient
                                    style={[styles.container,{
                                        flexDirection:"column",
                                        borderBottomRightRadius: 9,
                                        borderBottomLeftRadius:9,
                                    }]}
                                    colors={['#fed7aa', '#ffedd5']}>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>Membership:</Text>
                                        <Text style={styles.text}> {user.membership[0].plan.name}</Text>
                                    </View>
                                    <View style={[styles.rowHr, {backgroundColor: "#fff7ed"}]}/>
                                    <View style={styles.row}>
                                        <Text style={styles.title}>Since:</Text>
                                        <Text style={styles.text}> {user.membership[0].post.post_date}</Text>
                                    </View>
                                    <View style={[styles.rowHr, {backgroundColor: "#fff7ed"}]}/>
                                    <View style={[styles.row, styles.lastRow]}>
                                        <Text style={styles.title}>Customized Routine:</Text>
                                        <Text style={styles.text}> {statsData.routines_stats.length}</Text>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                        <View style={[styles.boxShadow, styles.card]}>
                            <View style={[styles.header,{backgroundColor:"#f9a8d4"}]}>
                                <Text style={styles.headerText}>
                                    Routine Practice Stats
                                </Text>
                            </View>
                            <View>
                                <LinearGradient
                                    style={[styles.container,{
                                        flexDirection:"column",
                                        borderBottomRightRadius: 9,
                                        borderBottomLeftRadius:9,
                                    }]}
                                    colors={['#fbcfe8', '#fce7f3']}>
                                    {statsData.routines_stats.length ?
                                        statsData.routines_stats.map((item, index) => {
                                            return (
                                                <>
                                                    <View style={styles.row}>
                                                        <Text style={[styles.title, {flex: 0.6}]}>{item.title}</Text>
                                                        <Text style={[styles.text, {
                                                            flex: 0.2,
                                                            alignSelf: "flex-end",
                                                            textAlign: "right",
                                                            alignItems: "flex-end"
                                                        }]}>{item.count} times</Text>
                                                        <Text style={[styles.text, {
                                                            flex: 0.2,
                                                            alignSelf: "flex-end",
                                                            textAlign: "right",
                                                            alignItems: "flex-end"
                                                        }]}>{Math.round(item.duration / 60) > 60 ? Math.round(item.duration / 60 / 60) + ' hrs' : Math.round(item.duration / 60) + ' min'}</Text>
                                                    </View>
                                                    {index < statsData.routines_stats.length - 1 ?
                                                        <View style={[styles.rowHr, {backgroundColor: "#fdf2f8"}]}/>
                                                        :
                                                        <View style={{marginBottom: scale(10)}}/>}
                                                </>
                                            )
                                        }) :
                                        <View style={[styles.row, styles.lastRow]}>
                                            <Text style={styles.title}>No routine found, create one first.</Text>
                                        </View>
                                    }
                                </LinearGradient>
                            </View>
                        </View>
                    </>
                        :null}
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header,{backgroundColor:"#c4b5fd"}]}>
                            <Text style={styles.headerText}>
                                Group Practice Stats
                            </Text>
                        </View>
                        <View>
                            <LinearGradient
                                style={[styles.container,{
                                    flexDirection:"column",
                                    borderBottomRightRadius: 9,
                                    borderBottomLeftRadius:9,
                                }]}
                                colors={['#ddd6fe', '#ede9fe']}>
                                {statsData.gp_stats.map((item, index)=> {
                                    return (
                                        <>
                                            <View style={styles.row}>
                                                <Text style={[styles.title,{flex:0.6}]}>{item.title}</Text>
                                                <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.count} times</Text>
                                                <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' hrs':Math.round(item.duration / 60) + ' min'}</Text>
                                            </View>
                                            {index<statsData.gp_stats.length-1?
                                                <View style={[styles.rowHr, {backgroundColor: "#f5f3ff"}]}/>
                                                :
                                                <View style={{marginBottom:scale(10)}} />}
                                        </>
                                    )
                                })}
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={[styles.boxShadow, styles.card, {marginBottom:25}]}>
                        <View style={[styles.header,{backgroundColor:"#6ee7b7"}]}>
                            <Text style={styles.headerText}>
                                Guided Practice Stats
                            </Text>
                        </View>
                        <View>
                            <LinearGradient
                                style={[styles.container,{
                                    flexDirection:"column",
                                    borderBottomRightRadius: 9,
                                    borderBottomLeftRadius:9,
                                }]}
                                colors={['#d1fae5', '#a7f3d0']}>
                                {statsData.practices_stats.length?
                                    statsData.practices_stats.map((item, index)=> {
                                        return (
                                            <>
                                                <View style={styles.row}>
                                                    <Text style={[styles.title,{flex:0.6}]}>{item.title}</Text>
                                                    <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.count} times</Text>
                                                    <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' hrs':Math.round(item.duration / 60) + ' min'}</Text>
                                                </View>
                                                {index<statsData.practices_stats.length-1?
                                                <View style={[styles.rowHr, {backgroundColor: "#ecfdf5"}]}/>
                                                    :
                                                <View style={{marginBottom:scale(10)}} />}
                                            </>
                                        )
                                    }):
                                    <View style={[styles.row, styles.lastRow]}>
                                        <Text style={styles.title}>No guided practice found, complete one lesson to start.</Text>
                                    </View>
                                }
                            </LinearGradient>
                        </View>
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
    scrollContainer:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    card: {
        flex:1,
        width: windowWidth-30,
        borderRadius:9,
        marginTop:verticalScale(15),
    },
    header:{
        height: verticalScale(40),
        paddingTop: 15,
        paddingHorizontal:15,
        borderTopRightRadius: 9,
        borderTopLeftRadius:9,
    },
    headerText:{
        color: "#27272a",
        fontSize: 18,
        fontWeight: "500",
    },
    title:{
        fontSize: 16,
        fontWeight: "400",
        color: "#27272a",
    },
    text:{
        fontSize: 14,
        color: "#27272a",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    row: {
        flex:1, 
        width: "100%", 
        paddingHorizontal: scale(15), 
        flexDirection:"row", 
        justifyContent: "space-between",
        alignItems: "center", 
        marginTop:scale(10)
    },
    lastRow:{
        marginBottom:scale(10)
    },
    bottom: {
        height:verticalScale(15),
        borderBottomRightRadius: 9,
        borderBottomLeftRadius:9,
    },
    rowHr:{
        height:1,
        width:windowWidth-35,
        marginVertical: 2,
    }
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
MyStatsScreen.navigationOptions = ({navigation}) => ({
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
export default connect(mapStateToProps)(MyStatsScreen);