import React, {ChangeEvent, useRef} from "react";
import s from "./Avatar.module.css";
import Preloader from "../../../common/Preloader/Preloader";
import userPhoto from "../../../../assets/images/user.png"



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
                        {props.isOwner ? "Your profile is private" : "His profile is private"}
                    </span>
                </div>
    )
}


