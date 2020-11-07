import React, {useEffect} from "react";
import style from './Friends.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../redux/redux-store";
import {getFriends, UsersType} from "../../../../redux/friends-reducer";


export const Friends = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriends())
    },[])

    const friends = useSelector<AppStoreType, UsersType[]>(state => state.friends.friends)

    const onlineFriends = useSelector<AppStoreType, UsersType[]>(state => state.friends.onlineFriends)

    const friendsComponents = friends.map((element) => <FriendIcon name={element.name}
                                                                   photo={element.photos.small}
                                                                   key={element.id}/>)

    const onlineFriendsComponent = onlineFriends.map((element) => <FriendIcon name={element.name}
                                                                              photo={element.photos.small}
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
                {friendsComponents}
            </div>

            <div className={style.onlineFriends}>
                {onlineFriendsComponent}
            </div>

        </div>
    )
}


type FriendIconPropsType = {
    photo: string
    name: string
}


export const FriendIcon = (props: FriendIconPropsType) => {

    return (
        <div>
            <img src={props.photo} alt=""/>
            <div>{props.name}</div>
        </div>
    )

}