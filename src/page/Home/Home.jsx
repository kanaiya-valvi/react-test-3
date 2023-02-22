import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeCoin, selectCoin } from "../../store/actions/actionSlice";
import Chart from "../../components/Chart/Chart";
import useFetch from "../../hooks/useFetch";
import Stake from "../../components/Stake/Stake";
import { changeFormate, priceFormatter } from "../../utils/priceFormatter";
import style from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRetweet,
  faLineChart,
  faClockRotateLeft,
  faChartPie,
  faChartBar,
  faMagnifyingGlassDollar,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { coinIndex, userCoins } = useSelector((state) => state?.data);
  const coin = useSelector((state) => state?.data?.userCoins[coinIndex]);
  const [coinData, setCoinData] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const coins = [];

  const coinspark = coinData?.sparkline;
  coinspark?.forEach((c) => {
    const formattedNumber = priceFormatter.format(c).replace("$", "");
    const xs = changeFormate(c);
    const f = formattedNumber.replace(",", "");
    coins.push({ price: f, x: f, tool: xs });
  });
  const goToCoins = () => {
    navigation("/coins");
  };

  const getcoin = useFetch(`coin/${coin?.uuid}`);

  useEffect(() => {
    setCoinData(getcoin?.data.coin);
  }, [coinData,getcoin, userCoins, coin]);
  return (
    <>
      {userCoins?.length === 0 && (
        <div className={style.goToCoin}>
          <FontAwesomeIcon
            icon={faMagnifyingGlassDollar}
            className={style.goToCoin__icon}
          />
          <button onClick={goToCoins} className={style.goToCoin__btn}>
            Explore Coins
          </button>
        </div>
      )}
      {userCoins?.length !== 0 && (
        <div className={style.dashboard}>
          <div className={style.dashboard__card}>
            <div className={style.dashboard__header}>
              <h1 className={style.dashboard__header_heading}>Dassboard</h1>
              <div className={style.dashboard__header_form}>
                <img
                  src={coinData?.iconUrl}
                  className={style.dashboard__header_formImg}
                  alt={coinData?.name}
                />
                <select
                  className={style.dashboard__header_select}
                  onChange={(e) => dispatch(selectCoin(e.target.value))}>
                  {userCoins?.map((item, index) => (
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
              <div className={style.dashboard__card_topContent}>
                <div>
                  <h1 className={style.dashboard__card_title}>
                    {coinData?.name}
                  </h1>
                  <p className={style.dashboard__subheading}>Coin Staking</p>
                </div>
                <button onClick={() => dispatch(removeCoin(coin))} className={style.removeCoin}>
                  Remove Coin
                </button>
              </div>
              <div className={style.dashboard__stake}>
                <div className={style.dashboard__stake_card}>
                  <img
                    src={coinData?.iconUrl}
                    className={style.dashboard__stake_img}
                    alt={coinData?.name}
                  />
                  <div className={style.dashboard__stake_card_text}>
                    <p>{coinData?.name} price</p>
                    <h3>{changeFormate(coinData?.price)}</h3>
                  </div>
                </div>
                <Stake
                  icon={faRetweet}
                  name={coinData?.name}
                  title="Cahnge"
                  values={coinData?.change}
                />
                <Stake
                  icon={faLineChart}
                  name={coinData?.name}
                  title="marketCap"
                  values={changeFormate(coinData?.marketCap)}
                />
                <Stake
                  icon={faChartBar}
                  name={coinData?.name}
                  title="btcPrice"
                  values={changeFormate(coinData?.btcPrice)}
                />
                <Stake
                  icon={faClockRotateLeft}
                  name={coinData?.name}
                  title="24h Volume"
                  values={changeFormate(coinData?.["24hVolume"])}
                />
                <Stake
                  icon={faChartPie}
                  name={coinData?.name}
                  title="numberOfMarkets"
                  values={coinData?.numberOfMarkets}
                />
              </div>
            </div>
          </div>
          <div className={style.dashboard__card}>
            <div className={style.dashboard__card_bottom}>
              <h1 className={style.dashboard__card_title}>APY</h1>
              <Chart coins={coins} />
            </div>
          </div>
          <div className={style.dashboard__card}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${coinData?.description}`,
              }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
