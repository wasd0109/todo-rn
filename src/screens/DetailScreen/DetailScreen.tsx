import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { editTodo, deleteTodo } from "../../slices/todoSlices";

import Spacer from "../../components/Spacer/Spacer";

import { DetailScreenProps } from "./DetailScreenType";

const DetailScreen = ({ navigation, route }: DetailScreenProps) => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const dispatch = useDispatch();
  const todo = todoList.find((todo) => todo.id === route.params.id);
  const [newTitle, setNewTitle] = useState(todo?.title || "");
  if (!todo) return null;
  return (
    <View style={styles.containerStyle}>
      <Spacer>
        <TextInput
          value={newTitle}
          testID="title-input"
          onChangeText={setNewTitle}
          label="Title"
          placeholder={todo.title}
        />
      </Spacer>
      <Spacer>
        <Text>Created at: {format(todo.date, "mm/dd/yy kk:mm")}</Text>
      </Spacer>
      <Spacer>
        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => {
            dispatch(
              editTodo({ title: newTitle, id: todo.id, date: todo.date })
            );
            navigation.goBack();
          }}
        >
          Edit
        </Button>
      </Spacer>
      <Spacer>
        <Button
          mode="outlined"
          color="red"
          style={styles.deleteButtonStyle}
          onPress={() => {
            dispatch(deleteTodo(todo.id));
            navigation.goBack();
          }}
        >
          Delete
        </Button>
      </Spacer>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  errorMessageStyle: { fontSize: 30 },
  errorContainerStyle: {
    justifyContent: "center",
    flex: 1,
    alignSelf: "center",
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    alignContent: "center",
  },
  buttonStyle: {
    width: 200,
    alignSelf: "center",
  },
  deleteButtonStyle: {
    alignSelf: "center",
    borderColor: "red",
    width: 200,
  },
});
