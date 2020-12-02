import React from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

import {Redirect} from "react-router-dom";
import AddMessageForm from "./Message/AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs-reducer";


type OwnPropsType = {
    dialogsPage: InitialStateType,
    sendMessage: (value: string) => void

}
export type NewMessageFormType = {
    newMessageBody: string
}


export const Dialogs: React.FC<OwnPropsType> = (props) => {
    let state = props.dialogsPage;


    let dialogsElements = state.dialogs.map((d) => {
        return <DialogItem
            key={d.id}
            name={d.name}
            id={d.id}
            photo={d.photo}/>
    })

    let messagesElements = state.messages.map((m) => <Message key={m.id} message={m.message}
    />);


    let addNewMessage = (values: { newMessageBody: string }) => {
        props.sendMessage(values.newMessageBody)
        props.sendMessage(' ')



    };



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