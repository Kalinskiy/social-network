import {AppStoreType} from "../../../../../redux/redux-store";
import {ProfileType} from "../../../row1/Avatar/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {saveProfile} from "../../../../../redux/profile-reducer";
import style from './ProfileDataForm.module.css'
import React from "react";


type PropsType = {
    profile: ProfileType
    onSubmit: (profile: ProfileType) => void
    onCancel: (editMode: boolean) => void
}

export const ProfileDataForm = (props: any) => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {github, twitter, facebook, instagram, mainLink} = useSelector<AppStoreType>(state => state.profilePage.profile.contacts)
// @ts-ignore
    const {fullName, aboutMe, lookingForAJobDescription, lookingForAJob} = useSelector<AppStoreType, any>(state => state.profilePage.profile)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            FullName: fullName,
            AboutMe: aboutMe,
            lookingForAJobDescription: lookingForAJobDescription,
            lookingForAJob: lookingForAJob,
            instagram: instagram,
            twitter: twitter,
            linkedIn: mainLink,
            facebook: facebook,
            gitHub: github,


        },
        onSubmit: values => {
            let obj = {
                FullName: values.FullName,
                AboutMe: values.AboutMe,
                lookingForAJobDescription: values.lookingForAJobDescription,
                lookingForAJob: values.lookingForAJob,
                contacts: {
                    instagram: values.instagram,
                    twitter: values.twitter,
                    linkedIn: values.linkedIn,
                    facebook: values.facebook,
                    gitHub: values.gitHub,
                }
            }
            dispatch(saveProfile(obj))
            dispatch(props.onCancel)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className={style.element}>
                <div className={style.title}>Change you'r name</div>
                <input className={style.input} type={'text'}
                       {...formik.getFieldProps('FullName')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>About me</div>
                <textarea
                    {...formik.getFieldProps('AboutMe')}
                />
            </div>

            <div className={`${style.element} ${style.checkBoxElement}`}>
                <div className={style.title}>Are you looking for job?</div>
                <input className={style.checkbox} type={'checkbox'}
                       {...formik.getFieldProps('lookingForAJob')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Describe your skills</div>
                <textarea
                    {...formik.getFieldProps('lookingForAJobDescription')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Instagram</div>
                <input className={style.input} type={'text'}
                       {...formik.getFieldProps('instagram')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Twitter</div>
                <input className={style.input} type={'text'}
                       {...formik.getFieldProps('twitter')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>LinkedIn</div>
                <input className={style.input} type={'text'}
                       {...formik.getFieldProps('linkedIn')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>Facebook</div>
                <input className={style.input} type={'text'}
                       {...formik.getFieldProps('facebook')}
                />
            </div>

            <div className={style.element}>
                <div className={style.title}>GitHub</div>
                <input className={style.input} type={'text'}
                       {...formik.getFieldProps('gitHub')}
                />
            </div>


            <div className={style.button}>
                <button >Send</button>
            </div>
        </form>
    )
}