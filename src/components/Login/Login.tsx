import React, {useEffect} from "react"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeysType, Input} from "../common/FormsControls/FormControls"
import {required} from "../../utilities/validators/validators"
import {connect} from "react-redux"
import {login, logout} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import common from "../common/FormsControls/FormControls.module.css"
import {AppStateType} from "../../redux/redux-store"
import style from './Login.module.css'


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    useEffect(() => {
    }, [])

    return <div className={style.loginForm}>
        <form onSubmit={handleSubmit}>

            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input, {})}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}

            {createField<LoginFormValuesTypeKeys>(' ', "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl} alt=''/>}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Type symbols here...", "captcha", [required], Input, {})}

            {
                error && <div className={common.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeysType<LoginFormValuesType>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }


    return <div className={style.container}>
        <h1 className={style.title}>Login</h1>
        <div className={style.loginContent}></div>
        <LoginReduxForm onSubmit={onSubmit}
                        captchaUrl={props.captchaUrl || ""}/>
    </div>
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login, logout})(Login)