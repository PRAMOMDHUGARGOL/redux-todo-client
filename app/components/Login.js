"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { usePathname, useRouter } from "next/navigation";

const Login = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      // Sign in user
      await signInWithEmailAndPassword(auth, email, password);
      if (pathname === "/login") {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-5">
            Welcome to Plan-O
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-200 mb-5">
            Organize your day with Plan-O to achieve greater productivity!
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-200 mb-5">
            Login or Register to get started.
          </p>
        </div>

        <div class="flex flex-col items-center justify-center px-6 mx-auto mt-0 sm:mt-24 p-4">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your Plan-O account
              </h1>
              <div class="space-y-4 md:space-y-6">
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:ring-primary-300 focus:outline-none font-medium text-white rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out"
                    onClick={() => handleSubmit()}
                  >
                    Log in
                  </button>

                  {/* <span className=" text-sm text-center text-white">or</span>

                  <button
                    type="button"
                    className="w-full bg-[#EA4335] hover:bg-[#d0281b] focus:ring-4 focus:ring-[#FBBF24] focus:outline-none font-medium text-white rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out"
                  >
                    Sign in with Google
                  </button> */}
                </div>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  New User?{" "}
                  <a
                    href="/signup"
                    class="font-medium  hover:underline dark:text-primary-500"
                  >
                    Register here
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

export default Login;
