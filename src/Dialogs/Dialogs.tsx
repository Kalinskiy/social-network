import React from "react";
import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {MessageType} from './Message/Message'
import {sendMessageCreator, updateNewMessageBodyCreator} from "../redux/state";


export type DialogsItemsType = {
    id: number
    name: string
}
export type IProps = {
    dialogs: Array<DialogsItemsType>
    message: Array<MessageType>
    newMessageBody: string
}
export type PropsDialogs = {
    store: any;
    state: IProps
}
export const Dialogs = (props: PropsDialogs) => {
    let state = props.store.getState().dialogsPage;


    let dialogsElements =  state.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements =  state.message.map(m => <Message message={m.message} id={m.id}/>);

    let newMessageBody =  state.newMessageBody;
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator);
    };
    let onNewMessageChange = (e:any) => {
        let body = e.target.value;
         props.store.dispatch(updateNewMessageBodyCreator(body));
    };

    return (

        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements} {/*рефакторинг через метод массива map*/}

            </div>
            <div className={s.messages}>

                <div>{messagesElements} </div>
                {/*рефакторинг через метод массива map*/}
                <div>
                    <div><textarea
                        onChange={onNewMessageChange}
                        value={newMessageBody}
                        placeholder={'enter your message here...'}
                    ></textarea> </div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>

                </div>
            </div>
        </div>
    )
}

export default Dialogs;