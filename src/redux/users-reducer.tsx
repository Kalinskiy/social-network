import {usersAPI} from "../api/api";
import {UserType} from "../components/Users/Users";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 100,
    isFetching: false,
    followingInProgress: []
}
type UsersStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
export type FollowType = {
    type: 'FOLLOW'
    userId: number
}
export type UnfollowType = {
    type: 'UNFOLLOW'
    userId: number
}
export type SetUsersType = {
    type: 'SET_USERS'
    users: Array<UserType>
}

export type SetCurrentPageType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}
export type SetTotalUsersCountType = {
    count: number;
    type: 'SET_TOTAL_USERS_COUNT'
    setTotalUsersCount: number
}
export type ToggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

export type ToggleIsFollowingProgressType = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}
type ActionType = FollowType | UnfollowType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType
    | ToggleIsFetchingType | ToggleIsFollowingProgressType


const usersReducer = (state: UsersStateType = initialState, action: ActionType): UsersStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //   users: [...state.users],
                users: state.users.map((u: any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:

            return {
                ...state,
                //   users: [...state.users],
                users: state.users.map((u: any) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => id != action.userId)
            }
        }

        default:
            return state;
    }
}

export const followSuccess = (userId: number) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId});
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});
    
export const requestUsers = (page: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        usersAPI.getUsers(page, pageSize).then((data: any) => {

            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount))

        })
    }
}

export const follow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then((response: any) => {
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))

            });
    }
}
export const unfollow = (userId: number) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            .then((response: any) => {
                if (response.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))

            });
    }
}

export default usersReducer;
