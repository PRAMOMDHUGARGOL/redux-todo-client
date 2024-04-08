import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import firebaseSlice from "./features/todo/firebaseSlice";

export const store = configureStore({
  reducer: { todo: todoReducer, firebase: firebaseSlice },
});
