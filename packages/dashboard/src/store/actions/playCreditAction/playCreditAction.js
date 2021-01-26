import { playCreditLoading, setPlayCredit } from "../../reducers/playCreditReducer/playCreditReducer";
import { GET_PLAY_CREDITS } from "../actionTypes";
import UserAxios from "../axios/UserAxios";

export const getPlayCredits = () => async (dispatch) => {
  try {
    let result = await UserAxios.get("/playCredit/allPlayCredits");
    dispatch({
      type: GET_PLAY_CREDITS,
      payload: result.data,
    });
  } catch (err) {}
};


export const getAllPlayCreditsHistory = () => async (dispatch) => {
  try {
    let result = await UserAxios.get("/user/allPlayCreditPurchaseHistory");
      console.log(result.data.paymentDatas)
      dispatch(playCreditLoading(false))
      dispatch(setPlayCredit(result.data.paymentDatas))


  } catch (err) {}
};
