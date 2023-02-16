import { createSlice } from "@reduxjs/toolkit";

const inisialValue = {
  isAuthe: false,
  user: [],
  userCoins: [],
  coinIndex: 0,
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
    addCoin(state, action) {
      state.userCoins.push(action.payload);
    },
    selectCoin(state, action) {
      state.coinIndex = action.payload;
    },
  },
});

export default actionSlice.reducer;

export const { singIn, signOutAuth, getCoins, addCoin, selectCoin } =
  actionSlice.actions;
