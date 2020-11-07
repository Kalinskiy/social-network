import {DialogItemType} from "../components/Dialogs/DialogItem/DialogItem";
import {MessageType} from "../components/Dialogs/Message/Message";
import DimychPhoto from '../assets/dialogs/dimych.jpg'
import valeraPhoto from '../assets/dialogs/valera.jpg'
import valerastPhoto from '../assets/dialogs/valerast.jpg'
import svetaPhoto from '../assets/dialogs/sveta.jpg'
import artemPhoto from '../assets/dialogs/artem.jpg'
import ignatPhoto from '../assets/dialogs/ignat.jpg'


const SEND_MESSAGE = 'SEND-MESSAGE';
let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych', photo:DimychPhoto},
        {id: 2, name: 'Valera', photo:valeraPhoto},
        {id: 3, name: 'Sveta', photo:svetaPhoto},
        {id: 4, name: 'Artem', photo:artemPhoto},
        {id: 5, name: 'Valera', photo:valerastPhoto},
        {id: 6, name: 'Ignat', photo:ignatPhoto},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'},
        {id: 6, message: 'yo'},
    ],

};
//----------------------------------------------------------------------------------------------------------------------
//Types
type dialogsStateType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageType>

}
export type sendMessageCreatorType = {
    newMessageBody: string
    type: 'SEND-MESSAGE'
}
export type updateNewMessageBodyCreatorType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}
type ActionsType = sendMessageCreatorType | updateNewMessageBodyCreatorType

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const dialogsReducer = (state: dialogsStateType = initialState, action: ActionsType): dialogsStateType => {


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

//----------------------------------------------------------------------------------------------------------------------
//Actions
export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({
    type: SEND_MESSAGE,
    newMessageBody
});


export default dialogsReducer;
