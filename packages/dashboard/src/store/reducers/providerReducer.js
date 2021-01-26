import { createSlice } from "@reduxjs/toolkit";
const providerSlice = createSlice({
  name: "provider",
  initialState: {
    isLoading: false,
    providers: [{}, {}, {}, {}, {}, {}],
  },

  reducers: {
    providerLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setProvider(state, { payload }) {
      state.providers = payload;
    },
  },
});
export const { providerLoading, setProvider } = providerSlice.actions;

export default providerSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const balanceSlice = createSlice({
//   name: "balance",
//   initialState: {
//     isLoading: false,
//     balances: {},
//   },

//   reducers: {
//     balanceLoading(state, { payload }) {
//       state.isLoading = payload ? true : false;
//     },
//     setBalance(state, { payload }) {
//       state.balances = payload;
//     },
//   },
// });

// export const { balanceLoading, setBalance } = balanceSlice.actions;

// export default balanceSlice.reducer;
