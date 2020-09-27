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

let Users = (props: UsersTypeProps) => {
    console.log(props)
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pagesCount = 30
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <>

        <div>
            {pages.map(p => {
                let isCurrentPage = props.currentPage === p

                return <span onClick={(e) => {
                    props.onPageChanged(p)
                }} className={isCurrentPage ? s.selectedPage : s.UnselectedPage}>{p}</span>

            })}

        </div>

        {
            props.users.map((u: any) => <div key={u.id}>

                <span>
                    <div>
                        <NavLink to={`/profile/` + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.usersPhoto} alt={''}
                             key={u.id}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed

                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>
                        }

                    </div>
                </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>ID: {u.id}</div>
                        <div>{u.status}</div>
                    </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                </span>

                </div>
            )}
    </>
}

export default Users