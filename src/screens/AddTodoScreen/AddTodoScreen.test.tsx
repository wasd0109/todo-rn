import React from "react";
import { render } from "../../test-utils";
import AddTodoScreen from "./AddTodoScreen";
import { RenderAPI } from "@testing-library/react-native";

let component: RenderAPI;

beforeEach(() => {
  component = render(<AddTodoScreen />);
});
