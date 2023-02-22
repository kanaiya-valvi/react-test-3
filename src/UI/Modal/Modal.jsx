import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { hideModel } from "../../store/actions/actionSlice";
import style from "./Modal.module.scss";

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const closeModel = () => {
    dispatch(hideModel(false));
  };
  const portalElement = document.getElementById("overlay");

  const BackDrop = () => (
    <div className={style.modal__backdrop} onClick={closeModel}></div>
  );
  const ModalOverlay = () => (
    <div className={style.modal__content}>
      <p className={style.modal__clase} onClick={closeModel}>
        &times;
      </p>
      {/* <img src={ModalCoin.iconUrl} alt="" />
      <p>{ModalCoin.name}</p> */}
      {children}
    </div>
  );
  return (
    <>
      {createPortal(<BackDrop />, portalElement)}
      {createPortal(<ModalOverlay />, portalElement)}
    </>
  );
};

export default Modal;
