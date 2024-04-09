"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import dayjs from "dayjs";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => state.firebase);

  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.length === 0) {
      alert("You forgot to add the todo");
      return;
    } else {
      dispatch(addTodo({ text: input, uid: user.uid }));
      setInput("");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-3xl text-center mt-6">
            Welcome back, {user?.displayName}!
          </h1>
          <div className="text-center">
            <p className="text-gray-600 text-lg mt-1">
              Let's plan your day together 😊
            </p>
            {/* <p className="text-gray-600 text-lg mt-1">
              [{dayjs().format("DD-MM-YYYY")}]
            </p> */}
          </div>
        </div>
        <form className="w-full max-w-3xl mx-auto px-4 py-2">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Add a task"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
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
