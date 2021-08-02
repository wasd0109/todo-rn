import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { onChange } from "react-native-reanimated";
import Spacer from "../Spacer";

type StyledTextInputProps = {
  label: string;
  placeholder: string;
  testID: string;
  value: string;
  onChangeText: (value: string) => void;
};

const StyledTextInput = ({
  label,
  placeholder,
  testID,
  value,
  onChangeText,
}: StyledTextInputProps) => {
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
      />
    </Spacer>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  textInputStyle: {
    marginHorizontal: 15,
  },
});
