import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List, Divider, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomeScreen = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);

  return (
    <FlatList
      data={todoList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <>
            <List.Item title={item.title} />
            <Divider />
          </>
        );
      }}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
