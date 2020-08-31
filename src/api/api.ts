import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdb9022f-3466-40e1-957a-ab975d07c6cb'
    }

});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId:number){
        console.log('Obsolete method. Please use  profileAPI')
        return profileAPI.getProfile(userId)

    }

}
export const profileAPI = {
    getProfile(userId:number){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId:number){
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status:string){
        return instance.put(`profile/status`,{status:status})
    }

}
export const authAPI = {
    me() {return instance.get(`auth/me`)}

}

