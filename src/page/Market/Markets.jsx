import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../../utils/requre";

const Markets = () => {
  const [market, setMarket] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/coin/Qwsogvtv82FCd/markets?currencyUuid=razxDUgYGNAdQ`,
        {
          Headers: {
            "Content-Type": "application/json",
            "x-access-token": `${API_KEY}`,
          },
        }
      )
      .then((res) => {
        setMarket(res.data.market.uuid);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <ul>
      {market.map((market) => (
        <li>{market}</li>
      ))}
    </ul>
  );
};

export default Markets;
