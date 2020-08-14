import {combineReducers, createStore, applyMiddleware} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import  thunkMiddleWare  from 'redux-thunk'

export type AppStoreType = ReturnType<typeof reducers>

const reducers = combineReducers({

    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage:usersReducer,
    auth: authReducer,

})


let store = createStore(reducers,applyMiddleware(thunkMiddleWare));




export default store;
