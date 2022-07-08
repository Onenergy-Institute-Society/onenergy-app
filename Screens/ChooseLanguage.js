import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationActions} from "react-navigation";
import {scale} from "../Utils/scale";
import {windowWidth} from "../Utils/Dimensions";
import TouchableScale from "../Components/TouchableScale";
const ChooseLanguage = (props) => {
    const languages = [
        {
            'abbr': 'en',
            'name': 'English',
            'subtitle': 'en',
        },
        {
            'abbr': 'es',
            'name': 'Español',
            'subtitle': 'es',
        },
        {
            'abbr': 'fr',
            'name': 'Français',
            'subtitle': 'fr',
        },
    ]
    const dispatch = useDispatch();
    const defaultLanguage = useSelector((state) => state.languagesReducer.languages);
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

    if (defaultLanguage.initial==='1') {
        props.navigation.dispatch(NavigationActions.navigate({ routeName: 'OnBoarding'}));
    }
    const RadioButton = (props) => {
        return (
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
                {
                    selectedLanguage.abbr === props.language ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000',
                    }}/>
                    : null
                }
            </View>
        );
    }
    const LanguageButtons = props => {
        return (
            languages.map((language) =>
                <TouchableOpacity
                    onPress={()=>{
                        setSelectedLanguage(language);
                    }}
                >
                    <View style={styles.rowRadio}>
                        <RadioButton language={language.abbr} /><Text style={styles.languageName}>{language.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        )
    }
    return (
        <ImageBackground source={{uri:"https://assets.onenergy.institute/wp-content/uploads/2021/11/4-1024x683.jpg"}} resizeMode="cover" style={styles.container}>
            <View>
                <Text style={styles.heading}>Please Choose Language</Text>
            </View>
            <View style={styles.languages}>
                <View style={styles.innerContainer}>
                    <LanguageButtons />
                </View>
            </View>
            <View>
                <TouchableScale onPress={() => {
                    dispatch({
                        type: 'DEFAULT_LANGUAGE',
                        payload: selectedLanguage,
                    });
                    props.navigation.dispatch(
                        NavigationActions.navigate({
                            routeName: "OnBoarding"
                        })
                    )
                }}>
                    <View style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </View>
                </TouchableScale>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer:{
      width: windowWidth/2,
      alignItems:"flex-start",
    },
    heading: {
        fontSize: scale(24),
        fontStyle: "italic",
        fontWeight: "bold",
        alignSelf: "baseline",
    },
    languages: {
        marginVertical:20,
        padding:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowRadio: {
        backgroundColor: "white",
        width: windowWidth/2,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        marginVertical: 10,
    },
    languageName: {
        fontSize: 24,
        marginLeft:10,
    },
    continueButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 9,
        elevation: 3,
        backgroundColor: '#4942e1',
    },
    continueButtonText: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: "#fff",
    }
});
ChooseLanguage.navigationOptions = {
    header: null
}
export default ChooseLanguage;