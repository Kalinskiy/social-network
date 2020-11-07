import React, {ChangeEvent, useRef} from 'react';
import s from './Avatar.module.css';
import Preloader from "../../../common/preloader/Preloader";
import userPhoto from '../../../../assets/images/user.png'

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
    isOwner: boolean
    savePhoto: (file: File) => void

}
export const Avatar = (props: PropsType) => {
    const inRef = useRef<HTMLInputElement>(null)

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
                <div className={s.photoBlock}>
                    <img className={s.photo}
                         src={props.profile.photos.large || userPhoto}/>
                    {
                        props.isOwner &&
                        <input
                            type="file"
                            ref={inRef}
                            onChange={onMainPhotoSelected}
                        />
                    }
                    {props.isOwner && <button onClick={() => inRef && inRef.current && inRef.current.click()}>Change</button>}
                    <span className={s.privateProfile}>
                        {props.isOwner ? 'Your profile is private' : 'His profile is private'}
                    </span>
                </div>
    )
}


