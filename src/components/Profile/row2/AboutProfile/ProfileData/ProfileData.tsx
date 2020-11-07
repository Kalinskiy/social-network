import React, {useState} from "react";
import s from "../../../row1/Avatar/Avatar.module.css";
import edit from "../../../../../assets/icons/edit.png";
import vkImg from '../../../../../assets/icons/contacts/vk.png'
import facebookImg from '../../../../../assets/icons/contacts/facebook.png'
import instagramImg from '../../../../../assets/icons/contacts/instagram.png'
import githubImg from '../../../../../assets/icons/contacts/github.png'
import youtubeImg from '../../../../../assets/icons/contacts/youtube.png'


type ProfileDataPropsType = {
    profile: any
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData: React.FC<ProfileDataPropsType> = (props: ProfileDataPropsType) => {
    console.log(props.profile.contacts)

    const [isBlockOpen, setIsBlockOpen] = useState(true)

    const fetchFullInformation = () => {
        setIsBlockOpen(!isBlockOpen)
    }

    return <>

        <div className={s.editInfo}>
            {
                <div className={s.showInfo}>
                    <div className={s.showFullInformation} onClick={fetchFullInformation}>
                        {props.isOwner && isBlockOpen && <div>
                            <div className={s.editBlock} onClick={props.goToEditMode}>
                                <img src={edit} alt=""/>
                            </div>
                        </div>}
                        {isBlockOpen && 'Hide full information'}
                        {!isBlockOpen && 'Show full information'}
                    </div>
                    {
                        isBlockOpen &&
                        <div>
                            <div className={s.descriptionLine}>
                                Looking for a job: {props.profile.lookingForAJob ? "yes" : "no"}
                            </div>
                            {
                                props.profile.lookingForAJob && //if checked - true, then will be displayed my skills
                                <div className={s.descriptionLine}>
                                    My skills: {props.profile.lookingForAJobDescription}
                                </div>
                            }
                            <div className={s.descriptionLine}>
                                About me:{props.profile.aboutMe}
                            </div>

                            <div className={s.contacts}>
                                <div className={s.contactItem}>
                                    <a href={props.profile.contacts.vk} target="_blank">
                                        <img src={vkImg} alt=''/>
                                    </a>
                                </div>
                                <div className={s.contactItem}>
                                    <a href={props.profile.contacts.facebook} target="_blank">
                                        <img src={facebookImg} alt=''/>
                                    </a>
                                </div>
                                <div className={s.contactItem}>
                                    <a href={props.profile.contacts.instagram} target="_blank">
                                        <img src={instagramImg}
                                             alt=''/>
                                    </a>
                                </div>
                                <div className={s.contactItem}>
                                    <a href={props.profile.contacts.github} target="_blank">
                                        <img src={githubImg} alt=''/>
                                    </a>
                                </div>
                                <div className={s.contactItem}>
                                    <a href='#' target="_blank">
                                        <img src={youtubeImg} alt=''/>
                                    </a>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    </>
}


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}


