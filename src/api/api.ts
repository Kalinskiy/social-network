import axios from 'axios';
import {UsersType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdb9022f-3466-40e1-957a-ab975d07c6cb'
    }

});
export type GetItemsType  = {
    items:Array<UsersType>
    totalCount:number
    error:string | null

}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,

}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

