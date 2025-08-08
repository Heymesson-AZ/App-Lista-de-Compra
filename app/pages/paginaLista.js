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
import uuid from "react-native-uuid";

const PaginaLista = () => {
  // dados do produto
  const [nomeProduto, setNomeProduto] = useState("");
  const [valor] = useState(0);
  const [quantidade] = useState(0);

  // lista atual
  const [lista, setLista] = useState([]);

  // conjunto de listas salvas
  const [conjuntoListas, setConjuntoListas] = useState({});

  // carregar dados do AsyncStorage na abertura
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const listasSalvas = await AsyncStorage.getItem("conjuntoListas");
        if (listasSalvas) {
          setConjuntoListas(JSON.parse(listasSalvas));
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as listas");
      }
    };
    carregarDados();
  }, []);

  // inserir produto na lista atual
  const adicionarProduto = async () => {
    // verifica se esta preenchido o nome do produto
    if (!nomeProduto || nomeProduto.trim().length === 0) {
      Alert.alert("Erro", "Preencha o nome do Produto!");
      return;
    }
    // produto - item da lista
    const item = {
      id: uuid.v4(),
      nome: nomeProduto.trim(),
      quantidade,
      valor,
    };
    // lista criada - conjunto de produtos - item inserido no final da lista
    const novaLista = [...lista, item];
    setLista(novaLista);
    setNomeProduto("");
  };

  // remover produto da lista atual
  const removerProduto = (id) => {
    setLista(lista.filter((item) => item.id !== id));
  };

  // finalizar e salvar a lista atual no conjunto de listas
  const finalizarLista = async () => {
    //verifica de a ha produtos
    if (lista.length === 0) {
      Alert.alert("Erro", "Não há produtos para salvar.");
      return;
    }
    // id a lista gerada
    const agora = new Date();
    const dataFormatada = agora
      .toISOString()
      .replace("T", "_")
      .replace(/\..+/, "");
    // nome da lista montado
    const nomeLista = `Lista_${dataFormatada}`;
    // inserindo no final do conjunto de listas
    const novasListas = {...conjuntoListas,[nomeLista]: lista,
    };

    try {
      await AsyncStorage.setItem("conjuntoListas", JSON.stringify(novasListas));
      setConjuntoListas(novasListas);
      // limpa lista atual
      setLista([]);
      Alert.alert("Sucesso", "Lista de compras salva com sucesso!");
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

export default PaginaLista;
