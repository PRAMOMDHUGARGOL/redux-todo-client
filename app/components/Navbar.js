"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { logOut } from "../features/todo/firebaseSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.firebase);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
        <div className="flex  md:flex-row justify-between items-center">
          <div className="flex flex-col">
            <Link href="/">
              <h1 className="font-semibold text-xl dark:text-gray-100">
                Plan-O
              </h1>
            </Link>
          </div>

          <div className="space-x-8 hidden md:block">
            <button
              onClick={() => {
                document
                  .getElementById("about-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-base  text-gray-600 dark:text-gray-300 font-normal hover:text-green-500`}
            >
              About{" "}
            </button>
          </div>

          <div className="space-x-4 flex flex-row items-center">
            <a
              // href={userData.socialLinks.instagram}
              className="hover:text-green-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AccountCircleSharpIcon fontSize="large" />{" "}
              {user ? user.displayName : ""}
            </a>
          </div>
          {user && (
            <button
              onClick={async () => {
                await signOut(auth);
                dispatch(logOut());
              }}
              className={`text-base  text-gray-600 dark:text-gray-300 font-normal hover:text-green-500`}
            >
              Sign Out{" "}
            </button>
          )}
        </div>
        <div className="space-x-8 block md:hidden mt-4">
          <button
            onClick={() => {
              document
                .getElementById("about-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className={`text-base  text-gray-600 dark:text-gray-300 font-normal hover:text-green-500`}
          >
            About{" "}
          </button>
        </div>
      </div>
    </>
  );
}
