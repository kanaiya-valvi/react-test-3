import React from "react";
import Modal from "../../UI/Modal/Modal";
import style from "./AddCoin.module.scss";
function AddCoin({ status, coin }) {
  if (status === "success") {
    return (
      <Modal>
        <div className={style.addCoin}>
          <img src={coin.iconUrl} width="100" alt={coin.name} />
          <p>{coin.name}</p>
          <h1>Coin Added</h1>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal>
        <div className={style.addCoin}>
          <h1>{coin}</h1>
        </div>
      </Modal>
    );
  }
}

export default AddCoin;
