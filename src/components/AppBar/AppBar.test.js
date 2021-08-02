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

  test("AppBar render route name as App if title no given", () => {
    const { getAllByText } = render(<AppBar />);
    expect(getAllByText("App").length).toEqual(1);
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
});

describe("AppBar function properly", () => {
  test("Back button lead to previous screen", () => {
    const props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
      },
      scene: {
        descriptor: {
          options: { title: "Test" },
        },
      },
      previous: true,
    };
    const { getByLabelText } = render(<AppBar {...props} />);
    const backBtnRef = getByLabelText("back-button");
    fireEvent.press(backBtnRef);
    expect(props.navigation.goBack).toBeCalled();
  });
});
