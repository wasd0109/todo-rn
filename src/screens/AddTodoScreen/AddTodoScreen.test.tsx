import React from "react";
import { render, fireEvent } from "../../test-utils";
import AddTodoScreen from "./AddTodoScreen";
import { RenderAPI } from "@testing-library/react-native";

import { store } from "../../store";
import { Provider } from "react-redux";
import useFBAdd from "../../api/useFBAdd";
import { useNavigation } from "@react-navigation/core";

const TEST_TODO_TITLE = "Buy things";

let component: RenderAPI;

jest.mock("../../api/useFBAdd", () => jest.fn());

const mockNavigation = {
  goBack: jest.fn,
} as any;

beforeEach(() => {
  (useFBAdd as jest.Mock).mockReturnValue({
    loading: false,
    success: false,
    error: null,
  });
  component = render(<AddTodoScreen navigation={mockNavigation} />);
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

  test("TodoScreen show error when fetch return error", () => {
    (useFBAdd as jest.Mock).mockReturnValueOnce({
      loading: false,
      success: false,
      error: "Something wrong happened",
    });
    const { getAllByText } = render(
      <AddTodoScreen navigation={mockNavigation} />
    );
    expect(
      getAllByText("There was a problem adding the todo list").length
    ).toEqual(1);
  });

  test("TodoScreen do not show error when error is not truthy", () => {
    (useFBAdd as jest.Mock).mockReturnValueOnce({
      loading: false,
      success: false,
      error: null,
    });
    const { queryByText } = render(
      <AddTodoScreen navigation={mockNavigation} />
    );
    expect(queryByText("There was a problem adding the todo list")).toEqual(
      null
    );
  });

  test("TodoScreen show spinner when loading", () => {
    (useFBAdd as jest.Mock).mockReturnValueOnce({
      loading: true,
      success: false,
      error: null,
    });
    const { getAllByTestId } = render(
      <AddTodoScreen navigation={mockNavigation} />
    );
    expect(getAllByTestId("spinner").length).toEqual(1);
  });

  test("TodoScreen do not show spinner when not loading", () => {
    const { queryByTestId } = component;
    expect(queryByTestId("spinner")).toBeNull();
  });
});

describe("AddTodoScreen function properly", () => {
  test("Todo title input change value on input", () => {
    const { getByTestId, getAllByDisplayValue } = component;
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TODO_TITLE);
    expect(getAllByDisplayValue(TEST_TODO_TITLE).length).toEqual(1);
  });

  // Callback to be tested in useFBAdd function
  // test("Add Todo button return to home on submit when title was entered", () => {
  //   const { getByText, getByTestId } = render(
  //     <AddTodoScreen navigation={mockNavigation} />
  //   );
  //   const buttonRef = getByText("Add Todo");
  //   const titleInputRef = getByTestId("title-input");
  //   fireEvent.changeText(titleInputRef, TEST_TODO_TITLE);
  //   fireEvent.press(buttonRef);
  //   expect(mockNavigation.goBack()).toBeCalled();
  //   expect(props.navigation.goBack).toBeCalledWith("Home");
  // });

  // As above
  // test("Add Todo button does not return to home when title was empty", () => {
  //   let props = {
  //     navigation: {
  //       navigate: jest.fn(),
  //     },
  //   } as any;
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <AddTodoScreen {...props} />
  //     </Provider>
  //   );
  //   const buttonRef = getByText("Add Todo");
  //   fireEvent.press(buttonRef);
  //   expect(props.navigation.navigate).toBeCalledTimes(0);
  // });

  test("Add Todo button add trigger useFBAdd", () => {
    const { getByText, getByTestId } = component;
    const buttonRef = getByText("Add Todo");
    const titleInputRef = getByTestId("title-input");
    fireEvent.changeText(titleInputRef, TEST_TODO_TITLE);
    fireEvent.press(buttonRef);
    expect(useFBAdd).toBeCalled();
  });

  test("Press retry button retrigger useFBAdd", () => {
    (useFBAdd as jest.Mock).mockReturnValueOnce({
      loading: false,
      success: false,
      error: "Something went wrong",
    });
    const initialCallCount = (useFBAdd as jest.Mock).mock.calls.length;
    const { getByText } = render(<AddTodoScreen navigation={mockNavigation} />);
    const retryButtonRef = getByText("Retry");
    fireEvent.press(retryButtonRef);
    const finalCallCount = (useFBAdd as jest.Mock).mock.calls.length;
    expect(finalCallCount).toBeGreaterThan(initialCallCount);
  });
});
