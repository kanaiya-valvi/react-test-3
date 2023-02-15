import axios from "axios";
import { BASE_URL, API_KEY } from "../utils/requre";

axios.get(BASE_URL).then((res) => console.log(res));

import {
  getCoins,
  getMarket,
  getState,
  getExchange,
} from "../store/actions/actionSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const getData = () => {
  // const dispatch = useDispatch();
  const payload = {
    Headers: {
      "Content-Type": "application/json",
      "x-access-token": `${API_KEY}`,
    },
  };
  useEffect(() => {
    axios.get(`${BASE_URL}/exchanges  `, payload).then((res) => {
      dispatch(getCoins(res.data.data.coins));
      console.log(res);
      console.log(res.data.data.coins);
    });
  }, []);
};

export default getData;
