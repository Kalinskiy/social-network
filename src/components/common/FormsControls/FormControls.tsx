import React from "react"
import styles from "./FormControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../utilities/validators/validators"

type FormControlParamsType = {
    meta: WrappedFieldMetaProps
}


const FormControl: React.FC<FormControlParamsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}


        </div>
    )
}


export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    //const {input, meta, child, ...restProps} = props

    return <FormControl {...props}><textarea  {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props

    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}



export function createField<FormKeysType extends string>(placeholder: string,
                                          name: FormKeysType,
                                          validators: Array<FieldValidatorType>,
                                          component: React.FC<WrappedFieldProps>,
                                          props = {},
                                          text = "") {
    return <div>
        <Field
            component={component}
            placeholder={placeholder}
            name={name}
            validate={validators}
            {...props}
        />{text}
    </div>
}