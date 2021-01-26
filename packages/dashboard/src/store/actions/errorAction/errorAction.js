import { CATCH_ERROR } from "../actionTypes";

export const setError = (error) => {
  return {
    type: CATCH_ERROR,
    payload: { error: error ? error : "" },
  };
};
