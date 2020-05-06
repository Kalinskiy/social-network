import React from 'react';
import s from './Post.module.css';
//import MyPosts from "../MyPosts";


type PostType = {
    message: string
    like: string
}
const Post = (props: PostType) => {
    console.log(props.message);
    return (

        <div className={s.item}>
            <img
                src="https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png"/>
            {props.message},

            <div>
                <span>like  </span>
                {props.like}
            </div>
        </div>

    )
}
export default Post;

