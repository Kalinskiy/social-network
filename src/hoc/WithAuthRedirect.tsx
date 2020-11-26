import {Redirect} from "react-router-dom";
import React from "react";
import {AppStoreType} from "../redux/redux-store";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state: AppStoreType) => ({
    isAuth: state.auth.isAuth
})

export const WithAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) return <Redirect to="/login"/>
            return <Component {...this.props}/>
        }
    }

    let ConnectedmapStateToPropsForRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedmapStateToPropsForRedirect;
}
