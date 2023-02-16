import React from "react";
import style from "./Error.module.scss";
const Error = () => {
  return (
    <div className={style.error}>
      <div>
        <h1>404</h1>
        <p>Some thing is wrong!!!</p>
      </div>
    </div>
  );
};

export default Error;
