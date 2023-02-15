import React from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Coin.module.scss";
import { addCoin } from "../../store/actions/actionSlice";

const Coin = ({ coin }) => {
  const dispatch = useDispatch();
  const userCoin = useSelector((state) => state?.data.userCoins);
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const addCoinHandler = (coin) => {
    if (!userCoin.includes(coin)) {
      dispatch(addCoin(coin));
      alert("data added success fully");
    } else {
      alert("data has allredy includes in your wollate");
    }
  };
  const price = priceFormatter.format(coin.price);
  return (
    <li className={style.coins}>
      <div className={style.coins__box_1}>
        <img className={style.coins__icon} src={coin.iconUrl} alt={coin.name} />
        <span>{price}</span>
      </div>
      <div className={style.coins__box_2}>
        <span>{coin.name}</span>
        <button
          className={style.coins__addButton}
          onClick={() => addCoinHandler(coin)}>
          Add Coin
        </button>
      </div>
    </li>
  );
};

export default Coin;
