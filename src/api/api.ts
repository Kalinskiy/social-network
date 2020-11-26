    import axios from 'axios';

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
    getProfile(userId: number) {
        console.log('Obsolete method. Please use  profileAPI')
        return profileAPI.getProfile(userId)
    },
    getFriends(pageSize = 6) {
        return instance.get(`users?count=${pageSize}`)
            .then(response => {
                return response.data.items
            })
    },
    getOnlineFriends( pageSize = 4) {
        return instance.get(`users?count=${pageSize}`)
            .then(response => {
                return response.data.items
            })
    },


}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
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


export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha=null) {
        return instance.post(`auth/login`, {email, password, rememberMe,captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`/security/get-captcha-url`)
    },
}
export const newsAPI = {

    getnews() {
        return instanceNews.get('')
    }
}

