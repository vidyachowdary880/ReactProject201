import { combineReducers } from "redux";
import auth from "./authReducer";
import apiCallStatus from "./apiStateReducer";
const rootReducer = combineReducers({
  auth,
  apiCallStatus,
});

export default rootReducer;
