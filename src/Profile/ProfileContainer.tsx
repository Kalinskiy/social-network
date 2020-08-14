import React from 'react';
import {IPost} from "./MyPosts/MyPosts";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppStoreType} from "../redux/redux-store";
import {setUserProfile} from "../redux/profile-reducer";
import {withRouter} from 'react-router-dom';



export type PropsType = {
    // profilePage: ProfileType
    //  dispatch:any
    store:any
}
export type ProfileType = {
    posts: Array<IPost>
    newPostText:string
}

class ProfileContainer extends React.Component<any>{

    componentDidMount(): void {

        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    .then((response: any) => {
            this.props.setUserProfile(response.data);

        });
    }

    render(){
        return (
           < Profile {...this.props} profile={this.props.profile}/>

    )
}
}

const mapStateToProps = (state:AppStoreType) =>({
    profile: state.profilePage.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps,{setUserProfile} ) (WithUrlDataContainerComponent);