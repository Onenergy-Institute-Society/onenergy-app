import React from "react";
import Svg, {Circle, Path} from "react-native-svg";
import {scale} from "./scale";

export const SvgIconMoonPhase = (props) => {
    switch(props.moonPhase) {
        case "New Moon":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#5E35B1" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#311B92" d="M24 4c-6.543 0-12.335 3.157-15.984 8.016C11.358 9.506 15.498 8 20 8c11.045 0 20 8.955 20 20 0 4.502-1.506 8.642-4.016 11.984C40.843 36.335 44 30.543 44 24c0-11.045-8.955-20-20-20z"/>
                    <Path fill="#9575CD" d="M17.5 11.5a3.5 3.5 0 1 1 0 7c-.168 0-.328-.026-.49-.049A3.96 3.96 0 0 0 19 19a4 4 0 0 0 0-8 3.96 3.96 0 0 0-1.99.549c.162-.023.322-.049.49-.049zm18.5 20a2.5 2.5 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.5 2.5 0 0 1 36 31.5zm-24-5a2.5 2.5 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.5 2.5 0 0 1 12 26.5zm10 6c0 1.583-1.058 2.904-2.5 3.338.318.096.65.162 1 .162a3.5 3.5 0 1 0 0-7c-.35 0-.682.066-1 .162 1.442.434 2.5 1.755 2.5 3.338z"/>
                </Svg>
            );
        case "Waxing Crescent":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#5E35B1" d="M24 4C12.955 4 4 12.955 4 24s8.955 20 20 20c0 0 10-6 10-20S24 4 24 4z"/>
                    <Path fill="#FFCA28" d="M36.5 29a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5Z"/>
                    <Path fill="#E5B223" d="M36 31.5a2.5 2.5 0 0 1 1.5-2.289 2.5 2.5 0 1 0 0 4.578A2.5 2.5 0 0 1 36 31.5z"/>
                    <Path fill="#9575CD" d="M18.49 11.5a3.5 3.5 0 1 1 0 7c-.168 0-.328-.026-.49-.049.589.34 1.262.549 1.99.549a4 4 0 0 0 0-8 3.96 3.96 0 0 0-1.99.549c.162-.023.322-.049.49-.049zM13 26.5a2.5 2.5 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.5 2.5 0 0 1 13 26.5zm10 6c0 1.583-1.058 2.904-2.5 3.338.318.096.65.162 1 .162a3.5 3.5 0 1 0 0-7c-.35 0-.682.066-1 .162 1.442.434 2.5 1.755 2.5 3.338z"/>
                </Svg>
            );
        case "First Quarter":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#FFCA28" d="M36.5 29a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5Z"/>
                    <Path fill="#5E35B1" d="M22.5 36a3.5 3.5 0 1 1 0-7c.539 0 1.044.132 1.5.35V4C12.955 4 4 12.955 4 24s8.955 20 20 20v-8.35c-.456.218-.961.35-1.5.35z"/>
                    <Path fill="#E5B223" d="M36 31.5c0-1.023.618-1.902 1.5-2.289A2.495 2.495 0 0 0 34 31.5a2.5 2.5 0 0 0 3.5 2.289A2.502 2.502 0 0 1 36 31.5zm-15 1c0-1.583 1.058-2.904 2.5-3.338a3.443 3.443 0 0 0-1-.162 3.5 3.5 0 1 0 0 7c.35 0 .682-.066 1-.162-1.442-.434-2.5-1.755-2.5-3.338z"/>
                    <Path fill="#9575CD" d="M17.5 11.5a3.5 3.5 0 1 1 0 7c-.168 0-.328-.026-.49-.049.589.34 1.262.549 1.99.549a4 4 0 0 0 0-8 3.96 3.96 0 0 0-1.99.549c.162-.023.322-.049.49-.049zm-4.5 15a2.502 2.502 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.502 2.502 0 0 1 13 26.5z"/>
                </Svg>
            );
        case "Waxing Gibbous":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#FFCA28" d="M36.5 29a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM23 11a4 4 0 1 0 0 8 4 4 0 1 0 0-8zm.5 18a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7z"/>
                    <Path fill="#5E35B1" d="M14.42 28.82c-.285.114-.594.18-.92.18a2.5 2.5 0 1 1 .501-4.95L14 24C14 10 24 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c0 0-7.683-4.611-9.58-15.18z"/>
                    <Path fill="#E5B223" d="M24.5 18.5a3.5 3.5 0 1 1 0-7c.168 0 .328.026.49.049A3.96 3.96 0 0 0 23 11a4 4 0 0 0 0 8 3.96 3.96 0 0 0 1.99-.549c-.162.023-.322.049-.49.049zm11.5 13c0-1.023.618-1.902 1.5-2.289A2.495 2.495 0 0 0 34 31.5a2.5 2.5 0 0 0 3.5 2.289A2.502 2.502 0 0 1 36 31.5zm-14 1c0-1.583 1.058-2.904 2.5-3.338a3.443 3.443 0 0 0-1-.162 3.5 3.5 0 1 0 0 7c.35 0 .682-.066 1-.162-1.442-.434-2.5-1.755-2.5-3.338zm-9-6c0-1.023.618-1.902 1.5-2.289a2.5 2.5 0 1 0 0 4.578A2.502 2.502 0 0 1 13 26.5z"/>
                </Svg>
            );
        case "Full Moon":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#FFD54F" d="M24 4c-6.543 0-12.335 3.157-15.984 8.016C11.358 9.506 15.498 8 20 8c11.045 0 20 8.955 20 20 0 4.502-1.506 8.642-4.016 11.984C40.843 36.335 44 30.543 44 24c0-11.045-8.955-20-20-20z"/>
                    <Path fill="#FFCA28" d="M13.5 24a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zm23 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM21 11a4 4 0 1 0 0 8 4 4 0 1 0 0-8zm1.5 18a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7z"/>
                    <Path fill="#E5B223" d="M22.5 18.5a3.5 3.5 0 1 1 0-7c.168 0 .328.026.49.049A3.96 3.96 0 0 0 21 11a4 4 0 0 0 0 8 3.96 3.96 0 0 0 1.99-.549c-.162.023-.322.049-.49.049zm13.5 13a2.5 2.5 0 0 1 1.5-2.289 2.5 2.5 0 1 0 0 4.578A2.5 2.5 0 0 1 36 31.5zm-23-5a2.5 2.5 0 0 1 1.5-2.289 2.5 2.5 0 1 0 0 4.578A2.5 2.5 0 0 1 13 26.5zm8 6c0-1.583 1.058-2.904 2.5-3.338a3.443 3.443 0 0 0-1-.162 3.5 3.5 0 1 0 0 7c.35 0 .682-.066 1-.162-1.442-.434-2.5-1.755-2.5-3.338z"/>
                </Svg>
            );
        case "Waning Gibbous":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#5E35B1" d="M24 4c11.045 0 20 8.955 20 20s-8.955 20-20 20c0 0 10-6 10-20S24 4 24 4z"/>
                    <Path fill="#FFCA28" d="M13.5 24a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM21 11a4 4 0 1 0 0 8 4 4 0 1 0 0-8zm1.5 18a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7z"/>
                    <Path fill="#E5B223" d="M22.5 18.5a3.5 3.5 0 1 1 0-7c.168 0 .328.026.49.049A3.96 3.96 0 0 0 21 11a4 4 0 0 0 0 8 3.96 3.96 0 0 0 1.99-.549c-.162.023-.322.049-.49.049zm-9.5 8a2.5 2.5 0 0 1 1.5-2.289 2.5 2.5 0 1 0 0 4.578A2.5 2.5 0 0 1 13 26.5zm8 6c0-1.583 1.058-2.904 2.5-3.338a3.443 3.443 0 0 0-1-.162 3.5 3.5 0 1 0 0 7c.35 0 .682-.066 1-.162-1.442-.434-2.5-1.755-2.5-3.338z"/>
                    <Path fill="#9575CD" d="M37 31.5a2.5 2.5 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.5 2.5 0 0 1 37 31.5z"/>
                </Svg>
            );
        case "Last Quarter":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#FFCA28" d="M13.5 24a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5zM21 11a4 4 0 1 0 0 8 4 4 0 1 0 0-8zm1.5 18a3.5 3.5 0 1 0 0 7 3.5 3.5 0 1 0 0-7z"/>
                    <Path fill="#E5B223" d="M22.5 18.5a3.5 3.5 0 1 1 0-7c.168 0 .328.026.49.049A3.96 3.96 0 0 0 21 11a4 4 0 0 0 0 8 3.96 3.96 0 0 0 1.99-.549c-.162.023-.322.049-.49.049zm-9.5 8a2.5 2.5 0 0 1 1.5-2.289 2.5 2.5 0 1 0 0 4.578A2.5 2.5 0 0 1 13 26.5zm8 6c0-1.583 1.058-2.904 2.5-3.338a3.443 3.443 0 0 0-1-.162 3.5 3.5 0 1 0 0 7c.35 0 .682-.066 1-.162-1.442-.434-2.5-1.755-2.5-3.338z"/>
                    <Path fill="#5E35B1" d="M24 4v40c11.045 0 20-8.955 20-20S35.045 4 24 4z"/>
                    <Path fill="#9575CD" d="M35 31.5a2.5 2.5 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.5 2.5 0 0 1 35 31.5z"/>
                </Svg>
            );
        case "Waning Crescent":
            return (
                <Svg width="64" height="64" viewBox="0 0 48 48">
                    <Path fill="#FFE082" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z"/>
                    <Path fill="#5E35B1" d="M24 4s-10 6-10 20l.001.05a2.496 2.496 0 0 1 .419 4.77C16.317 39.389 24 44 24 44c11.045 0 20-8.955 20-20S35.045 4 24 4z"/>
                    <Path fill="#9575CD" d="M19.5 11.5a3.5 3.5 0 1 1 0 7c-.168 0-.328-.026-.49-.049A3.96 3.96 0 0 0 21 19a4 4 0 0 0 0-8 3.96 3.96 0 0 0-1.99.549c.162-.023.322-.049.49-.049zm16.5 20a2.5 2.5 0 0 1-1.5 2.289 2.5 2.5 0 1 0 0-4.578A2.5 2.5 0 0 1 36 31.5zm-13 1c0 1.583-1.058 2.904-2.5 3.338.318.096.65.162 1 .162a3.5 3.5 0 1 0 0-7c-.35 0-.682.066-1 .162 1.442.434 2.5 1.755 2.5 3.338z"/>
                </Svg>
            );
        default:
            return null;
    }
}
export const SvgIconSunrise = () => {
    return (
        <Svg width={scale(48)} height={scale(48)} viewBox="0 0 24 24" style={{marginRight:scale(5)}}>
            <Path d="M17 18a5 5 0 0 0-10 0M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M8 6l4-4 4 4" fill="none" stroke={"#efd23c"} strokeWidth="2" />
        </Svg>
    )
}
export const SvgIconSunset = () => {
    return (
        <Svg width={scale(48)} height={scale(48)} viewBox="0 0 24 24" style={{marginRight: scale(5)}}>
            <Path d="M17 18a5 5 0 0 0-10 0M12 9V2M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M16 5l-4 4-4-4" fill="none" stroke={"#ec5718"} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconMedal = () => {
    return (
        <>
            <Path
                d="M23 13H9a1 1 0 0 0-1 1v16a1 1 0 0 0 1.39.92L16 28.09l6.61 2.83A1 1 0 0 0 23 31a1 1 0 0 0 .55-.17A1 1 0 0 0 24 30V14a1 1 0 0 0-1-1Z"
                fill="#0083fd"/>
            <Path d="M23 13H9a1 1 0 0 0-1 1v8.23a12.94 12.94 0 0 0 16 0V14a1 1 0 0 0-1-1Z"
                  fill="#0072fc"/>
            <Circle cx="16" cy="12" r="11" fill="#ffcb5b"/>
            <Path d="M6 13a11 11 0 0 1 18.25-8.25 11 11 0 1 0-15.5 15.5A10.92 10.92 0 0 1 6 13Z"
                  fill="#f7b737"/>
            <Path
                d="M22.38 10.38a1.9 1.9 0 0 0-1.83-1.33l-2.06.06-.66-2a1.92 1.92 0 0 0-3.66 0l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49L12 13.7l-.65 2a1.89 1.89 0 0 0 .69 2.15 1.93 1.93 0 0 0 2.27 0L16 16.63l1.72 1.25a1.92 1.92 0 0 0 3-2.15L20 13.79l1.72-1.25a1.91 1.91 0 0 0 .66-2.16Z"
                fill="#fff5f5"/>
            <Path
                d="m19.49 10.11 2.06-.06a1.87 1.87 0 0 1 .75.17 1.88 1.88 0 0 0-1.75-1.17h-1.39ZM10.62 11.38a1.9 1.9 0 0 1 1.83-1.33h2.13l.59-2a1.88 1.88 0 0 1 2.58-1.16 1.91 1.91 0 0 0-3.58.16l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49l.42.29a1.91 1.91 0 0 1-.12-1.45ZM12.36 16.73l.65-2-1.08-.73-.57 1.77a1.89 1.89 0 0 0 .69 2.15 2.69 2.69 0 0 0 .38.19 1.87 1.87 0 0 1-.07-1.38Z"
                fill="#efe2dd"/>
        </>
    )
}
export const SvgIconHomeFocused = (props) => {
    return (
        <Path
            d="m19.16 8.04-4-3.57a4.739 4.739 0 0 0-6.32 0l-4 3.57c-1.01.9-1.59 2.19-1.59 3.55v6.36c0 2.1 1.68 3.81 3.75 3.81h10c2.07 0 3.75-1.71 3.75-3.81v-6.36c0-1.35-.58-2.65-1.59-3.55Zm-3.41 10.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-1.24-1.01-2.25-2.25-2.25s-2.25 1.01-2.25 2.25v3c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3C8.25 13.68 9.93 12 12 12s3.75 1.68 3.75 3.75v3Z"
            fill={props.color}
        />
    )
}
export const SvgIconHomeUnfocused = (props) => {
    return (
        <Path
            d="m19.16 8.04-4-3.57a4.739 4.739 0 0 0-6.32 0l-4 3.57c-1.01.9-1.59 2.19-1.59 3.55v6.36c0 2.1 1.68 3.81 3.75 3.81h10c2.07 0 3.75-1.71 3.75-3.81v-6.36c0-1.35-.58-2.65-1.59-3.55Zm-4.91 12.21h-4.5V17c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v3.25Zm5-2.31c0 1.27-1.01 2.31-2.25 2.31h-1.25V17c0-2.07-1.68-3.75-3.75-3.75S8.25 14.93 8.25 17v3.25H7c-1.24 0-2.25-1.03-2.25-2.31v-6.36c0-.93.4-1.81 1.09-2.43l4-3.57a3.24 3.24 0 0 1 4.32 0l4 3.57c.69.62 1.09 1.5 1.09 2.43v6.36Z"
            fill={props.color}
        />
    )
}
