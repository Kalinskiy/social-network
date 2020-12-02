import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utilities/validators/validators";
import {createField, GetStringKeysType, Input, TextArea} from "../../../common/FormsControls/FormControls";
import {ProfileType} from "../../../../types/types";


export type IPost = {
    id: number
    message: string
    likesCount: number

}

export type PostsType = {
    addPost: (newPostText: string) => void
    addLike: (id: number) => void
    posts: Array<IPost>
    profile:ProfileType | null


}

const MyPosts = React.memo((props: PostsType) => {


    let postsElement = [...props.posts].reverse().map((p) =>
        <Post
            key={p.id}
            id={p.id}
            addLike={props.addLike}
            message={p.message}
            likesCount={p.likesCount}
            profile={props.profile}
        />)


    const onAddPost = (values: AddPostFormValuesType) => {
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


type AddPostFormType = {}

type AddPostFormValuesType = {
    newPostText:string
}


type AddPostFormValuesKeysType = GetStringKeysType<AddPostFormValuesType>
let AddNewPostForm:React.FC<InjectedFormProps<AddPostFormValuesType, AddPostFormType> & AddPostFormType> = (props) => {

    return (
        <div className={s.container}>
            <form onSubmit={props.handleSubmit}>
                <div className={s.formPost}>

                    {createField<AddPostFormValuesKeysType>("What`s new?", "newPostText", [required], TextArea)}

                    <div className={s.formButton}>
                        <button>Post</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType,AddPostFormType >({form: "profileAddNewPostForm"})(AddNewPostForm)


export default MyPosts;