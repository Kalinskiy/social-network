import {MessageType} from '../components/Dialogs/Message/Message';
import DimychPhoto from '../assets/dialogs/dimych.jpg'
import valeraPhoto from '../assets/dialogs/valera.jpg'
import valerastPhoto from '../assets/dialogs/valerast.jpg'
import svetaPhoto from '../assets/dialogs/sveta.jpg'
import artemPhoto from '../assets/dialogs/artem.jpg'
import ignatPhoto from '../assets/dialogs/ignat.jpg'


const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych', photo: DimychPhoto},
        {id: 2, name: 'Valera', photo: valeraPhoto},
        {id: 3, name: 'Sveta', photo: svetaPhoto},
        {id: 4, name: 'Artem', photo: artemPhoto},
        {id: 5, name: 'Valera', photo: valerastPhoto},
        {id: 6, name: 'Ignat', photo: ignatPhoto},
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
export type DialogItemType = {
    id: number
    name: string
    photo: string
}

export type InitialStateType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageType>
}
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

export type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE
    payload: {
        newMessageBody: string
    }
}
export type updateNewMessageBodyCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE_BODY
    body: string
}
type ActionsType = sendMessageCreatorType | updateNewMessageBodyCreatorType

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {
        case SEND_MESSAGE:
            const body = action.payload.newMessageBody;
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
export const sendMessageCreatorAC = (newMessageBody: string): sendMessageCreatorType => ({
    type: SEND_MESSAGE,
    payload: {newMessageBody}
});

export default dialogsReducer;
