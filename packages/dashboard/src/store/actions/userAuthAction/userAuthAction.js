import { setError } from "../errorAction/errorAction";
// import jwt_decode from "jwt-decode";
import { SET_USER } from "../actionTypes";
// import { setMessage } from "../messageAction/messageAction";
import { loading } from "../loadingAction/loadingAction";
import AuthAxios from "../axios/AuthAxios";
import UserAxios from "../axios/UserAxios";
import { store } from "../../store";

export const login = (userData, history) => (dispatch) => {
  dispatch(loading({ login: true }));

  AuthAxios.post("/user/admin/login", userData)
    .then((res) => {
      let { token } = res.data;
      token = `Bearer ${token}`;
      localStorage.setItem("token", token);
      dispatch(setError());
      dispatch(loading());
      if (localStorage.getItem("token")) {
        dispatch(userProfile(localStorage.getItem("token")));
      }
      history.push("/dashboard");
      return {
        data: "Login successtion",
      };
    })
    .catch(function (error) {
      dispatch(loading());

      console.log("asdf");
      if (!error.response) {
        history.push("/server-error");
        return;
      }

      dispatch(
        setError({
          login: error.response.data.message,
        })
      );
    });
};

export const userProfile = (token, history) => async (dispatch) => {
  console.log("userProfile userProfile userProfile userProfile");
  if (token) {
    UserAxios.defaults.headers.Authorization = token;
  }
  try {
    if (localStorage.getItem("token")) {
      let result = await UserAxios.get("/user/profile");
      //
      dispatch({
        type: SET_USER,
        payload: result.data.user,
      });
    }
  } catch (err) {
    localStorage.removeItem("token");
    dispatch({
      type: SET_USER,
      payload: "",
    });
  }
};

export const logout = (history) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: SET_USER,
    payload: "",
  });

  history.push("/");
};

export const makePaymentPlayCredit = (data, history) => async (dispatch) => {
  let { playCreditBalance } = store.getState().auth.user;

  let apiData = {
    playCreditBalance: playCreditBalance ? playCreditBalance + data : data,
  };

  let result = await UserAxios.patch("/user/updatePlayCreditBalance", apiData);

  dispatch({
    type: SET_USER,
    payload: result.data.user,
  });

  history.push("/dashboard");
};
