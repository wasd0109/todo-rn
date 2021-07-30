import React from "react";
import "react-native-paper";
import { render } from "@testing-library/react-native";
import { store } from "./store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

jest.mock("react-native-vector-icons/", () => "Icon");

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <PaperProvider>{children}</PaperProvider>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
