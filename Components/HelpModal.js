import React, {useState} from "react";
import {useSelector} from "react-redux";
import externalCodeDependencies from "@src/externalCode/externalRepo/externalCodeDependencies";
import BlockScreen from "@src/containers/Custom/BlockScreen";
import {View, Text} from "react-native";
import {windowHeight} from "../Utils/Dimensions";
import IconButton from "@src/components/IconButton";
import MyAppPageScreen from "../Screens/MyAppPageScreen";
const HelpModal = React.forwardRef((props, ref) => {
    const {pageName} = props;
    const language = useSelector((state) => state.languagesReducer.languages);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option[language.abbr]);
    const helpIndex = optionData.helps.findIndex(el => el.name === pageName);
    const helpModal = {title:optionData.helps[helpIndex].title,id:optionData.helps[helpIndex].id};
    const [showPage, setShowPage] = useState(false);

    return (
        <Modalize
            ref={ref}
            modalHeight = {windowHeight*4/5}
            handlePosition = "outside"
            onOpened={() => {
                setShowPage(true);
            }}
/*            HeaderComponent={
                <View style={{padding:25,  flexDirection: "row", justifyContent: "space-between", borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#c2c2c2'}}>
                    <Text style={{fontSize:24}}>{helpModal.title}</Text>
                    <IconButton
                    pressHandler={() => {this.ref.close();}}
                    icon={require("@src/assets/img/close.png")}
                    style={{ height: 24, width: 24 }}
                    touchableStyle={{
                        backgroundColor: "#e6e6e8",
                        alignItems: "center",
                        borderRadius: 100,
                        padding: 5,
                    }}
                /></View>
            }*/
        >
{/*
            {showPage?
            <BlockScreen pageId={helpModal.id}
                 contentInsetTop={0}
                 contentOffsetY={0}
                 hideTitle={true}
                 hideNavigationHeader={true}
                 {...props} />
                :null}
*/}
        </Modalize>
    );
});
export default HelpModal;
