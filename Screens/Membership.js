import React from 'react';
import {useSelector} from "react-redux";
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Text, Linking,
} from 'react-native';
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import moment from 'moment';
import AuthWrapper from "@src/components/AuthWrapper"; //This line is a workaround while we figure out the cause of the error
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import analytics from '@react-native-firebase/analytics';
import {SvgIconBack} from "../Utils/svg";

const Membership = (props) => {
    const {navigation} = props;
    const user = useSelector((state) => state.user.userObject);
    analytics().logScreenView({
        screen_class: 'MainActivity',
        screen_name: 'Membership Screen',
   });
    let start_date;
    let expiry_date;
    if(user.membership.length > 0){
        if(user.membership[0].plan.slug.includes('-m')){
            start_date = moment(user.membership[0].post.post_date).format('YYYY-MM-DD');
            expiry_date = moment(start_date).add(30, 'day').format('YYYY-MM-DD');
       }
   }
    const LeftContent = props => <Avatar.Icon {...props} icon="folder"/>
    return(
        <SafeAreaView style={styles.container}>
            {user.membership.length > 0 ?
                <>
                    <View style={styles.cardContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.metaContainer}>
                                <View>
                                    <Text style={styles.title}>Membership</Text>
                                    <Text style={styles.description}>{user.membership[0].plan.name}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.metaContainer}>
                                <View>
                                    <Text style={styles.title}>Start from</Text>
                                    <Text style={styles.description}>{start_date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.metaContainer}>
                                <View>
                                    <Text style={styles.title}>Expire on</Text>
                                    <Text style={styles.description}>{expiry_date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
            :
                <>
                    <View style={styles.cardContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.metaContainer}>
                                <View>
                                    <Text style={styles.title}>You have no Membership</Text>
                                    <Text style={styles.description}>Upgrade to Onenergy VIP member to unlock more features only available to members.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnUpgrade}
                                      onPress={async () => {await props.attemptDeepLink(false)(null, 'https://app.onenergy.institute/bbapp/screen/iap_products');}}
                    >
                        <Text style={{color: "white", fontSize:scale(18), paddingHorizontal:15, fontWeight: "700"}}>UPGRADE NOW</Text>
                    </TouchableOpacity>
                </>
           }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:windowWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
   },
    cardContainer: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 9,
        alignSelf: 'center',
        width: windowWidth-scale(30),
        marginTop:scale(15),
   },
    title: {
        color: '#000',
        fontSize: scale(14),
   },
    metaContainer: {
        justifyContent: 'space-between'
   },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
   },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100
   },
    description: {
        color: '#000',
        marginTop: 5,
        fontSize: scale(20)
   },
    button: {
        backgroundColor: '#22d3ee',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 2
   },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14
   },
    btnUpgrade: {
        marginTop:15,
        fontSize: scale(20),
        color:"white",
        borderRadius:9,
        backgroundColor:"#4942e1",
        padding:10,
        marginBottom:scale(10),
   }
});
Membership.navigationOptions = ({navigation, screenProps}) => {
    const {global, colors} = screenProps;
    return {
    title: "My Membership",
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
export default withDeeplinkClickHandler(Membership);