import React from 'react';
import s from './User.module.css';
import userPhoto from '../../../assets/images/user.png';
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


                <div className={s.col1}>
                    <div className={s.photoContainer}>
                        <NavLink to={`/profile/` + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.usersPhoto}
                             alt={''}
                             key={user.id}/>
                        </NavLink>
                    </div>
                    <div>

                        {user.followed
                            ?
                            <button disabled={followingInProgress.some((id: number) => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Remove friend</button>
                            :
                            <button disabled={followingInProgress.some((id: number) => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>Add friend</button>
                        }

                    </div>
                </div>

            <div className={s.userDescription}>
                <div><span>ID: </span>{user.id}</div>
                <div><span>Name: </span>{user.name}</div>
                <div><span>Status: {user.status?user.status:'This user has no status'} </span>{user.status}</div>
            </div>
        </div>


    </div>

}

export default User