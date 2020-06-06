import React from 'react';

import './App.css';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";

import Dialogs from "./Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";
import store from "./redux/state";


const App = (props: any) => {
    debugger


    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>

                    <Route path='/profile'
                           render={() => <Profile
                               profilePage={props.state.profilePage}
                               dispatch={props.dispatch}
                               store={props.store}

                           />}
                    />
                    <Route path='/dialogs'
                           render={() => <Dialogs
                               store={props.store}
                           />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>


                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;



