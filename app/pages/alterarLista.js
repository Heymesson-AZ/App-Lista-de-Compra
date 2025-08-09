import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert } from "react-native";
import BotaoAdicionar from "../components/botaoAdcionar";
import BotaoRemover from "../components/botaoRemover";
import BotaoFinalizar from "../components/botaoFinalizar";
import ListaCompras from "../components/campoLista";
import InputLista from "../components/inputLista";
import Label from "../components/labelLista";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const AlterarLista = () => {
  // Nome do produto
  const [nomeProduto, setNomeProduto] = useState("");
  // Valores fixos por enquanto
  const [valor] = useState(0);
  const [quantidade] = useState(0);
  const [valorTotalProduto, setValorTotalProduto] = useState(0);
  // Lista atual que está sendo montada
  const [lista, setLista] = useState([]);

  // funcao  de adicionar o produto
  const adicionarProduto = () => {
    if (!nomeProduto || nomeProduto.trim().length === 0) {
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

    const novaLista = [...lista, item];
    setLista(novaLista);
    setNomeProduto("");
  };

  // funcao de remover os item da lista
  const removerProduto = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };
  const finalizarLista = async () => {
    // Verifica se a lista está vazia
    if (lista.length === 0) {
      Alert.alert("Erro", "Não há produtos para salvar.");
      return;
    }
    // Gera um nome único para a lista (usando data/hora)
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mesNome = meses[agora.getMonth()];
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const nomeLista = `Lista_${dia} de ${mesNome} de ${ano} - ${horas}:${minutos}`;

    try {
      // Salva a lista no AsyncStorage como JSON
      await AsyncStorage.setItem(nomeLista, JSON.stringify(lista));
      // Limpa a lista atual
      setLista([]);
      Alert.alert("Sucesso", `Lista "${nomeLista}" salva com sucesso!`);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a lista.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoTopo}>Lista de Compras</Text>
      <View style={styles.linha} />
      <Label texto="Digite o nome do Produto: " />
      <InputLista
        placeholder="Nome de Produto"
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

export default AlterarLista;
