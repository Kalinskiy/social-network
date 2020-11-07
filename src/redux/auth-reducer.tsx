import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null //if null then captcha isn`t required
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type authStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    captchaUrl: null | string
}

export type SetUserDataType = {
    type: 'auth/SET_USER_DATA'
    payload: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    },
}
export type GetCaptchaType = {
    type: 'auth/GET_CAPTCHA_URL_SUCCESS'
    payload: {
        captchaUrl: string | null,
    },
}
type ActionType = SetUserDataType | GetCaptchaType
//----------------------------------------------------------------------------------------------------------------------
//Reducer
const authReducer = (state: authStateType = initialState, action: ActionType): authStateType => {

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
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
export const getCaptchaUrlSuccess = (captchaUrl: any) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {email, id, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
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

        dispatch(stopSubmit('login', {_error: message})) //диспатчим AC который пришел из redux-form  библиотеки
        //1 параметр - название формы
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export const logout = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.logout()
    debugger
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
