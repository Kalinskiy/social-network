import React from "react";
import styles from './FormControls.module.css'
import {Field} from "redux-form";
import {required} from "../../../utilities/validators/validators";


// @ts-ignore
const FormControl = ({input, meta:{touched,error},children}) => {
    const hasErorr =  touched &&  error

    return (
        <div className={styles.formControl + ' ' + (hasErorr ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasErorr && <span>{error}</span>}


        </div>
    )
}


export const TextArea = (props: any) => {
    const {input, meta, child, ...restProps} = props

    return <FormControl {...props}><textarea  {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props

    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
export const createField = (placeholder: any, name: any, validators: any, component: any,props = {},text='') => (
    <div>
        <Field
            component={component}
            placeholder={placeholder}
            name={name}
            validate={validators}
            {...props}
        />{text}
    </div>
)