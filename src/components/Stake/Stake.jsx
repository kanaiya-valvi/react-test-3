import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./Stake.module.scss";

const Stake = ({ icon, name, title, values }) => {
  return (
    <div className={style.dashboard__stake_card}>
      <FontAwesomeIcon icon={icon} className={style.dashboard__stake_icon} />
      <div className={style.dashboard__stake_card_text}>
        <div className={style.dashboard__stake_card_text}>
          <p>{title}</p>
          <h3>{values}</h3>
        </div>
      </div>
    </div>
  );
};

export default Stake;
