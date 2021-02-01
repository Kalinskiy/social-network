import React from "react";
import style from "./Users.module.css"
import {UsersType} from "../../types/types";
import User from "./User/User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";


type UsersTypeProps = {
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UsersType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
    totalUsersCount: number,
    followingInProgress: Array<number>


}

let Users: React.FC<UsersTypeProps> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
    return <div className={style.container}>
      <div className={style.filterSearch}><UsersSearchForm  onFilterChanged={props.onFilterChanged}/></div>

        {
            users.map((u: any) => <User user={u}
                                        key={u.id}
                                        followingInProgress={props.followingInProgress}
                                        unfollow={props.unfollow}
                                        follow={props.follow}


                />
            )}
    </div>
}

export default Users