import React from 'react';
import s from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";


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

let User = ({user, followingInProgress, unfollow, follow}: any) => {
    return <div>
        <div className={s.container}>
            <div className={s.userInfo}>
                <div className={s.userInfo}>
                    <div>{user.name}</div>
                    <div>ID: {user.id}</div>
                    <div>{user.status}</div>
                </div>


                <NavLink to={`/profile/` + user.id}>
                    <div className={s.photoContainer}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.usersPhoto}
                             alt={''}
                             key={user.id}/>
                    </div>
                </NavLink>
                <div>
                    {user.followed

                        ?
                        <button disabled={followingInProgress.some((id: number) => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        :
                        <button disabled={followingInProgress.some((id: number) => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                    }

                </div>

            </div>

        </div>


    </div>

}

export default User