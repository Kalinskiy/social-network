import {getAuthUserData} from "./auth-reducer";

const INiTIALIZED_SUCCESS = 'INiTIALIZED_SUCCESS';

let initialState = {
    initialized: false,
}

//----------------------------------------------------------------------------------------------------------------------
//Types
type authStateType = {
    initialized: boolean
}

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const appReducer = (state: authStateType = initialState, action: any) => {

    switch (action.type) {

        case INiTIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true

            }

        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Actions
export const setInitializedSuccess = () => ({type: INiTIALIZED_SUCCESS});
//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
     promise.then(()=>{
        dispatch(setInitializedSuccess())
    })


}


export default appReducer;
