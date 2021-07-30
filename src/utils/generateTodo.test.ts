import generateTodo from "./generateTodo";
import { getUnixTime } from "date-fns";

test("generateTodo function generate Todo object correctly", () => {
  const title = "Todo";
  const date = new Date();
  const todo = generateTodo(title, date);
  expect(todo.title).toEqual(title);
  expect(todo.id).toMatch(
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  );
  expect(todo.date).toEqual(getUnixTime(date));
});
