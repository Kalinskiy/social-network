import {UsersType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../api/users-api";
import {actions as appAction} from "./app-reducer";

const initialState = {
    friends: [] as UsersType[],
    onlineFriends: [] as UsersType[]
}

//----------------------------------------------------------------------------------------------------------------------
//Types
type InitialStateType = typeof initialState
type ActionType = InferActionsTypes<typeof actions & typeof appAction>
type ThunkType = BaseThunkType<ActionType>
//----------------------------------------------------------------------------------------------------------------------
//Reducer
export const friendsReducer = (state: InitialStateType = initialState, action: ActionType) => {

    switch (action.type) {

        case 'SET_FRIENDS':
            return {...state, friends: action.payload.value}
        case 'SET_ONLINE_FRIENDS':
            return {...state, onlineFriends: action.payload.value}
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Actions
const actions = {
    setFriendsAC: (value: Array<UsersType>) => ({
        type: 'SET_FRIENDS',
        payload: {value} as const
    }),
   setOnlineFriendsAC: (value: Array<UsersType>) => ({
        type: 'SET_ONLINE_FRIENDS',
        payload: {value} as const
    })

}

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getFriends = (): ThunkType => async (dispatch) => {
    try {
        const friends = await usersAPI.getFriends()
        const onlineFriends = await usersAPI.getOnlineFriends()
        dispatch(actions.setFriendsAC(friends))
        dispatch(actions.setOnlineFriendsAC(onlineFriends))

    } catch (error) {
        console.log(error)
    }


}


