import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/actions/actionSlice";
import { BASE_URL } from "../utils/utils";

const useFetch = (path) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const headerQuery = {
    headers: {
      "X-RapidAPI-Key": "c36382d1ccmshab71d1499f55f6fp118d9fjsna03d28830f07",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  useEffect(() => {
    if (path === "coin/undefined") return;
    dispatch(setLoading());
    axios
      .get(`${BASE_URL}/${path} `, headerQuery)
      .then((res) => {
        if (path === "coins") setData(res.data);
        if (path === "stats") setData(res.data);
        if (path !== "stats" && path !== "stats") setData(res.data);
      })
      .catch(function (error) {
        alert(error);
      })
      .finally(function () {
        dispatch(setLoading());
      });
  }, [path]);
  return data;
};

export default useFetch;
