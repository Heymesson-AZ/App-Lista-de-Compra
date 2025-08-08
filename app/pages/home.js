// app/paginas/home.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Home = () => {
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
        suas listas de compras ficam organizadas e sempre à
        mão.
      </Text>
      <Text style={styles.info}>
        Use o menu lateral para navegar pelas seções e gerenciar suas listas de Compras.
      </Text>
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
    width: 300,
    height: 300,
    marginBottom:30,
    borderRadius: 40
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
});
