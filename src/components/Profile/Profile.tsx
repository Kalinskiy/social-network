import React from 'react';
import {ProfileInfo, ProfileType} from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from './Profile.module.css'
import {Friends} from "../Friends/Friends";


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
        <div className={s.wrapper}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                         isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile}/>
            <Friends/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;