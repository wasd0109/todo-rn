import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List, Divider, Provider, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HomeScreenProps } from "./HomeScreenType";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  return (
    <FlatList
      data={todoList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <>
            <List.Item
              title={item.title}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="dots-horizontal"
                  onPress={() => navigation.navigate("Detail", { id: item.id })}
                  accessibilityLabel="more-button"
                />
              )}
            />
            <Divider />
          </>
        );
      }}
    />
  );
};

//

export default HomeScreen;

const styles = StyleSheet.create({});
