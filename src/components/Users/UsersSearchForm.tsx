import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;

}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}
export const UsersSearchForm: React.FC<PropsType> = (props) => {

    const term = useSelector<AppStateType, string>(state => state.usersPage.filter.term)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmiting: boolean) => void }) => {
        debugger
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.onFilterChanged(filter)
        // setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={
                {
                    term: term, // type '' if you want to clear input after submit
                    friend: 'null'
                }
            }
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term" placeholder='Find user...'/>
                    <Field name='friend' as='select'>
                        <option value="null">All</option>
                        <option value="true">Only Friends</option>
                        <option value="false">Not friends</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>find</button>
                </Form>
            )}
        </Formik>
    </div>
}