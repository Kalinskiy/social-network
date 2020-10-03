import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import SamuraiJSApp from './App';


let rerenderEntireTree: any = (state: any) => {

    ReactDOM.render(
       <SamuraiJSApp/>,
        document.getElementById('root')
    );
}


rerenderEntireTree(store.getState());


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


