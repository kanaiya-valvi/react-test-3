import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { addCoin } from "../../store/actions/actionSlice";
import { API_KEY, BASE_URL } from "../../utils/utils";
import style from "./Coins.module.scss";

const Coins = () => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);
  const userCoin = useSelector((state) => state.data.userCoins);
  const addCoinHandler = (coin) => {
    if (!userCoin.includes(coin)) {
      dispatch(addCoin(coin));
      alert("data added success fully");
    } else {
      alert("data has allredy includes in your wollate");
    }
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/coins `, {
        Headers: {
          "Content-Type": "application/json",
          "x-access-token": `${API_KEY}`,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      })
      .then((res) => {
        setDatas(res.data.data.coins);
      });
  }, []);
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const changeFormate = (data) => priceFormatter.format(data);
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
          <span>{changeFormate(tableProps.row.original.marketCap)}</span>
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

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className={style.coin}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Coins;
