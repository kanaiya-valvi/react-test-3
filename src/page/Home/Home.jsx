import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCoin } from "../../store/actions/actionSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faLineChart } from "@fortawesome/free-solid-svg-icons";
import style from "./Home.module.scss";
import Chart from "../../components/Chart/Chart";
import { useNavigate } from "react-router";

const Home = () => {
  const coinIndex = useSelector((state) => state?.data?.coinIndex);
  const userCoins = useSelector((state) => state?.data?.userCoins);
  const coin = useSelector((state) => state?.data?.userCoins[coinIndex]);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const coins = [];

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const coinspark = coin?.sparkline;
  coinspark?.forEach((c) => {
    const formattedNumber = priceFormatter.format(c).replace("$", "");
    const f = formattedNumber.replace(",", "");
    coins.push({ price: f, x: f });
  });
  const goToCoins = () => {
    navigation("/coins");
  };


    const changeFormate = (data) => {
      const num = priceFormatter
        .format(data)
        .replace("$", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "");
      if (num >= 1000000) {
        console.log(num);
        return "$" + (num / 1000000).toFixed(1) + "M";
      }
      if (num >= 1000) {
        console.log(num);
        return "$" + (num / 1000).toFixed(1) + "K";
      }
      if (num <= 100) {
        console.log(num);
        return "$" + num;
      }
    };
  return (
    <>
      {userCoins?.length === 0 && (
        <div className={style.goToCoin}>
          <button onClick={goToCoins}>Add Coins</button>
        </div>
      )}
      {userCoins?.length !== 0 && (
        <div className={style.dashboard}>
          <div className={style.dashboard__card}>
            <div className={style.dashboard__header}>
              <h1 className={style.dashboard__header_heading}>Dassboard</h1>
              <div className={style.dashboard__header_form}>
                <img
                  src={coin.iconUrl}
                  className={style.dashboard__header_formImg}
                  alt=""
                />
                <select
                  className={style.dashboard__header_select}
                  onChange={(e) => dispatch(selectCoin(e.target.value))}>
                  {userCoins.map((item, index) => (
                    <option value={index} key={item.uuid}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={style.dashboard__card}>
            <div className={style.dashboard__card_top}>
              <div>
                <h1 className={style.dashboard__card_title}>{coin.name}</h1>
                <p className={style.dashboard__subheading}>Coin Staking</p>
              </div>
              <div className={style.dashboard__stake}>
                <div className={style.dashboard__stake_card}>
                  <img
                    src={coin.iconUrl}
                    className={style.dashboard__stake_img}
                    alt=""
                  />
                  <div className={style.dashboard__stake_card_text}>
                    <p>{coin.name} price</p>
                    <h3>{changeFormate(coin?.price)}</h3>
                  </div>
                </div>
                <div className={style.dashboard__stake_card}>
                  <FontAwesomeIcon
                    icon={faRetweet}
                    className={style.dashboard__stake_icon}
                  />
                  <div className={style.dashboard__stake_card_text}>
                    <p>{coin.name} Cahnge</p>
                    <h3>{coin.change}</h3>
                  </div>
                </div>
                <div className={style.dashboard__stake_card}>
                  <FontAwesomeIcon
                    icon={faLineChart}
                    className={style.dashboard__stake_icon}
                  />
                  <div className={style.dashboard__stake_card_text}>
                    <div className={style.dashboard__stake_card_text}>
                      <p>{coin.name} marketCap</p>
                      <h3>{changeFormate(coin.marketCap)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.dashboard__card}>
            <div className={style.dashboard__card_bottom}>
              <h1 className={style.dashboard__card_title}>APY</h1>
              <Chart coins={coins} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
