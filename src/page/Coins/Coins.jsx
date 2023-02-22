import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, hideModel } from "../../store/actions/actionSlice";
import Loader from "../../UI/Loader/Loader";
import style from "./Coins.module.scss";
import SearchCoins from "../../components/SearchCoins/SearchCoins";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import AddCoin from "../../components/AddCoin/AddCoin";

const Coins = () => {
  const dispatch = useDispatch();
  const { modalHide, loading } = useSelector((state) => state.data);
  const [datas, setDatas] = useState([]);
  const { userCoins } = useSelector((state) => state.data);
  const [coins, serCoins] = useState({});
  const dat = useFetch("coins");

  // const addCoinHandler = (coin) => {
  //   const obj = { uuid: coin.uuid, name: coin.name, iconUrl: coin.iconUrl };
  //   if (!userCoins.some((item) => item.uuid === obj.uuid)) {
  //     dispatch(addCoin(obj));
  //     serCoins({ status: "success", data: obj });
  //   } else {
  //     serCoins({ status: "unsuccess", data: "data has allrediy exits" });
  //   }
  //   dispatch(hideModel());
  // };
  const addCoinHandler = (coin) => {
    if (!userCoins.includes(coin)) {
      dispatch(addCoin(coin));
      serCoins({ status: "success", data: coin });
    } else {
      serCoins({ status: "unsuccess", data: "data has allrediy exits" });
    }
    dispatch(hideModel());
  };
  useEffect(() => {
    if (dat !== null) {
      setDatas(dat.data.coins);
    }
  }, [dat, datas]);

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
  const data = useMemo(() => datas, [datas]);
  // btcPrice
  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank",
      },
      {
        Header: "Coin icon",
        accessor: "iconUrl",
        Cell: (tableProps) => (
          <img src={tableProps.row.original.iconUrl} alt="Player" />
        ),
        disableSortBy: true,
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
        disableSortBy: true,
      },
    ],
    [userCoins]
  );

  return (
    <div className={style.coin}>
      {loading && <Loader />}
      {modalHide && <AddCoin status={coins.status} coin={coins.data} />}
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
