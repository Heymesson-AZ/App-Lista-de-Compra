import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import BotaoAdicionar from "../components/botaoAdcionar";
import BotaoRemover from "../components/botaoRemover";
import BotaoFinalizar from "../components/botaoFinalizar";
import ListaCompras from "../components/campoLista";
import InputLista from "../components/inputLista";
import Label from "../components/labelLista";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaginaLista = () => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [valor] = useState(0);
  const [quantidade] = useState(0);
  const [lista, setLista] = useState([]);

  // Função para inserir produto
  const adicionarProduto = async () => {
    if (!nomeProduto || nomeProduto.trim().length === 0) {
      Alert.alert("Erro", "Preencha o nome do Produto!");
      return;
    }
    try {
      const agora = new Date();
      const dataFormatada = agora
        .toISOString()
        .replace("T", "_")
        .replace(/\..+/, "");
      const idGerado = `Lista_${dataFormatada}`;
      const item = {
        id: idGerado,
        nome: nomeProduto.trim(),
        quantidade,
        valor,
      };
      // chave = listCompras
      const novaLista = [...lista, item];
      await AsyncStorage.setItem("listaCompras", JSON.stringify(novaLista));
      setLista(novaLista);
      setNomeProduto("");
    } catch (error) {
      Alert.alert("Erro", "Erro ao adicionar produto!", error);
    }
  };
  // Função para remover produto
  const removerProduto = async (id) => {
    try {
      const novaLista = lista.filter((item) => item.id !== id);
      await AsyncStorage.setItem("listaCompras", JSON.stringify(novaLista));
      setLista(novaLista);
    } catch (error) {
      Alert.alert("Erro", "Erro ao remover produto:", error);
    }
  };
  // Função para finalizar (limpar visualmente)
  const finalizarLista = () => {
    setLista([]);
    Alert.alert("Sucesso", "Lista de compras salva com Sucesso");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoTopo}>Lista de Compras</Text>
      <View style={styles.linha} />
      <Label texto="Digite o nome do Produto: " />
      <InputLista
        placeholder={"Nome de Produto"}
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <View style={styles.linha} />

      <View style={styles.finalizar}>
        <BotaoAdicionar onPress={adicionarProduto} />
        <BotaoFinalizar onPress={finalizarLista} />
      </View>
      <View style={styles.linha} />
      <ListaCompras
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.viewItem}>
            <Text>{item.nome}</Text>
            <BotaoRemover onPress={() => removerProduto(item.id)} />
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
  textoTopo: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  viewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  finalizar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});

export default PaginaLista;
