import React from "react";
import Svg, {Circle, Path, Rect} from "react-native-svg";
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
            <Path d="M17 18a5 5 0 0 0-10 0M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42M23 22H1M8 6l4-4 4 4" fill="none" stroke={"#efd23c"} strokeWidth="2"/>
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
export const SvgIconBack = (props) => {
    return (
        <Svg width={scale(32)} height={scale(32)} viewBox="0 0 24 24" style={{marginLeft: scale(10)}}>
            <Path d="m15 18-6-6 6-6" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconMedal = () => {
    return (
        <Svg width="48" height="48" viewBox="0 0 32 32">
            <Path d="M23 13H9a1 1 0 0 0-1 1v16a1 1 0 0 0 1.39.92L16 28.09l6.61 2.83A1 1 0 0 0 23 31a1 1 0 0 0 .55-.17A1 1 0 0 0 24 30V14a1 1 0 0 0-1-1Z" fill="#0083fd"/>
            <Path d="M23 13H9a1 1 0 0 0-1 1v8.23a12.94 12.94 0 0 0 16 0V14a1 1 0 0 0-1-1Z" fill="#0072fc"/>
            <Circle cx="16" cy="12" r="11" fill="#ffcb5b"/>
            <Path d="M6 13a11 11 0 0 1 18.25-8.25 11 11 0 1 0-15.5 15.5A10.92 10.92 0 0 1 6 13Z" fill="#f7b737"/>
            <Path d="M22.38 10.38a1.9 1.9 0 0 0-1.83-1.33l-2.06.06-.66-2a1.92 1.92 0 0 0-3.66 0l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49L12 13.7l-.65 2a1.89 1.89 0 0 0 .69 2.15 1.93 1.93 0 0 0 2.27 0L16 16.63l1.72 1.25a1.92 1.92 0 0 0 3-2.15L20 13.79l1.72-1.25a1.91 1.91 0 0 0 .66-2.16Z" fill="#fff5f5"/>
            <Path d="m19.49 10.11 2.06-.06a1.87 1.87 0 0 1 .75.17 1.88 1.88 0 0 0-1.75-1.17h-1.39ZM10.62 11.38a1.9 1.9 0 0 1 1.83-1.33h2.13l.59-2a1.88 1.88 0 0 1 2.58-1.16 1.91 1.91 0 0 0-3.58.16l-.59 2h-2.13a1.93 1.93 0 0 0-1.13 3.49l.42.29a1.91 1.91 0 0 1-.12-1.45ZM12.36 16.73l.65-2-1.08-.73-.57 1.77a1.89 1.89 0 0 0 .69 2.15 2.69 2.69 0 0 0 .38.19 1.87 1.87 0 0 1-.07-1.38Z" fill="#efe2dd"/>
        </Svg>
    )
}
export const SvgIconHomeFocused = (props) => {
    return (
        <Svg width="30" height="30" viewBox="0 0 24 24">
            <Path d="m19.16 8.04-4-3.57a4.739 4.739 0 0 0-6.32 0l-4 3.57c-1.01.9-1.59 2.19-1.59 3.55v6.36c0 2.1 1.68 3.81 3.75 3.81h10c2.07 0 3.75-1.71 3.75-3.81v-6.36c0-1.35-.58-2.65-1.59-3.55Zm-3.41 10.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-1.24-1.01-2.25-2.25-2.25s-2.25 1.01-2.25 2.25v3c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3C8.25 13.68 9.93 12 12 12s3.75 1.68 3.75 3.75v3Z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconHomeUnfocused = (props) => {
    return (
        <Svg width="30" height="30" viewBox="0 0 24 24">
            <Path d="m19.16 8.04-4-3.57a4.739 4.739 0 0 0-6.32 0l-4 3.57c-1.01.9-1.59 2.19-1.59 3.55v6.36c0 2.1 1.68 3.81 3.75 3.81h10c2.07 0 3.75-1.71 3.75-3.81v-6.36c0-1.35-.58-2.65-1.59-3.55Zm-4.91 12.21h-4.5V17c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25v3.25Zm5-2.31c0 1.27-1.01 2.31-2.25 2.31h-1.25V17c0-2.07-1.68-3.75-3.75-3.75S8.25 14.93 8.25 17v3.25H7c-1.24 0-2.25-1.03-2.25-2.31v-6.36c0-.93.4-1.81 1.09-2.43l4-3.57a3.24 3.24 0 0 1 4.32 0l4 3.57c.69.62 1.09 1.5 1.09 2.43v6.36Z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconProgramFocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 512 512">
            <Path d="M88.772 385.787c-12.01 0-21.781 9.771-21.781 21.782s9.771 21.781 21.781 21.781 21.782-9.771 21.782-21.781-9.772-21.782-21.782-21.782z" fill={props.color}/>
            <Path d="M177.544 407.568c0-48.949-39.823-88.772-88.772-88.772S0 358.619 0 407.568s39.823 88.771 88.772 88.771 88.772-39.822 88.772-88.771zM88.772 459.35c-28.552 0-51.781-23.229-51.781-51.781 0-28.553 23.229-51.782 51.781-51.782 28.553 0 51.782 23.229 51.782 51.782 0 28.552-23.229 51.781-51.782 51.781z" fill={props.color}/>
            <Path d="M491.361 97.918H207.544v309.65c0 45.059-25.223 84.338-62.29 104.46h346.107c11.435 0 20.704-9.27 20.704-20.704V118.622c0-11.434-9.269-20.704-20.704-20.704zM269.404 464.28c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm60.618 281.779c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zM390.64 464.28c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm60.618 281.779c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.355c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm0-56.356c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z" fill={props.color}/>
            <Path d="M177.544 88.809c0-48.949-39.823-88.772-88.772-88.772S0 39.859 0 88.809v239.946c21.772-24.496 53.498-39.958 88.772-39.958s67 15.462 88.772 39.958z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconProgramUnfocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)}viewBox="0 0 512 512">
            <Path d="M497.018 102.758H219.872C216.108 45.464 168.304 0 110.074 0 49.395 0 .028 49.366.028 110.045V402c0 60.68 49.366 110.046 110.045 110.046h386.944c8.284 0 15-6.716 15-15V117.758c.001-8.284-6.715-15-14.999-15zm-466.99 7.287C30.028 65.908 65.937 30 110.074 30c44.138 0 80.046 35.908 80.046 80.045v216.521c-20.08-21.296-48.536-34.612-80.046-34.612s-59.965 13.316-80.045 34.612V110.045zm0 291.955c0-44.137 35.908-80.045 80.045-80.045 44.138 0 80.046 35.908 80.046 80.045 0 44.138-35.908 80.046-80.046 80.046-44.136 0-80.045-35.908-80.045-80.046zm451.99 80.046h-296.51c21.296-20.08 34.612-48.536 34.612-80.046V132.758h261.898z" fill={props.color}/>
            <Path d="M158.763 402c0-26.847-21.842-48.688-48.689-48.688S61.386 375.154 61.386 402s21.842 48.688 48.688 48.688c26.847.001 48.689-21.841 48.689-48.688zm-67.378 0c0-10.305 8.384-18.688 18.688-18.688 10.305 0 18.689 8.384 18.689 18.688s-8.384 18.688-18.689 18.688c-10.304.001-18.688-8.383-18.688-18.688zM266.347 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM266.347 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM321.857 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM377.367 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 164.819h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 216.589h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 268.359h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 320.129h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 371.899h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15zM432.878 423.669h-.01c-8.284 0-14.995 6.716-14.995 15s6.721 15 15.005 15c8.285 0 15-6.716 15-15s-6.715-15-15-15z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconQiGongFocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 512 512">
            <Path d="M206 6c-27.3 2.4-57 12.3-81.9 27.2C102.7 46 76.7 68.8 60.6 89c-6.8 8.6-21 29.4-26.2 38.5l-2.8 4.9 7.8-6.6c60.4-51.6 146.4-59 224.2-19.3 24 12.3 45.7 28.5 63.7 47.6l9.6 10.1 2-6.5c3.5-11.4 5.3-21.9 6-34.2.8-15.1-.2-25.9-3.4-37.2C328.1 39 284 8.2 226 5.7c-5.8-.3-14.8-.1-20 .3zM356.6 26.2c41.4 40.3 75.3 101 94 168.3 23.5 84.7 20.3 170.7-8.6 230.9-2.6 5.5-4.7 10.2-4.5 10.4.5.5 17.9-19.9 24.2-28.4 13.5-18.3 26.9-43.3 34.8-64.8 10.7-29.2 16.4-65.2 15.1-96.1-1.7-38.9-9.9-71.2-27.2-106-25.7-51.9-70.5-94.9-123.3-118.4-5.9-2.7-11.8-5.2-13-5.6-1.2-.3 2.7 4 8.5 9.7z" fill={props.color}/>
            <Path d="M339.4 39c.8 1.4 3.4 5.2 5.6 8.5 12.2 18 20 44.1 20 67 0 45.3-13.4 80.2-41.6 108.8-18.6 18.8-39.8 32.1-68.7 43-19.4 7.3-33.6 16.7-48.8 32-19.9 20.1-33.5 45.7-37 69.7-1.4 10-.7 28.4 1.5 39 10.2 47.8 46 86.5 89.1 96.5 37.7 8.8 84.6-3.1 118.8-29.9 36.3-28.4 58.2-73.1 65.2-133.1 2-17 2-52.1 0-71.3-8.9-85.9-45.2-170-96-222.7-5.4-5.5-9-8.9-8.1-7.5zm54.2 185.7c7.4 3.6 15.6 12.5 18.5 20 3.1 8.1 3 19.6-.1 27.8-3.2 8.4-13.2 18.3-21.4 21.4-6.2 2.3-16.1 3-22.6 1.6-10.3-2.2-21-11.1-25.8-21.3-2.4-5-2.7-7-2.7-15.7 0-8.8.3-10.7 2.7-15.7 8.9-19.1 32.5-27.4 51.4-18.1zm-81.1 90.7c29.8 10.1 48.5 35.9 48.7 67.1.1 12.1-1.7 20-7.2 31-11.6 23.7-32.8 37.7-59.1 39.2-11.5.7-20.2-.7-30.1-4.7-16.2-6.6-28.7-18.2-36.3-33.5-5.9-11.8-7.8-19.6-7.8-32 0-33.6 22.5-61.4 55.8-69.1 9.6-2.2 26.2-1.3 36 2z" fill={props.color}/>
            <Path d="M372.4 239c-9.3 2.2-15.4 9.9-15.4 19.4 0 10.8 6.2 18 17.1 20.1 7.3 1.4 16.8-3.6 20.4-10.5 7.7-15-6-32.9-22.1-29zM279.3 334.4c-25 6.1-42 32.2-37 56.9 2.1 10.3 5.9 17.8 12.8 25.1 23.7 25.3 64.7 19.1 80.2-12.2l4.2-8.5v-13.1c0-13.1 0-13.1-3.7-20.9-10.3-21.4-33.8-32.8-56.5-27.3zM141.6 103.1c-32.8 3.8-62.7 16.9-89.4 39.3-8 6.7-22.1 21.2-23 23.5-.1.5 3.2-.2 7.5-1.4 27.9-8.1 57.9-7.8 86.8.7 11.5 3.4 30.8 12.5 41 19.3 23.1 15.6 42.7 37.4 55.6 61.9l5.3 10.2 7.5-3.8c4.1-2.1 10.5-4.7 14.1-5.9 17-5.4 41-19.6 56.4-33.2 6.8-6 18-19.4 21.2-25.2l1.8-3.3-4.3-5.6c-2.4-3-8.3-9.6-13.2-14.5-44.3-44.5-109.6-68.7-167.3-62z" fill={props.color}/>
            <Path d="M51.5 180.5c-12.9 2.1-34.5 8.6-34.5 10.4 0 .4 1.5 1.4 3.3 2.3 10 4.8 30.1 22.4 41 35.8 19.8 24.5 34.6 52.9 60.7 115.9 14.6 35.4 25 59.2 26.3 60.6.6.7.7.1.3-1.5-1.7-6-1.8-30.5-.2-40.5 5.2-31.3 21.4-60.1 48.3-85.4l10.6-10-3.7-7.8c-18.8-39.5-56.8-69-101.3-78.4-13-2.8-38.1-3.4-50.8-1.4zM3.1 216.7c-4.5 30.5-3.8 59.1 2.4 89.9 18 89.5 82.5 162.2 170 191.5 7.7 2.6 14.1 4.6 14.3 4.5.1-.2-3.9-4.3-8.9-9.2-25.3-24.8-43.2-55.8-71.4-123.9-29.8-72-36.9-86.9-54.1-112.7-9-13.4-22.8-28.9-32.4-36.3C17.4 216.2 6.1 209 4.9 209c-.4 0-1.2 3.5-1.8 7.7z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconQiGongUnfocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 512 512">
            <Path d="M230 1.5C169.8 8.1 118 32.9 75.4 75.4 32.6 118.3 7.9 170.1 1.5 230.8c-5.7 53.7 7.3 111.1 35.7 157.7 20.8 34 52.3 65.5 86.3 86.3 46.5 28.4 104.1 41.4 157.5 35.7 32.6-3.4 58.5-10.9 87.5-25 51.3-25 93.8-67.9 118.4-119.5 33.3-70.1 33.3-149.8 0-220-20.9-43.9-56.4-83.1-98.4-108.8C341.9 8.8 283.5-4.4 230 1.5zm21 24.3c38 8.1 65.6 28.5 79.6 58.8 5.8 12.5 7.6 21 8.1 37.9.5 15.3-.6 25.4-4.3 38.3-3.2 11.4-2 11.5-14.1-.9-5.9-6.1-14.2-13.8-18.3-17.2-27.1-21.9-61.8-38.1-97-45.3-12.3-2.5-15.5-2.8-36-2.8-19.6-.1-23.9.2-33.5 2.2-30.6 6.3-58.2 19.5-80 38-3.8 3.3-7.2 5.9-7.4 5.7-.4-.5 5.7-10.6 13.1-21.7C74.7 98.6 96 75.6 113.8 62.1c28-21.2 59.1-34 93.2-38.5 8.4-1 34.7.3 44 2.2zM348.1 36c55 22.7 102.3 69.5 125.8 124.2 9.7 22.7 16.6 48.7 19 71.8 1.3 13 .6 45.3-1.3 57.5-6.5 41.1-22.6 78.7-47.6 111.5-6.2 8.1-19 22.3-19.6 21.7-.2-.2 1.4-3.9 3.5-8.3 21.8-44.7 28.5-105.4 18.5-169.2-6.4-41.5-19-81-37.9-118.9-16.7-33.7-36.6-61.6-59.8-84.1-5.3-5-9.2-9.2-8.8-9.2.5 0 4.1 1.4 8.2 3zm-4.2 28.2c18.9 21 31.6 39.3 45.1 65.1 20.6 39.4 34 82.4 40.7 130.7 2.2 15.8 2.5 62.2.5 78-8.3 66-39.2 114.4-87.2 136.9-20.7 9.7-38 13.5-60 13.5-13.5-.1-16.8-.4-25.4-2.7-41.8-11.2-73.6-47.4-82.1-93.6-6.4-34.8 6.4-70.3 35.7-98.7 14.6-14.2 26.3-21.7 43.9-28.2 44.9-16.7 76.9-45.6 91.9-83 5-12.4 7.5-23.8 9.1-40.7 3.2-35.3-4.5-63.1-24.4-88.3-.6-.8-.6-1.2.1-1.2.6 0 6 5.5 12.1 12.2zm-151.6 50.3c17.2 2.6 30.2 6.1 46 12.4 29.4 11.7 58.4 32.8 78 56.5l5.6 6.9-1.7 2.9c-3.4 5.9-14.4 18.8-20.5 24.1-14.8 13-30.8 22.5-50.3 29.8-5.8 2.2-12.9 5.2-15.7 6.7-2.9 1.4-5.5 2.7-5.8 2.7-.4 0-2.8-4.2-5.5-9.2-20.4-38.8-55.3-66.6-97-77.3-9.9-2.6-14.5-3.2-27.4-3.7-17.3-.6-27.9.4-42.7 4.3-5.3 1.3-9.8 2.2-10.1 1.9-1.3-1.3 17.3-19.2 29.3-28.4 22.5-17 46.4-26.7 75-30.4 8.1-1.1 33.4-.6 42.8.8zM112.9 187c40.9 8 77.1 36.1 95 73.7l3.5 7.2-3 2.2c-1.6 1.2-7.7 7-13.5 12.9-27.3 27.6-41.2 61.3-39.6 95.9.3 6.9.9 13.7 1.3 15.1.5 1.7.3 2.2-.4 1.5-1.5-1.5-8.6-17.6-24.3-55.3-22.5-54.1-34.1-77.4-48.7-98-12.7-18-24.7-29.9-40.9-40.8-5.2-3.5-8.1-6-7.5-6.6 1.3-1.3 16.6-6.3 23.8-7.8 15.8-3.3 37.5-3.3 54.3 0zm-80.1 31c20.9 14 38.4 36.2 55.6 70.8 8.8 17.7 13.7 28.7 29.6 67.2 28.4 68.5 44.3 96.4 68.3 120.1 4.9 4.9 8.5 8.9 7.9 8.9-2.1 0-17.8-5.3-27.7-9.3-18.5-7.4-36.9-17.9-53.4-30.2-13.3-9.9-37.5-34-46.9-46.6-25.2-33.9-40-70.2-46.3-113.4-3-20.5-.7-73.5 3.1-73.5.5 0 4.9 2.7 9.8 6z" fill={props.color}/>
            <Path d="M361 224.4c-28 6.4-37.3 40.4-16.3 59.6 13.4 12.3 33.2 12.2 46.8-.1 7-6.5 10.6-13.7 11.3-22.8 1.6-23.4-19.3-41.9-41.8-36.7zm16 17.1c6.4 3.3 10.4 10.7 9.8 18.1-1.6 19.3-26.7 24.2-35.3 7-3.1-6.1-3.2-10.6-.4-16.3 4.6-9.6 16.5-13.6 25.9-8.8zM275.5 309.5c-3.8.8-11.2 3.5-16.4 6.1-39.9 19.7-48.1 72.9-16 104.6 8.4 8.3 21.3 15 33.8 17.4 26.9 5.3 56.2-8.8 68.8-33.2 5.5-10.6 7.6-18.8 7.7-30.4.1-11.8-1.4-18-7-29.8-12.3-25.7-42.6-40.5-70.9-34.7zm21 18.5c24.1 3.9 41.7 28.5 37.7 52.6-6.2 37.2-51.6 52.1-78.1 25.6-18.7-18.7-18.7-46.5.1-65.5 10.6-10.8 24.8-15.2 40.3-12.7z" fill={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconWisdomFocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 512 512">
            <Path d="M123.745 304.866c3.279 15.385 19.544 28.438 44.625 35.81 28.632 8.417 64.718 8.721 101.61.861 36.892-7.862 69.718-22.852 92.432-42.209 19.897-16.957 29.429-35.506 26.15-50.892-4.235-19.87-34.819-36.617-74.936-41.313-12.384 4.382-26.52 6.745-41.649 6.746-8.842.001-18.019-.814-27.378-2.486-35.706 8.026-69.236 23.351-92.363 42.277-21.322 17.447-31.707 36.112-28.491 51.206zM245.423 180.989c21.233 4.524 42.959 3.521 59.609-2.754 8.456-3.187 23.089-10.635 26.088-24.708 3-14.076-7.334-26.854-13.761-33.217-12.151-12.033-30.563-21.516-50.809-26.257-.854.119-1.705.245-2.564.347a129.31 129.31 0 0 1-15.3.916c-9.676 0-19.079-1.12-27.871-3.298-22.952 3.836-39.481 15.029-42.45 28.959-2.999 14.073 7.327 26.84 13.749 33.197 12.645 12.516 32.075 22.29 53.309 26.815zM252.818.718c-16.445 1.96-31.838 7.995-42.233 16.557-5.013 4.129-13.248 12.52-12.08 22.318s11.145 16.017 16.987 18.852c12.115 5.878 28.494 8.125 44.942 6.166 16.445-1.96 31.839-7.995 42.232-16.557 5.013-4.129 13.248-12.519 12.08-22.317C313.162 12.435 292.918 0 264.729 0a100.6 100.6 0 0 0-11.911.718zM256.154 512.308c104.785 0 177.809-38.98 177.809-73.963 0-14.514-13.387-29.815-37.695-43.086-26.265-14.339-62.36-24.545-101.896-28.847a298.285 298.285 0 0 1-18.139 4.466c-20.161 4.296-39.797 6.341-58.254 6.341-15.583.001-30.329-1.46-43.861-4.247-56.554 13.237-95.771 39.9-95.771 65.374-.002 34.982 73.022 73.962 177.807 73.962zm100.568-101.78c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15c0-8.285 6.716-15 15-15zm-48.173 38.1c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconWisdomUnfocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 512 512">
            <Path d="M394.118 354.777c-14.919-8.145-32.781-14.945-52.448-20.091 10.021-5.64 19.155-11.922 27.158-18.743 26.232-22.356 37.802-48.176 32.575-72.702-3.569-16.753-15.566-31.269-34.694-41.978-7.591-4.25-16.162-7.815-25.467-10.648 4.411-5.911 7.542-12.583 9.106-19.922 5.808-27.256-11.671-54.966-42.376-72.395a80.953 80.953 0 0 0 7.389-5.387c15.178-12.502 22.779-28.925 20.856-45.059-3.779-31.698-41.789-52.349-86.53-47.015-20.15 2.403-38.687 9.854-52.196 20.982-15.178 12.502-22.78 28.925-20.856 45.058 1.13 9.477 5.499 18.267 12.481 25.657-15.878 8.773-26.635 21.823-29.958 37.419-5.664 26.58 10.83 53.591 40.141 71.072-20.365 8.169-38.696 18.642-53.598 30.837-27.851 22.791-40.313 48.838-35.091 73.345 3.307 15.522 12.976 28.77 28.007 38.873-43.394 17.482-68.981 44.135-68.981 73.861 0 27.311 20.921 52.004 58.909 69.533 34.296 15.825 79.563 24.54 127.462 24.54 47.898 0 93.166-8.715 127.462-24.54 37.988-17.528 58.909-42.222 58.909-69.533 0-30.43-26.245-51.145-48.26-63.164zM216.565 44.975c8.999-7.413 22.366-12.642 36.674-14.348a78.964 78.964 0 0 1 9.339-.543c21.036 0 42.264 8.005 43.852 21.321.689 5.785-3.007 12.474-10.141 18.351-8.999 7.412-22.366 12.642-36.675 14.348-14.307 1.706-28.53-.235-39.02-5.324-8.316-4.035-13.481-9.667-14.171-15.454-.689-5.786 3.007-12.475 10.142-18.351zm-28.067 91.23c1.494-7.012 6.921-12.022 11.211-14.991 6.496-4.497 15.035-7.717 24.82-9.392 7.851 1.914 16.233 2.895 24.847 2.895 4.546 0 9.159-.273 13.789-.825.672-.08 1.337-.18 2.005-.272 17.583 4.168 33.537 12.406 44.064 22.83 5.471 5.417 14.274 16.256 11.773 27.991-2.423 11.373-14.192 17.644-21.467 20.488-.062.026-.127.046-.189.073-.164.064-.329.128-.488.188-14.507 5.467-33.479 6.333-52.046 2.377-18.569-3.957-35.538-12.482-46.556-23.389-5.467-5.411-14.263-16.24-11.763-27.973zm-23.799 118.874c20.301-16.613 49.742-30.064 81.127-37.159 8.269 1.454 16.38 2.166 24.205 2.165 13.484-.001 26.102-2.091 37.203-5.965 34.788 4.138 61.223 18.454 64.828 35.374 2.783 13.057-5.488 28.954-22.692 43.616-19.981 17.029-48.897 30.224-81.421 37.154-32.524 6.929-64.307 6.669-89.495-.734-21.687-6.375-35.72-17.519-38.503-30.576-2.724-12.783 6.296-28.775 24.748-43.875zM370.9 460.233c-30.439 14.045-71.243 21.78-114.894 21.78s-84.455-7.735-114.894-21.78c-26.36-12.163-41.478-27.578-41.478-42.292 0-21.819 34.192-44.796 83.53-56.4 12.2 2.463 25.296 3.712 38.925 3.712 16.817 0 34.43-1.879 52.11-5.647a263.845 263.845 0 0 0 15.898-3.91c75.61 8.276 122.279 38.55 122.279 62.245.002 14.714-15.117 30.129-41.476 42.292z" fill={props.color}/>
            <Circle cx="301.784" cy="440.371" r="15" transform="rotate(-67.48 301.935 440.311)" fill={props.color}/>
            <Circle cx="344.917" cy="406.697" r="15" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconMoreFocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="M3 12h18M3 6h18M3 18h18" fill="none" stroke={props.color} strokeWidth="4"/>
        </Svg>
    )
}
export const SvgIconMoreUnfocused = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="M3 12h18M3 6h18M3 18h18" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconMenu = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24" style={{marginLeft:scale(10)}}>
            <Path d="M3 12h18M3 6h13M3 18h09" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconCheck = (props) => {
    return (
        <Svg width={props.size} height={props.size} viewBox="0 0 24 24" style={{marginLeft:scale(10)}}>
            <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke={props.color} strokeWidth="2"/>
            <Path d="M22 4 12 14.01l-3-3" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconCross = () => {
    return (
        <Svg width={scale(32)} height={scale(32)} viewBox="0 0 24 24" style={{marginLeft:scale(10)}}>
            <Circle cx="12" cy="12" r="10" fill="#d3d3d3" stroke="#d3d3d3" strokeWidth="1"/>
            <Path d="m15 9-6 6M9 9l6 6" fill="#262626" stroke="#262626" strokeWidth="1"/>
        </Svg>
    )
}
export const SvgIconRightArrow = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="m9 18 6-6-6-6" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconSignup = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke={props.color} strokeWidth="2"/>
            <Circle cx="12" cy="7" r="4" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconLogin = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="none" stroke={props.color} strokeWidth="2"/>
            <Path d="M7 11V7a5 5 0 0 1 9.9-1" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconProgress = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="M12 20V10M18 20V4M6 20v-4" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconQuest = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 32 32" style={{marginRight:scale(5)}}>
            <Path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1Zm0 28a13 13 0 1 1 13-13 13 13 0 0 1-13 13Z" fill={props.color}/>
            <Path d="M16 5a11 11 0 1 0 11 11A11 11 0 0 0 16 5Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" fill={props.color}/>
            <Path d="M22.9 14.26a2 2 0 0 0-1.9-1.39h-2.36l-.72-2.22a2 2 0 0 0-3.84 0l-.73 2.23H11a2 2 0 0 0-1.19 3.64l1.89 1.38-.7 2.21a2 2 0 0 0 .73 2.25 2 2 0 0 0 1.19.39 2 2 0 0 0 1.18-.39L16 21l1.89 1.37A2 2 0 0 0 21 20.11l-.72-2.23 1.89-1.37a2 2 0 0 0 .73-2.25Zm-3.79 2a2 2 0 0 0-.74 2.25l.7 2.23-1.89-1.37a2 2 0 0 0-2.36 0l-1.91 1.36.72-2.22a2 2 0 0 0-.74-2.25L11 14.87h2.33a2 2 0 0 0 1.92-1.39l.75-2.24.72 2.22a2 2 0 0 0 1.92 1.39h2.34Z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconMilestone = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 32 32" style={{marginRight:scale(5)}}>
            <Path d="m30.77 24.21-3.36-4a13 13 0 1 0-22.82 0l-3.36 4a1 1 0 0 0-.18 1 1 1 0 0 0 .72.66l3.86.92 1.58 3.61A1 1 0 0 0 8 31h.15a1 1 0 0 0 .76-.36l3.5-4.16a12.79 12.79 0 0 0 7.22 0l3.5 4.16a1 1 0 0 0 .76.36H24a1 1 0 0 0 .77-.59l1.58-3.65 3.86-.92a1 1 0 0 0 .72-.66 1 1 0 0 0-.16-.97ZM8.4 28.12 7.27 25.5a1 1 0 0 0-.69-.58l-2.77-.66L5.74 22a13.07 13.07 0 0 0 4.67 3.77ZM5 14a11 11 0 1 1 11 11A11 11 0 0 1 5 14Zm20.42 10.92a1 1 0 0 0-.69.58l-1.13 2.62-2-2.4A13.07 13.07 0 0 0 26.26 22l1.93 2.31Z" fill={props.color}/>
            <Path d="M23.89 12a2.15 2.15 0 0 0-2.07-1.51h-2.73a.17.17 0 0 1-.17-.12l-.84-2.57a2.19 2.19 0 0 0-4.16 0l-.84 2.59a.17.17 0 0 1-.17.12h-2.73a2.19 2.19 0 0 0-1.28 4l2.2 1.6a.16.16 0 0 1 .07.2l-.84 2.59a2.15 2.15 0 0 0 .79 2.44 2.18 2.18 0 0 0 2.57 0l2.2-1.6a.18.18 0 0 1 .22 0l2.2 1.6a2.18 2.18 0 0 0 2.57 0 2.15 2.15 0 0 0 .79-2.44l-.84-2.59a.17.17 0 0 1 .06-.2l2.21-1.6a2.14 2.14 0 0 0 .79-2.51Zm-2 .82-2.2 1.6a2.16 2.16 0 0 0-.79 2.44l.84 2.59a.16.16 0 0 1-.07.2.16.16 0 0 1-.21 0l-2.21-1.6a2.16 2.16 0 0 0-2.56 0l-2.21 1.6a.16.16 0 0 1-.21 0 .16.16 0 0 1-.07-.2l.84-2.59a2.16 2.16 0 0 0-.79-2.44l-2.2-1.6a.16.16 0 0 1-.07-.2.16.16 0 0 1 .17-.13h2.73A2.16 2.16 0 0 0 15 11l.85-2.59a.18.18 0 0 1 .34 0L17 11a2.16 2.16 0 0 0 2.07 1.5h2.73a.16.16 0 0 1 .17.13.16.16 0 0 1-.05.21Z" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconVoucher = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" fill="none" stroke={props.color} strokeWidth="2"/>
            <Circle cx="7" cy="7" r="1" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconQuestion = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="10" fill="none" stroke={props.color} strokeWidth="2"/>
            <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" fill="none" stroke={props.color} strokeWidth="2"/>
            <Circle cx="12" cy="17" r="1" fill={props.color}/>
        </Svg>
    )
}
export const SvgIconSupport = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}
export const SvgIconSetting = (props) => {
    return (
        <Svg width={scale(24)} height={scale(24)} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="3" fill="none" stroke={props.color} strokeWidth="2"/>
            <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke={props.color} strokeWidth="2"/>
        </Svg>
    )
}