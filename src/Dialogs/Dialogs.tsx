import React from "react";
import s from './Dialogs.module.css'
import Message, {MessageType} from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";


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
    updateNewMessageBody:(body:string)=>void
    sendMessage:()=>void
    dialogsPage:any


}
export const Dialogs = (props: any) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d: any) => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.message.map((m: any) => <Message message={m.message}
    />);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
       props.sendMessage();

    };
    let onNewMessageChange = (e: any) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);


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
                    <div>
                        <textarea
                            onChange={onNewMessageChange}
                            value={newMessageBody}
                            placeholder={'enter your message here...'}


                        />
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dialogs;