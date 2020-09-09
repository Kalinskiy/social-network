import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, required} from "../../../../utilities/validators/validators";
import {TextArea} from "../../../common/FormsControls/FormControls";

const maxLength50 = maxLengthCreator(50)
const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={TextArea}
                        name={'newMessageBody'}
                        placeholder={'Enter your message here'}
                        validate={[required, maxLength50]}
            /></div>
            <div>
                <button>Send</button>
            </div>

        </form>
    )
}
export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)
