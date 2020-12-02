import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, required} from "../../../../utilities/validators/validators";
import {createField, Input, TextArea} from "../../../common/FormsControls/FormControls";
import {NewMessageFormType} from "../../Dialogs";


const maxLength50 = maxLengthCreator(50)
export type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength50], Input, {})}
            </div>
            <div>
                <button>Send</button>
            </div>

        </form>
    )
}
export default reduxForm<NewMessageFormType, PropsType>({form: "dialogAddMessageForm"})(AddMessageForm)
