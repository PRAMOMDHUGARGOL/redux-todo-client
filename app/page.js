"use client";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoading } from "./features/todo/firebaseSlice";
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import Login from "./components/Login";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(loginUser(authUser));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [dispatch]);

  const { user, isLoading } = useSelector((state) => state.firebase);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <AddTodo />
          <Todos />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
