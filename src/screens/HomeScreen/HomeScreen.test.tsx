import React from "react";
import { render } from "../../test-utils";
import HomeScreen from ".";
import { RenderAPI } from "@testing-library/react-native";

let component: RenderAPI;

beforeEach(() => {
  component = render(<HomeScreen />);
});

describe("HomeScreen render correctly", () => {
  test("HomerScreen render", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
