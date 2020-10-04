import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from "./ProfileDataForm";


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
const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: PropsType) => {
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

         saveProfile(formData).then(()=>{
             setEditMode(false);
         })

    }


    return (
        <div>
            <div className={s.mainPicture}>
                <img
                    src="https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg"
                    alt=""/>
            </div>
            <div className={s.desciptionBlock}>

                <img className={s.photo}
                     src={profile.photos.large || userPhoto}/>
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }}
                                   profile={profile} isOwner={isOwner}
                    />}


            </div>

        </div>
    )
}


type ProfileDataPropsType = {
    profile: any
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}: any) => {
    console.log(profile)

    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob && //if checked - true, then will be displayed my skills
        <div>
            <b>My skills</b>: {profile.lookingForAJobDescription}
        </div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {
            Object
                .keys(profile.contacts)
                .map((key) => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key]}/>
                })}
        </div>
    </div>
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;