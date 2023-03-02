import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singIn } from "../store/actions/actionSlice";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "./firebase";
import style from "./Auth.module.scss";
import { useNavigate } from "react-router";
import Modal from "../UI/Modal/Modal";
import { setLoading, hideModel } from "../store/actions/actionSlice";
const Auth = () => {
  const dispatch = useDispatch();
  const { modalHide } = useSelector((state) => state.data);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigate();
  const googleLoginHandler = (e) => {
    e.preventDefault();
    dispatch(setLoading());
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(singIn(result._tokenResponse));
        const data = JSON.stringify(result._tokenResponse);
        localStorage.setItem("user", data);
      })
      .catch((error) => {
        dispatch(hideModel());
        setError(error.message);
      })
      .finally(() => {
        dispatch(setLoading());
        navigation("/");
      });
  };
  const signInHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const data = JSON.stringify(result.user);
        dispatch(singIn(data));
        localStorage.setItem("user", data);
      })
      .catch((error) => {
        dispatch(hideModel());
        setError(error.message);
      })
      .finally(() => {
        dispatch(setLoading());
        navigation("/");
      });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const data = JSON.stringify(userCredential.user);
        localStorage.setItem("user", data);
      })
      .catch((error) => {
        dispatch(hideModel());
        setError(error.message);
      })
      .finally(() => {
        dispatch(setLoading());
        navigation("/");
      });
  };
  return (
    <>
      {modalHide && (
        <Modal>
          <h1>{error}</h1>
        </Modal>
      )}
      <div className={style.auth}>
        <div className={style.auth__container}>
          <h1 className={style.auth__title}>BITCO</h1>
          <form action="">
            <div className={style.auth__form}>
              <div className={style.auth__form_group}>
                <input
                  className={style.auth__form_input}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={style.auth__form_input}
                  type="password"
                  placeholder="Password"
                  autoComplete="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className={style.auth__form_submit}
                onClick={(e) => signInHandler(e)}>
                Sign In
              </button>
              <p className={style.auth__form_singUpText}>
                Sign Up{" "}
                <button
                  className={style.auth__form_singUpBtn}
                  onClick={(e) => signUpHandler(e)}>
                  Click here
                </button>
              </p>
              <hr />
              <button
                className={style.gooleAuth}
                type="submit"
                onClick={googleLoginHandler}>
                <img
                  className={style.gooleAuth__logo}
                  src={require("./image/googleLogo.png")}
                  alt="google logo"
                />
                SignIn With Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
