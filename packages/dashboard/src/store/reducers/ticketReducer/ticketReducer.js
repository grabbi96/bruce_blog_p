import { ADD_TICKET, REMOVE_TICKET } from "../../actions/actionTypes";

const initialState = {
  tickets: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TICKET:
      return {
        ...state,
        tickets: state.tickets.concat(action.payload),
      };

    case REMOVE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (tct) => tct.referenceNumber !== action.payload
        ),
      };

    default:
      return state;
  }
}
