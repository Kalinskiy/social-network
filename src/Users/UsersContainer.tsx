import React from "react";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    toggleIsFetchingAC,
    unfollowAC
} from "../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import preloader from "../assets/images/loader.svg";
import Preloader from "../components/common/preloader/Preloader";

type MapStatePropsType = {
    users: Array<any>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    toggleIsFetching:(isFetching:boolean)=>void
    isFetching:boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<any>) => void
    setTotalUsersCount: (count: number) => void



}

class UsersContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    componentDidMount(): void {

        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=
        ${this.props.currentPage}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        });


    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=
        ${pageNumber}&count=${this.props.pageSize}`).then((response: any) => {

            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
        });
    }


    render() {




        return <>
            {this.props.isFetching ? <Preloader/>: null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.follow}

            />
        </>


    }

}

let mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching

    }
}

let mapDispatchToProps = (dispatch: Function) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: any) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(setUsersTotalCountAC(totalCount))
        },
        toggleIsFetching:(isFetching:boolean)=>{
            dispatch(toggleIsFetchingAC(isFetching))
    }


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);