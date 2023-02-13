import React from "react";
import style from "./Coin.module.scss";

const Coin = ({ coin }) => {
  const priceFormatter = new Intl.NumberFormat("in", {
    style: "currency",
    currency: "INR",
  });
  const price = priceFormatter.format(coin.price);
  return (
    <li className={style.coins}>
      <img className={style.coins__icon} src={coin.iconUrl} alt={coin.name} />
      <span>{coin.name}</span>
      <span>{price}</span>
    </li>
  );
};

export default Coin;
