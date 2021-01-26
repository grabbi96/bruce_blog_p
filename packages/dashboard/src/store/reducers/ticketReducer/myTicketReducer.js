import { SET_MY_TICKETS } from "../../actions/actionTypes";

const initialState = {
  tickets: [],
  isLoading: false,
  myTickets: [{}, {}, {}, {}],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MY_TICKETS:
      return {
        ...state,
        isLoading: true,
        myTickets: action.payload,
      };

    default:
      return state;
  }
}
