import * as types from '../constants/type';

export function login(obj){
    const {username, jwt} = obj;
    return {
        type:types.LOGIN,
        username,
        jwt
    }
}

export function logout(){
    return {
        type:types.LOGOUT
    }
}