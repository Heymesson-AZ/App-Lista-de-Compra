// BotaoAlterar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const BotaoAlterar = ({ onPress, title = "Alterar" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: "#FF9800" }]} onPress={onPress}>
      <Feather name="edit" size={18} color="#fff" style={styles.icon} />
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

export default BotaoAlterar;
