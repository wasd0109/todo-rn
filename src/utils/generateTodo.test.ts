import generateTodo from "./generateTodo";
import { getUnixTime } from "date-fns";

test("generateTodo function generate Todo object correctly", () => {
  const title = "Todo";
  const createdAt = new Date();
  const todo = generateTodo(title, createdAt);
  expect(todo.title).toEqual(title);
  expect(todo.id).toMatch(
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  );
  expect(todo.createdAt).toEqual(getUnixTime(createdAt));
});
