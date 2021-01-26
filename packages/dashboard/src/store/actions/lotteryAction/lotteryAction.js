import {
  drawLotteriesLoading,
  lotteriesLoading,
  lotteryCreateLoading,
  setDrawLotteries,
  setLotteries,
  addMoreLottery,
  lotteryAddToggle,
  addDeleteLotteriesId,
  removeDeleteLotteriesId,
  removeLottery,
  removeDrawLottery,
  drawedLotteriesLoading,
  setDrawedlotteries,
  lotteryEditLoading,
  editLottery,
} from "../../reducers/lotteryReducer";
import { GET_LOTTERIES } from "../actionTypes";
import UserAxios from "../axios/UserAxios";

export const getLotteries = () => async (dispatch) => {
  let result = await UserAxios.get("/lottery/allLottery");
  dispatch(setLotteries(result.data));
  dispatch(lotteriesLoading(true));
};

export const getDrawLotteries = () => async (dispatch) => {
  let result = await UserAxios.get("/lottery/completeLotteries");
  dispatch(setDrawLotteries(result.data));
  dispatch(drawLotteriesLoading(true));
};

export const getDrawedLotteries = () => async (dispatch) => {
  let result = await UserAxios.get("/lottery/drawLotteries");
  dispatch(setDrawedlotteries(result.data));
  dispatch(drawedLotteriesLoading(true));
};

export const createLottery = (data) => async (dispatch) => {
  try {
    dispatch(lotteryCreateLoading(true));
    let result = await UserAxios.post("/lottery/create", data);
    dispatch(addMoreLottery(result.data.lottery));
    dispatch(lotteryAddToggle(true));
    dispatch(lotteryCreateLoading(false));
    console.log(result.data);
  } catch {
    dispatch(lotteryCreateLoading(false));
  }
};
export const deleteLottery = (data) => async (dispatch) => {
  try {
    dispatch(addDeleteLotteriesId(data));
    console.log(data);
    await UserAxios.delete(`/lottery/${data}`);
    dispatch(removeDeleteLotteriesId(data));
    dispatch(removeLottery(data));
    dispatch(removeDrawLottery(data));
  } catch (err) {
    console.log(err.data);
    dispatch(removeDeleteLotteriesId(data));
  }
};

export const editLotteryAction = (data) => async (dispatch) => {
  try {
    dispatch(lotteryEditLoading(true));
    console.log(data);
    let result = await UserAxios.patch(`/lottery/${data._id}`, data);
    dispatch(lotteryEditLoading(false));

    console.log(result.data);
    dispatch(editLottery(result.data));
  } catch (err) {
    console.log(err.data);
    dispatch(lotteryEditLoading(false));
  }
};
