"use client";
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useEffect } from "react";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoading } from "./features/todo/firebaseSlice";
import Login from "./components/Login";

export default function Home() {
  const { user, isLoading } = useSelector((state) => state.firebase);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch(loginUser(authUser));
        dispatch(setLoading(false));
      } else {
        console.log("User not logged in");
      }
    });
  });

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
