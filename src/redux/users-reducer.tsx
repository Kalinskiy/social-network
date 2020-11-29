import {ResultCodesEnum, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utilities/object-helpers";
import {toggleIsFetchingAC, ToggleIsFetchingType} from "./app-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {UsersType} from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type InitialStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number> //Array of users id
}

export type FollowType = {
    type: typeof FOLLOW
    payload: {
        userId: number
    }

}
export type UnfollowType = {
    type: typeof UNFOLLOW
    payload: {
        userId: number
    }
}
export type SetUsersType = {
    type: typeof SET_USERS
    payload: {
        users: Array<UsersType>
    }
}
export type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    payload: {
        currentPage: number
    }

}
export type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    payload: {
        count: number;
    }

}
export type ToggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    payload: {
        isFetching: boolean
        userId: number
    }
}

type ActionType = FollowType | UnfollowType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType
    | ToggleIsFollowingProgressType | ToggleIsFetchingType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: true})
            }
        case UNFOLLOW:

            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload.userId, "id", {followed: false})

            }
        case SET_USERS: {
            return {...state, users: action.payload.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.payload.count}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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
export const followSuccess = (userId: number): FollowType => ({type: FOLLOW, payload: {userId}});
export const unfollowSuccess = (userId: number): UnfollowType => ({type: UNFOLLOW, payload: {userId}});
export const setUsers = (users: Array<UsersType>): SetUsersType => ({type: SET_USERS, payload: {users}});
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    payload: {currentPage}
});
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    payload: {
        count: totalUsersCount
    }
});
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    payload: {
        isFetching,
        userId
    }

});

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount))
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userId: number, apiMethod: any,
                             actionCreator: (userId: number) => UnfollowType | FollowType) => {
    dispatch(toggleFollowingProgress(true, userId))
    debugger
    const response = await apiMethod(userId)
    if (response.resultCode == ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}


export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch: Dispatch<ActionType>) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}


export default usersReducer;
