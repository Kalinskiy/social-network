import axios from "axios";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`)
    },
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '26888c91-0574-4590-8b48-5fe77617cb66'
    }

});

