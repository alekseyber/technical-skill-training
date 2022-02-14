import {AuthAction, AuthActionEnum, AuthState} from "./types";
import type {UserAuth, AuthDTO} from "@src/types/models";



const initialState: AuthState = {   
    errorAuth: '',
    isLoading: false,
    token: <AuthDTO>{},
    user: <UserAuth>{}
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {        
        case AuthActionEnum.SET_USER:
            return {...state, ...action.payload, isLoading: false, errorAuth: ''}
        case AuthActionEnum.SET_ERROR:
            return {...state, errorAuth: action.payload, isLoading: false}
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state;
    }
}
