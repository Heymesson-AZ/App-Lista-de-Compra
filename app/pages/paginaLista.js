import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import BotaoAdicionar from "../components/botaoAdicionar";
import BotaoRemover from "../components/botaoRemover";
import BotaoFinalizar from "../components/botaoFinalizar";
import InputLista from "../components/inputLista";
import Label from "../components/labelLista";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import * as Animatable from "react-native-animatable";

const PaginaLista = ({ navigation }) => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [nomeListaUsuario, setNomeListaUsuario] = useState("");
  const [lista, setLista] = useState([]);

  const adicionarProduto = () => {
    if (!nomeProduto.trim()) {
      Alert.alert("Erro", "Preencha o nome do Produto!");
      return;
    }
    const item = {
      id: uuid.v4(),
      nome: nomeProduto.trim(),
      quantidade: 0,
      valor: 0,
      valorTotalProduto: 0,
    };
    setLista([...lista, item]);
    setNomeProduto("");
  };

  const removerProduto = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  const finalizarLista = async () => {
    if (lista.length === 0) {
      Alert.alert("Erro", "Não há produtos para salvar.");
      return;
    }

    if (!nomeListaUsuario.trim()) {
      Alert.alert("Erro", "Digite um nome para a lista.");
      return;
    }

    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    const nomeLista = `${dia}-${mes}-${ano}_${horas}-${minutos}-${segundos}_${nomeListaUsuario.trim()}`;

    try {
      await AsyncStorage.setItem(nomeLista, JSON.stringify(lista));
      setLista([]);
      setNomeListaUsuario("");
      Alert.alert("Sucesso", `Lista de Compras salva com sucesso!`);
      navigation.navigate("Consultar Lista");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a lista.");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.textoTopo}>
        Lista de Compras
      </Animatable.Text>

      <View style={styles.linha} />

      <Label texto="Digite o nome da Lista:" />
      <InputLista
        placeholder="Nome da Lista"
        value={nomeListaUsuario}
        onChangeText={setNomeListaUsuario}
      />

      <View style={styles.linha} />

      <Label texto="Digite o nome do Produto:" />
      <InputLista
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <View style={styles.linha} />

      <Animatable.View animation="fadeInUp" style={styles.finalizar}>
        <BotaoAdicionar onPress={adicionarProduto} />
        <BotaoFinalizar onPress={finalizarLista} />
      </Animatable.View>

      <View style={styles.linha} />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <Animatable.View
            animation="fadeInUp"
            delay={index * 100}
            style={styles.viewItem}
          >
            <Text style={styles.nomeProduto}>{item.nome}</Text>
            <BotaoRemover onPress={() => removerProduto(item.id)} />
          </Animatable.View>
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
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  textoTopo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 10,
  },
  linha: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 12,
  },
  finalizar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  viewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default PaginaLista;
