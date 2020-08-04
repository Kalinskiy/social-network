const SET_USER_DATA = 'SET_USER_DATA';
const UNFOLLOW = 'UNFOLLOW';


let initialState = {
    usersId: null,
    email: null,
    login:null,
    isAuth: false

}


const authReducer = (state: any = initialState, action: any) => {


    switch (action.type) {

        case SET_USER_DATA:

            return {


                ...state,
                ...action.data,
                isAuth:true
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId: number, email:string, login: string) => ({type: SET_USER_DATA, data: {userId, email, login}});


//export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});

export default authReducer;
