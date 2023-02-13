import { createSlice } from "@reduxjs/toolkit";

const inisialValue = {
  isAuthe: false,
  user: [],
  coin: [],
  market: [],
  state: [],
  exchange: [],
};

const actionSlice = createSlice({
  name: "coins",
  initialState: inisialValue,
  reducers: {
    singIn(state, action) {
      state.user.push(action.payload);
      state.isAuthe = true;
    },
    signOutAuth(state) {
      state.isAuthe = false;
    },
  },
});

export default actionSlice.reducer;

export const { singIn, signOutAuth } = actionSlice.actions;
