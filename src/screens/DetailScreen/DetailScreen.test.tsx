import React from "react";
import { render } from "../../test-utils";
import DetailScreen from "./DetailScreen";
import { fireEvent, RenderAPI } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { format } from "date-fns";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { todoSlice, addTodo, Todo } from "../../slices/todoSlices";

let store: any;

const TEST_TITLE = "Hello";

const initialTodo = {
  title: "Test",
  date: 123456,
  id: "1f4ba8ae-f657-421e-8bb7-48e39f3be323",
};

const props = {
  navigation: { goBack: jest.fn() },
  route: {
    params: { id: initialTodo.id },
  },
} as any;

let component: RenderAPI;

beforeEach(() => {
  store = configureStore({ reducer: { todo: todoSlice.reducer } });
  store.dispatch(addTodo(initialTodo));
  component = render(
    <Provider store={store}>
      <DetailScreen {...props} />
    </Provider>
  );
});

describe("DetailScreen render correctly", () => {
  test("DetailScreen render", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("DetailScreen show date created correctly ", () => {
    const { getAllByText } = component;
    const date = initialTodo.date;
    expect(
      getAllByText("Created at: " + format(date, "mm/dd/yy kk:mm")).length
    ).toEqual(1);
  });
});

describe("DetailScreen function properly", () => {
  test("DetailScreen allow Todo title to be edited", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TITLE);
    expect(getAllByDisplayValue(TEST_TITLE).length).toEqual(1);
  });

  test("DetailScreen edit button edit the Todo title", () => {
    const { getByTestId, getByText } = component;
    const titleInputRef = getByTestId("title-input");
    const editBtnRef = getByText("Edit");
    fireEvent.changeText(titleInputRef, TEST_TITLE);
    fireEvent.press(editBtnRef);
    const todoArray = store
      .getState()
      .todo.todoList.filter((todo: Todo) => todo.title === TEST_TITLE);
    expect(todoArray.length).toEqual(1);
  });

  test("DetailScreen delete button delete the Todo title", () => {
    const { getByTestId, getByText } = component;
    const titleInputRef = getByTestId("title-input");
    const delBtnRef = getByText("Delete");
    fireEvent.changeText(titleInputRef, TEST_TITLE);
    fireEvent.press(delBtnRef);
    const todoArray = store
      .getState()
      .todo.todoList.filter((todo: Todo) => todo.title === TEST_TITLE);
    expect(todoArray.length).toEqual(0);
  });
});
