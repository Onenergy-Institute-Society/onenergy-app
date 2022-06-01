import React, {useState} from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import EditRoutine from './EditRoutine'

const RoutineList = ({list}) => {
    const [showListVisible, setShowListVisible] = useState(false);
    const toggleListModal = () => {
        setShowListVisible(!showListVisible);
    }
    return (
        <View style={[styles.listContainer, {backgroundColor: list.color}]}>
            <Modal
                animationType={"slide"}
                visible={showListVisible}
                onRequestClose={() => toggleListModal}
                >
                <EditRoutine list={list} closeModal={()=>toggleListModal} />
            </Modal>
            <TouchableOpacity
                style={[styles.listContainer,{backgroundColor: list.color}]}
                onPress={() => toggleListModal()}>
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
                <View>
                    <View style={{alignItems:"center"}}>
                        <Text>Test</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    listContainer: {
        paddingVertical:32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        marginBottom: 18,
    }
})
export default RoutineList;