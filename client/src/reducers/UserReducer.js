const initalState = {
    username: '',
    jwt: ''
}

const reducer = (state = initalState, action) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            username: action.payload.username,
            jwt: action.payload.jwt
        }
    }
    else if (action.type === 'LOGOUT') {
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
