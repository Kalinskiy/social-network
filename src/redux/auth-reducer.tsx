import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../api/api';
import {stopSubmit} from 'redux-form';
import {Dispatch} from 'redux';
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null then captcha isn`t required
}

//----------------------------------------------------------------------------------------------------------------------
//Types
export type initialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | ReturnType <typeof stopSubmit>>
//----------------------------------------------------------------------------------------------------------------------
//Reducer
const authReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {

        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
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
export const actions = {
    setAuthUserDataAC: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccessAC: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS' ,
        payload: {captchaUrl}
    } as const)

}

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.me()
    if (response.resultCode === ResultCodesEnum.Success) {
        let {email, id, login} = response.data;
        dispatch(actions.setAuthUserDataAC(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: Dispatch<any>) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = response.messages.length > 0
            ? response.messages[0]
            : 'email or password is not valid'

        dispatch(stopSubmit('login', {_error: message})) // dispatch AC which comes from redux-form library
        //1st param -  form name
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    try {
        dispatch(actions.getCaptchaUrlSuccessAC(response.url))
    } catch (e) {
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserDataAC(null, null, null, false))
    }
}

export default authReducer;
