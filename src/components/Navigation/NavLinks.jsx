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
      <li className={style.nav__item}>
        <NavLink className={style.nav__link} to="/">
          <FontAwesomeIcon icon={faGrip} className={style.nav__link_icon} />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li className={style.nav__item}>
        <NavLink className={style.nav__link} to="coins">
          <FontAwesomeIcon icon={faCoins} className={style.nav__link_icon} />
          <span>Coins</span>
        </NavLink>
      </li>
      <li className={style.nav__item}>
        <NavLink className={style.nav__link} to="exchange">
          <FontAwesomeIcon
            icon={faRightLeft}
            className={style.nav__link_icon}
          />
          <span>Exchange</span>
        </NavLink>
      </li>
      <li className={style.nav__item}>
        <NavLink className={style.nav__link} to="stats">
          <FontAwesomeIcon icon={faPieChart} className={style.nav__link_icon} />
          <span>Stats</span>
        </NavLink>
      </li>
      <li className={style.nav__item}>
        <NavLink className={style.nav__link} to="settings">
          <FontAwesomeIcon icon={faGears} className={style.nav__link_icon} />
          <span>Settings</span>
        </NavLink>
      </li>
    </>
  );
};

export default NavLik;
