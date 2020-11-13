import React from 'react';
import {connect} from 'react-redux';
import {follow, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow} from "../../redux/users-reducer";
import Users, {UserType} from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {AppStoreType} from "../../redux/redux-store";
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import style from "./Users.module.css";
import Pagination from "../common/Paginator/Pagination";


type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setTotalUsersCount: (count: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean) => void
}

class UsersContainer extends React.Component<any> {

    componentDidMount(): void {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize);


    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize);
    }

    render() {


        return <>
            {this.props.isFetching ? <Preloader/> :
                <>
                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.onPageChanged}
                           users={this.props.users}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           toggleFollowingProgress={this.props.toggleFollowingProgress}
                           followingInProgress={this.props.followingInProgress}


                    />


                </>
            }
            <Pagination pageSize={this.props.pageSize} currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                        totalItemsCount={this.props.totalUsersCount}/>
        </>

    }

}

const mapStateToProps = (state: AppStoreType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

let mapDispatchToProps = {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)