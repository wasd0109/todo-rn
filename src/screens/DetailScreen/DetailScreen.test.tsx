import React from "react";
import { render } from "../../test-utils";
import DetailScreen from "./DetailScreen";
import { RenderAPI } from "@testing-library/react-native";
import Provide

let component: RenderAPI;

beforeEach(() => {
  component = render(<DetailScreen />);
});

describe("DetailScreen render correctly", () => {
  test("DetailScreen render", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("DetailScreen show date created correctly ", () => {
    const {getBy}
  });
});
