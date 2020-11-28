import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {Dispatch} from 'redux';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";


const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null then captcha isn`t required
}

//----------------------------------------------------------------------------------------------------------------------
//Types
const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

export type initialStateType = typeof initialState

export type SetUserDataType = {
    type: typeof SET_USER_DATA
    payload: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    },
}
export type GetCaptchaType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl: string | null,
    },
}
type ActionType = SetUserDataType | GetCaptchaType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>
//----------------------------------------------------------------------------------------------------------------------
//Reducer
const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,


            }
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Actions
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
export const getCaptchaUrlSuccessAC = (captchaUrl: any): GetCaptchaType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {email, id, login} = response.data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch:Dispatch<any>) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
            : 'email or password is not valid'

        dispatch(stopSubmit('login', {_error: message})) // dispatch AC which comes from redux-form library
        //1st param -  form name
    }
}
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    try {
        dispatch(getCaptchaUrlSuccessAC(response.data.url))
    } catch (e) {

    }


}

export const logout = ():ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

export default authReducer;
