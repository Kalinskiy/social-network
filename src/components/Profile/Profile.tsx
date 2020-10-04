import React from 'react';
import {IPost} from "./MyPosts/MyPosts";
import ProfileInfo, {ProfileType} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {updateStatus} from "../../redux/profile-reducer";


export type PropsType = {

    profile: any
    status: string
    updateStatus: string
    isOwner: any
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

function Profile(props: PropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                         isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;