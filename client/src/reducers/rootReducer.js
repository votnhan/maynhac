import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import UserReducer from "./UserReducer";
import songInfo from "./songInfoReducer";

const rootReducer = combineReducers({
  uiReducer: uiReducer, user: UserReducer, songInfo: songInfo
});

export default rootReducer;
