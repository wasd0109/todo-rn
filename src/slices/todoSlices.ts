import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  title: string;
  createdAt: number;
  content?: string;
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
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todoList[index].title = action.payload.title;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todoList.splice(index, 1);
    },
  },
});

export const { addTodo, editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
