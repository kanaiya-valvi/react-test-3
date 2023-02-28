import React, { useState } from "react";
import style from "./SearchCoins.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchCoins = ({ coins, addCoin, format, close }) => {
  const [searchCoin, setSearchCoin] = useState([]);
  const [search, setSearch] = useState("");

  const SearchCoin = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    if (value.length !== 0) {
      const coin = coins.filter((item) => {
        const name = item.name.toLowerCase();
        const stymbol = item.symbol.toLowerCase();
        if (name.includes(value) || stymbol.includes(value)) {
          return item;
        } else {
          return;
        }
      });
      setSearchCoin(coin);
    } else {
      setSearchCoin([]);
    }
  };
  return (
    <div className={style.search}>
      <div className={style.search__container}>
        <div className={style.search__bar}>
          <input
            className={style.search__input}
            type="text"
            placeholder="Search Name or Symbol"
            value={search}
            onChange={(e) => {
              SearchCoin(e);
            }}
          />
          <button
            onClick={() => {
              close();
            }}
            className={style.search__close}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={style.mainTable}>
          <table className={style.table}>
            <tbody>
              {searchCoin?.map((item) => (
                <tr key={item.uuid}>
                  <td>{item.rank}</td>
                  <td>
                    <img
                      width={25}
                      height={25}
                      src={item.iconUrl}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.symbol}</td>
                  <td>{item.name}</td>
                  <td>{format(item.price)}</td>
                  <td>{format(item.marketCap)}</td>
                  <td>
                    <button
                      onClick={() => addCoin(item)}
                      className={style.addcoin}>
                      Add Coin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchCoins;
