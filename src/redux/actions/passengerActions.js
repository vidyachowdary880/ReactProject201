import * as types from "./actionTypes";
import * as passengerApi from "../../api/passengerApi";
export function loadPassengersSuccess(passengers) {
  return { type: types.GET_PASSENGERS_BY_FLIGHTID, passengers };
}


export function updatePassenger(resp) {
  return { type: types.UPDATE_PASSENGER, resp };
}

export function getPassengers(id) {
  return function (dispatch) {
    return passengerApi
      .getPassengerFlightDetails(id)
      .then((resp) => {
        dispatch(loadPassengersSuccess(resp));
      })
      .catch((error) => {
        throw error;
      });
  };
}


export function updatePassengers(passenger) {
  return function (dispatch) {
    return passengerApi
      .savePassangerServices(passenger)
      .then((resp) => {
        dispatch(updatePassenger(resp));
      })
      .catch((error) => {
        throw error;
      });
  };
}