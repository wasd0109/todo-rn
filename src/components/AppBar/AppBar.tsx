import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { AppBarProps } from "./AppBarType";

function AppBar({ scene, previous, navigation }: AppBarProps) {
  return (
    <Appbar.Header style={styles.appBarStyle}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          accessibilityLabel="back-button"
        />
      ) : null}
      <Appbar.Content title={scene ? scene.descriptor.options.title : "App"} />
      <Appbar.Action
        accessibilityLabel="add-todo"
        icon="plus"
        onPress={() => {
          navigation.navigate("AddTodo");
        }}
      />
    </Appbar.Header>
  );
}

export default AppBar;

const styles = StyleSheet.create({
  appBarStyle: {
    right: 0,
    bottom: 0,
  },
});
