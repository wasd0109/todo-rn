import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/store";
import { Provider } from "react-redux";

import HomeScreen from "./src/screens/HomeScreen";
import AppBar from "./src/components/AppBar";
import AddTodoScreen from "./src/screens/AddTodoScreen/AddTodoScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: (props) => <AppBar {...props} />,
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="AddTodo"
              component={AddTodoScreen}
              options={{ title: "New Todo" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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
