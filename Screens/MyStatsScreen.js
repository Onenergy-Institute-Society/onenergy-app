import React, {useEffect} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector, useDispatch} from "react-redux";
import IconButton from "@src/components/IconButton";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity, ScrollView
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import LinearGradient from 'react-native-linear-gradient';

const MyStatsScreen = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressSelector = state => ({progressReducer: state.progressReducer})
    const {progressReducer} = useSelector(progressSelector);
    const dispatch = useDispatch();
    const fetchStats = async () => {
        try {
            const apiQuotes = getApi(props.config);
            const data = await apiQuotes.customRequest(
                "wp-json/onenergy/v1/stats",
                "get",
                {},
                null,
                {},
                false
            ).then(response => response.data);
            dispatch({
                type: 'PROGRESS_ADD',
                payload: data,
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
            <ScrollView style={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
            >
                <View style={[styles.boxShadow, styles.card]}>
                    <View style={[styles.header, {backgroundColor: "#d6d3d1"}]}>
                        <Text style={styles.headerText}>
                            {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_title_account')].title}
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
                                <Text style={styles.text}> {new Date(user.registered_date).toLocaleDateString()}</Text>
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
                            {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_title_overview')].title}
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
                                <Text style={styles.text}> {progressReducer.today_duration?Math.round(progressReducer.today_duration / 60 )>60?Math.round(progressReducer.today_duration /3600)+' '+optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_hours')].title:Math.round(progressReducer.today_duration / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_minutes')].title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Weekly Practice Time:</Text>
                                <Text style={styles.text}> {progressReducer.week_duration?Math.round(progressReducer.week_duration / 60 )>60?Math.round(progressReducer.week_duration / 60 /60)+' '+optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_hours')].title:Math.round(progressReducer.week_duration / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_minutes')].title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Total Practice Time:</Text>
                                <Text style={styles.text}> {progressReducer.total_duration?Math.round(progressReducer.total_duration / 60 )>60?Math.round(progressReducer.total_duration / 60 /60)+' '+optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_hours')].title:Math.round(progressReducer.total_duration / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_minutes')].title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={[styles.row, styles.lastRow]}>
                                <Text style={styles.title}>Total Practice Days:</Text>
                                <Text style={styles.text}> {progressReducer.total_days?progressReducer.total_days+' '+optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_days')].title:0}</Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
                {user.membership && user.membership.length?
                <>
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header, {backgroundColor: "#fdba74"}]}>
                            <Text style={styles.headerText}>
                                {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_title_membership')].title}
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
                                    <Text style={styles.text}> {progressReducer.routines_stats?progressReducer.routines_stats.length:''}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header,{backgroundColor:"#f9a8d4"}]}>
                            <Text style={styles.headerText}>
                                {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_title_routine')].title}
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
                                {progressReducer.routines_stats&&progressReducer.routines_stats.length ?
                                    progressReducer.routines_stats.map((item, index) => {
                                        return (
                                            <>
                                                <View style={styles.row}>
                                                    <Text style={[styles.title, {flex: 0.6}]}>{item.title}</Text>
                                                    <Text style={[styles.text, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end"
                                                    }]}>{item.count} {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_times')].title}</Text>
                                                    <Text style={[styles.text, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end"
                                                    }]}>{Math.round(item.duration / 60) > 60 ? Math.round(item.duration / 60 / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_hours')].title : Math.round(item.duration / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_minutes')].title}</Text>
                                                </View>
                                                {index < progressReducer.routines_stats.length - 1 ?
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
                {progressReducer.gp_stats&&progressReducer.gp_stats.length?
                <View style={[styles.boxShadow, styles.card]}>
                    <View style={[styles.header,{backgroundColor:"#c4b5fd"}]}>
                        <Text style={styles.headerText}>
                            {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_title_group')].title}
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
                            {progressReducer.gp_stats.map((item, index)=> {
                                return (
                                    <>
                                        <View style={styles.row}>
                                            <Text style={[styles.title,{flex:0.6}]}>{item.title}</Text>
                                            <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.count} {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_times')].title}</Text>
                                            <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' '+optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_hours')].title:Math.round(item.duration / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_minutes')].title}</Text>
                                        </View>
                                        {index<progressReducer.gp_stats.length-1?
                                            <View style={[styles.rowHr, {backgroundColor: "#f5f3ff"}]}/>
                                            :
                                            <View style={{marginBottom:scale(10)}} />}
                                    </>
                                )
                            })}
                        </LinearGradient>
                    </View>
                </View>
                    :null}
                <View style={[styles.boxShadow, styles.card, {marginBottom:25}]}>
                    <View style={[styles.header,{backgroundColor:"#6ee7b7"}]}>
                        <Text style={styles.headerText}>
                            {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_title_guided')].title}
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
                            {progressReducer.practices_stats&&progressReducer.practices_stats.length?
                                progressReducer.practices_stats.map((item, index)=> {
                                    return (
                                        <>
                                            <View style={styles.row}>
                                                <Text style={[styles.title,{flex:0.6}]}>{item.title}</Text>
                                                <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.count} {optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_times')].title}</Text>
                                                <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' '+optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_hours')].title:Math.round(item.duration / 60) + ' ' + optionData.titles[optionData.titles.findIndex(el => el.id === 'stats_detail_minutes')].title}</Text>
                                            </View>
                                            {index<progressReducer.practices_stats.length-1?
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
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    card: {
        width: windowWidth-scale(30),
        marginHorizontal: scale(15),
        borderRadius:9,
        marginTop:scale(15),
    },
    header:{
        height: scale(40),
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
        height:scale(15),
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