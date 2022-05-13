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
    ImageBackground
} from 'react-native';
import {scale, verticalScale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import * as Progress from 'react-native-progress';
import TouchableScale from "../Components/TouchableScale";
import moment from 'moment';

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
    const redeemVoucher = async (voucherID) => {
        try {
            const apiRequest = getApi(props.config);
            await apiRequest.customRequest(
                "wp-json/onenergy/v1/redeemVoucher",
                "post",
                {"id":voucherID},
                null,
                {},
                false
            ).then(response => {
                if(response.data)
                {
                }
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
        console.log(item);
        return (
        <TouchableScale
            onPress={() => {
            }}
        >
            <View style={[styles.voucherItem,styles.boxShadow]}>
                <ImageBackground style={styles.list} source={{uri: item.image ? item.image : ''}}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.detailBox}>
                        <Text style={styles.subTitle}>{"Expiry Date: "+moment(item.expireDate).format("MMMM Do, YYYY")}</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <TouchableOpacity
                            style={styles.buttonRedeem}
                            onPress={() => {}}
                        >
                            <Text style={styles.redeem}>Redeem</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </TouchableScale>
        )
    };
    return(
        <SafeAreaView style={styles.container}>
            {vouchersLoading?
                <View style={{flex:1, top:0, bottom:0, left:0, right:0, justifyContent:"center", alignItems:"center", flexDirection:"column"}}><Text style={{fontSize:scale(14), color:"#4942e1"}}>Loading</Text><Progress.Bar indeterminate={true} progress={1} size={50} borderColor={"#4942e1"} color={"#4942e1"} /></View>
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
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))/16*9,
        backgroundColor: 'white',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 9,
        justifyContent:"center",
        alignItems:"center",
        overflow: "hidden"
    },
    titleBox:{

    },
    detailBox:{

    },
    buttonBox:{

    },
    title:{
        fontWeight: "500",
        fontSize:scale(18),
    },
    subTitle:{
        fontSize:scale(14),
    },
    buttonRedeem:{
        marginTop:25,
        borderRadius: 5,
        backgroundColor: "green",
        paddingHorizontal:15,
        paddingVertical:5
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
        width: windowWidth-scale(30),
        height: (windowWidth-scale(30))/16*9,
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