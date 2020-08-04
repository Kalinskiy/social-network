import {newPostType} from "./store";
import {IPost} from "../Profile/MyPosts/MyPosts";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_LIKE = 'ADD_LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE'


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 1},
        {id: 2, message: 'It`s my first post', likesCount: 5},
        {id: 3, message: 'Third one', likesCount: 9},
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
}


const profileReducer = (state: any = initialState, action: any) => {

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
                stateCopy: ''
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
        default:
            return state;
    }
}
export const addLikeAC = (id: number) => ({type: ADD_LIKE, payload: {id}})
export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextCreator = (text: string) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserProfile = (profile:any)=>({type: SET_USER_PROFILE,  profile});

export default profileReducer;
