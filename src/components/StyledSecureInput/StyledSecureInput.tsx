import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";

import Spacer from "../Spacer";

type StyledSecureInputProps = {
  label: string;
  placeholder: string;
  testID: string;
  value: string;
  onChangeText: (value: string) => void;
};

const StyledSecureInput = ({
  label,
  placeholder,
  testID,
  value,
  onChangeText,
}: StyledSecureInputProps) => {
  const [hidden, setHidden] = useState(true);
  return (
    <Spacer>
      <TextInput
        style={styles.textInputStyle}
        label={label}
        mode="outlined"
        placeholder={placeholder}
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidden}
        right={<TextInput.Icon name="eye" onPress={() => setHidden(!hidden)} />}
      />
    </Spacer>
  );
};

export default StyledSecureInput;

const styles = StyleSheet.create({
  textInputStyle: {
    marginHorizontal: 15,
  },
});
