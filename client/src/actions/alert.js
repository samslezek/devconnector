import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// it enables us to dispatch more than one action type
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4(); // get a random universal id
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
