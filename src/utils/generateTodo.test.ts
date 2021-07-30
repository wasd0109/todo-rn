import generateTodo from "./generateTodo";

test("generateTodo function generate Todo object correctly", () => {
  const title = "Todo";
  const todo = generateTodo(title);
  expect(todo.title).toEqual(title);
  expect(todo.id).toMatch(
    /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  );
  expect(todo.date).toBeInstanceOf(Date);
});
