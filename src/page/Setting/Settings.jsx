import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signOutAuth } from "../../store/actions/actionSlice";
const Settings = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

  const changePasswordHandler = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(signOutAuth());
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    // .finally(console.log("success"));
  };
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={changePasswordHandler}>Change password</button>
    </div>
  );
};

export default Settings;
