import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faCoins,  
  faRightLeft,
  faPieChart,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Navigation.module.scss";

const NavLik = () => {
  return (
    <>
      <li className="nav__item">
        <NavLink className={style.nav__link} to="/">
          <FontAwesomeIcon icon={faGrip} className={style.nav__logo_icon} />
          Dashboard
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink className={style.nav__link} to="coins">
          <FontAwesomeIcon icon={faCoins} className={style.nav__logo_icon} />
          Coins
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink className={style.nav__link} to="exchange">
          <FontAwesomeIcon
            icon={faRightLeft}
            className={style.nav__logo_icon}
          />
          Exchange
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink className={style.nav__link} to="stats">
          <FontAwesomeIcon icon={faPieChart} className={style.nav__logo_icon} />
          Stats
        </NavLink>
      </li>
      <li className="nav__item">
        <NavLink className={style.nav__link} to="settings">
          <FontAwesomeIcon icon={faGears} className={style.nav__logo_icon} />
          Settings
        </NavLink>
      </li>
    </>
  );
};

export default NavLik;
