import { LOADING_STATE, SET_MESSAGE } from "../actions/actionTypes";
const init = {
  isLoading: false,
  activeItem: "1",
  message: {},
  loadingItems: [],
  loadingEmails: [],
};
const metaReducer = (store = init, action) => {
  switch (action.type) {
    case LOADING_STATE: {
      return {
        ...store,
        isLoading: action.payload,
      };
    }
    case SET_MESSAGE: {
      return {
        ...store,
        message: action.payload,
      };
    }
    default:
      return store;
  }
};

export default metaReducer;
