import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.passengers, action) {
  switch (action.type) {
    case types.GET_PASSENGERS_BY_FLIGHTID:
      return action.passengers;
    case types.UPDATE_PASSENGER:
      return state.map(passenger =>
        passenger.id === action.resp.id ? action.resp : passenger
      );
    default:
      return state;
  }
}
