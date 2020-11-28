import React from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

import {Redirect} from "react-router-dom";
import AddMessageForm from "./Message/AddMessageForm/AddMessageForm";

type DialogItemType = {
    id: number
    name: string
    photo: string
}

type MessageItemType = {
    id: number
    message: string
}
type DialogPage = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageItemType>
}
type PropsType = {
    dialogsPage: DialogPage
    sendMessage: (newMessageBody: string) => void
    isAuth:boolean
}

export const Dialogs = (props: PropsType) => {
    let state = props.dialogsPage;


    let dialogsElements = state.dialogs.map((d: DialogItemType) => <DialogItem key={d.id} name={d.name} id={d.id}
                                                                               photo={d.photo}/>);
    let messagesElements = state.messages.map((m: MessageItemType) => <Message key={m.id} message={m.message}
    />);


    let addNewMessage = (values: any) => {
        console.log(values)
        props.sendMessage(values.newMessageBody)
    };

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>
    }

    return (

        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements} {/*рефакторинг через метод массива map*/}
            </div>
            <div className={s.messages}>

                <div>{messagesElements} </div>
                <AddMessageForm onSubmit={addNewMessage}/> {/*форма отправки сообщения через redux-form*/}
            </div>
        </div>
    )
}


export default Dialogs;