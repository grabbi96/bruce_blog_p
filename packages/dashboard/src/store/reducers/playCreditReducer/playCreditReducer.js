
import { createSlice } from "@reduxjs/toolkit";

const playCreditSlice = createSlice({
  name: "balance",
  initialState: {
    isLoading: true,
    playCredits: [{}, {}, {}, {}],
  },

  reducers: {
    playCreditLoading(state, { payload }) {

      console.log(payload)

      state.isLoading = payload ? true : false;
    },
    setPlayCredit(state, { payload }) {
      state.playCredits = payload;
    },
  },
});

export const { playCreditLoading, setPlayCredit } = playCreditSlice.actions;

export default playCreditSlice.reducer;

