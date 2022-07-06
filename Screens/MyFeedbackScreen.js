import React, {useState, useEffect, useRef} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import {
    Alert,
    TouchableOpacity,
    Platform,
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
import { Modalize } from 'react-native-modalize';
import {windowWidth, windowHeight} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import { scale } from '../Utils/scale';
import Recaptcha from "../Components/Recaptcha";
import { BlurView } from "@react-native-community/blur";

const MyFeedbackScreen = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [ loading, setLoading ] = useState(false);
    const [content, setContent] = useState('');
    const [subject, setSubject] = useState('Choose a subject');
    const recaptcha = useRef();

    const subjects = optionData.subjects;
    const sendFeedback = async () => {
        try {
            const apiSlide = getApi(props.config);
            await apiSlide.customRequest(
                "wp-json/onenergy/v1/feedback",
                "post",
                {"subject":subject, "content":content},
                null,
                {},
                false
            ).then(response => {
                if(response.data)
                    setLoading(false);
                    Alert.alert('Notice', 'Feedback sent successfully, we will reply you shortly.', [
                        {text: 'OK', onPress: () => props.navigation.goBack()},
                    ]);
            });
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        let titleIndex = optionData.titles.findIndex(el => el.id === 'feedback_title');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
            onSendPress: onSendPress
        });
    }, [])
    const onSendPress = () => {
        if (subject === 'Choose a subject') {
            alert('Please choose a subject.');
            return false;
        }
        if (content === '') {
            alert('Please write the message.');
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
    const renderSubject = (item) => {
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
            <TouchableWithoutFeedback onPress={() => {setSubject(item.item);this.subjectDialog.close();}}>
                <View style={[cornerStyle, bottomStyle, {paddingHorizontal:25, backgroundColor:"#F2F2F2", paddingVertical:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <Text
                        style={{fontSize:18}}>
                        {item.item}
                    </Text>
                    {subject === item.item?(
                        <IconButton
                            icon={require("@src/assets/img/check-simple.png")}
                            tintColor={"#4942e1"}
                            style={{ height: 20, width: 20 }}
                        />
                    ):null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.ContainerStyle}>
                <View style={styles.listContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => {Keyboard.dismiss();this.subjectDialog.open();}}>
                        <View style={styles.content}>
                                <Text style={styles.subject}>
                                    {subject}
                                </Text>
                            <View>
                                <Image style={{marginRight:25,tintColor:"#4942e1"}} source={require("@src/assets/img/arrow-down.png")} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TextInput
                    style={styles.inputContent}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={"Write your feedback"}
                    onChangeText={(text) => setContent(text)}
                    value={content} />
                <Recaptcha
                    ref={recaptcha}
                    siteKey="6LcFHZYfAAAAAJse3WDaZeQufd2-e-BVqF_oJQbK"
                    baseUrl="https://app.onenergy.institute"
                    onVerify={onVerify}
                    onError={onError}
/*
                    onLoad={() => alert('onLoad event')}
                    onClose={() => alert('onClose event')}
                    onExpire={() => alert('onExpire event')}
*/
                    size="invisible"
                    enterprise
                />
                <TouchableOpacity
                    onPress={() => {Keyboard.dismiss();onSendPress();}}
                >
                    <View style={{borderRadius:9, width:windowWidth-scale(30), marginTop:15, justifyContent:"center", alignItems:"center", backgroundColor:"#4942e1",paddingVertical:10}}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "white"
                            }}>Send</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Modalize
                ref={(subjectDialog) => { this.subjectDialog = subjectDialog; }}
                modalStyle={{backgroundColor:"#E6E6E8"}}
                childrenStyle={{padding:25}}
                adjustToContentHeight = "true"
                withHandle = "false"
                HeaderComponent={
                    <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                        <Text style={{fontSize:24}}>Subject</Text>
                        <IconButton
                            pressHandler={() => {this.subjectDialog.close();}}
                            icon={require("@src/assets/img/close.png")}
                            tintColor={"#838384"}
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
                        /></View>
                }
                FooterComponent={
                    <View style={{height: 25}}/>
                }
                flatListProps = {{
                    data:subjects,
                    renderItem:renderSubject,
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
                    <ActivityIndicator size='large' />
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
        paddingVertical:25,
    },
    title: {
        fontSize: scale(16),
        fontWeight: "bold",
        textAlign: 'left',
        color: 'black',
        fontFamily: Platform.OS === 'android'
            ? 'Roboto' : 'Avenir-Roman',
    },
    inputContent:{
        width: windowWidth - scale(30),
        height:160,
        fontSize: 18,
        borderRadius: 9,
        backgroundColor: "#e6e6e8",
        paddingLeft:15,
        marginTop:15,
        textAlignVertical: "top",
    },
    listContainer:{
        width:windowWidth-scale(30),
        aspectRatio:8,
        flexDirection:'row',
        marginVertical:15,
        marginBottom:5,
        borderRadius:9,
        borderWidth:1,
        borderColor: "#c6c6c8",
        backgroundColor: "rgba(250,250,250,1)",
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
    subject:{
        fontSize: 18,
        paddingLeft: 10,
        flex:4,
    },
});
MyFeedbackScreen.navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return({
        headerTitle: params.title?params.title:navigation.getParam('title'),
        headerLeft:
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <View style={{flexDirection: "row", justifyContent:"flex-start", alignItems: "center"}}>
                    <IconButton
                        icon={require("@src/assets/img/arrow-back.png")}
                        tintColor={"#4942e1"}
                        style={{
                            tintColor: "#4942e1",
                            height: scale(16),
                            marginLeft: scale(16)
                        }}
                    />
                    <Text style={{
                        fontSize: 16,
                        color: "#4942e1"
                    }}>Back</Text>
                </View>
            </TouchableOpacity>
    })
}
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(MyFeedbackScreen);