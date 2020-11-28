import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {follow, requestUsers, unfollow} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import Pagination from "../common/Paginator/Pagination";
import Users from "./Users";
import {UserType} from "../../types/types";


// type PropsType = MapStateToPropsType & MapDispatchToPropsType
// type MapDispatchToPropsType = {
//     follow: (userId:number) => void
//     unfollow: (userId:number) => void
//     requestUsers: (currentPage: number, pageSize: number) => void
//     // toggleIsFetching: (isFetching: boolean) => void
//     // toggleFollowingProgress: (isFetching: boolean) => void
// }
type MapStateToPropsType =  {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}



class UsersContainer extends React.Component<PropsType> {

    componentDidMount(): void {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)


    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> :
                <>
                    <Pagination pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                                onPageChanged={this.onPageChanged}
                                totalItemsCount={this.props.totalUsersCount}/>

                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.onPageChanged}
                           users={this.props.users}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           followingInProgress={this.props.followingInProgress}
                    />


                </>
            }

        </>

    }

}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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
    requestUsers
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)
type PropsType = ConnectedProps<typeof connector>
export default connector(UsersContainer)