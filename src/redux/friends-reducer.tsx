import {usersAPI} from "../api/api";

export type UsersType = {
    followed: boolean
    id: number
    name: string
    photos: {small: string, large: string}
    status: string
    uniqueUrlName: string
}

let initialState = {
    friends: [] as UsersType[],
    onlineFriends: [] as UsersType[]
}

export const friendsReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case "SET_FRIENDS":
            return {...state, friends: action.value}
        case "SET_ONLINE_FRIENDS":
            return {...state, onlineFriends: action.value}

        default:
            return state;
    }
}


export const setFriends = (value: UsersType[])  => ({type: 'SET_FRIENDS', value} as const)
export const setOnlineFriends = (value: UsersType[])=> ({type: 'SET_ONLINE_FRIENDS', value} as const)

export const getFriends = () => async (dispatch:any) => {
    try {
        const friends = await usersAPI.getFriends()
        const onlineFriends = await usersAPI.getOnlineFriends()


        dispatch(setFriends(friends))
        dispatch(setOnlineFriends(onlineFriends))

    } catch (error) {
        console.log(error)
    }


}


