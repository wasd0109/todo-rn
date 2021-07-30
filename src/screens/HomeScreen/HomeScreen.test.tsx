import React from "react";
import { render } from "../../test-utils";
import HomeScreen from ".";
import { fireEvent, RenderAPI } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { todoSlice, addTodo } from "../../slices/todoSlices";

let component: RenderAPI;

let store;

const initialTodo = {
  title: "Test",
  date: 123456,
  id: "1f4ba8ae-f657-421e-8bb7-48e39f3be323",
};

const props = {
  navigation: {
    navigate: jest.fn(),
  },
} as any;

beforeEach(() => {
  store = configureStore({ reducer: { todo: todoSlice.reducer } });
  store.dispatch(addTodo(initialTodo));
  component = render(
    <Provider store={store}>
      <HomeScreen {...props} />
    </Provider>
  );
});

describe("HomeScreen render correctly", () => {
  test("HomerScreen render", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("HomeScreen render list correctly", () => {
    const { getAllByText } = component;
    expect(getAllByText(initialTodo.title).length).toEqual(1);
  });
});

describe("HomeScreen function properly", () => {
  test("Detail button lead to detail screen with correct parameters", () => {
    const { getByLabelText } = component;
    const detailBtnRef = getByLabelText("more-button");
    fireEvent.press(detailBtnRef);
    expect(props.navigation.navigate).toBeCalled();
    expect(props.navigation.navigate).toBeCalledWith("Detail", {
      id: initialTodo.id,
    });
  });
});
