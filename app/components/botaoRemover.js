// BotaoRemover.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BotaoRemover = ({ onPress, title = "Remover" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: "#f44336" }]} onPress={onPress}>
      <AntDesign name="delete" size={20} color="#fff" />
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

export default BotaoRemover;