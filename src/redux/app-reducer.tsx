import {getAuthUserData} from "./auth-reducer";

const INiTIALIZED_SUCCESS = 'INiTIALIZED_SUCCESS';

type authStateType = {
    initialized: boolean

}

let initialState = {
    initialized: false,

}


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


export const setInitializedSuccess = () => ({type: INiTIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {



    let promise = dispatch(getAuthUserData())
     promise.then(()=>{

        dispatch(setInitializedSuccess())

    })


}


export default appReducer;
