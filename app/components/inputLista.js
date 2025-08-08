// components/InputDescricao.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputLista = ({ value, onChangeText, placeholder = "" }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#9AE1B4",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 5,
    height: 50
  },
});

export default InputLista;
