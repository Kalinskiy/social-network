import React, {useState} from "react";
import s from "./Post.module.css";
import {useSelector} from "react-redux";
import like from "../../../../../assets/icons/like.png"
import liked from "../../../../../assets/icons/liked.png"
import userPhoto from "../../../../../assets/images/user.png"
import {ProfileType} from "../../../../../types/types";

type PropsType = {

    id:number
    addLike: (id: number) => void
    message: string
    likesCount: number
    profile:ProfileType | null


}
const Post:React.FC<PropsType> = (props) => {



    const myPhoto = props.profile?.photos.large

    const [isLike, setIsLike] = useState(false)
    const likeClick = () => {
        setIsLike(!isLike)


    }


    return (
        <div className={s.item}>
            <img className={s.myPhoto}
                 src={myPhoto || userPhoto} alt=''/>
            <div className={s.postText}>
                {props.message}
            </div>
            <span className={s.like} onClick={likeClick}>
                <img src={props.likesCount >= 1 || isLike ? liked : like} alt=''/>
                {props.likesCount >= 1 || isLike ? "1" : null}
                </span>
        </div>


    )
}
export default Post;

