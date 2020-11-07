import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import profileIcon from '../../assets/icons/home.png'
import userIcon from '../../assets/icons/user.png'
import messageIcon from '../../assets/icons/message.png'
import settingsIcon from '../../assets/icons/settings.png'
import musicIcon from '../../assets/icons/music.png'



const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>

                <NavLink to='/profile' activeClassName={s.activeLink}>  <img src={profileIcon} alt=""/>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.activeLink}> <img src={userIcon} alt=""/>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' activeClassName={s.activeLink}> <img src={profileIcon} alt=""/>News</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/dialogs' activeClassName={s.activeLink}> <img src={messageIcon} alt=""/>Messages</NavLink>
            </div>

            <div className={s.item}>
                <NavLink to='/music' activeClassName={s.activeLink}> <img src={musicIcon} alt=""/>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' activeClassName={s.activeLink}> <img src={settingsIcon} alt=""/>Settings</NavLink>
            </div>



        </nav>


    )
}
export default Navbar;