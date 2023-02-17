import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";

const useFetch = (path) => {
  const [data, setData] = useState(null);

  const headerQuery = {
    headers: {
      "X-RapidAPI-Key": "c36382d1ccmshab71d1499f55f6fp118d9fjsna03d28830f07",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  useEffect(() => {    
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
        // console.log("data fatched");
      });
  }, []);
  return data;
};

export default useFetch;
  