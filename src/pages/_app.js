import Sidebar from "@/components/Sidebar";
import store from "@/store/store";
import "@/styles/globals.css";
import { useState } from "react";
import { Provider } from "react-redux";
export default function App({ Component, pageProps }) {
  return (
    <>
      <div className={`flex bg-gray-50 dark:bg-gray-900 w-full`}>
        <Sidebar />
        <div className="w-[350px] h-screen"></div>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </>
  );
}
