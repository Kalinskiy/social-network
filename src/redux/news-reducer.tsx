import {newsAPI} from "../api/api";
import {toggleIsFetchingAC, ToggleIsFetchingType} from "./app-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const initialState = {
    news: Array<NewType>() //?
}
//----------------------------------------------------------------------------------------------------------------------
//Types
const SET_NEWS = "SET_NEWS";
type SetNewsActionType = {
    type: typeof SET_NEWS
    payload: {
        news: Array<NewType>
    }
}
type NewSourceType = {
    id: string
    name: string
}
type NewType = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: NewSourceType
    title: string
    url: string
    urlToImage: string
}

type InitialStateType = typeof initialState
type ActionType = SetNewsActionType | ToggleIsFetchingType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const newsReducer = (state: InitialStateType = initialState, action: SetNewsActionType) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.payload.news
            }
        default:
            return state;
    }
}


export const setNewsAC = (news: Array<any>): SetNewsActionType => ({type: SET_NEWS, payload: {news}});

export const getNews = (): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const data = await newsAPI.getnews()
    console.log(data)
    dispatch(setNewsAC(data.data.articles));
    dispatch(toggleIsFetchingAC(false));

}


export default newsReducer;
