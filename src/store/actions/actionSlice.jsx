import { createSlice } from "@reduxjs/toolkit";

const inisialValue = {
  isAuthe: false,
  loading: false,
  modalHide: false,
  theme: "",
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
    setTheme(state) {
      state.theme = state.theme === "dark" ? "" : "dark";
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    hideModel(state) {
      state.modalHide = !state.modalHide;
    },
    removeCoin(state, action) {
      if (state.userCoins.length === 0) {
        state.userCoins = [];
      } else {
        state.userCoins = state.userCoins.filter(
          (item) => item.uuid !== action.payload.uuid
        );
      }
      state.coinIndex = 0;
    },
  },
});

export default actionSlice.reducer;

export const {
  singIn,
  signOutAuth,
  addCoin,
  selectCoin,
  setTheme,
  setLoading,
  hideModel,
  removeCoin,
} = actionSlice.actions;
