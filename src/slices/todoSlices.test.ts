import { addTodo, editTodo, deleteTodo } from "./todoSlices";
import { todoSlice } from "./todoSlices";
import { configureStore, createSlice } from "@reduxjs/toolkit";

let store: any;

const initialTodo = {
  title: "Test",
  date: 123456,
  id: "1f4ba8ae-f657-421e-8bb7-48e39f3be323",
};

beforeEach(() => {
  store = configureStore({ reducer: { todo: todoSlice.reducer } });
  store.dispatch(addTodo(initialTodo));
});

describe("Reducer function properly", () => {
  test("addTodo changes state correctly", () => {
    const testTodo = {
      title: "Test1",
      date: 1234567,
      id: "testUUIDString",
    };
    store.dispatch(addTodo(initialTodo));
    const todoList = store.getState().todo.todoList;
    const index = todoList.findIndex((todo: any) => todo.id === initialTodo.id);
    // !The mock test store contain 1 Todo as initial state, thus todoList.length == 2
    // TODO Find a way to customize store in test
    expect(todoList.length).toEqual(2);
    expect(todoList[index].title).toEqual(initialTodo.title);
    expect(todoList[index].date).toEqual(initialTodo.date);
    expect(todoList[index].id).toEqual(initialTodo.id);
  });

  test("Edit Todo changes state correctly", () => {
    const testTodo = {
      title: "Test1",
      date: 456789,
      id: "1f4ba8ae-f657-421e-8bb7-48e39f3be323",
    };
    store.dispatch(addTodo(initialTodo));
    store.dispatch(editTodo(testTodo));
    const todoList = store.getState().todo.todoList;
    expect(todoList[0].title).toEqual(testTodo.title);
    expect(todoList[0].date).toEqual(initialTodo.date);
    expect(todoList[0].id).toEqual(initialTodo.id);
  });

  test("Delete Todo changes state correctly", () => {
    store.dispatch(deleteTodo(initialTodo.id));
    const todoList = store.getState().todo.todoList;
    expect(todoList.length).toEqual(0);
  });
});
