import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utilities/validators/validators";
import {TextArea} from "../../../common/FormsControls/FormControls";


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
    profile: any
}

const MyPosts = React.memo((props: PostsType) => {


    let postsElement = [...props.posts].reverse().map((p) =>
        <Post
            key={p.id}
            id={p.id}
            addLike={props.addLike}
            message={p.message}
            likesCount={p.likesCount}
        />)


    let onAddPost = (values: any) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <span className={s.postTitle}>My Posts</span>

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
        <div className={s.container}>
            <form onSubmit={props.handleSubmit}>
                <div className={s.formPost}>
                    <Field component={TextArea}
                           name={'newPostText'}
                           placeholder={'What`s new?'}
                           validate={[required, maxLength10]}


                    />

                    <div className={s.formButton}>
                        <button>Post</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

let AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm)


export default MyPosts;