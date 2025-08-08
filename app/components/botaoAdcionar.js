// BotaoAdicionar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BotaoAdicionar = ({ onPress, title = "Adicionar" }) =>{
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: "#4CAF50" }]} onPress={onPress}>
      <AntDesign name="pluscircleo" size={20} color="#fff" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "50%"
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default BotaoAdicionar;