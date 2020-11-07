import React from "react";
import s from '../Dialogs.module.css';
import {NavLink} from "react-router-dom";

export type DialogItemType = {
    id: number
    name: string
    photo:any
}

const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path} activeClassName={s.active}><img src={props.photo} alt=""/>{props.name}</NavLink>
        </div>

    )
}





export default DialogItem;