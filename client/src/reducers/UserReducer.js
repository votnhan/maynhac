import * as types from "../constants/type"

const initalState = {
    username: '',
    jwt: ''
}

const reducer = (state = initalState, action) => {
    if (action.type === types.LOGIN) {
        return {
            ...state,
            username: action.payload.username,
            jwt: action.payload.jwt
        }
    }
    else if (action.type === types.LOGOUT) {
        return { 
            ...state,
            username: '',
            jwt: ''
        }
    }
    else {
        return {
            ...state
        };
    }
}

export default reducer;
