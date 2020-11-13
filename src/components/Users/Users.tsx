import React from 'react';
import Pagination from "../common/Paginator/Pagination";
import User from "./User/User";
import style from './Users.module.css'


export type UserType = {
    photos: {
        small: string,
        large: string,
    }
    unfollow: boolean
    follow: boolean
    name: string
    status: string
    id: number
}

export type UsersTypeProps = {
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
    totalUsersCount: number,
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    followingInProgress: Array<number>


}

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}: UsersTypeProps) => {
    return <div className={style.container}>

        {
            users.map((u: any) => <User user={u}
                                        key={u.id}
                                        followingInProgress={props.followingInProgress}
                                        unfollow={props.unfollow}
                                        follow={props.follow}
                />
            )}
        {/*<div className={style.paginator}>*/}
        {/*    <Pagination pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}*/}
        {/*                totalItemsCount={totalUsersCount}/>*/}
        {/*</div>*/}
    </div>
}

export default Users