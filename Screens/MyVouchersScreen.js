import React, {useEffect, useState} from 'react';
import {getApi} from "@src/services";
import {connect, useSelector} from "react-redux";
import IconButton from "@src/components/IconButton";
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    FlatList,
    ImageBackground, Alert,
    ActivityIndicator,
    Platform,
    Image
} from 'react-native';
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import * as Progress from 'react-native-progress';
import PopupDialog, {ScaleAnimation} from 'react-native-popup-dialog';
import moment from 'moment';
import RNRestart from 'react-native-restart';

const MyVouchersScreen = (props) => {
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const emptyTextIndex = optionData.titles.findIndex(el => el.id === 'voucher_empty');
    const emptyText = optionData.titles[emptyTextIndex].title

    const [vouchers, setVouchers] = useState({});
    const [vouchersLoading, setVouchersLoading] = useState(true);

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
        let titleIndex = optionData.titles.findIndex(el => el.id === 'voucher_title');
        props.navigation.setParams({
            title: optionData.titles[titleIndex].title,
        });
    },[])
    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => {
                    if(item.redeemDate){
                        Alert.alert('Notice', "You have already redeemed this voucher?", [
                            {
                                text: 'OK'
                            }
                        ])
                    }else {
                        Alert.alert('Notice', "Redeem voucher now?", [
                            {
                                text: 'OK', onPress:
                                    async () => {
                                        try {

                                            this.savingDialog.show();
                                            const apiRequest = getApi(props.config);
                                            await apiRequest.customRequest(
                                                "wp-json/onenergy/v1/redeemVoucher",
                                                "post",
                                                {"id": item.id},
                                                null,
                                                {},
                                                false
                                            ).then(response => {
                                                this.savingDialog.dismiss();
                                                if (response.data) {
                                                    if (response.data.result) {
                                                        switch (response.data.action) {
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
                            },
                            {
                                text: 'Cancel'
                            }
                        ])}
                    }
                }
            >
                <View style={[styles.voucherItem,styles.boxShadow, {width: windowWidth-scale(30), height: (windowWidth-scale(30))/parseInt(item.width)*parseInt(item.height),}]}>
                    <ImageBackground style={[styles.list,{width: windowWidth-scale(30), height: (windowWidth-scale(30))/parseInt(item.width)*parseInt(item.height),}]} source={{uri: item.image ? item.image : ''}}>
                        <Text style={[styles.subTitle,{color:item.color}]}>{moment(item.expireDate).format("MMMM Do, YYYY")}</Text>
                        {item.redeemDate?
                            <Text style={styles.redeemedText}>REDEEMED</Text>
                        :null}
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    };
    return(
        <SafeAreaView style={styles.container}>
            {vouchersLoading ?
                Platform.OS === 'android' ?
                    <View style={{
                        flex: 1,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column"
                    }}><Text style={{fontSize: scale(14), color: "#4942e1"}}>Loading</Text><Progress.Bar
                        indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"}/></View>
                    :
                    <ActivityIndicator size="large"/>
                :
                vouchers.length?
                    <FlatList
                        data={vouchers} renderItem={renderItem} keyExtractor={item => item.id}
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
            <PopupDialog
                ref={(savingDialog) => { this.savingDialog = savingDialog; }}
                width = {windowWidth*2/3}
                height = {windowWidth/5}
                dialogAnimation = {new ScaleAnimation()}
            >
                <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Redeeming</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
            </PopupDialog>
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
        right: scale(20),
        bottom: scale(20),
        fontSize:scale(14),
    },
    redeemedText:{
        position: "absolute",
        fontSize:scale(44),
        borderStyle:"solid",
        borderWidth: 1,
        borderColor: "green",
        color: "green",
        transform: [{ rotate: '-30deg'}]
    },
    redeem:{
        color:"white",
        fontSize:scale(24),
    },
    voucherItem:{
        marginTop:verticalScale(20),
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
});
const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
});
MyVouchersScreen.navigationOptions = ({navigation}) => ({
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
export default connect(mapStateToProps)(MyVouchersScreen);