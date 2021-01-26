import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    isLoading: false,
    balances: {},
  },

  reducers: {
    balanceLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setBalance(state, { payload }) {
      state.balances = payload;
    },
  },
});

export const { balanceLoading, setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
