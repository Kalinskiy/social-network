import {usersAPI} from "../api/api";
import {PhotosType} from "../types/types";
import {Dispatch} from "react";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const initialState = {
    friends: [] as UsersType[],
    onlineFriends: [] as UsersType[]
}

//----------------------------------------------------------------------------------------------------------------------
//Types

type InitialStateType = typeof initialState
export type UsersType = {
    followed: boolean
    id: number
    name: string
    photos: PhotosType
    status: string
    uniqueUrlName: string
}
const SET_FRIENDS = 'SET_FRIENDS'
const SET_ONLINE_FRIENDS = 'SET_ONLINE_FRIENDS'
type SetFriendsType = {
    type: typeof SET_FRIENDS
    payload: {
        value: UsersType[]
    }
}
type SetOnlineFriendsType = {
    type: typeof SET_ONLINE_FRIENDS
    payload: {
        value: UsersType[]
    }
}
type ActionTypes = SetFriendsType | SetOnlineFriendsType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
//----------------------------------------------------------------------------------------------------------------------
//Reducer
export const friendsReducer = (state: InitialStateType = initialState, action: ActionTypes) => {

    switch (action.type) {

        case SET_FRIENDS:
            return {...state, friends: action.payload.value}
        case SET_ONLINE_FRIENDS:
            return {...state, onlineFriends: action.payload.value}
        default:
            return state;
    }
}

//----------------------------------------------------------------------------------------------------------------------
//Actions
export const setFriendsAC = (value: Array<UsersType>): SetFriendsType => ({type: SET_FRIENDS, payload: {value} as const})
export const setOnlineFriendsAC = (value: Array<UsersType>): SetOnlineFriendsType => ({
    type: SET_ONLINE_FRIENDS,
    payload: {value} as const
})

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getFriends = ():ThunkType => async (dispatch) => {
    try {
        const friends = await usersAPI.getFriends()
        const onlineFriends = await usersAPI.getOnlineFriends()
        dispatch(setFriendsAC(friends))
        dispatch(setOnlineFriendsAC(onlineFriends))

    } catch (error) {
        console.log(error)
    }


}


