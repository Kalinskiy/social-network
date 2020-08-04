import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../redux/auth-reducer";


class HeaderContainer extends React.Component {
    componentDidMount(): void {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials:true
        }).then((response: any) => {


             if(response.data.resultCode === 0 ){
                 let {id, login, email} = response.data.data;

                 // @ts-ignore
                 this.props.setAuthUserData(id, email, login);
             }
        });
    }

    render() {


        return (
            <Header {...this.props}/>
        )
    }


}
const mapStateToProps  = (state:any) => ({

    isAuth: state.auth.isAuth,
    login: state.auth.login,


})
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);
