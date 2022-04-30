import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
} from "react-native";
import {connect} from "react-redux";
import {getApi} from "@src/services";
import {scale} from "../Utils/scale";

const WaitingGroupPractice = props => {
    const { gp_id, gp_time, waitingStyle, waitingText } = props;
    const [waitingNumber, setWaitingNumber] = useState(0);
    const fetchGroupPracticeNumber = async () => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/onenergy/v1/GroupPractice?gp_id="+gp_id+"&gp_time="+gp_time,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
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
    useEffect(() =>{
        fetchGroupPracticeNumber().then();
    });
    return (
        <Text style={waitingStyle}>{waitingNumber} {waitingText}</Text>
    );
};
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
export default connect(mapStateToProps)(WaitingGroupPractice);
