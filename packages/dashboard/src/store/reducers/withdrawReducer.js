import { createSlice } from '@reduxjs/toolkit';

const withdrawSlice = createSlice({
  name: 'balance',
  initialState: {
    isLoading: true,
    withdraws: [{}, {}, {}, {}],
    btcWallet: { wallet: '...', balance: '...' },
    cubWallet: { wallet: '...', balance: '...' },
    ethWallet: { wallet: '...', balance: '...' },
    isLoadingHistory: true,
    withdrawHistories: [{}, {}, {}, {}],
  },

  reducers: {
    withdrawLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setwithdraw(state, { payload }) {
      state.withdraws = payload;
    },
    setBtcWallet(state, { payload }) {
      state.btcWallet = payload;
    },
    setCubWallet(state, { payload }) {
      state.cubWallet = payload;
    },
    setEthWallet(state, { payload }) {
      state.ethWallet = payload;
    },

    withdrawHistoryLoading(state, { payload }) {
      state.isLoadingHistory = payload ? true : false;
    },
    setwithdrawHistory(state, { payload }) {
      state.withdrawHistories = payload;
    },
  },
});

export const {
  withdrawLoading,
  setwithdraw,
  setBtcWallet,
  withdrawHistoryLoading,
  setwithdrawHistory,
  setEthWallet,
  setCubWallet,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
