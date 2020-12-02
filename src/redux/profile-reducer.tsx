import {IPost} from '../components/Profile/row2/MyPosts/MyPosts';
import {ResultCodesEnum} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {ContactsType, PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {actions as appAction} from "./app-reducer";
import {profileAPI} from "../api/profile-api";


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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
    photos: null,
}
//----------------------------------------------------------------------------------------------------------------------
//Types
type InitialStateType = typeof initialState


type ActionType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionType | FormAction>

//----------------------------------------------------------------------------------------------------------------------
//Reducer
const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
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
        case 'DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}

        }
        case 'ADD_LIKE': {
            return {
                ...state,
                posts: state.posts.map((i: IPost) => {
                    return {...i, likesCount: i.id === action.payload.id ? i.likesCount + 1 : i.likesCount}
                })
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile

            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}
//----------------------------------------------------------------------------------------------------------------------
//Actions
export const actions = {
    addLikeAC: (id: number) => ({type: 'ADD_LIKE', payload: {id}} as const),
    addPostAC: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    deletePostAC: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatusAC: (status: string) => ({type: 'SET_STATUS', status} as const),
    setPhotoSuccessAC: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}

//----------------------------------------------------------------------------------------------------------------------
//Thunks
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    const response = await profileAPI.getProfile(userId);
    dispatch(appAction.toggleIsFetchingAC(false));
    dispatch(actions.setUserProfileAC(response));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    const response = await profileAPI.getStatus(userId)
    dispatch(appAction.toggleIsFetchingAC(false));
    dispatch(actions.setStatusAC(response));

}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    const response = await profileAPI.updateStatus(status)
    dispatch(appAction.toggleIsFetchingAC(false));
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatusAC(status));
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    const response = await profileAPI.savePhoto(file)
    dispatch(appAction.toggleIsFetchingAC(false));
    try {

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setPhotoSuccessAC(response.data.photos));
        }
    } catch {
        alert('error')

    }
}

export type UpdateProfileType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    aboutMe: string
}
export const saveProfile = (profile: UpdateProfileType): ThunkType => async (dispatch, getState) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
    dispatch(appAction.toggleIsFetchingAC(false));
    if (response.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error('user ID can`t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.messages[0]}))
        return Promise.reject(response.messages[0])
    }
}


export default profileReducer;
