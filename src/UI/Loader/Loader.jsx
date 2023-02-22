import React from "react";
import style from "./Loader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className={style.loader}>
      <FontAwesomeIcon icon={faSpinner} className={style.loader__spinner}/>
    </div>
  );
};

export default Loader;
