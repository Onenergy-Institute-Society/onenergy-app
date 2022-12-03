import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
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
import analytics from '@react-native-firebase/analytics';
import Svg, {Circle, Path} from "react-native-svg";
import {LineChart, PieChart} from "react-native-chart-kit";

const StatsScreen = (props) => {
    const {screenProps} = props;
    const {global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.progressReducer:null);
    const practiceReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer:null);

    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Progress Screen',
    });

    let tmpWeek=[];
    let today = new Date();
    tmpWeek=[today.getDay()];
    console.log(today.getDay())
    Array.from({length: 6}, (_, i) => {
        today.setDate(today.getDate() - 1);
        tmpWeek.push(today.getDay());
    });
console.log(progressReducer.weekProgress)
    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dataWeekly = {
        labels: [weekDay[tmpWeek[6]], weekDay[tmpWeek[5]], weekDay[tmpWeek[4]], weekDay[tmpWeek[3]], weekDay[tmpWeek[2]], weekDay[tmpWeek[1]], weekDay[tmpWeek[0]]],
        datasets: [
            {
                data: progressReducer.weekProgress,
                color: (opacity = 1) => `rgba(236, 87, 24, ${opacity})`,
                strokeWidth: 2
            }
        ],
    };

    let pieData=[];
    let pieLegend=['#093423', '#157d54', '#1eb478', '#22cc89', '#2edc97', '#65e5b2', '#95eecb', '#b4f3da', '#ccf7e6', '#fdfffe', '#ffffff'];
    if(progressReducer.practicesStats&&progressReducer.practicesStats.length) {
        progressReducer.practicesStats.filter(item => item.type === 'PP_SECTION').map((item, index) => {
            pieData.push(
                {
                    name: item.title,
                    duration: item.duration,
                    color: pieLegend[index],
                    legendFontColor: "#262626",
                    legendFontSize: scale(10)
                }
            )
        })
    }
    const chartConfig = {
        backgroundGradientFrom: "#FFEEE7",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#FFEEE7",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(236, 87, 24, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
    };

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
                    <View style={[styles.header, {backgroundColor: "#8c79ea"}]}>
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
                            colors={['#d0c9f6', '#f2f0fd']}>
                            <View style={styles.row}>
                                <Text style={[global.itemTitle, {color:"#262626"}]}>Registered:</Text>
                                <Text style={[global.textAlt, {color:"#262626"}]}> {new Date(user.registered_date).toLocaleDateString()}</Text>
                            </View>
                            {user.rank?<>
                            <View style={[styles.rowHr, {backgroundColor: "#d6d3d1"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.itemTitle, {color:"#262626"}]}>Rank:</Text>
                                <Text style={[global.textAlt, {color:"#262626"}]}> {optionData.ranks[user.rank].rankName}</Text>
                            </View>
                            </>:null}
                            <View style={[styles.rowHr, {backgroundColor: "#d6d3d1"}]}/>
                            <View style={[styles.row, styles.lastRow]}>
                                <Text style={[global.itemTitle, {color:"#262626"}]}>Qi Points:</Text>
                                <Text style={[global.textAlt, {color:"#262626"}]}> {progressReducer&&progressReducer.points&&progressReducer.points.length?progressReducer.points.qi:0}</Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
                <View style={[styles.card, styles.boxShadow]}>
                    <View style={[styles.header, {backgroundColor: "#f29066"}]}>
                        <Text style={styles.headerText}>
                            Weekly Progress
                        </Text>
                    </View>
                    <View style={[styles.container,{
                        flexDirection:"column",
                        borderBottomRightRadius: 9,
                        borderBottomLeftRadius:9,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fceee8",
                        paddingVertical: scale(15)
                    }]}>
                        <LineChart
                            data={dataWeekly}
                            width={windowWidth-scale(40)}
                            height={scale(150)}
                            verticalLabelRotation={0}
                            chartConfig={chartConfig}
                        />
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
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Course Enrolled:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.enrolledCourses?progressReducer.enrolledCourses.length:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Course Completed:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.completedCourses?progressReducer.completedCourses.length:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Lesson Completed:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.completedLessons?progressReducer.completedLessons.length:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                           <View style={styles.row}>
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Today Practice Time:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.todayDuration?Math.round(progressReducer.todayDuration / 60 )>60?Math.round(progressReducer.todayDuration /3600)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.todayDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Weekly Practice Time:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.weekDuration?Math.round(progressReducer.weekDuration / 60 )>60?Math.round(progressReducer.weekDuration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.weekDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Total Practice Time:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.totalDuration?Math.round(progressReducer.totalDuration / 60 )>60?Math.round(progressReducer.totalDuration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.totalDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={[styles.row, styles.lastRow]}>
                                <Text style={[global.itemTitle,{color:"#262626"}]}>Total Practice Days:</Text>
                                <Text style={[global.textAlt,{color:"#262626"}]}> {progressReducer.totalDays?progressReducer.totalDays+' '+optionData.titles.find(el => el.id === 'stats_detail_days').title:0}</Text>
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
                                    <Text style={[global.itemTitle,{color:"#262626"}]}>Membership:</Text>
                                    <Text style={[global.textAlt,{color:"#262626"}]}> {user.membership[0].plan.name}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#fdba74"}]}/>
                                <View style={styles.row}>
                                    <Text style={[global.itemTitle,{color:"#262626"}]}>Since:</Text>
                                    <Text style={[global.textAlt,{color:"#262626"}]}> {user.membership[0].post.post_date}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#fdba74"}]}/>
                                <View style={[styles.row, styles.lastRow]}>
                                    <Text style={[global.itemTitle,{color:"#262626"}]}>Customized Routine:</Text>
                                    <Text style={[global.textAlt,{color:"#262626"}]}> {practiceReducer.routines?practiceReducer.routines.length:''}</Text>
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
                                                    <Text style={[global.itemTitle, {flex: 0.6, color:"#262626"}]}>{item.title}</Text>
                                                    <Text style={[global.textAlt, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end",
                                                        color:"#262626"
                                                    }]}>{item.count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                                    <Text style={[global.textAlt, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end",
                                                        color:"#262626"
                                                    }]}>{Math.round(item.duration / 60) > 60 ? Math.round(item.duration / 60 / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : Math.round(item.duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                                </View>
                                                {index < progressReducer.routinesStats.length - 1 ?
                                                    <View style={[styles.rowHr, {backgroundColor: "#f9a8d4"}]}/>
                                                    :
                                                    <View style={{marginBottom: scale(10)}}/>}
                                            </>
                                        )
                                    }) :
                                    <View style={[styles.row, styles.lastRow]}>
                                        <Text style={[global.itemTitle,{color:"#262626"}]}>No routine found, create one first.</Text>
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
                                            <Text style={[global.itemTitle,{flex:0.6, color:"#262626"}]}>{item.title}</Text>
                                            <Text style={[global.textAlt,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end", color:"#262626"}]}>{item.count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                            <Text style={[global.textAlt,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end", color:"#262626"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(item.duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                        {index<progressReducer.groupStats.length-1?
                                            <View style={[styles.rowHr, {backgroundColor: "#c4b5fd"}]}/>
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
                                <>
                                {progressReducer.practicesStats.filter(item=> item.type==='PP_SECTION').map((item, index)=> {
                                    return (
                                        <>
                                            <View style={styles.row}>
                                                <Text style={[global.itemTitle,{flex:0.5, color:"#262626"}]}>{item.title}</Text>
                                                <Text style={[global.textAlt,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end", color:"#262626"}]}>{item.count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                                <Text style={[global.textAlt,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end", color:"#262626"}]}>{Math.round(item.duration / 60 )>60?Math.round(item.duration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(item.duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                                <Svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    style={{flex:0.1}}
                                                >
                                                    <Circle cx="12" cy="12" r="8"
                                                            fill={pieLegend[index]}
                                                    />
                                                </Svg>
                                            </View>
                                            {index<progressReducer.practicesStats.filter(item=> item.type==='PP_SECTION').length-1?
                                            <View style={[styles.rowHr, {backgroundColor: "#6ee7b7"}]}/>
                                                :
                                            <View style={{marginBottom:scale(10)}} />}
                                        </>
                                    )
                                })}
                                    <PieChart
                                        data={pieData}
                                        accessor={"duration"}
                                        width={windowWidth-scale(40)}
                                        height={windowWidth-scale(40)}
                                        center={[(windowWidth-scale(40))/4, 0]}
                                        verticalLabelRotation={0}
                                        chartConfig={chartConfig}
                                        hasLegend={false}
                                    />
                                </>
                                :
                                <View style={[styles.row, styles.lastRow]}>
                                    <Text style={[global.itemTitle,{color:"#262626"}]}>No guided practice found, complete one lesson to start.</Text>
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
        fontFamily: "MontserratAlternates-SemiBold",
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    title:{
        fontFamily: "MontserratAlternates-Regular",
        fontWeight: "normal",
        fontSize: scale(14),
        color: "#27272a",
    },
    text:{
        fontFamily: "MontserratAlternates-Regular",
        fontWeight: "normal",
        fontSize: scale(14),
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
        paddingVertical: scale(5),
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
        width:windowWidth-60,
        marginVertical: 2,
    }
});
StatsScreen.navigationOptions = ({navigation, screenProps}) => ({
    title: navigation.getParam('title'),
    headerTitleStyle: screenProps.global.appHeaderTitle,
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
export default StatsScreen;