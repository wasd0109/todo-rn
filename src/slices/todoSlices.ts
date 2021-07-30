import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  title: string;
  date: number;
  id: string;
}

export interface TodoState {
  todoList: Todo[];
}

const initialState: TodoState = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoList.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
