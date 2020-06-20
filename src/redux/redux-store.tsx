import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

export type AppStoreType = ReturnType<typeof reducers>


const reducers = combineReducers({

    dialogsPage: dialogsReducer,
    profilePage: profileReducer
})
let store = createStore(reducers);




export default store;
