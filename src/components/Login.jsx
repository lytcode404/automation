import { auth, db } from "@/db/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // const db = getFirestore();
      await setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        password: password,
        confirmation: "pending",
      });

      console.log("User signed up successfully:", userCredential.user);
      prompt("User signed up successfully:", userCredential.user);
      setIsLoginOpen(true);
      // router.reload();
    } catch (error) {
      console.error("Error signing up:", error);
      prompt("Error signing up:", error);
      // router.reload();
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up successfully:", userCredential.user);
      prompt("User signed up successfully:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
      prompt("Error signing up:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex min-h-screen items-center bg-gray-50 p-6 dark:bg-gray-900">
        <div className="mx-auto h-full max-w-4xl flex-1 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <Image
                aria-hidden="true"
                className="h-full w-full object-cover dark:hidden"
                src="/login-office.jpeg"
                alt="Office"
                width={700}
                height={700}
              />
              <Image
                aria-hidden="true"
                className="hidden h-full w-full object-cover dark:block"
                src="/login-office.jpeg"
                alt="Office"
                height={500}
                width={700}
              />
            </div>

            {isLoginOpen ? (
              <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Login
                  </h1>
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Email
                    </span>
                    <input
                      alue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input mt-1 block w-full text-sm focus:border-purple-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label className="mt-4 block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      Password
                    </span>
                    <input
                      className="focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input mt-1 block w-full text-sm focus:border-purple-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="***************"
                      type="password"
                    />
                  </label>
                  {/* You should use a button here, as the anchor is only used for the example  */}
                  <button
                    className="focus:shadow-outline-purple mt-4 block w-full rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-purple-700 focus:outline-none active:bg-purple-600"
                    onClick={handleSignin}
                  >
                    Log in
                  </button>

                  <hr className="my-8" />

                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                      href="./forgot-password.html"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                  <p className="mt-1">
                    <button
                      className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                      onClick={() => setIsLoginOpen(!isLoginOpen)}
                    >
                      Create account
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Create account
                  </h1>
                  <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                    <input
                      type="email"
                      className="focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input mt-1 block w-full text-sm focus:border-purple-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aneoe@work.com"
                    />
                  </label>
                  <label className="mt-4 block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input mt-1 block w-full text-sm focus:border-purple-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      placeholder="John Doe"
                      type="text"
                    />
                  </label>
                  <label className="mt-4 block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      password
                    </span>
                    <input
                      className="focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input mt-1 block w-full text-sm focus:border-purple-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      placeholder="***************"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>

                  <div className="mt-6 flex text-sm">
                    <label className="flex items-center dark:text-gray-400">
                      <input
                        type="checkbox"
                        className="form-checkbox focus:shadow-outline-purple dark:focus:shadow-outline-gray text-purple-600 focus:border-purple-400 focus:outline-none"
                      />
                      <span className="ml-2">
                        I agree to the
                        <span className="underline">privacy policy</span>
                      </span>
                    </label>
                  </div>

                  <button
                    className="focus:shadow-outline-purple mt-4 block w-full rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-purple-700 focus:outline-none active:bg-purple-600"
                    onClick={handleSignup}
                  >
                    Create account
                  </button>

                  <hr className="my-8" />

                  <p className="mt-4">
                    <button
                      className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400"
                      onClick={() => setIsLoginOpen(!isLoginOpen)}
                    >
                      Already have an account? Login
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
