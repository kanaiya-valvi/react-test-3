import React from "react";
import { useSelector } from "react-redux";
import Coin from "../../components/coin/Coin";
import style from "./Coins.module.scss";

const Coins = () => {
  const coins=useSelector(state=>state?.data.coins)  
  return (
    <div className={style.coin}>
      <h1 className={style.coin__title}>Coins</h1>
      <div className={style.coin__item}>
        <ul className={style.coin__list}>
          {coins.map((coins) => (
            <Coin coin={coins} key={coins.uuid} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Coins;
