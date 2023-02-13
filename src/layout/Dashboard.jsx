import React from "react";
import { Route, Routes } from "react-router";
import Navigation from "../components/Navigation/Navigation";
import Coins from "../page/Coins/Coins";
import Exchange from "../page/Exchange";
import Home from "../page/Home";
import Markets from "../page/Markets";
import Settings from "../page/Settings";
import Stats from "../page/Stats";
import style from './Dashboard.module.scss'

const Dashboard = () => {
  return (
    <div className={style.container}>
      <Navigation />
      <section className={style.container__item}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/coins" element={<Coins />}></Route>
          <Route path="/exchange" element={<Exchange />}></Route>
          <Route path="/markets" element={<Markets />}></Route>
          <Route path="/stats" element={<Stats />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </section>
    </div>
  );
};

export default Dashboard;
