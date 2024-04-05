"use client";
import { Provider } from "react-redux";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { store } from "./store";

export default function Home() {
  return (
    <Provider store={store}>
      <AddTodo />
      <Todos />
    </Provider>
  );
}
