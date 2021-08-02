import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StyledTextInput from "../../components/StyledTextInput";
import StyledSecureInput from "../../components/StyledSecureInput";
import { Button } from "react-native-paper";
import Spacer from "../../components/Spacer";

const NAME_PLACEHOLDER = "John Smith";
const EMAIL_PLACEHOLDER = "abc@gmail.com";
const PASSWORD_PLACEHOLDER = "******";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.containerStyle}>
      <StyledTextInput
        label="Name"
        placeholder={NAME_PLACEHOLDER}
        value={name}
        onChangeText={setName}
        testID="name-input"
      />
      <StyledTextInput
        label="Email"
        placeholder={EMAIL_PLACEHOLDER}
        value={email}
        onChangeText={setEmail}
        testID="email-input"
      />
      <StyledSecureInput
        label="Password"
        placeholder={PASSWORD_PLACEHOLDER}
        value={password}
        onChangeText={setPassword}
        testID="password-input"
      />
      <Spacer>
        <View style={styles.btnContainerStyle}>
          <Button style={styles.btnStyle} mode="contained">
            Register
          </Button>
          <Button style={styles.btnStyle}>Login</Button>
        </View>
      </Spacer>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 200,
  },
  btnStyle: {
    width: 150,
  },
  btnContainerStyle: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
});
