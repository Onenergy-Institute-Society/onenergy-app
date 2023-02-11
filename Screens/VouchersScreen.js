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
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {mvs, s, windowWidth} from "../Utils/Scale";
import moment from 'moment';
import RNRestart from 'react-native-restart';
import {BlurView} from "@react-native-community/blur";
import ScalableImage from "../Components/ScalableImage";
import {SvgIconBack} from "../Utils/svg";
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Analytics from "../Utils/Analytics";

const VouchersScreen = (props) => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const emptyText = optionData.helps.find(el => el.name === 'voucher_empty');
    const user = useSelector((state) => state.user.userObject);
    const [ loading, setLoading ] = useState(false);
    const [vouchers, setVouchers] = useState({});
    const [vouchersLoading, setVouchersLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBody, setAlertBody] = useState('');
    const [alertConfirmText, setAlertConfirmText] = useState('');
    const dispatch = useDispatch();

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
        Analytics.segmentClient.screen('Voucher').then();
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
                                                        let voucherIndex = vouchers.findIndex(voucher => parseInt(voucher.id) === parseInt(item.id));
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
                        width={windowWidth-s(30)}
                        style={styles.list} source={{uri: item.image ? item.image : ''}}>
                        <Text style={[styles.subTitle,{color:item.color, left:item.left?s(item.left):null, top:item.top?s(item.top):null, right:item.right?s(item.right):null, bottom:item.bottom?s(item.bottom):null,}]}>{moment(item.expireDate).format("MMMM Do, YYYY")}</Text>
                        {item.redeemDate?
                            <Text style={styles.redeemedText}>{optionData.titles.find(el => el.id === 'voucher_redeemed').title}</Text>
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
                        contentContainerStyle={{paddingBottom: mvs(20)}}
                        data={vouchers}
                        renderItem={renderItem}
                        keyExtractor = {(item, index) => `${item.title}-${index}`}
                   />
                    :
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <BlockScreen pageId={emptyText.id}
                                     contentInsetTop={0}
                                     contentOffsetY={0}
                                     hideTitle={true}
                                     hideNavigationHeader={true}
                                     {...props}/>
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
        borderRadius:s(9),
        justifyContent:"center",
        alignItems:"center",
        overflow: "hidden"
   },
    subTitle:{
        position: "absolute",
        fontSize:s(14),
   },
    redeemedText:{
        position: "absolute",
        fontSize:s(44),
        borderStyle:"solid",
        borderWidth: 1,
        borderColor: "green",
        color: "green",
        transform: [{rotate: '-30deg'}]
   },
    redeem:{
        color:"white",
        fontSize:s(24),
   },
    voucherItem:{
        marginTop:mvs(20),
        marginHorizontal:s(15),
        backgroundColor: 'white',
        borderRadius:s(9),
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