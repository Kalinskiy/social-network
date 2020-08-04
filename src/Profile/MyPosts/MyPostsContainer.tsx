import React from 'react';
import {addLikeAC, addPostActionCreator, updateNewPostTextCreator} from '../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';


export type IPost = {
    id: number
    message: string
    likesCount: string
}
export type PostsType = {

    store: any
}

// const MyPostsContainer = () => {
//
//
//     // @ts-ignore
//     return (
//         <StoreContext.Consumer> //CONTEXT API
//             {(store: any) => {
//                 let state = store.getState();
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator());
//
//                 }
//                 let onPostChange = (text: string) => {
//                     let action = updateNewPostTextCreator(text);
//                     store.dispatch(action);
//
//                 }
//
//                 return <MyPosts updateNewPostText={onPostChange}
//                                 addPost={addPost}
//                                 posts={state.profilePage.posts}
//                                 newPostText={state.profilePage.newPostText}/>
//             }
//
//             }
//         </StoreContext.Consumer>
//     )
// }
let mapStateToProps = (state: any) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextCreator(text);
           dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        addLike: ( id: number ) => {
            dispatch( addLikeAC(id))
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
export default MyPostsContainer;