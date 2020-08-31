import React from 'react';
import {IPost} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {updateStatus} from "../../redux/profile-reducer";


export type PropsType = {
    // profilePage: ProfileType
    //  dispatch:any
    profile: any
    status: string
    updateStatus:string
}
export type ProfileType = {
    posts: Array<IPost>
    newPostText: string
}

function Profile(props: PropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;