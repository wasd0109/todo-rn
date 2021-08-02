import { RenderAPI } from "@testing-library/react-native";
import React from "react";
import { render, fireEvent } from "../../test-utils";
import RegisterScreen from "./RegisterScreen";

const TEST_NAME = "John Ele";
const TEST_EMAIL = "johnEle@gmail.com";
const TEST_PASSWORD = "testpassword";

let component: RenderAPI;

beforeEach(() => {
  component = render(<RegisterScreen />);
});

describe("RegisterScreen render correctly", () => {
  test("RegisterScreen render", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("RegisterScreen show Name Input", () => {
    const { getAllByTestId } = component;
    expect(getAllByTestId("name-input").length).toEqual(1);
  });

  test("RegisterScreen show Email Input", () => {
    const { getAllByTestId } = component;
    expect(getAllByTestId("email-input").length).toEqual(1);
  });

  test("RegisterScreen show Password Input", () => {
    const { getAllByTestId, getByTestId } = component;
    const passwordInputRef = getByTestId("password-input");
    console.log(passwordInputRef);
    expect(getAllByTestId("password-input").length).toEqual(1);
  });

  test("RegisterScreen show Register Button", () => {
    const { getAllByText } = component;
    expect(getAllByText("Register").length).toEqual(1);
  });

  test("RegisterScreen show Link to Login", () => {
    const { getAllByText } = component;
    expect(getAllByText("Login").length).toEqual(1);
  });
});

describe("Register Screen functions properly", () => {
  test("Name input allow input and changes value", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const nameInputRef = getByTestId("name-input");
    fireEvent.changeText(nameInputRef, TEST_NAME);
    expect(getAllByDisplayValue(TEST_NAME).length).toEqual(1);
  });

  test("Email input allow input and changes value", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const emailInputRef = getByTestId("email-input");
    fireEvent.changeText(emailInputRef, TEST_EMAIL);
    expect(getAllByDisplayValue(TEST_EMAIL).length).toEqual(1);
  });

  test("Password input allow input and changes value", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const passwordInputRef = getByTestId("password-input");
    fireEvent.changeText(passwordInputRef, TEST_PASSWORD);
    expect(getAllByDisplayValue(TEST_PASSWORD).length).toEqual(1);
  });
});
