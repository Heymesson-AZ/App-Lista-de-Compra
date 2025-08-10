import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";

const InputDinheiro = ({ valor, aoMudarValor, prefixo = "R$ ", estilo, ...props }) => {
  const [textoTela, setTextoTela] = useState("");

  // Sempre que o valor externo mudar, atualiza o texto na tela
  useEffect(() => {
    if (valor === null || valor === undefined || valor === "") {
      setTextoTela("");
      return;
    }
    const numero = typeof valor === "number"
      ? valor
      : parseFloat(String(valor).replace(",", ".")) || 0;
    setTextoTela(formatarMoeda(numero));
  }, [valor]);

  // Formata número para o padrão BRL
  function formatarMoeda(numero) {
    const fixo = Number(numero).toFixed(2); // Garante 2 casas decimais
    const [parteInteira, parteDecimal] = fixo.split(".");
    const inteiraComPontos = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${prefixo}${inteiraComPontos},${parteDecimal}`;
  }

  // Trata o texto digitado
  function aoMudarTexto(texto) {
    const apenasNumeros = texto.replace(/\D/g, ""); // Remove tudo que não é número

    if (apenasNumeros === "") {
      setTextoTela("");
      aoMudarValor && aoMudarValor(null);
      return;
    }

    const numero = parseFloat(apenasNumeros) / 100; // Converte centavos
    setTextoTela(formatarMoeda(numero));
    aoMudarValor && aoMudarValor(numero);
  }

  return (
    <TextInput
      style={[estilos.input, estilo]}
      keyboardType={Platform.OS === "ios" ? "decimal-pad" : "numeric"}
      value={textoTela}
      onChangeText={aoMudarTexto}
      {...props}
    />
  );
};

const estilos = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
  },
});

export default InputDinheiro;
