import React from "react";
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/FormsControls/FormControls";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import common from '../common/FormsControls/FormControls.module.css'

const LoginForm = (props: any) => {

    return <>

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Input}
                    placeholder={'Email'}
                    name={'email'}
                    validate={[required]}

                />
            </div>
            <div>
                <Field
                    component={Input}
                    placeholder={'Password'}
                    name={'password'}
                    validate={[required]}
                    type={'password'}

                />
            </div>
            <div>
                <Field
                    component={Input}
                    type={'checkbox'}
                    name={'rememberMe'}


                /> remember me
            </div>
            {props.error?<div className={common.formSummaryError}>{props.error}</div>:''}
            <div>
                <button>Login</button>
            </div>
        </form>
    </>


}


const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props: any) => {

    const onSubmit = (formdata: any) => {
        props.login(formdata.email, formdata.password, formdata.rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login, logout})(Login)