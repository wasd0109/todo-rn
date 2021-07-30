import React from "react";
import { render, fireEvent } from "../../test-utils";
import AddTodoScreen from "./AddTodoScreen";
import { RenderAPI } from "@testing-library/react-native";

import { store } from "../../store";
import { Provider } from "react-redux";

const TEST_TODO_TITLE = "Buy things";

let component: RenderAPI;

let props = {
  navigation: {
    navigate: jest.fn(),
  },
} as any;

beforeEach(() => {
  component = render(
    <Provider store={store}>
      <AddTodoScreen {...props} />
    </Provider>
  );
});

describe("AddTodoScreen render correctly", () => {
  test("AddTodoScreen render", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Todo title input render correctly", () => {
    const { getAllByTestId } = component;
    expect(getAllByTestId("title-input").length).toEqual(1);
  });

  test("Add Todo button render correctly", () => {
    const { getAllByText } = component;
    expect(getAllByText("Add Todo").length).toEqual(1);
  });
});

describe("AddTodoScreen function properly", () => {
  test("Todo title input change value on input", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TODO_TITLE);
    expect(getAllByDisplayValue(TEST_TODO_TITLE).length).toEqual(1);
  });

  test("Add Todo button return to home on press when title was entered", () => {
    let props = {
      navigation: {
        navigate: jest.fn(),
      },
    } as any;
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <AddTodoScreen {...props} />
      </Provider>
    );
    const buttonRef = getByText("Add Todo");
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TODO_TITLE);
    fireEvent.press(buttonRef);
    expect(props.navigation.navigate).toBeCalled();
    expect(props.navigation.navigate).toBeCalledWith("Home");
  });

  test("Add Todo button does not return to home when title was empty", () => {
    let props = {
      navigation: {
        navigate: jest.fn(),
      },
    } as any;
    const { getByText } = render(
      <Provider store={store}>
        <AddTodoScreen {...props} />
      </Provider>
    );
    const buttonRef = getByText("Add Todo");
    fireEvent.press(buttonRef);
    expect(props.navigation.navigate).toBeCalledTimes(0);
  });

  test("Add Todo button add Todo to state", () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <AddTodoScreen {...props} />
      </Provider>
    );
    const buttonRef = getByText("Add Todo");
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TODO_TITLE);
    fireEvent.press(buttonRef);
    expect(store.getState().todo.todoList[0].title).toEqual(TEST_TODO_TITLE);
  });
});
