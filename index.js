import React from "react";
import HomeScreen from './Screens/HomeScreen';
export const applyCustomCode = externalCodeSetup => {
    externalCodeSetup.navigationApi.addNavigationRoute(
        "homePage",
        "Home",
        HomeScreen,
        "Main" // "Auth" | "noAuth" | "Main" | "All"
    );
};



