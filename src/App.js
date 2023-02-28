import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./auth/Auth";
import Dashboard from "./layout/Dashboard";
import { signOutAuth, singIn } from "./store/actions/actionSlice";

function App() {
  const { theme } = useSelector((state) => state.data);
  const { isAuthe } = useSelector((state) => state.data);
  const dispatch = useDispatch();  
  const [loding, setLoding] = useState();
  useEffect(() => {
    // const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    // if (darkThemeMq.matches) {
    //   setTheme("dark");
    //   // Theme set to dark.
    // } else {
    //   setTheme("");
    //   // Theme set to light.
    // }
    setLoding(true);
    const data = JSON.parse(localStorage.getItem("user"));
    setLoding(false);
    if (data) {
      dispatch(singIn(data));
    } else {
      dispatch(signOutAuth());
    }
  }, [isAuthe]);

  return (
    <main className={theme}>
      {isAuthe && <Dashboard />}
      {!isAuthe && <Auth />}
    </main>
  );
}

export default App;
