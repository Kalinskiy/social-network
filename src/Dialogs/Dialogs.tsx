import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {MessageType} from './Message/Message'




type DialogsItemsType = {
    id: number
    name: string
}
const Dialogs = (props: DialogsItemsType) => {
    let dialogsData: Array<DialogsItemsType> = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Sasha'},
        {id: 3, name: 'Andrey'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'}
    ]
    let dialogsElements = dialogsData.map((d) =>
        <DialogItem name={d.name} id={d.id}/>);

    let messageData: Array<MessageType> = [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you doing?'},
        {id: 3, message: 'YO YO YO'},
        {id: 4, message: 'here is too'},
        {id: 5, message: 'Here is something else'},
        {id: 6, message: 'Yo'},
    ]
    let messagesElements = messageData.map(m => <Message message={m.message} id={m.id}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>
            <div className={s.messages}>
                {messagesElements} {/*рефакторинг через метод массива map*/}


            </div>
        </div>
    )
}

export default Dialogs;