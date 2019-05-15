import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import * as types from '../constants/type';
const initalState = {
    username: '',
    jwt: ''
}

const reducer = (state = initalState, action) => {
    if (action.type === types.LOGIN) {
        return {
            ...state,
            username: action.payload.username,
            jwt: action.payload.jwt,
            name: action.payload.name
        }
    }
    else if (action.type === types.LOGOUT) {
        return {
            ...state,
            username: '',
            jwt: '',
            name: ''
        }
    }
    else {
        return {
            ...state
        };
    }
}

const userPersistConfig = {
    key: 'user',
    storage: storage,
    stateReconciler: autoMergeLevel2
  }


export default persistReducer(userPersistConfig, reducer);
