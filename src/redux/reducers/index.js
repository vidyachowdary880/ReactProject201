import { combineReducers } from "redux";
import passengers from "./passReducer";
import apiState from "./apiStateReducer";
const rootReducer = combineReducers({
  passengers,
  apiState,
});

export default rootReducer;
