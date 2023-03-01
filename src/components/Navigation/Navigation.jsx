import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { signOut } from "firebase/auth";

import style from "./Navigation.module.scss";
import { auth } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, signOutAuth } from "../../store/actions/actionSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBitcoinSign,
  faArrowRightFromBracket,
  faSun,
  faMoon,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.data);
  const [navBarHide, setNavBarHide] = useState("");
  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("userCoin");
        dispatch(signOutAuth());
      })
      .catch((error) => alert(error.message));
    // .finally(() => setLoading(false));
  };

  let themeLigit = <FontAwesomeIcon icon={faSun} />;
  let themedark = <FontAwesomeIcon icon={faMoon} />;
  const themeHandler = () => {
    dispatch(setTheme());
  };

  const navBarToggle = () => {
    navBarHide !== "hide" ? setNavBarHide("hide") : setNavBarHide("");
  };
  return (
    <nav className={style.nav} collapsible={navBarHide}>
      <div className={style.nav__logo}>
        <button className={style.nav__collapse} onClick={navBarToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <NavLink to="/" className={style.nav__logo_link}>
          <FontAwesomeIcon
            icon={faBitcoinSign}
            className={style.nav__logo_icon}
          />
          <span>BITCO</span>
        </NavLink>
      </div>
      <ul className={style.nav__list}>
        <NavLinks />
      </ul>
      <div className={style.nav__acttion}>
        <div className={style.toggle} them={theme} onClick={themeHandler}>
          <div className={style.theme}>
            {theme === "dark" ? themeLigit : themedark}
          </div>
        </div>
        <button className={style.logout} onClick={logOutHandler}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className={style.nav__link_icon}
          />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
