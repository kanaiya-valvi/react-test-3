import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../UI/Loader/Loader";
import style from "./Stats.module.scss";

const Stats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const dat = useFetch("stats");
  useEffect(() => {
    setLoading(true);
    if (dat !== null) {
      setStats(dat);
      setLoading(false);
    }
  }, [stats, dat]);
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
            {loading && <Loader />}
            {!loading && (
              <div>
                {stats?.data?.bestCoins?.map((item) => (
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
            )}
          </div>
          <div className={style.stats__newcoin}>
            <h3 className={style.stats__title}>New Coin</h3>
            {loading && <Loader />}
            {!loading && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
