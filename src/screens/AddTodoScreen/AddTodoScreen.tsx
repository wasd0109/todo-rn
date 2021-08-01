import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Spacer from "../../components/Spacer/Spacer";
import { useDispatch } from "react-redux";
import { addTodo, Todo } from "../../slices/todoSlices";
import { AddTodoScreenProps } from "./AddTodoScreenType";
import generateTodo from "../../utils/generateTodo";
import db from "../../utils/fbinit";
import { useFBAdd } from "../../api/useFBAdd";

const TODO_TITLE_PLACEHOLDER = "Buy groceries";

const AddTodoScreen = ({ navigation }: AddTodoScreenProps) => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState<Todo>({} as Todo);
  const { success, loading, error } = useFBAdd("todos", todo);
  const onSubmit = () => {
    setTodo(generateTodo(title));
  };
  return (
    <View style={styles.containerStyle}>
      <Spacer>
        <TextInput
          label="Title"
          mode="outlined"
          placeholder={TODO_TITLE_PLACEHOLDER}
          testID="title-input"
          value={title}
          onChangeText={setTitle}
        />
      </Spacer>
      {error ? (
        <Spacer>
          <Text style={styles.errorStyle}>{error}</Text>
        </Spacer>
      ) : null}
      <Spacer>
        <Button
          style={styles.buttonStyle}
          mode="contained"
          onPress={() => onSubmit()}
        >
          Add Todo
        </Button>
      </Spacer>
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 15,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  errorStyle: {
    color: "red",
  },
  buttonStyle: {
    width: 200,
    alignSelf: "center",
  },
});
