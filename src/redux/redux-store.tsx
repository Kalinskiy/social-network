import {combineReducers, createStore, applyMiddleware} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import  thunkMiddleWare  from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({

    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage:usersReducer,
    auth: authReducer,
    form: formReducer

})


export type AppStoreType = ReturnType<typeof reducers>


let store = createStore(reducers,applyMiddleware(thunkMiddleWare));





export default store;
