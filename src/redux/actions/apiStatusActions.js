import * as types from "./actionTypes";

export function beginApiCall() {
  debugger;
  return { type: types.BEGIN_API_CALL };
}

export function apiCallError() {
  return { type: types.API_CALL_ERROR };
}
