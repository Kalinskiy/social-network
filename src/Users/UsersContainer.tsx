import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {follow, getUsers, setCurrentPage, toggleFollowingProgress, unfollow} from "../redux/users-reducer";
import Users, {UserType} from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {AppStoreType} from "../redux/redux-store";


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

class UsersContainer extends React.Component<AllProps> {

    componentDidMount(): void {
        this.props.getUsers(this.props.currentPage,this.props.pageSize );


    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber,this.props.pageSize );
    }


    render() {


        return <>
            {this.props.isFetching ? <Preloader/> : null}
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

}

const mapStateToProps = (state: AppStoreType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress


    }
}

// let mapDispatchToProps = (dispatch: Function) => {
//     return {
//         follow: (userId: number) => {
//             dispatch(follow(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollow(userId))
//         },
//         setUsers: (users: any) => {
//             dispatch(setUsers(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPage(currentPage))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCount(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetching(isFetching))
//         },
//         toggleFollowingProgress:(isFetching:boolean, userId:number)=>{
//             dispatch(toggleFollowingProgress(isFetching, userId))
//         }
//     }
// }

let mapDispatchToProps = {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers


}

type PropsRedux = ConnectedProps<typeof connector>
const connector = connect(mapStateToProps, mapDispatchToProps)


type AllProps = PropsRedux

export default connector(UsersContainer);
