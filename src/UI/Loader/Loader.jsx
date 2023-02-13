import React from "react";
import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div style={style.loader}>
      <lord-icon
      className={style.loader__icon}
        src="https://cdn.lordicon.com/xjovhxra.json"
        trigger="loop"
        colors="primary:#121331,secondary:#4b977d"></lord-icon>
    </div>
  );
};

export default Loader;
