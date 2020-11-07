import React, {useState} from 'react';
import s from './Post.module.css';
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../redux/redux-store";



export type PostType = {
    id:number
    message: string
    likesCount: number
    addLike?: (id: number) => void


}

const Post = (props: any) => {
 //@ts-ignore
    const myPhoto = useSelector(state => state.profilePage.profile.photos.large)



    return (

        <div className={s.item}>
            <img
                src={myPhoto}/>
            {props.message}
                <span   onClick={ () =>
                    props.addLike(props.id)} className={s.like}>{props.likesCount}♥
                </span>


        </div>


    )
}
export default Post;

