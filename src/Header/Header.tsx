import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props: any) => {
    const divLog = props.login + ' ' + props.email
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/be/Lineage_OS_Logo.png"
            />
            <div className={s.loginBlock}>
                { props.isAuth ?divLog  : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
}
export default Header;

