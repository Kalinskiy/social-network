import {IPost} from '../Profile/MyPosts/MyPosts';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: '1'},
                {id: 2, message: 'It`s my first post', likesCount: '5'},
                {id: 3, message: 'Third one', likesCount: '9'},
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Andrey'},
                {id: 4, name: 'Sveta'},
                {id: 5, name: 'Victor'},
                {id: 6, name: 'Valera'}
            ],
            message: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'How are you doing?'},
                {id: 3, message: 'YO YO YO'},
                {id: 4, message: 'here is too'},
                {id: 5, message: 'Here is something else'},
                {id: 6, message: 'Yo'},
            ],
                newMessageBody: '',
        },

    },
    _callSubscriber(state: any) {
        console.log('state has been changed')
    },

    getState() {

        return this._state;
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },


    dispatch(action: any) { //{type 'ADD-POST'}

        if (action.type === ADD_POST) {
            let newPost: IPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: '0'
            };

            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state)
        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.dialogsPage.newMessageBody
            this._state.dialogsPage.newMessageBody = '';
            this._state.dialogsPage.message.push({id:6, message: body})
            this._callSubscriber(this._state)
        }

    },
}


export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const sendMessageCreator = ()=>({type: SEND_MESSAGE});
export const updateNewMessageBodyCreator = (body:string)=>
    ({type:UPDATE_NEW_MESSAGE_BODY, body:body})


export default store;
