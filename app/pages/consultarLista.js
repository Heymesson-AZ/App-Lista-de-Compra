import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BotaoAlterar from "../components/botaoAlterar";
import BotaoRemover from "../components/botaoRemover";
import BotaoVisualizar from "../components/botaoVisualizar";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";

/* 
  Componente para exibir cada lista de compras na tela principal 
  Agora mostra também o valor total calculado.
*/
const ListaItem = React.memo(({ item, index, onAlterar, onVisualizar, onRemover, calcularTotalCompra }) => {
  // Separa o nome e a data a partir do nome da lista salvo no AsyncStorage
  const separarNomeData = (nomeLista) => {
    const partes = nomeLista.split("_");
    const nome = partes[0];
    const data = partes.slice(1).join(" ");
    return { nome, data };
  };

  const { nome, data } = separarNomeData(item.nomeLista);
  const valorTotal = calcularTotalCompra(item.itens);

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={styles.listaContainer}
    >
      {/* Cabeçalho com ícone, nome e data */}
      <View style={styles.headerLista}>
        <Icon name="cart-outline" size={20} color="#2e7d32" />
        <View>
          <Text style={styles.nomeLista}>{nome}</Text>
          <Text style={styles.dataLista}>{data}</Text>
          <Text style={styles.valorTotalLista}>
            Total: R$ {valorTotal.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Botões de ação */}
      <View style={styles.botaoLista}>
        <BotaoAlterar onPress={() => onAlterar(item.nomeLista)} />
        <BotaoVisualizar onPress={() => onVisualizar(item)} />
        <BotaoRemover onPress={() => onRemover(item.nomeLista)} />
      </View>
    </Animatable.View>
  );
});

/* 
  Componente para exibir os produtos dentro do modal de visualização
*/
const ProdutoItemModal = React.memo(({ item }) => {
  return (
    <View style={styles.itemModal}>
      <Text style={styles.itemNome}>{item.nome}</Text>
      <Text>
        Quantidade: {item.quantidade} | Valor Unitário: R$
        {Number(item.valor || 0).toFixed(2)}
      </Text>
      <Text style={styles.itemTotal}>
        Total: R${Number(item.valorTotalProduto || 0).toFixed(2)}
      </Text>
    </View>
  );
});

const ConsultarLista = ({ navigation }) => {
  const [conjuntoListas, setConjuntoListas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listaSelecionada, setListaSelecionada] = useState(null);

  /* 
    Função para calcular o valor total de uma lista
    Recebe um array de itens e soma o campo `valorTotalProduto`
  */
  const calcularTotalCompra = useCallback(
    (itens) =>
      Array.isArray(itens)
        ? itens.reduce(
          (total, item) => total + (Number(item.valorTotalProduto) || 0),
          0
        )
        : 0,
    []
  );

  /* 
    Carrega todas as listas salvas no AsyncStorage
    Também mantém os itens para cálculo do valor total na tela principal
  */
  const carregarListas = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const listaKeys = keys.filter((k) => k.includes("_"));
      const result = await AsyncStorage.multiGet(listaKeys);

      const listasFormatadas = result.map(([key, value]) => {
        try {
          const itens = JSON.parse(value);
          return { nomeLista: key, itens: Array.isArray(itens) ? itens : [] };
        } catch {
          return { nomeLista: key, itens: [] };
        }
      });

      setConjuntoListas(listasFormatadas);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as listas salvas");
    }
  };

  // Atualiza listas sempre que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      carregarListas();
    }, [])
  );

  // Deletar lista com confirmação
  const deletarLista = useCallback((nomeLista) => {
    Alert.alert(
      "Confirmação",
      `Deseja realmente apagar a lista "${nomeLista}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(nomeLista);
              Alert.alert("Sucesso", "Lista apagada com sucesso!");
              carregarListas();
            } catch {
              Alert.alert("Erro", "Não foi possível apagar a lista.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  }, []);

  // Abre modal e carrega dados atualizados da lista
  const abrirModal = useCallback(async (lista) => {
    try {
      const dadosAtualizados = await AsyncStorage.getItem(lista.nomeLista);
      const itens = dadosAtualizados ? JSON.parse(dadosAtualizados) : [];
      setListaSelecionada({ nomeLista: lista.nomeLista, itens });
      setModalVisible(true);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os dados atualizados da lista.");
    }
  }, []);

  const fecharModal = useCallback(() => {
    setModalVisible(false);
    setListaSelecionada(null);
  }, []);

  // Renderiza cada lista na tela principal
  const renderListaItem = useCallback(
    ({ item, index }) => (
      <ListaItem
        item={item}
        index={index}
        calcularTotalCompra={calcularTotalCompra}
        onAlterar={(nomeLista) => navigation.navigate("Alterar Lista", { nomeLista })}
        onVisualizar={abrirModal}
        onRemover={deletarLista}
      />
    ),
    [navigation, abrirModal, deletarLista, calcularTotalCompra]
  );

  // Renderiza cada produto no modal
  const renderProdutoModal = useCallback(
    ({ item }) => <ProdutoItemModal item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.titulo}>
        Listas de Compras
      </Animatable.Text>

      <View style={styles.linha} />

      {/* Lista principal */}
      <FlatList
        data={conjuntoListas}
        keyExtractor={(item) => item.nomeLista}
        renderItem={renderListaItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal de visualização */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {listaSelecionada && (
              <>
                <Text style={styles.modalTitulo}>{listaSelecionada.nomeLista}</Text>
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={listaSelecionada.itens}
                    keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
                    renderItem={renderProdutoModal}
                  />
                </View>
                <View style={styles.footerModal}>
                  <View style={styles.linha} />
                  <Text style={styles.totalCompra}>
                    Valor Total da Compra: R$
                    {calcularTotalCompra(listaSelecionada.itens).toFixed(2)}
                  </Text>
                  <TouchableOpacity onPress={fecharModal} style={styles.fecharBtn}>
                    <Text style={styles.fecharTexto}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#2e7d32", textAlign: "center", marginBottom: 10 },
  linha: { height: 1, backgroundColor: "#ccc", width: "100%", marginVertical: 12 },

  // Card da lista
  listaContainer: {
    marginVertical: 8,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    elevation: 2,
  },
  headerLista: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  nomeLista: { fontWeight: "bold", fontSize: 18, color: "#333" },
  dataLista: { fontSize: 14, color: "#777" },
  valorTotalLista: { fontSize: 14, color: "#2e7d32", fontWeight: "600" },
  botaoLista: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, gap: 6 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
  modalContainer: { backgroundColor: "#fff", borderRadius: 10, padding: 20, maxHeight: "80%", flex: 1 },
  modalTitulo: { fontSize: 18, fontWeight: "bold", color: "#2e7d32", marginBottom: 10, textAlign: "center" },

  // Itens do modal
  itemModal: { marginBottom: 10, padding: 10, backgroundColor: "#f1f1f1", borderRadius: 8 },
  itemNome: { fontWeight: "bold", fontSize: 16, color: "#333" },
  itemTotal: { color: "#2e7d32", fontWeight: "600" },

  // Rodapé modal
  totalCompra: { fontSize: 16, fontWeight: "bold", color: "#2e7d32", textAlign: "center", marginVertical: 10 },
  fecharBtn: { backgroundColor: "#2e7d32", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 10 },
  fecharTexto: { color: "#fff", fontWeight: "bold" },
  footerModal: { paddingTop: 10 },
});

export default ConsultarLista;
