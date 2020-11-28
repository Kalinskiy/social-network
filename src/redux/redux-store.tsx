import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form"
import newsReducer from "./news-reducer";
import appReducer from "./app-reducer";
import {friendsReducer} from "./friends-reducer";

const rootReducer = combineReducers({

    dialogsPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    news: newsReducer,
    app: appReducer,
    friends:friendsReducer,
    form: formReducer

})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhancers (applyMiddleware(thunkMiddleWare)))

// @ts-ignore
window.store =  store




export default store
