import React from "react";
import { render } from "../../test-utils";
import DetailScreen from "./DetailScreen";
import { fireEvent, RenderAPI } from "@testing-library/react-native";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const TEST_TITLE = "Hello";
const TODO_ID = uuidv4();

const initialState = {
  todoList: [{ title: "Test", date: 123456, id: TODO_ID }],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
});
const store = configureStore({ reducer: { todo: todoSlice.reducer } });

const props = {
  navigation: {},
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
  test("Detail screen allow Todo title to be edited", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TITLE);
    expect(getAllByDisplayValue(TEST_TITLE).length).toEqual(1);
  });
});
