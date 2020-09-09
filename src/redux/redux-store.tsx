import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import newsReducer from "./news-reducer";
import appReducer from "./app-reducer";

const reducers = combineReducers({

    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage:usersReducer,
    auth: authReducer,
    news:newsReducer,
    app:appReducer,
    form: formReducer

})


export type AppStoreType = ReturnType<typeof reducers>


let store = createStore(reducers,applyMiddleware(thunkMiddleWare));





export default store;
