import {getAuthUserData} from './auth-reducer';
import {BaseThunkType, InferActionsTypes} from "./redux-store";


const initialState = {
    initialized: false,
    isFetching: false
}

//----------------------------------------------------------------------------------------------------------------------
//Types
type InitialStateType = typeof initialState

type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {

        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        case 'APP/TOGGLE_IS_FETCHING': {
            return {
                ...state, isFetching: action.payload.isFetching
            }
        }
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Actions
export const actions = {
    setInitializedSuccessAC: () => ({type: 'APP/INITIALIZED_SUCCESS'} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: 'APP/TOGGLE_IS_FETCHING', payload: {isFetching}} as const)
}

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const initializeApp = (): ThunkType => async (dispatch) => {
    let res = await dispatch(getAuthUserData())
    try {
        dispatch(actions.setInitializedSuccessAC())
    } catch (e) {

    }
}
export default appReducer;
