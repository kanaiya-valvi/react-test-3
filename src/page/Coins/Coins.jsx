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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Coins = () => {
  const [datas, setDatas] = useState([]);
  const [coins, setCoins] = useState({});
  const [search, setSearch] = useState(false);
  const { modalHide, loading } = useSelector((state) => state.data);

  const { userCoins } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const coindata = useFetch("coins");
  useEffect(() => {
    if (coindata !== null) {
      setDatas(coindata?.data?.coins);
    }
  }, [coindata, userCoins]);

  const addCoinHandler = (coin) => {
    const items = userCoins.filter((item) => item.uuid === coin.uuid);
    if (items.length === 0) {
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

  const data = useMemo(() => datas, [datas, userCoins]);

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
        Cell: (tableProps) => {
          const price = changeFormate(tableProps.row.original.price);
          if (price === undefined) return "-";
          else return price;
        },
      },
      {
        Header: "BTC Price",
        accessor: "btcPrice",
        Cell: (tableProps) => changeFormate(tableProps.row.original.btcPrice),
      },
      {
        Header: "24h volume",
        accessor: "24hVolume",
        Cell: (tableProps) =>
          changeFormate(tableProps.row.original["24hVolume"]),
      },

      {
        Header: "Change",
        accessor: "change",
        Cell: (tableProps) => {
          const valueChange = tableProps.row.original.change;
          return (
            <span className={valueChange < 0 ? style.red : style.green}>
              {valueChange < 0 ? (
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className={style.sorted__icon}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className={style.sorted__icon}
                />
              )}{" "}
              {changeFormate(valueChange)}
            </span>
          );
        },
      },
      {
        Header: "MarketCap",
        accessor: "marketCap",
        Cell: (tableProps) => changeFormate(tableProps.row.original.marketCap),
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
