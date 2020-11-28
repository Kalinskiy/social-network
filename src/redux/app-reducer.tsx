import {getAuthUserData} from './auth-reducer';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";


const initialState = {
    initialized: false,
    isFetching: false
}

//----------------------------------------------------------------------------------------------------------------------
//Types
type InitialStateType = {
    initialized: boolean
    isFetching: boolean
}
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
export const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
export type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export type InitializedType = {
    type: typeof INITIALIZED_SUCCESS,
    initialized: boolean
}
type ActionType = ToggleIsFetchingType | InitializedType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const appReducer = (state: InitialStateType = initialState, action: ActionType):InitialStateType => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Actions
export const setInitializedSuccessAC = (initialized: boolean):InitializedType => ({type: INITIALIZED_SUCCESS, initialized});
export const toggleIsFetchingAC = (isFetching: boolean):ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const initializeApp = ():ThunkType => async (dispatch) => {
    let res =  await dispatch(getAuthUserData())
    try{
        dispatch(setInitializedSuccessAC(true))
    }
    catch (e) {

    }
}
export default appReducer;
