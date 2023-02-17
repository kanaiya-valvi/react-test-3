import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin } from "../../store/actions/actionSlice";
import Loader from "../../UI/Loader/Loader";
import style from "./Coins.module.scss";
import SearchCoins from "../../components/SearchCoins/SearchCoins";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";

const Coins = () => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  const userCoin = useSelector((state) => state.data.userCoins);
  const [loading, setLoading] = useState(false);
  const dat = useFetch("coins");
  useEffect(() => {
    setLoading(true);
    if (dat !== null) {
      setLoading(false);
      setDatas(dat.data.coins);
    }
  }, [datas, dat]);

  const addCoinHandler = (coin) => {
    if (!userCoin.includes(coin)) {
      dispatch(addCoin(coin));
      alert("data added success fully");
    } else {
      alert("data has allredy includes in your wollate");
    }
  };

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const changeFormate = (data) => {
    const num = priceFormatter
      .format(data)
      .replace("$", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "")
      .replace(",", "");
    if (num >= 1000000) {
      return "$" + (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return "$" + (num / 1000).toFixed(1) + "K";
    }
    if (num <= 100) {
      return "$" + num;
    }
  };
  const data = useMemo(() => datas, [datas]);
  // btcPrice
  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank",
        Filter: "",
      },
      {
        Header: "Coin icon",
        accessor: "iconUrl",
        Cell: (tableProps) => (
          <img src={tableProps.row.original.iconUrl} alt="Player" />
        ),
      },
      {
        Header: "Coin Symbol",
        accessor: "symbol",
      },
      {
        Header: "Coin Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: (tableProps) => (
          <span>{changeFormate(tableProps.row.original.price)}</span>
        ),
      },
      {
        Header: "BTC btcPrice",
        accessor: "btcPrice",
        Cell: (tableProps) => (
          <span>{changeFormate(tableProps.row.original.btcPrice)}</span>
        ),
      },
      {
        Header: "24h volume",
        accessor: "24hVolume",
        Cell: (tableProps) => (
          <span>{changeFormate(tableProps.row.original["24hVolume"])}</span>
        ),
      },

      {
        Header: "Change",
        accessor: "change",
      },
      {
        Header: "MarketCap",
        accessor: "marketCap",
        Cell: (tableProps) => (
          <>
            <span>{changeFormate(tableProps.row.original.marketCap)}</span>
          </>
        ),
      },
      {
        Header: "ADD Button",
        accessor: "",
        Cell: (tableProps) => (
          <button onClick={() => addCoinHandler(tableProps.row.original)}>
            Add Coin
          </button>
        ),
      },
    ],
    [datas]
  );

  return (
    <div className={style.coin}>
      {loading && <Loader />}
      {!loading && (
        <>
          <SearchCoins coins={datas} />
          <Table columns={columns} data={data} />
        </>
      )}
    </div>
  );
};

export default Coins;
