import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.credentials, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { ...action.user };
    default:
      return state;
  }
}
