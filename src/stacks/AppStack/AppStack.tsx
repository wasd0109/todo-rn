import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AppStackParamList } from "../../types/ReactNavigationType";

import HomeScreen from "../../screens/HomeScreen";
import AppBar from "../../components/AppBar";
import AddTodoScreen from "../../screens/AddTodoScreen";
import DetailScreen from "../../screens/DetailScreen";

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
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
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detail" }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
