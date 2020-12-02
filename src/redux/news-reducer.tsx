import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {actions as appAction} from "./app-reducer";
import {newsAPI} from "../api/news-api";


const initialState = {
    news: Array<NewType>() //?
}
//----------------------------------------------------------------------------------------------------------------------
//Types
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
type ActionType = InferActionsTypes<typeof actions & typeof appAction>
type ThunkType = BaseThunkType<ActionType>

export const newsReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'SET_NEWS':
            return {
                ...state,
                news: action.payload.news
            }
        default:
            return state;
    }
}


const actions = {
    setNewsAC: (news: Array<any>) => ({type: 'SET_NEWS', payload: {news}} as const)
}

export const getNews = (): ThunkType => async (dispatch) => {
    dispatch(appAction.toggleIsFetchingAC(true));
    const data = await newsAPI.getNews()
    dispatch(actions.setNewsAC(data.articles));
    dispatch(appAction.toggleIsFetchingAC(false));

}


export default newsReducer;
