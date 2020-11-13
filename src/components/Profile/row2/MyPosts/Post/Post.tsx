import React, {useState} from 'react';
import s from './Post.module.css';
import {useSelector} from "react-redux";
import like from '../../../../../assets/icons/like.png'
import liked from '../../../../../assets/icons/liked.png'
import userPhoto from '../../../../../assets/images/user.png'
export type PostType = {
    id: number
    message: string
    likesCount: number
    addLike?: (id: number) => void


}


const Post = (props: any) => {


    //@ts-ignore
    const myPhoto = useSelector(state => state.profilePage.profile.photos.large)
    const [isLike, setIsLike] = useState(false)
    const likeClick = () => {
        setIsLike(!isLike)


    }
    // localStorage.setItem('like', JSON.stringify(isLike))
    // const test = localStorage.getItem('like')
    // console.log(test)

    return (
        <div className={s.item}>
            <img className={s.myPhoto}
                 src={myPhoto || userPhoto}/>
            <div className={s.postText}>
                {props.message}
            </div>
            <span className={s.like} onClick={likeClick}>
                 {/*onClick={() => props.addLike(props.id)}*/}
                <img src={props.likesCount >= 1 || isLike ? liked : like}/>

               {props.likesCount >= 1 || isLike ? '1' : null}
                {/*<img src={props.likesCount >= 1 || like ? liked : like}/>*/}
               {/* {props.likesCount >= 1 || like ? '1' : null}*/}




                </span>


        </div>


    )
}
export default Post;

