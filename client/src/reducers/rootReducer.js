import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  uiReducer: uiReducer, user: UserReducer
});

export default rootReducer;
