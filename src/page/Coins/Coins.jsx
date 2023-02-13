import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/requre";
import Coin from "../../components/coin/Coin";

import style from "./Coins.module.scss";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/coins `, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": `${API_KEY}`,
        },
      })
      .then((res) => setCoins(res.data.data.coins));
  }, []);
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
