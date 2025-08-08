// BotaoFinalizar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BotaoFinalizar = ({ onPress, title = "Finalizar" }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#3F51B5" }]}
      onPress={onPress}
    >
      <MaterialIcons name="done" size={20} color="#fff" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "50%",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default BotaoFinalizar;
