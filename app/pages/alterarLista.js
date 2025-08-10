import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import * as Animatable from "react-native-animatable";
import BotaoAdicionar from "../components/botaoAdicionar";
import BotaoRemover from "../components/botaoRemover";
import BotaoFinalizar from "../components/botaoFinalizar";
import ListaCompras from "../components/campoLista";
import InputLista from "../components/inputLista";
import InputDinheiro from "../components/inputDinheiro";
import InputQuantidade from "../components/inputQuantidade";
import Label from "../components/labelLista";

const AlterarLista = ({ route, navigation }) => {
  const { nomeLista } = route?.params ?? {};
  const [nomeProduto, setNomeProduto] = useState("");
  const [lista, setLista] = useState([]);
  const [valorTotalCompra, setValorTotalCompra] = useState(0);

  // Carregar lista existente do AsyncStorage
  useEffect(() => {
    const carregarLista = async () => {
      try {
        const dados = await AsyncStorage.getItem(nomeLista);
        if (!dados) {
          setLista([]);
          setValorTotalCompra(0);
          return;
        }
        const itens = JSON.parse(dados);
        if (Array.isArray(itens)) {
          setLista(itens);
          calcularTotal(itens);
        } else {
          setLista([]);
          setValorTotalCompra(0);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar a lista.");
      }
    };
    carregarLista();
  }, [nomeLista]);

  const calcularTotal = (listaAtual = []) => {
    const total = listaAtual.reduce(
      (acc, item) => acc + (Number(item.valorTotalProduto) || 0),
      0
    );
    setValorTotalCompra(total);
    return total;
  };

  const adicionarProduto = () => {
    if (!nomeProduto.trim()) {
      Alert.alert("Erro", "Preencha o nome do Produto!");
      return;
    }
    const novoItem = {
      id: String(uuid.v4()),
      nome: nomeProduto.trim(),
      quantidade: 0,
      valor: 0,
      valorTotalProduto: 0,
    };
    const novaLista = [...lista, novoItem];
    setLista(novaLista);
    setNomeProduto("");
    calcularTotal(novaLista);
  };

  const alterarDados = (id, campo, valorCampo) => {
    const novaLista = lista.map((item) => {
      if (item.id === id) {
        const atualizado = { ...item };
        if (campo === "nome") {
          atualizado.nome = String(valorCampo);
        } else {
          const convertido = Number(String(valorCampo).replace(",", ".")) || 0;
          atualizado[campo] = convertido;
        }
        atualizado.valorTotalProduto =
          (Number(atualizado.quantidade) || 0) * (Number(atualizado.valor) || 0);
        return atualizado;
      }
      return item;
    });
    setLista(novaLista);
    calcularTotal(novaLista);
  };

  const removerProduto = (id) => {
    if (lista.length <= 1) {
      Alert.alert(
        "Erro",
        "A lista não pode ficar vazia. Adicione outro item antes de remover este."
      );
      return;
    }
    const novaLista = lista.filter((item) => item.id !== id);
    setLista(novaLista);
    calcularTotal(novaLista);
  };

  const salvarAlteracoes = async () => {
    try {
      await AsyncStorage.setItem(nomeLista, JSON.stringify(lista)); // mesmo formato do cadastro
      Alert.alert("Sucesso", "Lista alterada com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View style={styles.totalCompraContainer}>
        <Text style={styles.totalCompraLabel}>Total da Compra:</Text>
        <Text style={styles.totalCompraValor}>
          R$ {Number(valorTotalCompra || 0).toFixed(2)}
        </Text>
      </View>

      <Label texto="Digite o nome do Produto:" />
      <InputLista
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <Animatable.View animation="fadeInUp" style={styles.botoesTopo}>
        <BotaoAdicionar onPress={adicionarProduto} />
        <BotaoFinalizar onPress={salvarAlteracoes} />
      </Animatable.View>

      <View style={styles.divisor} />
      <ListaCompras
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <Animatable.View
            key={String(item.id)}
            animation="fadeInUp"
            delay={index * 100}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <BotaoRemover onPress={() => removerProduto(item.id)} />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Label texto="Qtd:" />
                <InputQuantidade
                  valor={item.quantidade}
                  aoMudarValor={(numero) =>
                    alterarDados(item.id, "quantidade", numero)
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <Label texto="Valor:" />
                <InputDinheiro
                  valor={item.valor}
                  aoMudarValor={(numero) => alterarDados(item.id, "valor", numero)}
                />
              </View>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValor}>
                R$ {Number(item.valorTotalProduto || 0).toFixed(2)}
              </Text>
            </View>
          </Animatable.View>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  totalCompraContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#e6f4ea",
    padding: 10,
    borderRadius: 8,
  },
  totalCompraLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginRight: 6,
  },
  totalCompraValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  botoesTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    gap: 8,
  },
  divisor: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  totalContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#e6f4ea",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2e7d32",
    marginRight: 6,
  },
  totalValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});

export default AlterarLista;
