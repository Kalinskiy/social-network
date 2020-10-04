import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm, reset} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {TextArea} from "../../common/FormsControls/FormControls";
import {useDispatch} from "react-redux";


export type IPost = {
    id: number
    message: string
    likesCount: number
}

export type PostsType = {

    addPost: (newPostText: string) => void
    addLike: (id: number) => void
    posts: Array<IPost>
    newPostText: string
}

const MyPosts = React.memo((props: PostsType) => {


    let postsElement = [...props.posts].reverse().map((p) => <Post key={p.id} id={p.id} addLike={props.addLike}
                                                                   message={p.message} likesCount={p.likesCount}/>)


    let onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {/*PostData maping*/}
                {postsElement}

            </div>
        </div>

    )
})

const maxLength10 = maxLengthCreator(10)
let AddNewPostForm = (props: any) => {


    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={TextArea}
                       name={'newPostText'}
                       placeholder={'Enter your post here'}
                       validate={[required, maxLength10]}


                />

            </div>
            <div>
                <button
                    // onClick={props.reset} как занулить инпут?
                >Add Post</button>
            </div>
        </form>

    )
}

let AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm)


export default MyPosts;