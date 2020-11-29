import React, {useState} from "react";
import s from "./AboutProfile.module.css"
import ProfileStatusWithHooks from "./ProfileInfo/Status/ProfileStatusWithHooks";
import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../../types/types";


type AboutProfileType = {
    fullName:string
    profile:ProfileType
    isOwner:boolean
    saveProfile: (profile: ProfileType) => void
    status:string
    updateStatus:(status:string)=>void
}
export const AboutProfile = (props: AboutProfileType) => {
    const [editMode, setEditMode] = useState(false)
    const onCancel = ()=>{
        setEditMode(false)
    }
    return <>
        <div className={s.edit}>
                    <span className={s.fullName}>
                        {props.fullName}
                    </span>
            <div className={s.status}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>

            {editMode
                ? <ProfileDataForm profile={props.profile}   onSubmit={props.saveProfile} onCancel={onCancel} />
                : <ProfileData goToEditMode={() => {setEditMode(true)
                }}
                               profile={props.profile} isOwner={props.isOwner}
                />}
        </div>
    </>

}

