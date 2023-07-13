import Sidebar from "@/components/Sidebar";
import Login from "@/components/Login";
import store from "@/store/store";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
// import Login from "./login";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/db/FirebaseConfig";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // router.push("/")

      } else {
        setIsLoggedIn(false);
        // router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);
  // useEffect(() => {
    
  //   setIsLoggedIn(false); 
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   }
  // }, []);
  return (
    <>
      {isLoggedIn ? (
        <div className={`flex w-full bg-gray-50 dark:bg-gray-900`}>
          <Sidebar />
          <div className="h-screen w-[350px] max-sm:hidden"></div>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
