import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';


export type IPost = {
    id: number
    message: string
    likesCount: number
}

export type PostsType = {
    updateNewPostText:any
    addPost:()=>void
    addLike: ( id: number )=>void
    posts:Array<IPost>
    newPostText:string



}

const MyPosts = (props: PostsType) => {

    let postsElement =  props.posts.map((p) => <Post key={p.id} id={p.id} addLike={props.addLike} message={p.message} likesCount={p.likesCount}/>)
    let newPostElement: any = React.createRef();

    let onAddPost = () => {
         props.addPost()
        props.updateNewPostText( '' )
       // let text = newPostElement.current.value;
       // props.dispatch(addPostActionCreator());

    }
    let onPostChange = () => {
        let text: string = newPostElement.current.value;
        props.updateNewPostText( text );

       // let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
      // let action = updateNewPostTextCreator(text);
        //props.dispatch(action);

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
                    <button onClick={onAddPost}>Add Post</button>
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