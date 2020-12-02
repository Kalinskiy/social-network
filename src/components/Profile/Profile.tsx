import React from 'react';
import {Avatar} from './row1/Avatar/Avatar';
import MyPostsContainer from './row2/MyPosts/MyPostsContainer';
import s from './Profile.module.css'
import {Friends} from './row1/Friends/Friends';
import {AboutProfile} from './row2/AboutProfile/AboutProfile';
import {ProfileType} from "../../types/types";


type PropsType = {
    updateStatus: (status: string) => void
    profile: ProfileType
    status: string
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void

}

const Profile:React.FC<PropsType> = (props) =>{

    return (
        <div className={s.container}>

            <div className={s.row1}>
                <Avatar profile={props.profile}
                        isOwner={props.isOwner}
                        savePhoto={props.savePhoto}
                />
                <Friends/>
            </div>
            <div className={s.row2}>
                <AboutProfile
                    updateStatus={props.updateStatus}
                    fullName={props.profile.fullName}
                    isOwner={props.isOwner}
                    saveProfile={props.saveProfile}
                    status={props.status}
                    profile={props.profile}
                />
                <MyPostsContainer/>
            </div>

        </div>


    )
}

export default Profile;