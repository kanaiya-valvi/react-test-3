import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import Coins from "../page/Coins/Coins";
import Error from "../page/Error/Error";
import Exchange from "../page/Exchange/Exchange";
import Home from "../page/Home/Home";
import Settings from "../page/Setting/Settings";
import Stats from "../page/Stats/Stats";
import { setUserCoin } from "../store/actions/actionSlice";

import style from "./Dashboard.module.scss";

const Dashboard = () => {

  return (
    <div className={style.container}>
      <Navigation />
      <section className={style.container__item}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/coins" element={<Coins />}></Route>
          <Route path="/exchange" element={<Exchange />}></Route>
          <Route path="/stats" element={<Stats />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </section>
    </div>
  );
};

export default Dashboard;
