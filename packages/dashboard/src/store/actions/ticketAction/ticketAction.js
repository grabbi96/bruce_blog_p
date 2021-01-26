import { setError } from "../errorAction/errorAction";
import Axios from "axios";
// import jwt_decode from "jwt-decode";
import {
  ADD_TICKET,
  REMOVE_TICKET,
  SET_MY_TICKETS,
  SET_USER,
} from "../actionTypes";
// import { setMessage } from "../messageAction/messageAction";
import { loading } from "../loadingAction/loadingAction";
import AuthAxios from "../axios/AuthAxios";
import UserAxios from "../axios/UserAxios";
import { setMessage } from "../messageAction/messageAction";

export const addTicket = (data) => async (dispatch) => {
  dispatch({
    type: ADD_TICKET,
    payload: data,
  });
};

export const removeTicket = (data) => async (dispatch) => {
  dispatch({
    type: REMOVE_TICKET,
    payload: data,
  });
};

export const createTicket = (data) => async (dispatch) => {
  try {
    dispatch(loading({ createTicket: true }));
    let tickets = await UserAxios.post("/ticket/create", data);
    dispatch({
      type: SET_USER,
      payload: tickets.data.user,
    });
    data.tickets.forEach((tck) => {
      dispatch(removeTicket(tck.referenceNumber));
    });
    dispatch(loading());
    dispatch(setMessage({ buyTicket: "You have successfully bought Tickets" }));
  } catch (err) {
    dispatch(setError({ buyTicket: err.response.data.message }));
    dispatch(loading());
  }
};

export const getMyTickets = () => async (dispatch) => {
  try {
    let result = await UserAxios.get("/ticket/user/tickets");
    dispatch({
      type: SET_MY_TICKETS,
      payload: result.data,
    });
    console.log(result);
  } catch (err) {
    console.log(err.response);
  }
};
