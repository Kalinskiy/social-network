import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {saveProfile, UpdateProfileType} from "../../../../../redux/profile-reducer";
import style from "./ProfileDataForm.module.css"
import React from "react";
import {ProfileType} from "../../../../../types/types";


type PropsType = {
    profile: ProfileType
    onSubmit: (profile: ProfileType) => void
    onCancel: (editMode: boolean) => void
}

export const ProfileDataForm:React.FC<PropsType> = ({profile, onCancel}) => {

    const dispatch = useDispatch()


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            lookingForAJob: profile.lookingForAJob,
            github: profile.contacts.github,
            vk: profile.contacts.vk,
            facebook: profile.contacts.facebook,
            instagram: profile.contacts.instagram,
            twitter: profile.contacts.twitter,
            website: profile.contacts.website,
            youtube: profile.contacts.youtube,
            mainLink: profile.contacts.mainLink,


        },
        onSubmit: values => {
            let obj: UpdateProfileType = {
                fullName: values.fullName,
                aboutMe: values.aboutMe,
                lookingForAJobDescription: values.lookingForAJobDescription,
                lookingForAJob: values.lookingForAJob,
                contacts: {
                    github: values.github,
                    vk: values.vk,
                    facebook: values.facebook,
                    instagram: values.instagram,
                    twitter: values.twitter,
                    website: values.youtube,
                    mainLink: values.mainLink,
                    youtube: values.youtube
                },
            }

            dispatch(saveProfile(obj))
            dispatch(onCancel)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className={style.element}>
                <div className={style.title}>Change you`r name</div>
                <input className={style.input} type={"text"}
                       {...formik.getFieldProps("fullName")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>About me</div>
                <textarea
                    {...formik.getFieldProps("aboutMe")}
                />
            </div>

            <div className={`${style.element} ${style.checkBoxElement}`}>
                <div className={style.title}>Are you looking for job?</div>
                <input className={style.checkbox} type={"checkbox"}
                       {...formik.getFieldProps("lookingForAJob")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Describe your skills</div>
                <textarea
                    {...formik.getFieldProps("lookingForAJobDescription")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Instagram</div>
                <input className={style.input} type={"text"}
                       {...formik.getFieldProps("instagram")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Twitter</div>
                <input className={style.input} type={"text"}
                       {...formik.getFieldProps("twitter")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>LinkedIn</div>
                <input className={style.input} type={"text"}
                       {...formik.getFieldProps("linkedIn")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Facebook</div>
                <input className={style.input} type={"text"}
                       {...formik.getFieldProps("facebook")}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>GitHub</div>
                <input className={style.input} type={"text"}
                       {...formik.getFieldProps("github")}
                />
            </div>


            <div className={style.button}>
                <button>Send</button>
            </div>
        </form>
    )
}