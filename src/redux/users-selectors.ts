import {createSelector} from "reselect";

const getUsersSelector = (state: any) => {
    return state.usersPage.users
}


// export const getUsers = createSelector( getUsersSelector,
//     (users:any)=>{
//      users.filter((u:any)=>u)
// })
//
export const getUsers = (state: any) => {
    return state.usersPage.users;
}


export const getPageSize = (state: any) => {
    return state.usersPage.pageSize;
}


export const getTotalUsersCount = (state: any) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: any) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: any) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: any) => {
    return state.usersPage.followingInProgress
}
