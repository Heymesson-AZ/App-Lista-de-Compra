import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListaCompras from "../components/campoLista";
import BotaoAlterar from "../components/botaoAlterar";
import BotaoRemover from "../components/botaoRemover";
import { StatusBar } from "expo-status-bar";

const ConsultaLista = ({ navigation }) => {
  const [conjuntoListas, setConjuntoListas] = useState({});

  // carregamento de listas de Compras
  useEffect(() => {
    const carregarListas = async () => {
      try {
        // Pega todas as chaves
        const keys = await AsyncStorage.getAllKeys();
        // Filtra só as que começam com "Lista_"
        const listaKeys = keys.filter((k) => k.startsWith("Lista_"));
        // Busca todas as listas de uma vez
        const result = await AsyncStorage.multiGet(listaKeys);
        // Transforma no formato [{nomeLista: string, itens: []}]
        const listasFormatadas = result.map(([key, value]) => ({
          nomeLista: key,
          itens: JSON.parse(value),
        }));
        setConjuntoListas(listasFormatadas);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as listas salvas");
      }
    };
    carregarListas();
  }, []);

  // apagar lista
  const deletarLista = (nomeLista) => {
    Alert.alert(
      "Confirmação",
      `Deseja realmente apagar a lista "${nomeLista}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(nomeLista);
              Alert.alert(
                "Sucesso",
                `Lista apagada com sucesso!`
              );
              // Aqui, se quiser, atualize a lista na UI
            } catch (error) {
              Alert.alert(
                "Erro",
                `Não foi possível apagar a lista "${nomeLista}".`
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  
  return (
    <View style={styles.container}>
      <Text>Listas de Compras</Text>
      <View style={styles.linha} />
      <ListaCompras
        data={conjuntoListas}
        keyExtractor={(item) => item.nomeLista}
        renderItem={({ item }) => (
          <View style={styles.listaContainer}>
            <Text style={styles.nomeLista}>{item.nomeLista}</Text>
            <View style={styles.botaoLista}>
              <BotaoAlterar
                onPress={() => navigation.navigate("alterarLista")}
              />
              <BotaoRemover onPress={() => deletarLista(item.nomeLista)} />
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  linha: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 12,
  },
  listaContainer: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  nomeLista: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  botaoLista: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ConsultaLista;
