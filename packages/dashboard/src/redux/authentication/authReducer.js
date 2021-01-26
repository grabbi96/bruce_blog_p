import { createSlice } from '@reduxjs/toolkit';
import AuthAxios from '../Axios/AuthAxios';
import UserAxios from '../Axios/UserAxios';
const authSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    user: {},
    isAuthenticatedUser: false,
    errors: {},
  },

  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload ? true : false;
    },
    setUser(state, { payload }) {
      state.user = payload;
      state.isAuthenticatedUser = payload ? true : false;
    },

    setError(state, { payload }) {
      state.errors = payload;
    },
  },
});

const { setLoading, setUser, setError } = authSlice.actions;

export const login = (history, data) => async dispatch => {
  dispatch(setLoading(true));
  try {
    let res = await AuthAxios.post('/auth/login', data);
    let { token } = res.data;
    localStorage.setItem('token', token);

    if (localStorage.getItem('token')) {
      dispatch(
        userProfile(localStorage.getItem('token'))
      );
    }
    dispatch(setError({}));
    dispatch(setLoading(false));
    history.push('/admin');
  } catch (error) {
    console.log(error.response.data);
    dispatch(setLoading(false));
    console.log('asdf');
    if (!error.response) {
      history.push('/server-error');
      return;
    }
    dispatch(setError(error.response.data.errors));
  }
};

export const userProfile = (token, history) => async dispatch => {
  if (token) {
    UserAxios.defaults.headers.Authorization = token;
  }
  try {
    if (localStorage.getItem('token')) {
      let result = await UserAxios.get('/auth/me');
      dispatch(setUser(result.data));
    }
  } catch (err) {
    localStorage.removeItem('token');
    dispatch(setUser({}));
  }
};

export default authSlice.reducer;
