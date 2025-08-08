import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListaCompras from "../components/campoLista";
import BotaoAlterar from "../components/botaoAlterar";
import BotaoFinalizar from "../components/botaoFinalizar";
import { StatusBar } from "expo-status-bar";

const ConsultaLista = () => {
  const [conjuntoListas, setConjuntoListas] = useState({});

  // Carregar listas do AsyncStorage
  const carregarListas = async () => {
    try {
      const listasSalvas = await AsyncStorage.getItem("conjuntoListas");
      if (listasSalvas) {
        setConjuntoListas(JSON.parse(listasSalvas));
      } else {
        setConjuntoListas({});
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as listas.");
    }
  };


  return (
    <View style={styles.container}>
      <Text>ConsultaLista</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ConsultaLista;
