import React from "react";
import  {reduxForm,Field} from "redux-form";

const LoginForm = (props: any) => {

    return <>

        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'}  name={'login'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'checkbox'} component={'input'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </>


}


// @ts-ignore
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


const Login = (props: any) => {

// all numbers more than 22


    const onSubmit = (formdata:any)=>{
        console.log(formdata);
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login