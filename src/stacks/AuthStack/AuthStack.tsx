import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthStackParamList } from "../../types/ReactNavigationType";

import RegisterScreen from "../../screens/RegisterScreen";
import AppBar from "../../components/AppBar";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
