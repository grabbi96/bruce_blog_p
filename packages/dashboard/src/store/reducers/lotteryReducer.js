import { createSlice } from "@reduxjs/toolkit";
const lotterySlice = createSlice({
  name: "lattery",
  initialState: {
    isLoading: false,
    lotteries: [{}, {}, {}, {}, {}, {}],
    isDrawLoading: false,
    drawLotteries: [{}, {}, {}, {}, {}, {}],
    lotteryCreateLoading: false,
    lotteryEditLoading: false,
    lotteryAddSuccess: false,
    deleteLotteriesId: [],
    isDrawedLoading: false,
    drawedlotteries: [{}, {}, {}, {}, {}, {}],
  },

  reducers: {
    editLottery(state, { payload }) {
      let index = state.lotteries.findIndex((lt) => lt._id === payload._id);

      let newLotteries = [...state.lotteries];

      newLotteries[index] = payload;

      state.lotteries = newLotteries;
    },

    lotteryEditLoading(state, { payload }) {
      state.lotteryEditLoading = payload;
    },

    drawedLotteriesLoading(state, { payload }) {
      state.isDrawedLoading = payload ? true : false;
    },
    setDrawedlotteries(state, { payload }) {
      state.drawedlotteries = payload;
    },

    lotteryAddToggle(state, { payload }) {
      state.lotteryAddSuccess = payload ? true : false;
    },

    lotteriesLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setLotteries(state, { payload }) {
      state.lotteries = payload;
    },
    drawLotteriesLoading(state, { payload }) {
      state.isDrawLoading = payload ? true : false;
    },
    setDrawLotteries(state, { payload }) {
      state.drawLotteries = payload;
    },
    lotteryCreateLoading(state, { payload }) {
      state.lotteryCreateLoading = payload;
    },

    addMoreLottery(state, { payload }) {
      state.lotteries = state.lotteries.concat(payload);
    },
    removeLottery(state, { payload }) {
      state.lotteries = state.lotteries.filter(
        (lottery) => lottery._id !== payload
      );
    },
    removeDrawLottery(state, { payload }) {
      state.drawLotteries = state.drawLotteries.filter(
        (lottery) => lottery._id !== payload
      );
    },
    addDeleteLotteriesId(state, { payload }) {
      state.deleteLotteriesId = state.deleteLotteriesId.concat(payload);
    },
    removeDeleteLotteriesId(state, { payload }) {
      state.deleteLotteriesId = state.deleteLotteriesId.filter(
        (id) => id !== payload
      );
    },
  },
});
export const {
  lotteryEditLoading,
  drawedLotteriesLoading,
  setDrawedlotteries,
  removeLottery,
  addDeleteLotteriesId,
  removeDeleteLotteriesId,
  lotteriesLoading,
  setLotteries,
  drawLotteriesLoading,
  setDrawLotteries,
  lotteryCreateLoading,
  addMoreLottery,
  lotteryAddToggle,
  removeDrawLottery,
  editLottery,
} = lotterySlice.actions;

export default lotterySlice.reducer;

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
