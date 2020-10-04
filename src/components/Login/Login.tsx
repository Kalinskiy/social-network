import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormControls";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import common from '../common/FormsControls/FormControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


const LoginForm = ({handleSubmit, error, captchaUrl}: any) => {

    return <>
        <form onSubmit={handleSubmit}>

            {createField('Email', 'email', [required], Input, {})}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Type symbols here...', 'captcha', [required], Input, {})}

            {
                error && <div className={common.formSummaryError}>
                    {error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    </>
}


const LoginReduxForm = reduxForm<FormDataType, { captchaUrl: string }>({form: 'login'})(LoginForm)


const Login = (props: any) => {

    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}
                        captchaUrl={props.captchaUrl || ''}/>
    </div>
}
const mapStateToProps = (state: any) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login, logout})(Login)