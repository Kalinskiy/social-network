import React from 'react';
import MyPosts, {IPost} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


export type PropsType = {
    // profilePage: ProfileType
    //  dispatch:any
    store:any

}

export type ProfileType = {
    posts: Array<IPost>
    newPostText:string

}

export default function Profile() {


    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}
