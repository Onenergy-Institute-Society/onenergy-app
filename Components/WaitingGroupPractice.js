import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";
import {getApi} from "@src/services";
import FastImage from "react-native-fast-image";

const WaitingGroupPractice = props => {
    const {gp_id, gp_time, waitingStyle, waitingIconStyle, waitingTextStyle, waitingIconColor} = props;
    const [waitingNumber, setWaitingNumber] = useState(0);
    const fetchGroupPracticeNumber = async () => {
        try {
            const {customRequest} = getApi(props.config);
            await customRequest(
                "wp-json/onenergy/v1/GroupPractice?gp_id=" + gp_id + "&gp_time=" + gp_time,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "get",       // get, post, patch, delete etc.
                {},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then(response => setWaitingNumber(response.data));
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchGroupPracticeNumber().then();
        let secTimer = setInterval(() => {
            fetchGroupPracticeNumber().then();
        }, 60000)
        return () => clearInterval(secTimer)
    }, []);
    return (
        <View style={waitingStyle}><FastImage tintColor={waitingIconColor}
                                              source={require("@src/assets/img/group_invite.png")}
                                              style={waitingIconStyle}/><Text
            style={waitingTextStyle}>{waitingNumber}</Text></View>
    );
};
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(WaitingGroupPractice);
