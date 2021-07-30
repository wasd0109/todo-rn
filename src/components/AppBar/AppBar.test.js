import React from "react";
import { render } from "../../test-utils";
import AppBar from "./AppBar";
import { fireEvent, RenderAPI } from "@testing-library/react-native";

const defaultProps = {
  navigation: {
    navigate: jest.fn(),
  },
  scene: {
    descriptor: {
      options: { title: "Test" },
    },
  },
  previous: undefined,
};

let component;

beforeEach(() => {
  component = render(<AppBar {...defaultProps} />);
});

describe("AppBar render correctly", () => {
  test("AppBar render", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("AppBar render route name correctly", () => {
    const { getAllByText } = component;
    expect(getAllByText("Test").length).toEqual(1);
  });

  test("Back button render if previous props is not undefined", () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
      },
      scene: {
        descriptor: {
          options: { title: "Test" },
        },
      },
      previous: true,
    };
    const { getAllByLabelText } = render(<AppBar {...props} />);
    expect(getAllByLabelText("back-button").length).toEqual(1);
  });
  test("Back button do not render if previous props is undefined", () => {
    const { queryByLabelText } = component;
    expect(queryByLabelText("back-button")).toEqual(null);
  });

  test("Plus button lead to AddToDo screen", () => {
    const { getByLabelText } = component;
    const addButtonRef = getByLabelText("add-todo");
    fireEvent.press(addButtonRef);
    expect(defaultProps.navigation.navigate).toBeCalledWith("AddTodo");
  });
});

// describe("AppBar function correctly");
