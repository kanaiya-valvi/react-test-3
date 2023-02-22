import React, { useEffect, useMemo, useState } from "react";
import SearchCoins from "../../components/SearchCoins/SearchCoins";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import Loader from "../../UI/Loader/Loader";
import style from "./Exchange.module.scss";

const Exchange = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const exhange = useFetch("exchange/-zdvbieRdZ/coins");
  useEffect(() => {
    setLoading(true);
    if (exhange !== null) {
      setDatas(exhange?.data?.coins);
      setLoading(false);
    }
  }, [exhange]);
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
        defaultCanSort: false,
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
        Header: "Number Of Markets",
        accessor: "numberOfMarkets",
      },
      {
        Header: "ADD Button",
        accessor: "",
        Cell: (tableProps) => (
          <a href={tableProps.row.original.coinrankingUrl}>View</a>
        ),
        disableSortBy: true,
      },
    ],
    [datas]
  );

  return (
    <div className={style.exchange}>
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

export default Exchange;
