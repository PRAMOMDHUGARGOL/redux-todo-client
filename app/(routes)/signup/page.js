"use client";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  writeBatch,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import dayjs from "dayjs";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(email)) {
        alert("Enter valid email address");
        return;
      } else if (name.length === 0) {
        alert("Name field Empty");
        return;
      } else if (!validatePassword(password)) {
        alert("Password must be at least 6 characters long");
        return;
      } else if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
        alert("Password not matching");
      } else {
        // Create user
        await createUserWithEmailAndPassword(auth, email, password);

        // Sign in user
        await signInWithEmailAndPassword(auth, email, password);

        // Update user profile
        await updateProfile(auth.currentUser, { displayName: name });

        // console.log(auth);
        // Create references
        const userDocRef = await doc(db, "planoUsers", auth.currentUser.uid);
        const dayRef = await doc(
          db,
          "planoUsers",
          auth.currentUser.uid,
          dayjs().format("YYYY"),
          dayjs().format("DD-MM-YYYY")
        );

        await setDoc(userDocRef, {
          UserName: name,
          UserEmail: email,
          RegisteredDate: serverTimestamp(),
        });

        await setDoc(dayRef, {
          Todos: [],
        });

        // Redirect to home page
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle specific error types
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password");
      } else {
        console.log("Errors");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-0 sm:mt-20">
        <div className="flex flex-col items-center justify-center px-6 mx-auto p-4">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your Plan-O account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Robert"
                    required=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:ring-primary-300 focus:outline-none font-medium text-white rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Create an account
                  </button>

                  {/* <span className=" text-sm text-center text-white">or</span>

                  <button
                    type="button"
                    className="w-full bg-[#EA4335] hover:bg-[#d0281b] focus:ring-4 focus:ring-[#FBBF24] focus:outline-none font-medium text-white rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out"
                  >
                    Sign up with Google
                  </button> */}
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium  hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
