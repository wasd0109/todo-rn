import { Todo } from "../slices/todoSlices";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getUnixTime } from "date-fns";

// Date can added for testing/specific timezone
const generateTodo: (title: string, date?: Date) => Todo = (
  title: string,
  createdAt?: Date
): Todo => {
  return {
    createdAt: createdAt ? getUnixTime(createdAt) : getUnixTime(new Date()),
    title,
    id: uuidv4(),
  };
};

export default generateTodo;
