import { Todo } from "../slices/todoSlices";
import { v4 as uuidv4 } from "uuid";

const generateTodo: (title: string) => Todo = (title: string): Todo => {
  return {
    date: new Date(),
    title,
    id: uuidv4(),
  };
};

export default generateTodo;
