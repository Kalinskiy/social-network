import React from 'react';
import {IPost} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


export type PropsType = {
    // profilePage: ProfileType
    //  dispatch:any
  profile:any
}
export type ProfileType = {
    posts: Array<IPost>
    newPostText:string
}

    function Profile(props:PropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}
export default Profile;