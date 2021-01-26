import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
  name: 'user',
  initialState: {
    url: 'http://localhost:4000',
  },

  reducers: {},
});

export default infoSlice.reducer;
