import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin } from "../../store/actions/actionSlice";
import style from "./SearchCoins.module.scss";

const SearchCoins = ({ coins }) => {
  const [searchCoin, setSearchCoin] = useState([]);
  const userCoin = useSelector((state) => state.data.userCoins);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const addCoinHandler = (coin) => {
    if (!userCoin.includes(coin)) {
      dispatch(addCoin(coin));
      alert("data added success fully");
    } else {
      alert("data has allredy includes in your wollate");
    }
  };

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
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const changeFormate = (data) => {
    const num = priceFormatter
      .format(data)
      .replaceAll("$", "")
      .replaceAll(",", "");

    if (num >= 1000000) {
      const amount = Math.round((num / 1000000) * 100) / 100;
      return "$" + amount.toLocaleString() + "M";
    }
    if (num >= 1000) {
      const amount = Math.round((num / 1000) * 100) / 100;
      return "$" + amount.toLocaleString() + "K";
    }
    if (num <= 100) {
      return "$" + num;
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search Name or Symbol"
        value={search}
        onChange={(e) => {
          SearchCoin(e);
        }}
      />
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
              <td>{changeFormate(item.price)}</td>
              <td>{changeFormate(item.marketCap)}</td>
              <td>
                <button onClick={() => addCoinHandler(item)}>Add Coin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SearchCoins;
