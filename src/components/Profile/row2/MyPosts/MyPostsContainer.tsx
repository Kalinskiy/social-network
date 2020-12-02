import React, {Dispatch} from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {reset} from "redux-form";
import {actions} from "../../../../redux/profile-reducer";
import {AppStateType} from "../../../../redux/redux-store";


let mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,

    }
}
let mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostAC(newPostText));
           dispatch(reset("profileAddNewPostForm"))
        },
        addLike: (id: number) => {
            dispatch(actions.addLikeAC(id))
        },

    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;