import React, {useEffect} from 'react';
import SignupScreen from "@src/containers/Custom/SignupScreen";

const MySignupScreen = (props) => {
    return (
        <SignupScreen {...props}/>
    )
}

MySignupScreen.navigationOptions = {header: null};

export default MySignupScreen;