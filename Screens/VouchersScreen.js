import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import moment from 'moment';
import RNRestart from 'react-native-restart';
import {BlurView} from "@react-native-community/blur";
import ScalableImage from "../Components/ScalableImage";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack} from "../Utils/svg";
import AwesomeAlert from "../Components/AwesomeAlert";

const VouchersScreen = (props) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.titles.find(el => el.id === 'voucher_empty').title
    const user = useSelector((state) => state.user.userObject);
    const [ loading, setLoading ] = useState(false);
    const [vouchers, setVouchers] = useState({});
    const [vouchersLoading, setVouchersLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const [alertConfirmText, setAlertConfirmText] = useState('');
    const dispatch = useDispatch();

    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Voucher Screen',
   });
    const fetchVoucherData = async () => {
        try {
            const apiVoucher = getApi(props.config);
            await apiVoucher.customRequest(
                "wp-json/onenergy/v1/voucher",
                "get",
                {},
                null,
                {},
                false
            ).then(response => {
                setVouchers(response.data);
                setVouchersLoading(false);
           });
       } catch (e) {
            console.error(e);
       }
   }
    useEffect(()=>{
        fetchVoucherData().then();
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'voucher_title').title,
       });
   },[])
    const reloadUser = async () => {
        const apiRequest = getApi(props.config);
        await apiRequest.customRequest(
            "wp-json/wp/v2/users/" + user.id,
            "get",
            {},
            null,
            {},
            false
        ).then(response => {
            if(response.data){
                console.log("response.data", response.data)
                dispatch({
                    type: 'USER_UPDATE_MEMBERSHIP',
                    payload: response.data.membership
                });
                setLoading(false);
                setAlertTitle(optionData.titles.find(el => el.id === 'alert_voucher_membership_activated_title').title);
                setAlertBody(optionData.titles.find(el => el.id === 'alert_voucher_membership_activated_body').title);
                setAlertConfirmText(optionData.titles.find(el => el.id === 'alert_voucher_membership_activated_button').title);
                setShowAlert(true);
            }
        });
    }
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if(item.redeemDate){
                        Alert.alert('Notice', "You have already redeemed this voucher.", [
                            {
                                text: 'OK'
                           }
                        ])
                   }else {
                        Alert.alert('Notice', "Redeem voucher now?", [
                            {
                                text: 'Cancel'
                            },
                            {
                                text: 'OK', onPress:
                                    async () => {
                                        try {
                                            setLoading(true);
                                            const apiRequest = getApi(props.config);
                                            await apiRequest.customRequest(
                                                "wp-json/onenergy/v1/redeemVoucher",
                                                "post",
                                                {"id": item.id},
                                                null,
                                                {},
                                                false
                                            ).then(response => {
                                                if (response.data) {
                                                    if (response.data.result) {
                                                        let voucherIndex = vouchers.findIndex(voucher => voucher.id === item.id);
                                                        let tempVouchers = vouchers;
                                                        tempVouchers[voucherIndex].redeemDate = new moment().format('YYYY-MM-DD');
                                                        setVouchersLoading(true);
                                                        setVouchers(tempVouchers);
                                                        setVouchersLoading(false);
                                                        dispatch({
                                                            type: 'SETTINGS_REMOVE_VOUCHER_NOTIFICATION',
                                                            payload: item.id
                                                        });
                                                        switch (response.data.action) {
                                                            case 'reload':
                                                                reloadUser();
                                                                break;
                                                            case 'restart':
                                                                Alert.alert('Notice', response.data.message, [
                                                                    {text: 'OK', onPress: () => RNRestart.Restart()},
                                                                ]);
                                                                break;
                                                            case 'back':
                                                                Alert.alert('Notice', response.data.message, [
                                                                    {
                                                                        text: 'OK',
                                                                        onPress: () => props.navigation.goBack()
                                                                   },
                                                                ]);
                                                       }
                                                   }
                                               }
                                           });
                                       } catch (e) {
                                            console.error(e);
                                       }
                                   }
                           }
                        ])}
                   }
               }
            >
                <View style={[styles.voucherItem,styles.boxShadow]}>
                    <ScalableImage
                        background={true}
                        width={windowWidth-scale(30)}
                        style={styles.list} source={{uri: item.image ? item.image : ''}}>
                        <Text style={[styles.subTitle,{color:item.color, left:item.left?scale(item.left):null, top:item.top?scale(item.top):null, right:item.right?scale(item.right):null, bottom:item.bottom?scale(item.bottom):null,}]}>{moment(item.expireDate).format("MMMM Do, YYYY")}</Text>
                        {item.redeemDate?
                            <Text style={styles.redeemedText}>REDEEMED</Text>
                        :null}
                    </ScalableImage>
                </View>
            </TouchableOpacity>
        )
   };
    return(
        <SafeAreaView style={styles.container}>
            {vouchersLoading ?
                <ActivityIndicator size="large"/>
                :
                vouchers.length?
                    <FlatList
                        contentContainerStyle={{paddingBottom: scale(20)}}
                        data={vouchers}
                        renderItem={renderItem}
                        keyExtractor = {(item, index) => `${item.title}-${index}`}
                   />
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
           }
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
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={alertTitle}
                message={alertBody}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText={alertConfirmText}
                confirmButtonColor="#4942E1"
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
   },
    list: {
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 9,
        justifyContent:"center",
        alignItems:"center",
        overflow: "hidden"
   },
    subTitle:{
        position: "absolute",
        fontSize:scale(14),
   },
    redeemedText:{
        position: "absolute",
        fontSize:scale(44),
        borderStyle:"solid",
        borderWidth: 1,
        borderColor: "green",
        color: "green",
        transform: [{rotate: '-30deg'}]
   },
    redeem:{
        color:"white",
        fontSize:scale(24),
   },
    voucherItem:{
        marginTop:scale(20),
        marginHorizontal:scale(15),
        backgroundColor: 'white',
        borderRadius: 9,
        paddingVertical: 0,
        paddingHorizontal: 0,
   },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
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
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
VouchersScreen.navigationOptions = ({navigation, screenProps}) => {
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
                onPress={() => {
                    navigation.goBack()
               }}
            >
                <SvgIconBack color = {colors.headerIconColor}/>
            </TouchableOpacity>,
   }
}
export default connect(mapStateToProps)(VouchersScreen);