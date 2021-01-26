import { SET_USER } from "../../actions/actionTypes";

const initialState = {
  isUser: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isUser: action.payload ? true : false,
        user: action.payload,
      };
    default:
      return state;
  }
}
