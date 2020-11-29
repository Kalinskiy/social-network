import React, {ChangeEvent, useEffect, useState} from "react";

const ProfileStatusWithHooks = (props: any) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return <>
        {!editMode &&
        <div>
            <span
                onDoubleClick={activateEditMode}>
                {props.status || "---"}</span>
        </div>
        }
        {editMode &&
        <div>
            <input
                value={status}
                onChange={onStatusChange}
                onBlur={deactivateEditMode}
                autoFocus={true}

            />
        </div>
        }

    </>

}

export default ProfileStatusWithHooks;