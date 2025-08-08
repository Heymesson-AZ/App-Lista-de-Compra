import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import BotaoAdicionar from "../components/botaoAdcionar";
import BotaoAlterar from "../components/botaoAlterar";
import BotaoRemover from "../components/botaoRemover";
import BotaoFinalizar from "../components/botaoFinalizar";
import ListaCompras from "../components/campoLista";
import InputLista from "../components/inputLista";
import Label from "../components/labelLista";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PaginaLista = () => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [lista, setLista] = useState([]);


  // funcao de Criar a lista de Compras

  
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
      <BotaoAdicionar/>
      <View style={styles.linha} />
      <ListaCompras/>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
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
});

export default PaginaLista;

{
  /* <Label texto="Digite a quantidade do Produto: " />
      <InputLista
        placeholder={"Quantidade de Produto"}
        value={quantidade}
        onChangeText={setQuantidade}
      />
      <View style={styles.linha} />
      <Label texto="Digite o Valor do Produto: " />
      <InputLista
        placeholder={"Valor do Produto"}
        value={valor}
        onChangeText={setValor}
      /> */
}
