import React from "react";
import style from "./Users.module.css"
import {UserType} from "../../types/types";
import User from "./User/User";


export type UsersTypeProps = {
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
    totalUsersCount: number,
    followingInProgress: Array<number>


}

let Users: React.FC<UsersTypeProps> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
    return <div className={style.container}>

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