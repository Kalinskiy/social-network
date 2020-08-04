import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";




export type newPostType = {
    id: number,
    message: string,
    likesCount: number,



}
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
    dispatch(action: any) {//{type 'ADD-POST'}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);


        this._callSubscriber(this._state);


    }
}






export default store;
