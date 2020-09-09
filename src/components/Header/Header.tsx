import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props: any) => {



    const logInfo = 'ID ' +props.userId + ' ' + props.login
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/be/Lineage_OS_Logo.png"
            />
            <div className={s.loginBlock}>
                { props.isAuth ? <div>{logInfo} - <button onClick={props.logout}>Log out</button></div>: <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
}
export default Header;

