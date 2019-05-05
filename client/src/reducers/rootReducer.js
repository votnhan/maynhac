import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  uiReducer, UserReducer
});

export default rootReducer;
