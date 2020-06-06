import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextCreator} from '../../redux/state';



export type IPost = {
    id: number
    message: string
    likesCount: string
}

export type PostsType = {
    posts: Array<IPost>
    newPostText: string
    dispatch: any


}

const MyPosts = (props: PostsType) => {

    let postsElement = props.posts.map((p: IPost) => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)
    let newPostElement: any = React.createRef();

    let addPost = () => {
       // let text = newPostElement.current.value;
        props.dispatch(addPostActionCreator());

    }
    let onPostChange = () => {
        let text: string = newPostElement.current.value;
       // let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
        let action = updateNewPostTextCreator(text);
        props.dispatch(action);

    }

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <div>
                    <textarea
                        ref={newPostElement}
                        value={props.newPostText}
                        onChange={onPostChange}/>
                </div>
                <div>
                    <button onClick={addPost}>Add Post</button>
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