import axios from 'axios';
import {PhotosType, ProfileType, UsersType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdb9022f-3466-40e1-957a-ab975d07c6cb'
    }

});
const corseFree = 'https://cors-anywhere.herokuapp.com/'

const instanceNews = axios.create({
    baseURL: `${corseFree}https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=69c53b6ef0414fbb8941b1b333cea919`,
    headers: {
        'api-key': '69c53b6ef0414fbb8941b1b333cea919'
    }
});


type UsersResponseType = {
    error: null
    items: Array<UsersType>
    totalCount: number
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data)
    },
    getProfile(userId: number) {
        console.log('Obsolete method. Please use  profileAPI')
        return profileAPI.getProfile(userId).then(res=>res.data)
    },
    getFriends(pageSize = 6) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}`)
            .then(response => {
                return response.data.items
            })
    },
    getOnlineFriends(pageSize = 4) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}`)
            .then(response => {
                return response.data.items
            })
    },


}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res=>res.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: any) {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,

}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {

        return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data)
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
    },
}

type NewItemType = {
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
export const newsAPI = {
    getNews() {
        return instanceNews.get<NewsResponseType>('').then(res => res.data)
    }
}

