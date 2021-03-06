import {GetItemsType, instance, APIResponseType} from "./api"
import {AxiosPromise} from "axios";


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`)).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as AxiosPromise<APIResponseType>
    },
    getFriends(pageSize = 6) {
        return instance.get<GetItemsType>(`users?count=${pageSize}`).then(res => res.data.items)
    },
    getOnlineFriends(pageSize = 4) {
        return instance.get<GetItemsType>(`users?count=${pageSize}`).then(res => res.data.items)
    },


}