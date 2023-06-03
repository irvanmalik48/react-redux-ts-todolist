import { createSlice } from "@reduxjs/toolkit";

const initialState: unknown[] = [];

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      return state;
    }
  }
});

export const { addTodo } = slice.actions;
export default slice.reducer;
