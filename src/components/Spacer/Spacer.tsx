import React from "react";
import { StyleSheet, Text, View } from "react-native";

type spacerProps = {
  children: JSX.Element;
};

const Spacer = ({ children }: spacerProps) => {
  return <View style={styles.spacerStyle}>{children}</View>;
};

export default Spacer;

const styles = StyleSheet.create({
  spacerStyle: {
    marginVertical: 10,
  },
});
