import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, hideModel } from "../../store/actions/actionSlice";
import Loader from "../../UI/Loader/Loader";
import style from "./Coins.module.scss";
import SearchCoins from "../../components/SearchCoins/SearchCoins";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table/Table";
import AddCoin from "../../components/AddCoin/AddCoin";
import { changeFormate } from "../../utils/priceFormatter";

const Coins = () => {
  const dispatch = useDispatch();
  const { modalHide, loading } = useSelector((state) => state.data);
  const [datas, setDatas] = useState([]);
  const { userCoins } = useSelector((state) => state.data);
  const [coins, setCoins] = useState({});
  const [search, setSearch] = useState(false);

  const dat = useFetch("coins");

  const addCoinHandler = (coin) => {
    if (!userCoins.includes(coin)) {
      dispatch(addCoin(coin));
      setCoins({ status: "success", data: coin });
    } else {
      setCoins({ status: "unsuccess", data: "Coin has already exists" });
    }
    dispatch(hideModel());
  };

  const searchHandler = () => {
    if (search) setSearch(false);
    else setSearch(true);
  };
  useEffect(() => {
    if (dat !== null) {
      setDatas(dat.data.coins);
    }
  }, [dat, datas, modalHide]);

  const data = useMemo(() => datas, [datas]);
  // btcPrice
  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank",
        disableSortRemove: true,
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
        Cell: (tableProps) => {
          const valueChange = tableProps.row.original.change;
          return (
            <span className={valueChange < 0 ? style.red : style.green}>
              {changeFormate(valueChange)}
            </span>
          );
        },
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
          <button
            className={style.addcoin}
            onClick={() => addCoinHandler(tableProps.row.original)}>
            Add Coin
          </button>
        ),
        disableSortBy: true,
      },
    ],
    [userCoins]
  );

  return (
    <>
      {loading && <Loader />}
      {modalHide && <AddCoin status={coins.status} coin={coins.data} />}
      <div className={style.coin}>
        {!loading && (
          <div className={style.coin__container}>
            {search && (
              <SearchCoins
                close={searchHandler}
                coins={datas}
                addCoin={addCoinHandler}
                format={changeFormate}
              />
            )}
            {!search && (
              <Table search={searchHandler} columns={columns} data={data} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Coins;
