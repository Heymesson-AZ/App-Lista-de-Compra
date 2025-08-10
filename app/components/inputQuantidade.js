import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";

const InputQuantidade = ({ valor, aoMudarValor, estilo, ...props }) => {
    const [textoTela, setTextoTela] = useState("");

    useEffect(() => {
        if (valor === null || valor === undefined || valor === "") {
            setTextoTela("");
            return;
        }
        setTextoTela(String(valor).replace(".", ",")); // mostra com vírgula na tela
    }, [valor]);

    function aoMudarTexto(texto) {
        // Permite números, vírgula e ponto
        let filtrado = texto.replace(/[^0-9.,]/g, "");

        // Troca vírgula por ponto para cálculo
        filtrado = filtrado.replace(",", ".");

        // Garante no máximo um separador decimal
        const partes = filtrado.split(".");
        if (partes.length > 2) {
            filtrado = partes[0] + "." + partes.slice(1).join("");
        }

        setTextoTela(texto); // mantém como o usuário digitou
        aoMudarValor && aoMudarValor(filtrado === "" ? null : parseFloat(filtrado));
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

export default InputQuantidade;
