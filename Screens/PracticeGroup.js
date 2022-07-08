import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Switch
} from "react-native";
import {connect, useSelector, useDispatch} from "react-redux";
import {getApi} from "@src/services";
import IconButton from "@src/components/IconButton";
import {NavigationActions, withNavigation} from "react-navigation";
import {windowHeight, windowWidth} from "../Utils/Dimensions";
import {scale} from "../Utils/scale";
import HTML from "react-native-render-html";
import moment from 'moment';
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import { Modalize } from 'react-native-modalize';
import WaitingGroupPractice from "../Components/WaitingGroupPractice";
import AuthWrapper from "@src/components/AuthWrapper"; //This line is a workaround while we figure out the cause of the error
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import EventList from "../Components/EventList";
import { BlurView } from "@react-native-community/blur";

const PracticeGroup = props => {
    const { navigation, screenProps } = props;
    const { colors } = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const helpIndex = optionData.helps.findIndex(el => el.name === 'practice_group_popup');
    const helpData = {title:optionData.helps[helpIndex].title?optionData.helps[helpIndex].title:'',id:optionData.helps[helpIndex].id};
    const [loading, setLoading] = useState(false);
    const [groupPractice, setGroupPractice ] = useState([]);
    const [groupPracticeLoading, setGroupPracticeLoading] = useState(true);
    const [groupPracticeDetail, setGroupPracticeDetail] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const dispatch = useDispatch();
    const fetchGroupPractice = async () => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/wp/v2/group-practice?order=asc&orderby=date",          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => {
                dispatch({
                    type: "ONENERGY_GROUP_UPDATE",
                    payload: response.data
                });
                setGroupPractice(response.data)
                setGroupPracticeLoading(false);
            });
        } catch (e) {
            console.error(e);
        }
    }
    const JoinGroupPractice = async (gp_id, gp_time) => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/onenergy/v1/JoinGroupPractice",          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "post",       // get, post, patch, delete etc.
                {"gp_id":gp_id, "gp_time":gp_time},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then();
        } catch (e) {
            console.error(e);
        }
    }
    const toggleHelpModal = () => {
        this.pgHelpModal.open();
    };
    useEffect(() => {
        if(!props.groups||!props.groups.length) {
            fetchGroupPractice().then();
        }else{
            setGroupPractice(props.groups);
            setGroupPracticeLoading(false);
        }
        let titleIndex = optionData.titles.findIndex(el => el.id === 'practices_group');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            toggleHelpModal: toggleHelpModal,
        });
        setCurrentTime(moment.utc().local().format());
        let secTimer = setInterval( () => {
            setCurrentTime(moment.utc().local().format());
        },60000)
        return () => clearInterval(secTimer)
    }, []);

    const regex = /(<([^>]+)>)/ig;
    const handlePress = (url, gp_id, gp_time) => {
        JoinGroupPractice(gp_id, gp_time).then();
        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "videoPlayer",
                params: {
                    video: url,
                    gp_id: gp_id,
                    gp_time: gp_time,
                    config: props.config
                }
            })
        )
    }
    const onItemDetailPress = (detail) => {
        setGroupPracticeDetail(detail);
        this.DetailModal.open();
    };
    const htmlStyle = {
        body:{height:200},
        img: {width: windowWidth - 80 },
        a: {color: colors.linkColor},
        li: {
          fontSize: 16
        },
        p: {
            lineHeight: (16 * 1.47),
            paddingLeft: 8,
            paddingRight: 8,
            fontSize: 20,
            color: colors.textColor,
            textAlign: 'left',
            marginBottom:25,
        },
    };
    const renderItem = ({ item }) => {
        let detail = item.content.rendered;
        const conditionLessons  = item.meta_box.lessons.every(value => user.completed_lessons.some(lesson=>(lesson.id===value)));
        user.completed_lessons.map((lesson) => {
            detail = detail.replace('<span id="'+lesson.id+'"></span>', '<span style="color:green">(Passed)</span>')
        })
        const conditionWeekDay = item.meta_box.weekday.includes(new Date().getDay().toString());
        const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        const date = new Date().getDate(); //To get the Current Date
        const month = new Date().getMonth() + 1; //To get the Current Month
        const year = new Date().getFullYear(); //To get the Current Year
        let conditionTime = false;
        let timeToGo = 0;
        let moreTimeToGo = 0;
        let CurrentStartTime = '';
        item.meta_box.times.map((time) => {
            let startTime = moment(year + '-' + month + '-' + date + ' ' + time, "YYYY-MM-DD hh:mm");
            if(startTime.diff(currentTime, 'minutes')>0&&startTime.diff(currentTime, 'minutes')<=30){
                conditionTime = true;
                timeToGo = startTime.diff(currentTime, 'minutes');
                CurrentStartTime = year + '-' + month + '-' + date + ' ' + time;
            }else{
                if(startTime.diff(currentTime, 'minutes')>30&&startTime.diff(currentTime, 'minutes')<=60){
                    conditionTime = true;
                    moreTimeToGo = startTime.diff(currentTime, 'minutes');
                }
            }
        })
        return (
            <View style={[styles.containerStyle, styles.boxShadow, {height: scale(200)}]} key={'gp-' + item.id}>
                <ImageBackground style={[styles.imageView, {height: scale(200)}]} source={{uri: item.meta_box.bg_image.full_url}}>
                    <View style={{height:scale(60), justifyContent:"center", alignItems:"center", width:windowWidth-scale(30)}}>
                        <Text style={styles.title}>{item.title.rendered}</Text>
                    </View>
                    {conditionLessons||optionData.testing_mode?
                        conditionWeekDay||optionData.testing_mode?
                            conditionTime||optionData.testing_mode?
                                <View style={styles.viewTop}>
                                    <View style={{flexDirection: "column", justifyContent:"space-evenly", alignItems:"center", width:windowWidth-scale(30)}}>
                                        <View style={{flexDirection: "row", justifyContent: "space-around", alignItems:"center", width:windowWidth-scale(30)}}>
                                        <Text style={styles.waitTimeLabel}>Up Coming:</Text>
                                            {timeToGo > 0||optionData.testing_mode ?
                                                <Text style={styles.waitTime}>{timeToGo} Minutes</Text>
                                                :
                                                moreTimeToGo > 0 ?
                                                    <Text style={styles.waitTime}>{moreTimeToGo} Minutes</Text>
                                                    :null
                                            }
                                        {timeToGo > 0||optionData.testing_mode ?
                                            <WaitingGroupPractice waitingText={'waiting'} gp_id={item.id} gp_time={CurrentStartTime} waitingStyle={styles.waiting} />
                                            :null}
                                        </View>
                                    {timeToGo>0||optionData.testing_mode?
                                        <TouchableOpacity style={styles.btnJoin}
                                        onPress={() => {
                                        handlePress(item.meta_box.url, item.id, CurrentStartTime)
                                    }}
                                        >
                                            <Text style={{color: "white", fontSize:scale(20), fontWeight: "700"}}>JOIN NOW</Text>
                                        </TouchableOpacity>
                                    :null}
                                    </View>
                                </View>
                            :
                                <View style={styles.viewTopInfo}>
                                    <Text style={{fontWeight:"500", fontSize:scale(24)}}>Available at (PDT)</Text>
                                    <View style={{
                                        width:"50%",
                                        flexDirection: "row",
                                        flexWrap: 'wrap',
                                        justifyContent: "space-between"
                                    }}>
                                        {item.meta_box.times.map((item) => (
                                            <Text>{item} </Text>
                                        ))}
                                    </View>
                                </View>
                        :
                            <View style={styles.viewTopInfo}>
                                <Text style={{fontWeight:"500", fontSize:scale(24)}}>Available at (PDT)</Text>
                                <View style={{
                                    width:"50%",
                                    flexDirection: "row",
                                    flexWrap: 'wrap',
                                    justifyContent: "space-between"
                                }}>
                                    {item.meta_box.weekday.map((item) => (
                                        <Text>{days[item-1]} </Text>
                                    ))}
                                </View>
                            </View>
                    :
                        <View style={styles.viewTopInfo}>
                            <Text style={{fontWeight:"500", fontSize:scale(18), textAlign:"center"}}>Please finish all required lessons to activate this group practice.</Text>
                        </View>
                    }
                        <TouchableOpacity
                            style={styles.viewBottom}
                            onPress={() => onItemDetailPress(detail)}
                        >
                            <View stlye={styles.viewDetail}>
                                <Text style={styles.description}>Tap here to view detail</Text>
                                <Image tintColor={"#4942e1"} source={require("@src/assets/img/dropdown_2.png")}
                                       style={{alignSelf: "center", width: 16, height: 16, }}/>
                            </View>
                        </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {groupPracticeLoading?(
                <ActivityIndicator size="large"/>
            ):(
                <ScrollView nestedScrollEnabled={true} styles={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {(optionData.goals && optionData.goals.length) || (optionData.challenges && optionData.challenges.length) ?
                        <View>
                            <EventList location={'practice_group'} eventsDate={optionData.goals} />
                            <EventList location={'practice_group'} eventsDate={optionData.challenges} />
                        </View>
                        : null
                    }
                    <FlatList
                        data={groupPractice}
                        renderItem={renderItem}
                        extraData={this.props}
                        showsVerticalScrollIndicator={false}
                        nestedscrollenabled={true}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            )}
            <Modalize
                ref={(DetailModal) => { this.DetailModal = DetailModal; }}
                modalHeight = {windowHeight*4/5}
                childrenStyle = {{backgroundColor:"#f2f2f2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>Group Practice Detail</Text>
                        <IconButton
                            pressHandler={() => {this.DetailModal.close();}}
                            icon={require("@src/assets/img/close.png")}
                            style={{ height: scale(16), width: scale(16) }}
                            touchableStyle={{
                                position:"absolute", top:10, right: 10,
                                height: scale(24),
                                width: scale(24),
                                backgroundColor: "#e6e6e8",
                                alignItems: "center",
                                borderRadius: 100,
                                padding: scale(5),
                            }}
                        />
                    </View>
                }
            >
                <View style={{flex:1, marginHorizontal: 10}}>
                <HTML html={groupPracticeDetail}
                      contentWidth = {windowWidth-80}
                      imagesMaxWidth = {windowWidth}
                      tagsStyles={htmlStyle}
                      ignoredStyles={['height', 'width']}
                      style={{flex:1}}
                      onLinkPress={async (evt, href) => {
                          this.DetailModal.close();
                          setLoading(true);
                          await props.attemptDeepLink(false)(null, href);
                          setLoading(false);
                      }}
                />
                </View>
            </Modalize>
            <Modalize
                ref={(pgHelpModal) => { this.pgHelpModal = pgHelpModal; }}
                modalHeight = {windowHeight*4/5}
                childrenStyle = {{backgroundColor:"#f2f2f2"}}
                handlePosition = "outside"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>{helpData.title}</Text>
                        <IconButton
                            pressHandler={() => {this.pgHelpModal.close();}}
                            icon={require("@src/assets/img/close.png")}
                            style={{ height: scale(16), width: scale(16) }}
                            touchableStyle={{
                                position:"absolute", top:10, right: 10,
                                height: scale(24),
                                width: scale(24),
                                backgroundColor: "#e6e6e8",
                                alignItems: "center",
                                borderRadius: 100,
                                padding: scale(5),
                            }}
                        />
                    </View>
                }
            >
                <View style={{flex: 1, width:windowWidth, marginTop:Platform.OS === 'android'?scale(-100):0}} >
                    <BlockScreen pageId={helpData.id}
                                 contentInsetTop={0}
                                 contentOffsetY={0}
                                 hideTitle={true}
                                 hideNavigationHeader={true}
                                 {...props} />
                </View>
            </Modalize>
            {loading &&
                <BlurView style={styles.loading}
                          blurType="light"
                          blurAmount={5}
                          reducedTransparencyFallbackColor="white"
                >
                    <View>
                        <ActivityIndicator size='large' />
                    </View>
                </BlurView>
            }
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6f6f8',
        width: windowWidth - scale(30),
        marginHorizontal: scale(15),
        marginBottom: scale(15),
        borderRadius: 9,
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    scrollView: {
        width: windowWidth - scale(30),
        flexGrow: 1,
    },
    imageView: {
        width: windowWidth - scale(30),
        borderRadius: 9,
        overflow: 'hidden',
        opacity: 0.8,
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
    description: {
        fontSize: scale(13),
        fontWeight: "500",
        textAlignVertical:"top",
        textAlign:"center",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingTop:0,
        marginBottom: 5,
        color: '#000',
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Helvetica',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tapForDetail: {
        fontWeight:"normal",
        fontSize: scale(10),
        fontStyle: "italic",
    },
    viewTop: {
        padding:10,
        width: windowWidth - scale(30),
        height:scale(100),
        alignItems: "center",
        justifyContent: "space-around",

    },
    viewTopInfo: {
        padding:10,
        width: windowWidth - scale(30),
        height:scale(100),
        alignItems: "center",
        justifyContent: "center",
    },
    viewDetail:{
        justifyContent:"center",
        alignItems:"center",
        height:scale(30),
    },
    viewBottom: {
        height:scale(30),
        width: windowWidth - scale(30),
        justifyContent:"center",
        alignItems: "center",
        padding:10,
    },
    waitTimeLabel:{
        fontSize:scale(20),
        fontWeight: "700",
    },
    waitTime: {
        fontSize:scale(16),
        fontWeight: "700",
    },
    waiting:{
        fontSize:scale(16),
        fontWeight: "700",
        alignSelf:"center",
        textAlign:"center",
        marginVertical:scale(5),
    },
    btnJoin: {
        fontSize: scale(20),
        color:"white",
        borderRadius:9,
        backgroundColor:"#4942e1",
        padding:10,
        marginBottom:scale(10),
    }
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
    groups: state.routinesReducer.groups
});
PracticeGroup.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return({
        headerTitle: navigation.getParam('title'),
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
        headerRight:
            <View style={{flexDirection: "row", justifyContent:"flex-end"}}>
                <TouchableOpacity
                    onPress={() =>  params.toggleHelpModal()}
                >
                    <IconButton
                        icon={require("@src/assets/img/help.png")}
                        tintColor={"#4942e1"}
                        style={{marginRight:25,height: 20}}
                    />
                </TouchableOpacity>
            </View>
    })
}
export default connect(mapStateToProps)(withNavigation(withDeeplinkClickHandler(PracticeGroup)));
