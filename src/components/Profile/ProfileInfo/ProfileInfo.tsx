import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import {updateStatus} from "../../../redux/profile-reducer";

type PropsType = {
    profile: any
    status: string
    updateStatus:string
}
const ProfileInfo = (props: PropsType) => {


    if (!props.profile) {
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
        
                <img className={s.ava} src={props.profile.photos.large || 'https://img.icons8.com/officel/2x/person-male.png' }/>

                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div>Job: {props.profile.lookingForAJob}</div>
                <div>Description: {props.profile.lookingForAJobDescription}</div>
                <div>FullName: {props.profile.fullName}</div>
                <div>Contacts:
                    <div>
                        <div> github: {props.profile.contacts.github} </div>
                        <div> VK: {props.profile.contacts.vk}</div>
                        <div> facebook: {props.profile.contacts.facebook}</div>
                        <div> instagram: {props.profile.contacts.instagram}</div>
                    </div>
                </div>


            </div>

        </div>
    )
}
export default ProfileInfo;