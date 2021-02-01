import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from "../../redux/users-selectors";
import Pagination from "../common/Paginator/Pagination";
import Users from "./Users";
import {UsersType} from "../../types/types";


type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter:FilterType
}

class UsersContainer extends React.Component<PropsType> {

    componentDidMount(): void {
        const {currentPage, pageSize,filter} = this.props
        this.props.requestUsers(currentPage, pageSize, filter)


    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props
        this.props.requestUsers(pageNumber, pageSize, filter)
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props
        this.props.requestUsers(1, pageSize, filter)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> :
                <>
                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           onPageChanged={this.onPageChanged}
                           onFilterChanged={this.onFilterChanged}
                           users={this.props.users}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           followingInProgress={this.props.followingInProgress}
                    />
                    {!!this.props.totalUsersCount &&
                        <Pagination pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                                    onPageChanged={this.onPageChanged}
                                    totalItemsCount={this.props.totalUsersCount}/>
                    }
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
        followingInProgress: getFollowingInProgress(state),
        filter:getUsersFilter(state)
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