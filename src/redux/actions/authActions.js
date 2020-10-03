import * as types from "./actionTypes";
import * as passengerApi from "../../api/passengerApi";
export function loadPassengersSuccess(user) {
  return { type: types.LOGIN_USER_SUCCESS, user };
}

export function userLogin(id) {
  return function (dispatch) {
    return passengerApi
      .getPassengerFlightDetails(id)
      .then((resp) => {
        debugger;
        dispatch(loadPassengersSuccess(resp));
      })
      .catch((error) => {
        throw error;
      });
  };
}
