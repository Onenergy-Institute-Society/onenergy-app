import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity, ScrollView
} from 'react-native';
import {ms, mvs, s, windowWidth} from "../Utils/Scale";
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle} from "react-native-svg";
import {LineChart, PieChart, ContributionGraph} from "react-native-chart-kit";
import moment from 'moment';
import {SvgIconBack} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

const StatsScreen = (props) => {
    const {screenProps} = props;
    const {global} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const progressReducer = useSelector((state) => state.onenergyAppReducer?state.onenergyAppReducer.progressReducer:null);
    const practiceReducer = useSelector((state) => state.onenergyAppReducer?state.onenergyAppReducer.practiceReducer:null);
    Analytics.segmentClient.screen('Home').then();

    let tmpWeek=[];
    let today = new Date();
    tmpWeek=[{day:today.getDay(),date:new moment().format('YYYY-MM-DD')}];

    Array.from({length: 6}, (_, i) => {
        today.setDate(today.getDate() - 1);
        tmpWeek.push({day:today.getDay(),date:new moment().add(-(i+1), 'days').format('YYYY-MM-DD')});
   });

    let weekProgress = [];
    tmpWeek.sort((a,b)=>a.date.localeCompare(b.date)).map((day)=>{
        let weekIndex = progressReducer.progress.findIndex(item=>item.date===day.date);
        if (weekIndex >= 0)
        {
            weekProgress.push(progressReducer.progress[weekIndex].duration/60);
       }else{
            weekProgress.push(0);
       }
   })

    const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dataWeekly = {
        labels: [weekDay[tmpWeek[0].day], weekDay[tmpWeek[1].day], weekDay[tmpWeek[2].day], weekDay[tmpWeek[3].day], weekDay[tmpWeek[4].day], weekDay[tmpWeek[5].day], weekDay[tmpWeek[6].day]],
        datasets: [
            {
                data: weekProgress,
                color: (opacity = 1) => `rgba(236, 87, 24, ${opacity})`,
                strokeWidth: 2
           }
        ],
   };
    let pieData=[];
    let pieLegend=['#093423', '#157d54', '#1eb478', '#22cc89', '#2edc97', '#65e5b2', '#95eecb', '#b4f3da', '#ccf7e6', '#fdfffe', '#ffffff'];
    if(progressReducer.sectionStats&&progressReducer.sectionStats.length) {
        progressReducer.sectionStats.map((item, index) => {
            if(item.section_id) {
                let section = practiceReducer.guides.find(section => parseInt(section.id) === parseInt(item.section_id));
                pieData.push(
                    {
                        name: section.name,
                        duration: item.section_duration,
                        color: pieLegend[index],
                        legendFontColor: "#262626",
                        legendFontSize: s(10)
                    }
                )
            }
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
    const heatMapChartConfig = {
        backgroundGradientFrom: "#f2f0fd",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#f2f0fd",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(140, 121, 234, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false, // optional
   };
    const date100 = new moment().add(-100, 'days').format('YYYY-MM-DD');
    let commitsData = [];
    progressReducer.progress.filter(item=>date100.localeCompare(item.date)).map((item, index) => {
        commitsData.push(
            {
                date: item.date,
                count: item.duration,
           }
        )
   });
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
                <View style={[styles.card, styles.boxShadow]}>
                    <View style={[styles.header, {backgroundColor: "#f29066"}]}>
                        <Text style={styles.headerText}>
                            Weekly Progress (minutes)
                        </Text>
                    </View>
                    <View style={[styles.container,{
                        flexDirection:"column",
                        borderBottomRightRadius: 9,
                        borderBottomLeftRadius:9,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fceee8",
                        paddingVertical: mvs(15)
                   }]}>
                        <LineChart
                            data={dataWeekly}
                            width={windowWidth-s(40)}
                            height={s(150)}
                            verticalLabelRotation={0}
                            chartConfig={chartConfig}
                       />
                    </View>
                </View>
                <View style={[styles.card, styles.boxShadow]}>
                    <View style={[styles.header, {backgroundColor: "#8c79ea"}]}>
                        <Text style={styles.headerText}>
                            100 Days Heatmap
                        </Text>
                    </View>
                    <View style={[styles.container,{
                        flexDirection:"column",
                        borderBottomRightRadius: 9,
                        borderBottomLeftRadius:9,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2f0fd",
                        paddingVertical: mvs(15)
                   }]}>
                        <ContributionGraph
                            values={commitsData}
                            endDate={new Date()}
                            numDays={100}
                            showOutOfRangeDays={false}
                            squareSize={(windowWidth-s(40)-14)/19}
                            gutterSize={1}
                            width={windowWidth-s(40)}
                            height={220}
                            chartConfig={heatMapChartConfig}
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
                                <Text style={[global.title, styles.title]}>Course Enrolled:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.enrolledCourses?progressReducer.enrolledCourses.length:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.title, styles.title]}>Course Completed:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.completedCourses?progressReducer.completedCourses.length:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.title, styles.title]}>Lesson Completed:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.completedLessons?progressReducer.completedLessons.length:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                           <View style={styles.row}>
                                <Text style={[global.title, styles.title]}>Today Practice:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.todayDuration?Math.round(progressReducer.todayDuration / 60 )>60?Math.round(progressReducer.todayDuration /3600)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.todayDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.title, styles.title]}>Weekly Practice:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.weekDuration?Math.round(progressReducer.weekDuration / 60 )>60?Math.round(progressReducer.weekDuration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.weekDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={styles.row}>
                                <Text style={[global.title, styles.title]}>Total Practice:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.totalDuration?Math.round(progressReducer.totalDuration / 60 )>60?Math.round(progressReducer.totalDuration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(progressReducer.totalDuration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                            </View>
                            <View style={[styles.rowHr, {backgroundColor: "#67e8f9"}]}/>
                            <View style={[styles.row, styles.lastRow]}>
                                <Text style={[global.title, styles.title]}>Total Practice Days:</Text>
                                <Text style={[global.text,styles.text]}> {progressReducer.totalPracticeDays?progressReducer.totalPracticeDays+' '+optionData.titles.find(el => el.id === 'stats_detail_days').title:0}</Text>
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
                                    <Text style={[global.title, styles.title]}>Membership:</Text>
                                    <Text style={[global.text,styles.text]}> {user.membership[0].plan.name}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#fdba74"}]}/>
                                <View style={styles.row}>
                                    <Text style={[global.title, styles.title]}>Since:</Text>
                                    <Text style={[global.text,styles.text]}> {user.membership[0].post.post_date}</Text>
                                </View>
                                <View style={[styles.rowHr, {backgroundColor: "#fdba74"}]}/>
                                <View style={[styles.row, styles.lastRow]}>
                                    <Text style={[global.title, styles.title]}>Customized Routine:</Text>
                                    <Text style={[global.text,styles.text]}> {practiceReducer.routines?practiceReducer.routines.length:''}</Text>
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
                                {progressReducer.routineStats&&progressReducer.routineStats.length ?
                                    progressReducer.routineStats.map((item, index) => {
                                        const show = practiceReducer.routines.findIndex(routine => parseInt(routine.id) === parseInt(item.routine_id));
                                        return (
                                            show >= 0?
                                            <>
                                                <View style={styles.row}>
                                                    <Text style={[global.title, styles.title, {fontSize:s(14), flex: 0.6}]}>{practiceReducer.routines.find(routine => parseInt(routine.id) === parseInt(item.routine_id))?practiceReducer.routines.find(routine => parseInt(routine.id) === parseInt(item.routine_id)).title:''}</Text>
                                                    <Text style={[global.text,styles.text, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end"
                                                   }]}>{item.routine_count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                                    <Text style={[global.text,styles.text, {
                                                        flex: 0.2,
                                                        alignSelf: "flex-end",
                                                        textAlign: "right",
                                                        alignItems: "flex-end"
                                                   }]}>{item.routine_duration?Math.round(item.routine_duration / 60) > 60 ? Math.round(item.routine_duration / 60 / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_hours').title : Math.round(item.routine_duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title:0}</Text>
                                                </View>
                                                {index < progressReducer.routineStats.length - 1 ?
                                                    <View style={[styles.rowHr, {backgroundColor: "#f9a8d4"}]}/>
                                                    :
                                                    <View style={{marginBottom: mvs(10)}}/>}
                                            </>
                                                :null
                                        )
                                   }) :
                                    <View style={[styles.row, styles.lastRow]}>
                                        <Text style={[global.title, styles.title]}>No routine found, create one first.</Text>
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
                                let groupName = practiceReducer.groups.find(group => group.id === item.group_id).name;
                                return (
                                    <>
                                        <View style={styles.row}>
                                            <Text style={[global.title, styles.title,{flex:0.6}]}>{groupName}</Text>
                                            <Text style={[global.text,styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.group_count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                            <Text style={[global.text,styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.group_duration / 60 )>60?Math.round(item.group_duration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(item.group_duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
                                        </View>
                                        {index<progressReducer.groupStats.length-1?
                                            <View style={[styles.rowHr, {backgroundColor: "#c4b5fd"}]}/>
                                            :
                                            <View style={{marginBottom:mvs(10)}}/>}
                                    </>
                                )
                           })}
                        </LinearGradient>
                    </View>
                </View>
                    :null}
                <View style={[styles.boxShadow, styles.card, {marginBottom:mvs(25)}]}>
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
                            {progressReducer.sectionStats&&progressReducer.sectionStats.length?
                                <>
                                {progressReducer.sectionStats.map((item, index)=> {
                                    return (
                                        <>
                                            <View style={styles.row}>
                                                <Text style={[global.title,styles.title,{flex:0.5}]}>{practiceReducer.guides.find(section => section.id === item.section_id).title}</Text>
                                                <Text numberOfLines={1} style={[global.text,styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{item.section_count} {optionData.titles.find(el => el.id === 'stats_detail_times').title}</Text>
                                                <Text style={[global.text,styles.text,{flex:0.2, alignSelf:"flex-end", textAlign:"right", alignItems:"flex-end"}]}>{Math.round(item.section_duration / 60 )>60?Math.round(item.section_duration / 60 /60)+' '+optionData.titles.find(el => el.id === 'stats_detail_hours').title:Math.round(item.section_duration / 60) + ' ' + optionData.titles.find(el => el.id === 'stats_detail_minutes').title}</Text>
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
                                            {index<progressReducer.sectionStats.length-1?
                                            <View style={[styles.rowHr, {backgroundColor: "#6ee7b7"}]}/>
                                                :
                                            <View style={{marginBottom:mvs(10)}}/>}
                                        </>
                                    )
                               })}
                                    <PieChart
                                        data={pieData}
                                        accessor={"duration"}
                                        width={windowWidth-s(40)}
                                        height={windowWidth-s(40)}
                                        center={[(windowWidth-s(40))/4, 0]}
                                        verticalLabelRotation={0}
                                        chartConfig={chartConfig}
                                        hasLegend={false}
                                   />
                                </>
                                :
                                <View style={[styles.row, styles.lastRow]}>
                                    <Text style={[global.title, styles.title]}>No guided practice found, complete one lesson to start.</Text>
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
        width: windowWidth-s(30),
        marginHorizontal: s(15),
        borderRadius:s(9),
        marginTop:mvs(15),
   },
    header:{
        height: s(40),
        paddingTop: mvs(15),
        paddingHorizontal:ms(15),
        borderTopRightRadius: s(9),
        borderTopLeftRadius:s(9),
   },
    headerText:{
        fontFamily: "MontserratAlternates-SemiBold",
        color: "#ffffff",
        fontSize: s(18),
        fontWeight: "bold",
   },
    title:{
        fontSize: s(14),
   },
    text:{
        fontSize: s(12),
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
        paddingHorizontal: ms(15),
        paddingVertical: mvs(5),
        flexDirection:"row", 
        justifyContent: "space-between",
        alignItems: "center", 
        marginTop:mvs(10)
   },
    lastRow:{
        marginBottom:mvs(10)
   },
    bottom: {
        height:s(15),
        borderBottomRightRadius: 9,
        borderBottomLeftRadius:9,
   },
    rowHr:{
        height:1,
        width:windowWidth-60,
        marginVertical: 2,
   }
});
StatsScreen.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    return {
        title: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
       },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={() => {navigation.goBack()}}
            >
                <SvgIconBack color = {colors.headerIconColor}/>
            </TouchableOpacity>,
       }
}
export default StatsScreen;