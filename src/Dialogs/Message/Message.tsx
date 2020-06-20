import React from "react";
import s from '../Dialogs.module.css';


export type MessageType = {
    message: string



}
const Message = (props: MessageType) => {


    let newMessageElement: any = React.createRef()
    let sendMessage = () => {
        let text = newMessageElement.current.value;
        alert(text);
    }
    return (
        <div className={s.message}><textarea ref={newMessageElement}>{props.message}</textarea>
            <button onClick={sendMessage}>Send</button>

        </div>
    )
}


export default Message;