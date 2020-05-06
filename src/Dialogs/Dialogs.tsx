import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type DialogItemType ={
    id:string
    name: string
}

const DialogItem = (props:DialogItemType) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>

    )
}
type MessageType = {
    message: string
}
const Message = (props: MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

type DialogsItemsType = {
    name: string
    id: string
}


const Dialogs = (props: DialogsItemsType) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={props.name} id={props.id}/>
                <DialogItem name='Sasha' id='2'/>
                <DialogItem name='Andrey' id='3'/>
                <DialogItem name='Sveta' id='4'/>
                <DialogItem name='Victor' id='5'/>
                <DialogItem name='Valera' id='6'/>

            </div>
            <div className={s.messages}>
                <Message message='Hello'/>
                <Message message='How are you doing?'/>
                <Message message='How is your IT-KAMASUTRA'/>

            </div>
        </div>
    )
}

export default Dialogs;