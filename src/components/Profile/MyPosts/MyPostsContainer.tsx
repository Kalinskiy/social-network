import React, {Dispatch} from 'react';
import {addLikeAC, addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {reset} from "redux-form";
import {AppStoreType} from "../../../redux/redux-store";


export type IPost = {
    id: number
    message: string
    likesCount: string
}
export type PostsType = {

    store: any
}

let mapStateToProps = (state:AppStoreType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
           dispatch(reset('profileAddNewPostForm'))
        },
        addLike: (id: number) => {
            dispatch(addLikeAC(id))
        },

    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;