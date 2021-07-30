import { Todo } from "../slices/todoSlices";
import { v4 as uuidv4 } from "uuid";
import { getUnixTime } from "date-fns";

// Date can added for testing/specific timezone
const generateTodo: (title: string, date?: Date) => Todo = (
  title: string,
  date?: Date
): Todo => {
  return {
    date: date ? getUnixTime(date) : getUnixTime(new Date()),
    title,
    id: uuidv4(),
  };
};

export default generateTodo;
