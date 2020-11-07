import React, {useState} from "react";
import s from './AboutProfile.module.css'
import ProfileStatusWithHooks from "./ProfileInfo/Status/ProfileStatusWithHooks";
import {updateStatus} from "../../../../redux/profile-reducer";
import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../row1/Avatar/Avatar";

type AboutProfileType = {
    fullName:string
    profile:ProfileType
    isOwner:boolean
    saveProfile: (profile: ProfileType) => void
    status:string
}
export const AboutProfile = (props: AboutProfileType) => {
    const [editMode, setEditMode] = useState(false)
    return <>
        <div className={s.edit}>
                    <span className={s.fullName}>
                        {props.fullName}
                    </span>
            <div className={s.status}>
                <ProfileStatusWithHooks status={props.status} updateStatus={updateStatus}/>
            </div>

            {editMode
                ? <ProfileDataForm profile={props.profile}   onSubmit={props.saveProfile} />
                : <ProfileData goToEditMode={() => {setEditMode(true)
                }}
                               profile={props.profile} isOwner={props.isOwner}
                />}
        </div>
    </>

}

