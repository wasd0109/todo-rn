import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "./src/store";
import { Provider } from "react-redux";

import AppStack from "./src/stacks/AppStack";
import AuthStack from "./src/stacks/AuthStack";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          {loggedIn ? <AppStack /> : <AuthStack />}
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
