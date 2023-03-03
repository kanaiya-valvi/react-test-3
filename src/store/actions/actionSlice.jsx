import { createSlice } from "@reduxjs/toolkit";

let userCoins = [];
const datcoins = localStorage.getItem("userCoin");
if (datcoins) {
  userCoins = JSON.parse(datcoins);
}

const inisialValue = {
  isAuthe: false,
  loading: false,
  modalHide: false,
  theme: "",
  user: [],
  userCoins: userCoins,
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
      localStorage.setItem("userCoin", JSON.stringify(state.userCoins));
    },
    selectCoin(state, action) {
      state.coinIndex = action.payload;
    },
    setTheme(state, action) {
      if (!action.payload) {
        state.theme = state.theme === "dark" ? "" : "dark";
      } else {
        state.theme = action.payload;
      }
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    hideModel(state) {
      state.modalHide = !state.modalHide;
    },
    removeCoin(state, action) {
      state.userCoins = state.userCoins.filter(
        (item) => item.uuid !== action.payload.uuid
      );
      localStorage.setItem("userCoin", JSON.stringify(state.userCoins));
      if (state.userCoins.length === 0) {
        state.userCoins = [];
        localStorage.removeItem("userCoin");
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
  // setUserCoin,
} = actionSlice.actions;
