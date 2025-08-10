// BotaoRemover.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BotaoRemover = ({ onPress, title = "Remover" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onPress}>
      <AntDesign name="delete" size={18} color="#fff" style={styles.icon} />
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

export default BotaoRemover;
