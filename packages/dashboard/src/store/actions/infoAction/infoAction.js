import { SIDBAR_TOGGLER, SIDBAR_FALSE } from "../actionTypes";

export const changeRes = (data) => (dispatch) => {
  dispatch({
    type: SIDBAR_TOGGLER,
    payload: {},
  });
};

export const falseRes = (data) => (dispatch) => {
  dispatch({
    type: SIDBAR_FALSE,
    payload: {},
  });
};
