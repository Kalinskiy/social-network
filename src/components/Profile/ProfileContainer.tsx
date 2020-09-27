import React from 'react';
import {IPost} from "./MyPosts/MyPosts";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppStoreType} from "../../redux/redux-store";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';


export type PropsType = {
    // profilePage: ProfileType
    //  dispatch:any
    store: any
}
export type ProfileType = {
    posts: Array<IPost>
    newPostText: string
}

class ProfileContainer extends React.Component<any> {

    componentDidMount(): void {

        let userId = this.props.match.params.userId;
        if (!userId) {
           userId = this.props.authorizedUserId;
           if(!userId){
               this.props.history.push('/login')
           }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {

        return (
            < Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}/>

        )
    }
}

const mapStateToProps = (state: AppStoreType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth


})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    // WithAuthRedirect,
)(ProfileContainer)