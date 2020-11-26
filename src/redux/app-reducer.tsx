import {getAuthUserData} from './auth-reducer';


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
export const setInitializedSuccessAC = (initialized: boolean) => ({type: INITIALIZED_SUCCESS, initialized});
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const initializeApp = () => async (dispatch: any) => {
    let res =  await dispatch(getAuthUserData())
    try{
        dispatch(setInitializedSuccessAC(true))
    }
    catch (e) {

    }
}
export default appReducer;
