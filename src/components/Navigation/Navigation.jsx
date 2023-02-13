import React from "react";
import { NavLink } from "react-router-dom";
import NavLik from "./NavLik";
import { signOut } from "firebase/auth";

import style from "./Navigation.module.scss";
import { auth } from "../../Auth/firebase";
import { useDispatch } from "react-redux";
import { signOutAuth } from "../../store/actions/actionSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBitcoinSign,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
// import {
//   solid,
//   regular,
//   brands,
//   icon,
// } from "@fortawesome/fontawesome-svg-core/import.macro";

const Navigation = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(signOutAuth());
      })
      .catch((error) => alert(error.message));
    // .finally(() => setLoading(false));
  };
  return (
    <nav className={style.nav}>
      <div className={style.nav__logo}>
        <NavLink to="/" className={style.nav__logo_link}>
          <FontAwesomeIcon
            icon={faBitcoinSign}
            className={style.nav__logo_icon}
          />
          BITCO
        </NavLink>
      </div>
      <ul className={style.nav__list}>
        <NavLik />
      </ul>
      <button className={style.logout} onClick={logOutHandler}>
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className={style.nav__logo_icon}
        />
        Logout
      </button>
    </nav>
  );
};

export default Navigation;
