import React from 'react';
import SignupScreen from "@src/containers/Custom/SignupScreen";
import * as Analytics from "../Utils/Analytics";

const MySignupScreen = (props) => {
    Analytics.segmentClient.screen('Signup').then();
    return (
        <SignupScreen {...props}/>
    )
}

MySignupScreen.navigationOptions = {header: null};

export default MySignupScreen;