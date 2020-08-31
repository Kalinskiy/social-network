import {DialogItemType} from "../components/Dialogs/DialogItem/DialogItem";
import {MessageType} from "../components/Dialogs/Message/Message";


const SEND_MESSAGE = 'SEND-MESSAGE';

type dialogsStateType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageType>

}
export type sendMessageCreatorType ={
    newMessageBody:string
    type:'SEND-MESSAGE'
}
export type updateNewMessageBodyCreatorType ={
    type:'UPDATE-NEW-MESSAGE-BODY'
    body:string
}
type ActionsType =  sendMessageCreatorType | updateNewMessageBodyCreatorType

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'how is your it-kamasutra'},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'}, {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'},
    ],

};


const dialogsReducer = (state: dialogsStateType = initialState, action: ActionsType):dialogsStateType => {


    switch (action.type) {


        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;

    }
}


export const sendMessageCreator = (newMessageBody: string):sendMessageCreatorType => ({type: SEND_MESSAGE, newMessageBody});



export default dialogsReducer;
