import React, {useState, useEffect, useRef} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {
    Alert,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ActivityIndicator
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {windowWidth} from "../Utils/Dimensions";
import {scale} from '../Utils/scale';
import Recaptcha from "../Components/Recaptcha";
import {BlurView} from "@react-native-community/blur";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack, SvgIconCheck, SvgIconCross} from "../Utils/svg";

const FeedbackScreen = props => {
    const {screenProps} = props;
    const {global, colors} = screenProps
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [ loading, setLoading ] = useState(false);
    const [content, setContent] = useState('');
    const [department, setDepartment] = useState(null);
    const [subject, setSubject] = useState('');
    const recaptcha = useRef();
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Feedback Screen',
   });
    const departments = optionData.departments;

    const sendFeedback = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/support",
                "post",
                {"department":department.id, "subject":subject, "content":content},
                null,
                {},
                false
            ).then(response => {
                if(response.data.status) {
                    setLoading(false);
                    Alert.alert('Notice', 'Support ticket created successfully, we will reply to your email shortly.', [
                        {text: 'OK', onPress: () => props.navigation.goBack()},
                    ]);
                }else{
                    setLoading(false);
                    Alert.alert('Notice', 'Support ticket created failed, please contact through email support@onenergy.institute', [
                        {text: 'OK', onPress: () => props.navigation.goBack()},
                    ]);
                }
           });
       } catch (e) {
            console.error(e);
       }
   }
    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'feedback_title').title,
            onSendPress: onSendPress
       });
   }, [])
    const onSendPress = () => {
        if (department === '') {
            alert('Please choose a department.');
            return false;
       }
        if (subject === '') {
            alert('Please type the subject.');
            return false;
       }
        if (content === '') {
            alert('Please type the message.');
            return false;
       }
        recaptcha.current.open();
   }
    const onVerify = token => {
        setLoading(true);
        sendFeedback().then();
   }
    const onError = (err) => {
        console.warn(err);
   }
    const renderDepartment = (item) => {
        let cornerStyle = {};
        let bottomStyle = {};
        switch(item.index)
        {
            case 0:
                cornerStyle = {borderTopLeftRadius:9, borderTopRightRadius:9, marginTop:25};
                bottomStyle = {borderBottomWidth:1, borderBottomColor:'#E6E6E8'};
                break;
            case 3:
                cornerStyle = {borderBottomLeftRadius:9, borderBottomRightRadius:9, marginBottom:25};
                break;
            default:
                bottomStyle = {borderBottomWidth:1, borderBottomColor:'#E6E6E8'};
                break;
       }
        return (
            <TouchableWithoutFeedback onPress={() => {setDepartment(item.item);this.departmentDialog.close();}}>
                <View style={[cornerStyle, bottomStyle, {paddingHorizontal:25, backgroundColor:colors.bodyBg, paddingVertical:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <Text
                        style={global.text}>
                        {item.item.name}
                    </Text>
                    {department&&department.id === item.item.id?(
                        <SvgIconCheck size={24} color={colors.primaryColor}/>
                    ):null}
                </View>
            </TouchableWithoutFeedback>
        )
   }
    return (
        <SafeAreaView style={global.container}>
            <View style={styles.ContainerStyle}>
                <View style={styles.listContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => {Keyboard.dismiss();this.departmentDialog.open();}}>
                        <View style={styles.content}>
                            <Text style={[global.text, { paddingLeft:15, opacity: department ? 1 : 0.4 }]}>
                                {department?department.name:"Choose a department"}
                            </Text>
                            <View>
                                <Image style={{marginRight:25,tintColor:"#4942e1"}} source={require("@src/assets/img/arrow-down.png")}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TextInput
                    style={[global.text, styles.inputContentLine, { opacity: subject.length ? 1 : 0.4 }]}
                    multiline={false}
                    numberOfLines={1}
                    placeholder={"Type your subject"}
                    placeholderTextColor="#262626"
                    onChangeText={(text) => setSubject(text)}
                    value={subject}/>
                <TextInput
                    style={[global.text, styles.inputContent, { opacity: content.length ? 1 : 0.4 }]}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={"Please write your question"}
                    placeholderTextColor="#262626"
                    onChangeText={(text) => setContent(text)}
                    value={content}/>
                <TouchableOpacity
                    onPress={() => {Keyboard.dismiss();onSendPress();}}
                >
                    <View style={{borderRadius:9, height:scale(40), width:windowWidth-scale(30), marginTop:15, justifyContent:"center", alignItems:"center", backgroundColor:colors.primaryButtonBg, paddingVertical:10}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 16,
                            color: "white"
                       }}>Send</Text>
                    </View>
                </TouchableOpacity>
                <Recaptcha
                    ref={recaptcha}
                    siteKey="6LcFHZYfAAAAAJse3WDaZeQufd2-e-BVqF_oJQbK"
                    baseUrl="https://app.onenergy.institute"
                    onVerify={onVerify}
                    onError={onError}
                    size="invisible"
                    enterprise
               />
            </View>
            <Modalize
                ref={(departmentDialog) => {this.departmentDialog = departmentDialog;}}
                modalStyle={{backgroundColor:colors.bodyFrontBg}}
                childrenStyle={{padding:25}}
                adjustToContentHeight = "true"
                withHandle = "false"
                HeaderComponent={
                    <View style={{
                        padding: scale(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                   }}>
                        <Text style={{fontSize: scale(24), color: colors.headerColor, fontFamily: "MontserratAlternates-SemiBold", fontWeight: "bold"}}>Department</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.departmentDialog.close();
                           }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
               }
                FooterComponent={
                    <View style={{height: 25}}/>
               }
                flatListProps = {{
                    data:departments,
                    renderItem:renderDepartment,
                    keyExtractor:(item, index) => `${item}-${index}`,
                    showsVerticalScrollIndicator: false,
               }}
           />
            {loading &&
            <BlurView style={styles.loading}
                      blurType="light"
                      blurAmount={5}
                      reducedTransparencyFallbackColor="white"
            >
                <View>
                    <ActivityIndicator size='large'/>
                </View>
            </BlurView>
           }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
   },
    ContainerStyle: {
        flex: 1,
        justifyContent:"flex-start",
        alignItems: "flex-start",
        paddingHorizontal:15,
   },
    title: {
        fontSize: scale(16),
        fontWeight: "bold",
        textAlign: 'left',
        color: 'black',
        fontFamily: 'MontserratAlternates-SemiBold',
   },
    inputContentLine:{
        width: windowWidth - scale(30),
        height: scale(40),
        borderRadius: 9,
        borderWidth:1,
        borderColor: "#8c79ea",
        backgroundColor: "#ffffff",
        paddingLeft:15,
        marginTop:15,
        textAlignVertical: "top",
   },
    inputContent:{
        width: windowWidth - scale(30),
        height:scale(180),
        borderRadius: 9,
        borderWidth:1,
        borderColor: "#8c79ea",
        backgroundColor: "#ffffff",
        paddingLeft:15,
        marginTop:15,
        textAlignVertical: "top",
   },
    listContainer:{
        width: windowWidth-scale(30),
        aspectRatio:8,
        flexDirection:'row',
        marginTop:15,
        borderRadius:9,
        borderWidth:1,
        borderColor: "#8c79ea",
        backgroundColor: "#ffffff",
        justifyContent:'space-between',
        alignItems:'center',
        overflow:'hidden',
   },
    content:{
        flex:5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
   },
    department:{
        fontSize: scale(18),
        color: '#262626',
        paddingLeft: 10,
        flex:4,
        fontWeight:"bold",
        fontFamily: 'Montserrat-SemiBold',
   },
    subject:{
        fontSize: scale(18),
        color: '#262626',
        paddingLeft: 10,
        flex:4,
        fontWeight:"normal",
        fontFamily: 'Montserrat-Regular',
   },
});
FeedbackScreen.navigationOptions = ({navigation, screenProps}) => {
    const {params = {}} = navigation.state;
    const {colors, global} = screenProps;
    return({
        headerTitle: params.title?params.title:navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
       },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <View style={{flexDirection: "row", justifyContent:"flex-start", alignItems: "center"}}>
                    <SvgIconBack color = {colors.headerIconColor}/>
                    <Text style={{
                        fontSize: 16,
                        color: screenProps.colors.headerIconColor
                   }}>Back</Text>
                </View>
            </TouchableOpacity>
   })
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(FeedbackScreen);