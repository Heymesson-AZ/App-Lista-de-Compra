// BotaoAlterar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const BotaoAlterar = ({ onPress, title = "Alterar" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: "#FF9800" }]} onPress={onPress}>
      <Feather name="edit" size={20} color="#fff" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
export default BotaoAlterar
