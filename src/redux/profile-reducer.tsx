import {newPostType} from "./store";
import {IPost} from "../components/Profile/MyPosts/MyPosts";
import {profileAPI, usersAPI} from "../api/api";
import {PostType} from "../components/Profile/MyPosts/Post/Post";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const ADD_LIKE = 'ADD_LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState: profileStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 1},
        {id: 2, message: 'It`s my first post', likesCount: 5},
        {id: 3, message: 'Third one', likesCount: 9},
    ],

    profile: null,
    status: '',
    newPostText: '',
    photos: null
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type profileStateType = {
    posts: Array<PostType>
    profile: null | object
    status: string
    newPostText: string
    photos: any
}

export type AddPostType = {
    type: 'ADD-POST',
    newPostText: string
}
export type DeletePostType = {
    type: 'DELETE_POST',
    postId: number
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
    status: string
}

export type SetPhotoType = {
    type: 'SAVE_PHOTO_SUCCESS',
    photos: any
}

export type ActionType =
    AddPostType
    | AddLikeType
    | UpdateNewPostTextType
    | SetUserProfileType
    | SetStatusType
    | DeletePostType
    | SetPhotoType

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const profileReducer = (state: profileStateType = initialState, action: ActionType): profileStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost: newPostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}

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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//Actions
export const addLikeAC = (id: number) => ({type: ADD_LIKE, payload: {id}})
export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText});
export const deletePost = (postId: number) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile: any) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string) => ({type: SET_STATUS, status});
export const setPhotoSuccess = (photos: any) => ({type: SAVE_PHOTO_SUCCESS, photos});
//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getUserProfile = (userId: any) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));

}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)
    try {
        if (response.data.resultCode === 0) {
            dispatch(setPhotoSuccess(response.data.data.photos));
        }
    } catch {
        alert('error')

    }
}
export const saveProfile = (profile: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }else {
        dispatch(stopSubmit('edit-profile',{_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReducer;
