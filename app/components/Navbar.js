"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { logOut } from "../features/todo/firebaseSlice";
import dayjs from "dayjs";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.firebase);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
        <div className="flex md:flex-row justify-between items-center">
          <div className="flex flex-col">
            <Link href="/">
              <h1 className="font-semibold text-xl dark:text-gray-100">
                Plan-O
              </h1>
            </Link>
          </div>

          <div className="items-center space-x-8 hidden md:block">
            <span className="text-gray-200">{dayjs().format("dddd")}</span>
            <span className="text-gray-200">
              {dayjs().format("DD-MM-YYYY")}
            </span>
          </div>

          <div className="flex items-center justify-center space-x-5">
            {user && (
              <a
                className="hover:text-green-500 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AccountCircleSharpIcon fontSize="large" className="mr-1" />
                {user ? user.displayName : ""}
              </a>
            )}
            {user ? (
              <button
                onClick={async () => {
                  await signOut(auth);
                  dispatch(logOut());
                  router.push("/");
                }}
                className={`text-base text-gray-600 dark:text-gray-300 font-normal hover:text-green-500`}
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => {
                  if (pathname === "/signup") router.push("/");
                  if (pathname === "/") router.push("/signup");
                }}
                className={`text-base text-gray-600 dark:text-gray-300 font-normal hover:text-green-500`}
              >
                {pathname === "/signup" ? "Login" : "Register"}
              </button>
            )}
          </div>
        </div>
        <div className="space-x-8 block md:hidden mt-5 text-center items-center">
          <span className="text-gray-200">{dayjs().format("dddd")}</span>
          <span className="text-gray-200">{dayjs().format("DD-MM-YYYY")}</span>
        </div>
      </div>
    </>
  );
}
