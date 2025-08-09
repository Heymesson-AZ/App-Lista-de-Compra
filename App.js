import { StyleSheet } from "react-native";
import Home from "./app/pages/home";
import PaginaLista from "./app/pages/paginaLista";
import ConsultaLista from "./app/pages/consultaLista";
import AlterarLista from "./app/pages/alterarLista";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#2E8B57",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            drawerStyle: {
              backgroundColor: "#fff",
              width: 250,
            },
            drawerActiveTintColor: "#013220",
            drawerInactiveTintColor: "#4CAF50",
            drawerLabelStyle: {
              fontSize: 16,
              marginLeft: 0,
            },
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Criar Lista de Compras" component={PaginaLista} />
          <Drawer.Screen name="Consultar Listas" component={ConsultaLista} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
