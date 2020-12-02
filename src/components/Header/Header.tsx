import React, {useEffect} from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import logo from "../../assets/icons/logo.png"

export type MapPropsType = {
    isAuth: boolean
    login: string | null
    userId:number | null
    email:string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {


    useEffect(() => {

    }, [props.logout])

    const logInfo = "ID " + props.userId + " " + props.login
    return (

        <header className={s.header}>
            <div className={s.logo}>
                <NavLink to={"/profile"}>
                    <img src={logo}/>
                </NavLink>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>
                        <button onClick={props.logout}>Log out</button>
                    </div> :
                    <NavLink to={"/login"}>
                        <button>Login</button>
                    </NavLink>}
            </div>

        </header>

    )
}
export default Header;

