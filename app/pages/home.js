// app/paginas/home.js
import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
const Home = ({ navigation }) => {
  const [ultimaLista, setUltimaLista] = useState(null);

  const carregarUltimaLista = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const listaKeys = keys.filter((k) => k.includes("_"));
      if (listaKeys.length === 0) {
        setUltimaLista(null);
        return;
      }

      // Ordena alfabeticamente (que equivale a cronológica com data no início)
      listaKeys.sort();

      const ultimaKey = listaKeys[listaKeys.length - 1];
      const value = await AsyncStorage.getItem(ultimaKey);

      const partes = ultimaKey.split("_");
      // partes[0] = "2025-08-10"
      // partes[1] = "19-25-42"
      // partes[2...] = nome da lista

      const dataLista = partes[0]; // só a data, sem hora
      const nomeLista = partes.slice(2).join("_");

      setUltimaLista({
        nomeLista,
        dataLista,
        itens: JSON.parse(value),
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a última lista.");
      setUltimaLista(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarUltimaLista();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/image_listaCompra.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo ao O Que Falta?</Text>
      <Text style={styles.subtitle}>
        Nunca mais se esqueça de nada no supermercado! Com o app O Que Falta?,
        suas listas de compras ficam organizadas e sempre à mão.
      </Text>
      <Text style={styles.info}>
        Use o menu lateral para navegar pelas seções e gerenciar suas listas de Compras.
      </Text>

      {ultimaLista && (
        <Animatable.View animation="fadeInUp" delay={300} style={styles.lembreteContainer}>
          <Text style={styles.lembreteTitulo}>📝 Última lista salva:</Text>
          <View style={styles.lembreteHeader}>
            <Icon name="cart-outline" size={20} color="#2e7d32" />
            <Text style={styles.lembreteNome}>{ultimaLista.nomeLista}</Text>
          </View>
          <Text style={styles.lembreteData}>Data:  {ultimaLista.dataLista}</Text>
        </Animatable.View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  lembreteContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  lembreteTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  lembreteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  lembreteNome: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  botaoAbrir: {
    backgroundColor: "#2e7d32",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  lembreteData: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
    marginLeft: 28,
  },
});
