import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

export type AppStoreType = ReturnType<typeof reducers>

const reducers = combineReducers({

    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage:usersReducer,
    auth: authReducer
})


let store = createStore(reducers);




export default store;
