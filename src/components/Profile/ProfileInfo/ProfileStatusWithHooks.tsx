import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props: any) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const dactivateEditMode = () => {
        setEditMode(false)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
        props.updateStatus(status)
    }
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    return <>
        {!editMode &&
        <div>
            <span
                onDoubleClick={activateEditMode}>
                {props.status || '---'}</span>
        </div>
        }
        {editMode &&
        <div>
            <input
                value={status}
                onChange={onStatusChange}
                onBlur={dactivateEditMode}
                autoFocus={true}

            />
        </div>
        }

    </>

}

export default ProfileStatusWithHooks;