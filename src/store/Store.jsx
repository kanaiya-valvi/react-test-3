import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "./actions/actionSlice";

export const Store = configureStore({
  reducer: {
    data: actionSlice,
  },
});
