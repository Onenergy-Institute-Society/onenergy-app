import React from 'react';
import AuthWrapper from "@src/components/AuthWrapper";
import LoginScreen from "@src/containers/Custom/LoginScreen";

const MyLoginScreen = (props) => {
    return (
        <LoginScreen {...props} />
    )
}

MyLoginScreen.navigationOptions = {
    header: null
}

export default MyLoginScreen;