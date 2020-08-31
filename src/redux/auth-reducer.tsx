import {authAPI, usersAPI} from "../api/api";
import {toggleFollowingProgress, unfollowSuccess} from "./users-reducer";

const SET_USER_DATA = 'SET_USER_DATA';

type authStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
export type SetUserDataType = {
    type: 'SET_USER_DATA'
    data: {
        userId: number,
        email: string,
        login: string
    },
}
type ActionType = SetUserDataType
const authReducer = (state: authStateType = initialState, action: ActionType): authStateType => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }

        default:
            return state;
    }
}


export const setAuthUserData = (userId: number, email: string, login: string) => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
});

export const getAuthUserData = () => (dispatch: any) => {
    authAPI.me()
        .then((response: any) => {

            if (response.data.resultCode === 0) {

                let {email, id, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });

}

export default authReducer;
