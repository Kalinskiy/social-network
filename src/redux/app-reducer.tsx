import {getAuthUserData} from "./auth-reducer";

const INiTIALIZED_SUCCESS = 'INiTIALIZED_SUCCESS';

let initialState = {
    initialized: false,
    isFetching:false
}
export type ToggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type authStateType = {
    initialized: boolean
    isFetching: boolean
}
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
//----------------------------------------------------------------------------------------------------------------------
//Reducer
const appReducer = (state: authStateType = initialState, action: any) => {

    switch (action.type) {

        case INiTIALIZED_SUCCESS:
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
export const setInitializedSuccess = () => ({type: INiTIALIZED_SUCCESS});
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
     promise.then(()=>{
        dispatch(setInitializedSuccess())
    })


}


export default appReducer;
