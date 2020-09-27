import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type authStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
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
type ActionType = SetUserDataType
//----------------------------------------------------------------------------------------------------------------------
//Reducer
const authReducer = (state: authStateType = initialState, action: ActionType): authStateType => {

    switch (action.type) {

        case SET_USER_DATA:
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

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {email, id, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe)
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'email or password is not valid'
                dispatch(stopSubmit('login', {_error: message})) //диспатчим AC который пришел из redux-form  библиотеки
                //1 параметр - название формы
            }


}
export const logout = (email: string, password: string, rememberMe: boolean) => async(dispatch: any) => {
    const response =await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export default authReducer;
