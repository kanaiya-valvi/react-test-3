import React from "react";

function GlobalFillter({ filter, setFilter }) {
  return (
    <div>
      <input
        type="text"
        value={filter || ""}
        placeholder="Global filter"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFillter;
