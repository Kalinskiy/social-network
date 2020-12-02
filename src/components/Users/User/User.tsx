import React from "react";
import s from "./User.module.css";
import userPhoto from "../../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../../types/types";



type PropsType = {
    user:UsersType
    followingInProgress:Array<number>
    unfollow:(userId:number)=>void
    follow:(userId:number)=>void
}
let User:React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <div>

        <div className={s.container}>

                <div className={s.col1}>
                    <div className={s.photoContainer}>
                        <NavLink to={`/profile/` + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.usersPhoto}
                             alt={""}
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
                <div><span>Status: {user.status?user.status:"This user has no status"} </span>{user.status}</div>
            </div>
        </div>


    </div>

}

export default User