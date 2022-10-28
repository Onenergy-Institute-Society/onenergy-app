import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
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

const StatsScreen = (props) => {
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const practiceReducer = useSelector((state) => state.onenergyReducer.practiceReducer);
console.log(progressReducer, user)
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'progress_title').title,
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
                            {optionData.titles.find(el => el.id === 'stats_title_account').title}
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
                            {user.rank?<>
                            <View style={[styles.rowHr, {backgroundColor: "#fafaf9"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Rank:</Text>
                                <Text style={styles.text}> {optionData.ranks[user.rank].rankName}</Text>
                            </View>
                            </>:null}
                            <View style={[styles.rowHr, {backgroundColor: "#fafaf9"}]}/>
                            <View style={[styles.row, styles.lastRow]}>
                                <Text style={styles.title}>Qi Points:</Text>
                                <Text style={styles.text}> {progressReducer.points.qi}</Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
                <View style={[styles.boxShadow, styles.card]}>
                    <View style={[styles.header, {backgroundColor: "#67e8f9"}]}>
                        <Text style={styles.headerText}>
                            {optionData.titles.find(el => el.id === 'stats_title_overview').title}
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
                                <Text style={styles.text}> {progressReducer.enrolledCourses.length}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Course Completed:</Text>
                                <Text style={styles.text}> {progressReducer.completedCourses.length}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Lesson Completed:</Text>
                                <Text style={styles.text}> {progressReducer.completedLessons.length}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                           <View style={styles.row}>
                                <Text style={styles.title}>Today Practice Time:</Text>
                                <Text style={styles.text}> {progressReducer.todayDuration?Math.round(progressReducer.todayDuration / 60 )>60?Math.round(progressReducer.todayDuration /3600)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.todayDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Weekly Practice Time:</Text>
                                <Text style={styles.text}> {progressReducer.weekDuration?Math.round(progressReducer.weekDuration / 60 )>60?Math.round(progressReducer.weekDuration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.weekDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={styles.row}>
                                <Text style={styles.title}>Total Practice Time:</Text>
                                <Text style={styles.text}> {progressReducer.totalDuration?Math.round(progressReducer.totalDuration / 60 )>60?Math.round(progressReducer.totalDuration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.totalDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#ecfeff"}]}/>
                            <View style={[styles.row, styles.lastRow]}>
                                <Text style={styles.title}>Total Practice Days:</Text>
                                <Text style={styles.text}> {progressReducer.totalDays?progressReducer.totalDays+' '+optionData.titles.find(el => el.id === 'stats_detail_days').title:0}</Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
                {user.membership && user.membership.length?
                <>
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header, {backgroundColor: "#fdba74"}]}>
                            <Text style={styles.headerText}>
                                {optionData.titles.find(el => el.id === 'stats_title_membership').title}
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
                                    <Text style={styles.text}> {practiceReducer.routines?practiceReducer.routines.length:''}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={[styles.boxShadow, styles.card]}>
                        <View style={[styles.header,{backgroundColor:"#f9a8d4"}]}>
                            <Text style={styles.headerText}>
                                {optionData.titles.find(el => el.id === 'stats_title_routine').title}
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
                                {progressReducer.routinesStats&&progressReducer.routinesStats.length ?
                                    progressReducer.routinesStats.map((item, index) => {
                                        return (
                                            <>
                                                <View style={styles.row}>
                                                    <Text style={[styles.title, {flex: 0.6}]}>{item.title}</Text>
                                                    <Text style={[styles.text, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end"
                                                    }]}>{item.count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                                    <Text style={[styles.text, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end"
                                                    }]}>{Math.round(item.duration / 60) > 60 ? Math.round(item.duration / 60 / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : Math.round(item.duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                                </View>
                                                {index < progressReducer.routinesStats.length - 1 ?
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
                {progressReducer.groupStats&&progressReducer.groupStats.length?
                <View style={[styles.boxShadow, styles.card]}>
                    <View style={[styles.header,{backgroundColor:"#c4b5fd"}]}>
                        <Text style={styles.headerText}>
                            {optionData.titles.find(el => el.id === 'stats_title_group').title}
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
                            {progressReducer.groupStats.map((item, index)=> {
                                return (
                                    <>
                                        <View style={styles.row}>
                                            <Text style={[styles.title,{flex:0.6}]}>{item.title}</Text>
                                            <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                            <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(item.duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                        {index<progressReducer.groupStats.length-1?
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
                            {optionData.titles.find(el => el.id === 'stats_title_guided').title}
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
                            {progressReducer.practicesStats&&progressReducer.practicesStats.length?
                                progressReducer.practicesStats.filter(item=> item.type==='PP_SECTION').map((item, index)=> {
                                    return (
                                        <>
                                            <View style={styles.row}>
                                                <Text style={[styles.title,{flex:0.6}]}>{item.title}</Text>
                                                <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                                <Text style={[styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(item.duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                            </View>
                                            {index<progressReducer.practicesStats.filter(item=> item.type==='PP_SECTION').length-1?
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
StatsScreen.navigationOptions = ({navigation}) => ({
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
export default StatsScreen;