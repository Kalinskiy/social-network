import React from 'react';
import MyPosts, {IPost} from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


export type PropsType = {
    profilePage: ProfileType
     dispatch:any

}

export type ProfileType = {
    posts: Array<IPost>
    newPostText:string
}

export default function Profile(props: PropsType) {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}

            />
        </div>
    )
}
