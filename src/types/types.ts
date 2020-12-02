export type PostType = {
    id: number
    message: string
    likesCount: number
    addLike?: (id: number) => void
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}


export type UsersType = {
    followed: boolean
    id: number
    name: string
    photos: PhotosType
    status: string
    uniqueUrlName: string
}