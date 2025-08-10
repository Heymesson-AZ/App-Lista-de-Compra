// BotaoVisualizar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BotaoVisualizar = ({ onPress, title = "Visualizar" }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: "#1976d2" }]} onPress={onPress}>
            <Icon name="eye-outline" size={18} color="#fff" style={styles.icon} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        marginVertical: 6,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
});

export default BotaoVisualizar;
