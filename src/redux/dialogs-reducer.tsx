import {MessageType} from '../components/Dialogs/Message/Message';
import DimychPhoto from '../assets/dialogs/dimych.jpg'
import valeraPhoto from '../assets/dialogs/valera.jpg'
import valerastPhoto from '../assets/dialogs/valerast.jpg'
import svetaPhoto from '../assets/dialogs/sveta.jpg'
import artemPhoto from '../assets/dialogs/artem.jpg'
import ignatPhoto from '../assets/dialogs/ignat.jpg'
import {InferActionsTypes} from "./redux-store";
import {actions as appAction} from "./app-reducer";


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
export type ActionType = InferActionsTypes<typeof actions & typeof appAction>


//----------------------------------------------------------------------------------------------------------------------
//Reducer
const dialogsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {


    switch (action.type) {
        case 'SEND_MESSAGE':
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
export const actions = {
    sendMessage: (newMessageBody: string) => ({
        type: 'SEND_MESSAGE',
        payload: {newMessageBody}
    } as const)
}


export default dialogsReducer;
