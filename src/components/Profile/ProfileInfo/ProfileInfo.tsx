import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type PropsType = {
    profile: any
    status: string
    updateStatus: string
}
const ProfileInfo = ({profile, status, updateStatus}: PropsType) => {


    if (!profile) {
        return <Preloader/>
    }

    return (

        <div>

            <div className={s.mainPicture}>
                <img
                    src="https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg"
                    alt=""/>

            </div>

            <div className={s.desciptionBlock}>

                <img className={s.ava}
                     src={profile.photos.large || 'https://img.icons8.com/officel/2x/person-male.png'}/>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>Job: {profile.lookingForAJob}</div>
                <div>Description: {profile.lookingForAJobDescription}</div>
                <div>FullName: {profile.fullName}</div>
                <div>Contacts:
                    <div>
                        <div> github: {profile.contacts.github} </div>
                        <div> VK: {profile.contacts.vk}</div>
                        <div> facebook: {profile.contacts.facebook}</div>
                        <div> instagram: {profile.contacts.instagram}</div>
                    </div>
                </div>


            </div>

        </div>
    )
}
export default ProfileInfo;