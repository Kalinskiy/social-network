import React from "react";
import s from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

import {Redirect} from "react-router-dom";
import {reduxForm} from "redux-form";
import AddMessageForm from "./Message/AddMessageForm/AddMessageForm";


export const Dialogs = (props: any) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id} photo={d.photo}/>);
    let messagesElements = state.messages.map((m: any) => <Message message={m.message}
    />);

    let newMessageBody = state.newMessageBody;


    let addNewMessage = (values:any) => {
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
                {/*рефакторинг через метод массива map*/}
                <AddMessageForm  onSubmit={addNewMessage}/>         {/*форма отправки сообщения через redux-form*/}
            </div>
        </div>
    )
}



export default Dialogs;