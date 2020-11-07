import React from "react";
import {createField, Input, TextArea} from "../../common/FormsControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "./ProfileInfo";
import common from "../../common/FormsControls/FormControls.module.css";


type PropsType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>


        {error && <div className={common.formSummaryError}>{error}</div>}
        <div>
            <b>FullName:</b>{createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job:</b>{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>My skills:</b>{createField('Type skills here...', 'lookingForAJobDescription', [], TextArea)}
        </div>
        <div>
            <b>About me:</b>{createField('About me', 'aboutMe', [], TextArea)}
        </div>

        <div>
            <b>Contacts:</b>
            {Object.keys(profile.contacts).map((key: any) => {
                return <div key={key}>
                    <b>{key}</b>
                    {createField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
        </div>
        <button>save</button>
    </form>
}
const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm