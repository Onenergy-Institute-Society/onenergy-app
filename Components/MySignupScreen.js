import React from 'react';
import AuthWrapper from "@src/components/AuthWrapper";
import SignupScreen from "@src/containers/Custom/SignupScreen";

const MySignupScreen = (props) => {
    return (
        <SignupScreen {...props}/>
    )
}

MySignupScreen.navigationOptions = {header: null};

export default MySignupScreen;