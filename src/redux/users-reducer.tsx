import {ResultCodesEnum} from "../api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utilities/object-helpers";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {UsersType} from "../types/types";
import {actions as appAction} from "./app-reducer";
import {usersAPI} from "../api/users-api";


const initialState = {
    users: [] as UsersType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    filter:{
        term:'',
        friend:null as null | boolean
    },
    isFetching: false,
    followingInProgress: []//Array of users id

}
//----------------------------------------------------------------------------------------------------------------------
//Types
type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    filter:{
        term:string,
        friend:null | boolean
    }
    isFetching: boolean
    followingInProgress: Array<number>
}
export type FilterType = typeof initialState.filter

type ActionType = InferActionsTypes<typeof actions & typeof appAction>


type ThunkType = BaseThunkType<ActionType>

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})
            }
        case 'SET_USERS': {
            return {...state, users: action.payload.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.payload.currentPage}
        }
        case 'SET_FILTER': {
            return {...state, filter: action.payload.filter}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.payload.count}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter((id: number) => id != action.payload.userId)
            }
        }

        default:
            return state;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//Actions
export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', payload: {userId}} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', payload: {userId}} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SET_USERS', payload: {users}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: {filter}} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        payload: {count: totalUsersCount}
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        payload: {isFetching, userId}
    } as const),
}

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const requestUsers = (page: number, pageSize: number, filter:FilterType): ThunkType => async (dispatch) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));
    const data = await usersAPI.getUsers(page, pageSize,filter.term, filter.friend)
    dispatch(appAction.toggleIsFetchingAC(false))
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount))
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userId: number, apiMethod: any,
                                   actionCreator: (userId: number) => ActionType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    debugger
    const response = await apiMethod(userId)
    if (response.resultCode == ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}


export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
}


export default usersReducer;
