import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  TextInput,
  Banner,
  ActivityIndicator,
} from "react-native-paper";
import Spacer from "../../components/Spacer/Spacer";
import { addTodo, Todo } from "../../slices/todoSlices";
import { AddTodoScreenProps } from "./AddTodoScreenType";
import generateTodo from "../../utils/generateTodo";
import db from "../../utils/fbinit";
import useFBAdd from "../../api/useFBAdd";

const TODO_TITLE_PLACEHOLDER = "Buy groceries";

const AddTodoScreen = ({ navigation }: AddTodoScreenProps) => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState<Todo>({} as Todo);
  const { success, loading, error } = useFBAdd(
    "todos",
    todo,
    navigation.goBack // Navigation.goBack passed as callback to be called after success
  );
  const onSubmit = async () => {
    setTodo(generateTodo(title));
  };
  return (
    <>
      {error ? (
        <Banner
          visible={true}
          actions={[{ label: "Retry", onPress: () => setTodo({ ...todo }) }]}
        >
          There was a problem adding the todo list
        </Banner>
      ) : null}
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
        <Spacer>
          {loading ? (
            <ActivityIndicator size="large" testID="spinner" />
          ) : (
            <Button
              style={styles.buttonStyle}
              mode="contained"
              onPress={() => onSubmit()}
            >
              Add Todo
            </Button>
          )}
        </Spacer>
      </View>
    </>
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
