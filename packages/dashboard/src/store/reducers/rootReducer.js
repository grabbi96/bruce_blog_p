import { combineReducers } from "redux";
import errorReducer from "./errorReducer/errorReducer";
import infoReducer from "./infoReducer/infoReducer";
import authReducer from "./authReducers/authReducers";
import metaReducer from "./metaReducer";
import lotterySlice from "./lotteryReducer";
import providerSlice from "./providerReducer";
import ticketReducer from "./ticketReducer/ticketReducer";
import playCreditReducer from "./playCreditReducer/playCreditReducer";
import myTicketReducer from "./ticketReducer/myTicketReducer";
import balanceSlice from "./balanceReducer";
import withdrawSlice from "./withdrawReducer";
import usersSlice from "./usersReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ticket"],
};

const rootReducer = combineReducers({
  error: errorReducer,
  info: infoReducer,
  auth: authReducer,
  meta: metaReducer,
  lottery: lotterySlice,
  ticket: ticketReducer,
  playCredit: playCreditReducer,
  myTicket: myTicketReducer,
  balance: balanceSlice,
  withdraw: withdrawSlice,
  provider: providerSlice,
  users:usersSlice,
});

export default persistReducer(persistConfig, rootReducer);
