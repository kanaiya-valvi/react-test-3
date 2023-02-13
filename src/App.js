import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./layout/Dashboard";
import Auth from "./Auth/Auth";
import { signOutAuth, singIn } from "./store/actions/actionSlice";
import Loader from "./UI/Loader/Loader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function App() {
  const dispatch = useDispatch();
  const { isAuthe } = useSelector((state) => state.data);
  const [loding, setLoding] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setLoding(true);
    const data = JSON.parse(localStorage.getItem("user"));
    setLoding(false);
    if (data) {
      dispatch(singIn(data));
    } else {
      dispatch(signOutAuth());
    }
  }, [isAuthe]);

  let themeLigit = <FontAwesomeIcon icon={faSun} />;
  let themedark = <FontAwesomeIcon icon={faMoon} />;
  const themeHandler = () => {
    if (theme === "dark") {
      setTheme("");
    } else {
      setTheme("dark");
    }
  };  

  return (
    <main className={theme}>
      <button onClick={themeHandler} className="theme">
        {theme === "dark" ? themeLigit : themedark}
      </button>
      {loding && <Loader />}
      {isAuthe && !loding && <Dashboard />}
      {!isAuthe && !loding && <Auth />}
    </main>
  );
}

export default App;
