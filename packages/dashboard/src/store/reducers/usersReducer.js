import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "balance",
  initialState: {
    isLoading: true,
    userLists: [],
  },

  reducers: {
    usersLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setUsers(state, { payload }) {
      state.userLists = payload;
    },
  },
});

export const { usersLoading, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
