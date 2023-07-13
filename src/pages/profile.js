import { auth, db } from "@/db/FirebaseConfig";
import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
  
    try {
      await updateDoc(userRef, {
        credentials: {
          UseEmail: email,
          UsePassword: password,
        },
      });
      console.log("Additional information added successfully!");
      prompt("Additional information added successfully!")
      router.push('/')
    } catch (error) {
      console.error("Error adding additional information:", error);
      prompt("Error adding additional information:", error)
    }
  };

  
  return (
    <>
      <div className="mt-20 w-10/12 pr-20">
        <h1 className="text-3xl font-bold">Enter Your Credentials</h1>
        <p>
          Enter your email address from which you want to share multiple
          messages
        </p>
        <input
          className="mt-2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter your email"
          alue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>
          For security password, go to your account and check under two-step
          verification. Copy the generated security password for your account
          and paste it here.
        </p>
        <input
          className="mt-2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter your security password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <p className="font-semibold">Detailed steps</p>
          <ul className="mt-2 list-disc pl-6">
            <li>
              Go to Manage your settings of your account
            </li>
            <li>
              just type &quot;App Passwords&quot;
            </li>
            <li>
              click the top option, fill your password and generate temperory password
            </li>
            <li>
              Now in the drop down select app: Mail, and select type phone then generate and copy paste it here
            </li>
          </ul>
          <button
            className="w-fit focus:shadow-outline-purple mt-4 block rounded-lg border border-transparent bg-purple-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-purple-700 focus:outline-none active:bg-purple-600"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
// this is Profile
