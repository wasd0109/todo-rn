import React from "react";
import { render } from "../../test-utils";
import HomeScreen from ".";
import { RenderAPI } from "@testing-library/react-native";
import { store } from "../../store";
import { Provider } from "react-redux";

let component: RenderAPI;

beforeEach(() => {
  component = render(
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
});

describe("HomeScreen render correctly", () => {
  test("HomerScreen render", () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
