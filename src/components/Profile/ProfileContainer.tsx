import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";




class ProfileContainer extends React.Component<any> {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount(): void {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot?: any): void {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> :
                    this.props.profile  && < Profile
                        isOwner={!this.props.match.params.userId}
                        {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
                    />
                }
            </>


        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isFetching: state.app.isFetching


})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer)