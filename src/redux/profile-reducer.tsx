import {newPostType} from "./store";
import {IPost} from "../components/Profile/MyPosts/MyPosts";
import {profileAPI, usersAPI} from "../api/api";
import {AppStoreType} from "./redux-store";
import {PostType} from "../components/Profile/MyPosts/Post/Post";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_LIKE = 'ADD_LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'


type profileStateType = {
    posts: Array<PostType>
    newPostText: string
    profile: null
    status:string

}

let initialState:profileStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 1},
        {id: 2, message: 'It`s my first post', likesCount: 5},
        {id: 3, message: 'Third one', likesCount: 9},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status:''
}


export type AddPostType = {
    type: 'ADD-POST',
}
export type AddLikeType = {
    type: 'ADD_LIKE',
    payload: {
        id: number
    }
}
export type UpdateNewPostTextType = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string
}
export type SetUserProfileType = {
    type: 'SET_USER_PROFILE',
    profile: any
}
export type SetStatusType = {
    type: 'SET_STATUS',
    status:string
}


export type ActionType = AddPostType | AddLikeType | UpdateNewPostTextType | SetUserProfileType | SetStatusType

const profileReducer = (state: profileStateType = initialState, action: ActionType):profileStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost: newPostType = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],

            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
            }
        }
        case ADD_LIKE: {
            return {
                ...state,
                posts: state.posts.map((i: IPost) => {
                    return {...i, likesCount: i.id === action.payload.id ? i.likesCount + 1 : i.likesCount}
                })
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}


export const addLikeAC = (id: number) => ({type: ADD_LIKE, payload: {id}})
export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string) => ({type: SET_STATUS, status});
export const getUserProfile = (userId: any) => (dispatch: any) => {
    usersAPI.getProfile(userId).then((response: any) => {
        dispatch(setUserProfile(response.data));
    });
}
export const getStatus = (userId: number) => (dispatch: any) => {
    profileAPI.getStatus(userId).then((response: any) => {

        dispatch(setStatus(response.data));
    });
}
export const updateStatus = (status: string) => (dispatch: any) => {

    profileAPI.updateStatus(status)
        .then((response: any) => {
      if(response.data.resultCode === 0){
          dispatch(setStatus(status));
      }

    });
}


export default profileReducer;
