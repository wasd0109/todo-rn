import React from "react";
import { render } from "../../test-utils";
import DetailScreen from "./DetailScreen";
import { fireEvent, RenderAPI } from "@testing-library/react-native";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../slices/todoSlices";

const TEST_TITLE = "Hello";
const TODO_ID = uuidv4();

const initialState = {
  todoList: [{ title: "Test", date: 123456, id: TODO_ID }],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todoList.splice(index, 1, action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todoList.splice(index, 1);
    },
  },
});
const store = configureStore({ reducer: { todo: todoSlice.reducer } });

const props = {
  navigation: { goBack: jest.fn() },
  route: {
    params: { id: TODO_ID },
  },
} as any;

let component: RenderAPI;

beforeEach(() => {
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
    const date = initialState.todoList[0].date;
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
      .todo.todoList.filter((todo) => todo.title === TEST_TITLE);
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
      .todo.todoList.filter((todo) => todo.title === TEST_TITLE);
    expect(todoArray.length).toEqual(0);
  });
});
