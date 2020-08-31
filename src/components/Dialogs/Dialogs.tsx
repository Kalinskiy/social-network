import React, {ChangeEvent} from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

import {Redirect} from "react-router-dom";
import  {Field,reduxForm} from "redux-form";


export const Dialogs = (props: any) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map((m: any) => <Message message={m.message}
    />);

    let newMessageBody = state.newMessageBody;


    let addNewMessage = (values:any) => {
        props.sendMessage(values.newMessageBody)

    };
    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (

        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements} {/*рефакторинг через метод массива map*/}

            </div>
            <div className={s.messages}>

                <div>{messagesElements} </div>
                {/*рефакторинг через метод массива map*/}
                <AddMessageFormRedux onSubmit={addNewMessage}/>         {/*форма отправки сообщения через redux-form*/}
            </div>
        </div>
    )
}

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message here'}/></div>
            <div>
                <button>Send</button>
            </div>

        </form>
    )
}

const AddMessageFormRedux = reduxForm({form:'dialogAddMessageForm'})(AddMessageForm)
export default Dialogs;