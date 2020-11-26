import React, {Dispatch} from "react";
import {
    sendMessageCreatorAC,
    sendMessageCreatorType,
    updateNewMessageBodyCreatorType
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStoreType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


type mapDispatchToPropsType = sendMessageCreatorType | updateNewMessageBodyCreatorType

let mapStateToProps = (state: AppStoreType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch<mapDispatchToPropsType>) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreatorAC(newMessageBody));
        },


    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);


