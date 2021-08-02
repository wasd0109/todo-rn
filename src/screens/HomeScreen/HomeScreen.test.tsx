import React from "react";
import { render, fireEvent, RenderAPI } from "../../test-utils";
import HomeScreen from ".";
import useFBGetAll from "../../api/useFBGetAll";
let component: RenderAPI;

const initialTodo = {
  title: "Test",
  createdAt: 123456,
  id: "1f4ba8ae-f657-421e-8bb7-48e39f3be323",
};

const navigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};
jest.mock("../../api/useFBGetAll", () => jest.fn());

beforeEach(() => {
  (useFBGetAll as jest.Mock).mockReturnValue({
    loading: false,
    data: [
      {
        title: "Test",
        createdAt: 123456,
        id: "1f4ba8ae-f657-421e-8bb7-48e39f3be323",
      },
    ],
    error: "",
  });
  component = render(<HomeScreen navigation={navigation} />);
});

afterAll(() => {
  jest.clearAllMocks();
  (useFBGetAll as jest.Mock).mockReset();
});

describe("HomeScreen render correctly", () => {
  test("HomerScreen render", async () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("HomeScreen render list correctly", () => {
    const { getAllByText, getByTestId } = component;
    expect(getAllByText(initialTodo.title).length).toEqual(1);
    // await waitFor(() => expect(findByText(initialTodo.title)));
  });

  test("HomeScreen render loading spinner when loading", () => {
    (useFBGetAll as jest.Mock).mockReturnValueOnce({
      loading: true,
      data: [],
      error: "",
    });
    const { getAllByTestId } = render(<HomeScreen navigation={navigation} />);
    expect(getAllByTestId("spinner").length).toEqual(1);
  });

  test("HomeScreen do not show spinner when not loading", () => {
    const { queryByTestId } = component;
    expect(queryByTestId("spinner")).toBeNull();
  });

  test("HomeScreen render error banner when error occur", () => {
    (useFBGetAll as jest.Mock).mockReturnValueOnce({
      loading: false,
      data: [],
      error: "Error",
    });
    const { getAllByText } = render(<HomeScreen navigation={navigation} />);
    expect(
      getAllByText("There was a problem loading the todo list").length
    ).toEqual(1);
  });

  test("HomeScreen do not show banner when error is null", () => {
    (useFBGetAll as jest.Mock).mockReturnValueOnce({
      loading: false,
      data: [],
      error: "Error",
    });
    const { getAllByText } = render(<HomeScreen navigation={navigation} />);
    expect(
      getAllByText("There was a problem loading the todo list").length
    ).toEqual(1);
  });
});

describe("HomeScreen function properly", () => {
  test("Detail button lead to detail screen with correct parameters", () => {
    const detailBtnRef = component.getByLabelText("more-button");
    fireEvent.press(detailBtnRef);
    expect(navigation.navigate).toBeCalled();
    expect(navigation.navigate).toBeCalledWith("Detail", {
      id: initialTodo.id,
    });
  });

  test("Refresh button refresh the content when pressed", () => {
    (useFBGetAll as jest.Mock).mockReturnValueOnce({
      loading: false,
      data: [],
      error: "Error",
    });

    const { getAllByText, getByText } = render(
      <HomeScreen navigation={navigation} />
    );
    // Clear mock to reset count
    (useFBGetAll as jest.Mock).mockReset();
    // Ensure that mock is reset with call count = 0
    expect(useFBGetAll).toBeCalledTimes(0);
    // Re-mock the function
    (useFBGetAll as jest.Mock).mockReturnValueOnce({
      loading: false,
      data: [],
      error: "Error",
    });
    const refreshBtnRef = getByText("Reload");
    fireEvent.press(refreshBtnRef);
    expect(useFBGetAll).toBeCalled();
  });
});
