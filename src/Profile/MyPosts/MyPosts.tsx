import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

type PostsType = {
    id: number
    message: string
    like: string
}

const MyPosts = () => {
    let postsData: Array<PostsType> = [
        {id: 1, message: 'Hi, how are you?', like:'1'},
        {id: 2, message: 'It`s my first post', like:'5'},
        {id: 3, message: 'Third one', like:'9'},
    ]
    let postsElement = postsData.map(post=> <Post id={post.id} message={post.message} like={post.like}/>)
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add Post</button>
                </div>
            </div>

            <div className={s.posts}>
                {/*PostData maping*/}
                {postsElement}

            </div>
        </div>

    )
}

export default MyPosts;