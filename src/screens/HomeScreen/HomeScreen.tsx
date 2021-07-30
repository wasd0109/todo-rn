import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { List, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomeScreen = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  return (
    <FlatList
      data={todoList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <List.Item title={item.title} />}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
