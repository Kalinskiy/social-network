import React, {useEffect} from "react";
import style from './Friends.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../redux/redux-store";
import {getFriends, UsersType} from "../../../../redux/friends-reducer";
import userPhoto from '../../../../assets/images/user.png';
import {NavLink} from "react-router-dom";


export const Friends = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    const friends = useSelector<AppStoreType, UsersType[]>(state => state.friends.friends)

    const onlineFriends = useSelector<AppStoreType, UsersType[]>(state => state.friends.onlineFriends)

    const friendsComponents = friends.map((element) => <FriendIcon name={element.name}
                                                                   photo={element.photos.small}
                                                                   id={element.id}
                                                                   key={element.id}/>)

    const onlineFriendsComponent = onlineFriends.map((element) => <FriendIcon name={element.name}
                                                                              photo={element.photos.small}
                                                                              id={element.id}
                                                                              key={element.id}
    />)

    /*const onlineFriendsComponents = onlineFriends.map((element) => {
        return (
            <FriendIcon name={element.name}
                        photo={element.photos.small}
            />
        )
    })*/

    return (
        <div className={style.container}>

            <div className={style.friends}>
                <span>Friends</span>
                {friendsComponents}

            </div>

            <div className={style.onlineFriends}>
                <span>Online friends</span>
                {onlineFriendsComponent}
            </div>

        </div>
    )
}


type FriendIconPropsType = {
    photo: string
    name: string
    id: number
}


export const FriendIcon = (props: FriendIconPropsType) => {

    return (
        <div className={style.friendContainer}>
            <NavLink to={`/profile/${props.id}`}>
                <img src={props.photo || userPhoto}/>
                <div className={style.name}>{props.name}</div>
            </NavLink>

        </div>
    )

}