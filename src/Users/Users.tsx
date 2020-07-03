import React from "react";
import s from "./Users.module.css";
import userPhoto from "../assets/images/user.png";


type UsersTypeProps = {
    totalUsersCount: number,
    pageSize: number,
    currentPage:number,
    onPageChanged:(pageNumber:number)=>void
    users:Array<any>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void


}

let Users = (props: UsersTypeProps) => {
    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
   let pagesCount = 20
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
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.usersPhoto}/>

                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
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