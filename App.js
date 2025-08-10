import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./app/pages/home";
import PaginaLista from "./app/pages/paginaLista";
import ConsultarLista from "./app/pages/consultarLista";
import AlterarLista from "./app/pages/alterarLista";

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
              backgroundColor: "#f0fdf4",
              width: 260,
            },
            drawerActiveTintColor: "#1b5e20",
            drawerInactiveTintColor: "#388e3c",
            drawerLabelStyle: {
              fontSize: 16,
              marginLeft: -10,
            },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Criar Lista"
            component={PaginaLista}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="playlist-plus" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Consultar Lista"
            component={ConsultarLista}
            options={{
              drawerIcon: ({ color, size }) => (
                <Icon name="playlist-check" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Alterar Lista"
            component={AlterarLista}
            options={{
              drawerItemStyle: { display: "none" },
              drawerIcon: ({ color, size }) => (
                <Icon name="playlist-edit" color={color} size={size} />
              ),
            }}
          />
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
