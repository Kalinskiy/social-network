import React from "react";
import {MessageType} from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";


export type DialogsItemsType = {
    id: number
    name: string
}
export type IProps = {
    dialogs: Array<DialogsItemsType>
    message: Array<MessageType>
    newMessageBody: string


}

// export const DialogsContainer = () => {
//
//
//     return (
//         <StoreContext.Consumer>
//             {(store: any) => {
//                 let state = store.getState().dialogsPage;
//
//
//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator());
//
//                 };
//                 let onNewMessageChange = (body: string) => {
//
//                     store.dispatch(updateNewMessageBodyCreator(body));
//
//                 };
//
//                 return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick}
//                                 dialogsPage={state}/>
//             }
//
//             }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state: any) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (body: any) => {
            dispatch(updateNewMessageBodyCreator(body))
        },

    }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

