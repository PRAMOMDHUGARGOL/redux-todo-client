"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
  const { loading, error, updateState, response } = useSelector(
    (state) => state
  );
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <>
      <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div class="px-4 py-2">
          <h1 class="text-gray-800 font-bold text-2xl uppercase text-center">
            TO-DO's
          </h1>
        </div>
        <form class="w-full max-w-3xl mx-auto px-4 py-2">
          <div class="flex items-center border-b-2 border-teal-500 py-2">
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={(e) => addTodoHandler(e)}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTodo;
