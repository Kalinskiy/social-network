import React, {ChangeEvent, useRef, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type PropsType = {
    profile: any
    status: string
    updateStatus: string
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: any
}
export const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: PropsType) => {
    const inRef = useRef<HTMLInputElement>(null)

    let [editMode, setEditMode] = useState(false)


    if (!profile) {
        return <Preloader/>
    }


    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {

        saveProfile(formData).then(() => {
            setEditMode(false);
        })

    }


    return (
        <div>

            <div className={s.wrapper}>
                <div className={s.photoBlock}>
                    <img className={s.photo}
                         src={profile.photos.large || userPhoto}/>
                    {
                        isOwner &&
                        <input
                            type="file"
                            style={{display: 'none'}}
                            ref={inRef}
                            onChange={onMainPhotoSelected}
                        />
                    }
                    {isOwner && <button onClick={() => inRef && inRef.current && inRef.current.click()}>Change</button>}
                    <span className={s.privateProfile}>
                        {isOwner?'Your profile is private': 'His profile is private'}
                    </span>
                </div>

                <div className={s.edit}>
                    <span className={s.fullName}>
                        {profile.fullName}
                    </span>
                    <div className={s.status}>
                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                    </div>

                    {editMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                        : <ProfileData goToEditMode={() => {
                            setEditMode(true)
                        }}
                                       profile={profile} isOwner={isOwner}
                        />}
                </div>
            </div>
        </div>
    )
}


