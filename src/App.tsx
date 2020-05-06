import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Dialogs from "./Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Settings/Settings";


const App = (props:any) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/profile' component={Profile}/>
                    <Route /*exact*/ path ='/dialogs' component={Dialogs}/>
                    <Route path ='/news' component={News}/>
                    <Route path ='/music' component={Music}/>
                    <Route path ='/settings' component={Settings}/>

                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;



