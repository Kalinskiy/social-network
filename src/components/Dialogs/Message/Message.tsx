import React from "react";
import s from '../Dialogs.module.css';


export type MessageType = {
    id?: number
    message: string


}
const Message = (props: MessageType) => {


    let newMessageElement: any = React.createRef()
    let sendMessage = () => {
        let text = newMessageElement.current.value;
        alert(text);
    }
    return (
        <div className={s.message}>
            <span  ref={newMessageElement}>{props.message}</span>




        </div>
    )
}


export default Message;