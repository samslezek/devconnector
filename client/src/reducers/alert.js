import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// this state only pertains to alerts
const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // common practice to save all of these within the actions folder
    case SET_ALERT:
      return [...state, payload]; // here the payload has a message, id, etc.
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); // here the payload is just the id
    default:
      return state;
  }
}
