import React, {useState} from 'react';
import s from './Post.module.css';



export type PostType = {
    id:number
    message: string
    likesCount: number
    addLike?: (id: number) => void
}


const Post = (props: PostType) => {



    return (

        <div className={s.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNsyykYTyoBVPpuwQMZ8YVcLVNHzvDwd9ixA&usqp=CAU"/>
            {props.message}

            <div>
                <span   onClick={ () =>
                    // @ts-ignore
                    props.addLike(props.id)} className={s.like}>♥

                </span>
                {props.likesCount}
                {/*{props.likesCount}*/}
            </div>
        </div>


    )
}
export default Post;

