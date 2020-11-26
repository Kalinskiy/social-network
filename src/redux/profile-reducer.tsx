import {newPostType} from './store';
import {IPost} from '../components/Profile/row2/MyPosts/MyPosts';
import {profileAPI, usersAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {toggleIsFetchingAC} from './app-reducer';
import {Dispatch} from 'redux';
import {PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const ADD_LIKE = 'ADD_LIKE';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


const initialState = {
    posts: [
        {
            id: 1,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores culpa cupiditate magni sunt! Ipsum laboriosam, odit rerum sint voluptate voluptatibus!',
            likesCount: 1
        },
        {
            id: 2,
            message: ' dolor sit amet, consectetur adipisicing elit. Asperiores culpa cupiditate magni sunt! Ipsum laboriosam, odit rerum sint voluptate voluptatib',
            likesCount: 0
        },
        {
            id: 3,
            message: ' dolor sit amet, consectetur adipisicing elit. Asperiores culpa cupiditate magni sunt! Ipsum laboriosam, odit rerum sint voluptate voluptatibonsectetur adipisicing elit. Asperiores culpa cupiditate magni sunt! Ipsum l',
            likesCount: 0
        },
    ],
    profile: {
        photos: {
            small: '',
            large: ''
        },
        aboutMe: null,
        userId: null,      //required(integer)
        lookingForAJob: null,     //required(boolean)
        lookingForAJobDescription: null,     //required(string)
        fullName: null,     //required(string)
        contacts: {
            github: null,     //required(string)
            vk: null,     //required(string)
            facebook: null,     //required(string)
            instagram: null,     //required(string)
            twitter: null,     //required(string)
            website: null,     //required(string)
            youtube: null,     //required(string)
            mainLink: null
        },     //required(object)
        //required(string)
    },
    status: '',
    newPostText: '',
    photos: null
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type InitStateType = typeof initialState

type profileStateType = {
    posts: Array<PostType>
    profile: null | object
    status: string
    newPostText: string
    photos: any
}

export type AddPostType = {
    type: typeof ADD_POST,
    newPostText: string
}
export type DeletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
export type AddLikeType = {
    type: typeof ADD_LIKE,
    payload: {
        id: number
    }
}
export type UpdateNewPostTextType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string
}
export type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export type SetPhotoType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: string
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
const profileReducer = (state: InitStateType = initialState, action: ActionType): profileStateType => {

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
                newPostText: '',

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
export const addLikeAC = (id: number): AddLikeType => ({type: ADD_LIKE, payload: {id}})
export const addPostAC = (newPostText: string): AddPostType => ({type: ADD_POST, newPostText});
export const deletePostAC = (postId: number): DeletePostType => ({type: DELETE_POST, postId});
export const setUserProfileAC = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status: string): SetStatusType => ({type: SET_STATUS, status});
export const setPhotoSuccessAC = (photos: string): SetPhotoType => ({type: SAVE_PHOTO_SUCCESS, photos});
//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getUserProfile = (userId: any) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const response = await usersAPI.getProfile(userId);
    dispatch(toggleIsFetchingAC(false));
    dispatch(setUserProfileAC(response.data));
}
export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const response = await profileAPI.getStatus(userId)
    dispatch(toggleIsFetchingAC(false));
    dispatch(setStatusAC(response.data));

}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const response = await profileAPI.updateStatus(status)
    dispatch(toggleIsFetchingAC(false));
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status));
    }
}
export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const response = await profileAPI.savePhoto(file)
    dispatch(toggleIsFetchingAC(false));
    try {

        if (response.data.resultCode === 0) {
            dispatch(setPhotoSuccessAC(response.data.data.photos));
        }
    } catch {
        alert('error')

    }
}
export const saveProfile = (profile: any) => async (dispatch: any, getState: any) => {
    dispatch(toggleIsFetchingAC(true));
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
    dispatch(toggleIsFetchingAC(false));
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReducer;
