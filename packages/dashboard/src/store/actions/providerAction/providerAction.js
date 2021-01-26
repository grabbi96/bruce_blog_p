import {
  drawLotteriesLoading,
  lotteriesLoading,
  setDrawLotteries,
  setLotteries,
} from "../../reducers/lotteryReducer";
import { providerLoading, setProvider } from "../../reducers/providerReducer";
import { GET_LOTTERIES } from "../actionTypes";
import UserAxios from "../axios/UserAxios";

export const getProvider = () => async (dispatch) => {
  let result = await UserAxios.get("/company/allCompany");
  dispatch(setProvider(result.data));
  dispatch(providerLoading(true));
};
