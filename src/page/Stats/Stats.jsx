import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../utils/utils";
import style from "./Stats.module.scss";

const Stats = () => {
  // const dispatch = useDispatch();
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios
      .get(`${BASE_URL}/stats `, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": `${API_KEY}`,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      })
      .then((res) => {
        setStats(res.data);
      });
  }, []);
  return (
    <>
      <div className={style.stats}>
        <div className={style.stats__header}>
          <h2>State</h2>
          <p>global statistics tell about the data available on coinranking</p>
        </div>
        <div className={style.stats__content}>
          <div className={style.stats__bestcoin}>
            <h3 className={style.stats__title}>Best Coin</h3>
            <div>
              {stats?.data?.bestCoins.map((item) => (
                <div className={style.stats__item} key={item.uuid}>
                  <img
                    className={style.stats__image}
                    src={item.iconUrl}
                    alt=""
                  />
                  <span className={style.stats__coinName}>{item.name}</span>
                  <a
                    className={style.stats__coinUrl}
                    href={item.coinrankingUrl}>
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className={style.stats__newcoin}>
            <h3 className={style.stats__title}>New Coin</h3>
            <div>
              {stats?.data?.newestCoins.map((item) => (
                <div className={style.stats__item} key={item.uuid}>
                  <img
                    className={style.stats__image}
                    src={item.iconUrl}
                    alt=""
                  />
                  <span className={style.stats__coinName}>{item.name}</span>
                  <a
                    className={style.stats__coinUrl}
                    href={item.coinrankingUrl}>
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
