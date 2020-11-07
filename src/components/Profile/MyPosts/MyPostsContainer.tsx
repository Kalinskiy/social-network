import React, {Dispatch} from 'react';
import {addLikeAC, addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {reset} from "redux-form";
import {AppStoreType} from "../../../redux/redux-store";


let mapStateToProps = (state:any) => {

    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,

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