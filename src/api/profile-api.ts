import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";
import {UpdateProfileType} from "../redux/profile-reducer";


type SavePhotoResponseDataType = {
    photos:PhotosType

}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status}).then(res=>res.data);
    },
    savePhoto(photo: File) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put< APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>res.data);
    },
    saveProfile(profile: UpdateProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(res=>res.data)
    }
}