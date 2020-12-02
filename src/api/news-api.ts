import axios from "axios";

export type NewItemType = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: { id: string, name: string }
    title: string
    url: string
    urlToImage: string
}
type NewsResponseType = {
    articles: Array<NewItemType>
    status: string
    totalResults: number
}

const corseFree = 'https://cors-anywhere.herokuapp.com/'

const instanceNews = axios.create({
    baseURL: `${corseFree}https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=69c53b6ef0414fbb8941b1b333cea919`,
    headers: {
        'api-key': '69c53b6ef0414fbb8941b1b333cea919'
    }
});

export const newsAPI = {
    getNews() {
        return instanceNews.get<NewsResponseType>('').then(res => res.data)
    }
}