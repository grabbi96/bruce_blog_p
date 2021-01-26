import { createSlice } from '@reduxjs/toolkit';
import UserAxios from '../Axios/UserAxios';
const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoading: true,
    posts: [],
  },

  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setPosts(state, { payload }) {
      state.posts = payload;
    },
  },
});

const { setLoading, setPosts } = postSlice.actions;

export const getPosts = () => async dispatch => {
  try {
    let result = await UserAxios.get('/posts/unpublished/page/1');
    dispatch(setPosts(result.data.posts));

    dispatch(setLoading(false));
  } catch (err) {
    console.log(err.response.data);
    dispatch(setLoading(false));
  }
};

export default postSlice.reducer;
