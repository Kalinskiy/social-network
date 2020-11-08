import React, {useEffect} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from '../../assets/icons/logo.png'
import {useSelector} from "react-redux";

const Header = (props: any) => {
    // @ts-ignore
    const isAuth = useSelector(state => state.auth.isAuth)
    useEffect(() => {

    }, [props.logout])

    const logInfo = 'ID ' + props.userId + ' ' + props.login
    return (

        <header className={s.header}>
            <div className={s.logo}>
                <NavLink to={'/profile'}>
                    <img src={logo}/>
                </NavLink>
                {/*{isAuth && <Redirect to={'/login'}/>}*/}
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>
                        <button onClick={props.logout}>Log out</button>
                    </div> :
                    <NavLink to={'/login'}>
                        <button>Login</button>
                    </NavLink>}
            </div>

        </header>

    )
}
export default Header;

