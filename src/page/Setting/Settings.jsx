import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { signOutAuth, hideModel } from "../../store/actions/actionSlice";
import style from "./Settings.module.scss";
import Modal from "../../UI/Modal/Modal";
const Settings = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const [error, setError] = useState("");
  const { modalHide } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const changePasswordHandler = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(signOutAuth());
      })
      .catch((error) => {
        dispatch(hideModel());
        setError({ erromsg: error.message, errorCode: error.code });
      });
    // .finally(console.log("success"));
  };
  return (
    <div className={style.setting}>
      {modalHide && (
        <Modal>
          <h1>{error.errorCode}</h1>
          <p>{error.erromsg}</p>
        </Modal>
      )}
      <div className={style.setting__container}>
        <h2 className={style.setting__container_heading}>Reset Password </h2>
        <input
          className={style.setting__input}
          type="email"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={style.setting__submitButton}
          onClick={changePasswordHandler}>
          Change password
        </button>
        <div>
          <hr />
          <p className={style.setting__notes}>
            After the click on the reset password button, we will be send a
            reset password link on your registered email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
