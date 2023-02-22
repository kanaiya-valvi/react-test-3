import React from "react";
import style from "./GlobalFilter.module.scss";
function GlobalFillter({ filter, setFilter }) {
  return (
    <div>
      <input
        className={style.filter}
        type="text"
        value={filter || ""}
        placeholder="Global filter....."
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFillter;
