import {
  setwithdraw,
  setBtcWallet,
  setwithdrawHistory,
  withdrawLoading,
  withdrawHistoryLoading,
  setCubWallet,
  setEthWallet,
} from '../../reducers/withdrawReducer';
import UserAxios from '../axios/UserAxios';

export const getWithdraws = () => async (dispatch) => {
  let result = await UserAxios.get('/withdraw/fetchPendingWithdrawRequest');
  console.log(result.data.adminWalletBtc.wallet);
  dispatch(setwithdraw(result.data.withdraws));
  dispatch(setBtcWallet(result.data.adminWalletBtc));
  dispatch(setCubWallet(result.data.adminWalletCub));
  dispatch(setEthWallet(result.data.adminWalletEth));
  dispatch(withdrawLoading(false));
};

export const getWithdrawHistory = () => async (dispatch) => {
  let result = await UserAxios.get('/withdraw/fetchAllWithdraw');
  console.log(result);
  dispatch(setwithdrawHistory(result.data.withdraws));
  dispatch(withdrawHistoryLoading(false));
};
