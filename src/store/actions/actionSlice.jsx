import { createSlice } from "@reduxjs/toolkit";

const inisialValue = {
  isAuthe: false,
  user: [],
  userCoins: [],
  coinIndex: 0,
  coins: [],
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
    getCoins(state, action) {
      state.coins = action.payload;
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
