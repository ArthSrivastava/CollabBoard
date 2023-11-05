import { ajax } from "rxjs/ajax"
import { BASE_URL } from "../utils/AppConstants"

export const getUserById = (id) => {
    return ajax.get(`${BASE_URL}/users/${id}`, {credentials: "include"});
}


export const registerUser = (data) => {
    return ajax.post(`${BASE_URL}/users`, data);
}